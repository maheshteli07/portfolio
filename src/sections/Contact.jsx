import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail, FiSend, FiCheck, FiArrowRight, FiInstagram } from 'react-icons/fi'
import { CONTACT_INFO } from '../utils/data'
import emailjs from '@emailjs/browser'

// Initialize EmailJS with your public key from .env.local
if (import.meta.env.VITE_EMAILJS_PUBLIC_KEY) {
  emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY)
}

const CONTACT_LINKS = [
  { icon: FiMail, label: 'Email Address', value: CONTACT_INFO.email, href: `mailto:${CONTACT_INFO.email}` },
  { icon: FiGithub, label: 'GitHub Profile', value: 'maheshteli07', href: 'https://github.com/maheshteli07' },
  { icon: FiLinkedin, label: 'LinkedIn Network', value: 'mahesh-teli', href: 'https://linkedin.com/in/mahesh-teli-328b28332/' },
  { icon: FiInstagram, label: 'Instagram Profile', value: 'mahesh__teli', href: 'https://instagram.com/mahesh__teli' },
]

// ─── Rate limit ──────────────────────────────────────────────────────────────
const RATE_LIMIT_MS = 60_000

// ─── Disposable email domain blocklist ──────────────────────────────────────
const BLOCKED_DOMAINS = new Set([
  'mailinator.com', 'guerrillamail.com', 'tempmail.com', 'yopmail.com',
  'sharklasers.com', 'grr.la', 'guerrillamail.info', 'guerrillamail.biz',
  'guerrillamail.de', 'guerrillamail.net', 'guerrillamail.org', 'spam4.me',
  'trashmail.com', 'trashmail.me', 'trashmail.at', 'dispostable.com',
  'mailnull.com', 'maildrop.cc', 'discard.email', 'fakeinbox.com',
  'spamgourmet.com', 'mytemp.email', 'tempinbox.com', 'getairmail.com',
  'filzmail.com', 'armyspy.com', 'cuvox.de', 'dayrep.com', 'einrot.com',
  'fleckens.hu', 'gustr.com', 'jourrapide.com', 'rhyta.com', 'superrito.com',
  'teleworm.us', 'mohmal.com', '10minutemail.com', 'minutemail.com',
  'tempr.email', 'mailtemp.info', 'generator.email', 'throwam.com',
])

// ─── Email format regex (strict) ─────────────────────────────────────────────
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/

// Known real/legitimate email providers — emails from other domains get extra scrutiny
const KNOWN_PROVIDERS = new Set([
  'gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'live.com',
  'icloud.com', 'me.com', 'mac.com', 'protonmail.com', 'proton.me',
  'zoho.com', 'aol.com', 'msn.com', 'rediffmail.com', 'ymail.com',
])

/**
 * Client-side email validation — multi-layer.
 * Blocks: bad format, disposable domains, obvious fakes/test addresses,
 * single-char local parts, keyboard-mash patterns, and implausible domains.
 */
const getEmailFormatError = (email) => {
  const e = email.trim().toLowerCase()
  if (!e) return 'Email is required'
  if (!EMAIL_REGEX.test(e)) return 'Enter a valid email (e.g. name@gmail.com)'

  const [local, domain] = e.split('@')

  // No consecutive dots
  if (local.includes('..') || domain.includes('..')) return 'Email contains consecutive dots'
  // Local part dot rules
  if (local.startsWith('.') || local.endsWith('.')) return 'Email local part cannot start or end with a dot'

  // TLD sanity
  const tld = domain.split('.').pop()
  if (tld.length < 2 || tld.length > 12) return 'Please enter a valid email address'

  // Block disposable domains
  if (BLOCKED_DOMAINS.has(domain)) return 'Disposable/temporary email addresses are not accepted'

  // Block obviously fake / test local parts
  const FAKE_LOCALS = new Set([
    'test', 'fake', 'admin', 'user', 'info', 'mail', 'email', 'temp', 'null',
    'none', 'noreply', 'no-reply', 'example', 'sample', 'demo', 'asdf', 'qwer',
    'zxcv', 'abcd', 'abc', 'xyz', 'aaa', 'bbb', 'ccc', 'foo', 'bar', 'baz',
  ])
  if (FAKE_LOCALS.has(local)) return 'Please use your real email address'

  // Block single-character local parts (e.g. a@gmail.com)
  if (local.length < 2) return 'Email address is too short — please use your real email'

  // Block keyboard-mash: 4+ consecutive identical characters (e.g. aaaa@, 1111@)
  if (/(.)(\1{3,})/.test(local)) return 'Please enter a valid email address'

  // Block obviously fake domains (single-word without TLD variety, e.g. test@test.com)
  const domainWithoutTld = domain.replace(/\.[^.]+$/, '')
  if (FAKE_LOCALS.has(domainWithoutTld)) return 'Please use a real email provider'

  // If domain is NOT a known provider, ensure it has at least a dot (SLD.TLD)
  if (!KNOWN_PROVIDERS.has(domain) && !domain.includes('.')) {
    return 'Please enter a valid email address'
  }

  return null // ✅ passed all checks
}

/**
 * Real inbox existence check.
 * Tries Abstract API first (if key exists). If the key is invalid (401) or network fails,
 * falls back to Cloudflare DNS-over-HTTPS to check for MX records natively in the browser.
 *
 * Returns: 'valid' | 'invalid' | 'unknown'
 */
const checkEmailDeliverable = async (email) => {
  const key = import.meta.env.VITE_ABSTRACT_API_KEY

  // 1. Try Abstract API
  if (key) {
    try {
      const res = await fetch(
        `https://emailreputation.abstractapi.com/v1/?api_key=${key}&email=${encodeURIComponent(email)}`,
        { signal: AbortSignal.timeout(6000) }
      )

      if (res.ok) {
        const d = await res.json()

        // Use Abstract's Email Reputation schema
        if (d.email_quality?.is_disposable === true) return 'invalid'
        if (d.email_deliverability?.is_mx_valid === false) return 'invalid'
        if (d.email_deliverability?.status === 'undeliverable') return 'invalid'

        return 'valid'
      } else if (res.status === 401) {
        console.error(`[EmailCheck] Abstract API explicitly returned 401 Unauthorized. Your API key is invalid!`)
        return 'invalid_api_key'
      } else {
        console.warn(`[EmailCheck] Abstract API failed with status: ${res.status}. Falling back to DNS check...`)
      }
    } catch (err) {
      console.warn('[EmailCheck] Abstract API network error:', err.message)
    }
  }

  // 2. Fallback: Cloudflare DNS MX Check (No API key needed, fully free & CORS-enabled)
  const domain = email.split('@')[1]
  if (!domain) return 'invalid'

  try {
    const res = await fetch(
      `https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(domain)}&type=MX`,
      {
        headers: { Accept: 'application/dns-json' },
        signal: AbortSignal.timeout(6000),
      }
    )

    if (res.ok) {
      const data = await res.json()
      // Status 3 = NXDOMAIN (Domain does not exist)
      if (data.Status === 3) return 'invalid'

      // Check if domain actually has Mail Exchange (MX) records
      const hasMX = Array.isArray(data.Answer) && data.Answer.some(r => r.type === 15)
      if (!hasMX) return 'invalid'

      return 'valid'
    }
  } catch (err) {
    console.error('[DNS Check] Failed:', err.message)
  }

  // If both APIs completely fail due to network, let the user proceed so form isn't broken
  return 'unknown'
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '', _hp: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [verifying, setVerifying] = useState(false) // email existence check in progress
  const [focused, setFocused] = useState(null)
  const [error, setError] = useState(null)
  const [lastSubmit, setLastSubmit] = useState(0)   // rate-limit timestamp

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    setError(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    // 1. Honeypot — bots fill the hidden field; humans never see it
    if (form._hp) {
      setSent(true) // silently pretend success
      return
    }

    // 2. Required fields check
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError('Please fill in all fields.')
      return
    }

    // 3. Client-side email format + disposable domain check
    const formatError = getEmailFormatError(form.email)
    if (formatError) {
      setError(formatError)
      return
    }

    // 4. Rate limiting — max 1 message per 60 seconds
    const now = Date.now()
    if (now - lastSubmit < RATE_LIMIT_MS) {
      const secs = Math.ceil((RATE_LIMIT_MS - (now - lastSubmit)) / 1000)
      setError(`Please wait ${secs}s before sending another message.`)
      return
    }

    // 5. MX / Inbox check
    setVerifying(true)
    const deliverable = await checkEmailDeliverable(form.email.trim().toLowerCase())
    setVerifying(false)

    if (deliverable === 'invalid_api_key') {
      setError('System Error: The Abstract API key is invalid or suspended. Please check your .env.local file.')
      return
    }

    if (deliverable === 'invalid') {
      setError('This email address does not exist or cannot receive mail. Please use a real email.')
      return
    }
    // deliverable === 'valid'   → confirmed good ✅
    // deliverable === 'unknown' → API unreachable (CORS/network) → proceed, client checks already passed

    // 6. Send via EmailJS
    setLoading(true)
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_portfolio',
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_contact_msg',
        {
          from_name: form.name.trim(),
          from_email: form.email.trim().toLowerCase(),
          message: form.message.trim(),
          to_email: 'maheshteli729@gmail.com',
        }
      )
      setSent(true)
      setForm({ name: '', email: '', message: '', _hp: '' })
      setError(null)
      setLastSubmit(now)
      setTimeout(() => setSent(false), 4000)
    } catch (err) {
      console.error('Email sending failed:', err)
      setError('Failed to send message. Please try again or contact directly via email.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="scroll-mt-16 py-20 px-6 relative overflow-hidden">
      {/* Background ambient glow */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[100px] pointer-events-none -translate-y-1/2"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-left mb-16 md:mb-20"
        >
          <h2 className="font-display text-4xl md:text-5xl lg:text-7xl font-bold text-bright mb-6 tracking-tight">
            Reach
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent2"> Out</span>
          </h2>
          <p className="text-base md:text-xl text-muted max-w-2xl leading-relaxed">
            Whether you have an idea, a project, or just want to chat about tech my inbox is always open. Looking forward to connecting!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">

          {/* Left: Contact Info Cards */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {CONTACT_LINKS.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ scale: 1.02, x: 5 }}
                className="group relative flex items-center gap-5 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] hover:border-accent/30 transition-all duration-300 overflow-hidden"
              >
                {/* Hover gradient background sweep */}
                <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/5 to-accent/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />

                <div className="relative w-14 h-14 rounded-full bg-surface border border-white/10 flex items-center justify-center text-muted group-hover:text-accent group-hover:border-accent/40 text-2xl transition-all duration-300 shadow-lg">
                  <link.icon />
                </div>

                <div className="relative flex flex-col">
                  <span className="text-xs font-mono text-muted/70 mb-1 uppercase tracking-wider">{link.label}</span>
                  <span className="text-bright font-medium text-lg leading-tight group-hover:text-accent transition-colors duration-300">{link.value}</span>
                </div>

                <div className="absolute right-5 text-accent opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                  <FiArrowRight size={22} />
                </div>
              </motion.a>
            ))}
          </div>

          {/* Right: Modern Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3 w-full"
          >
            <form
              onSubmit={handleSubmit}
              className="relative p-6 md:p-10 rounded-[2rem] bg-white/[0.02] border border-white/[0.05] backdrop-blur-xl flex flex-col gap-5 shadow-2xl"
            >
              {/* Error message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm"
                >
                  {error}
                </motion.div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Name Input */}
                <div className="relative group">
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    onFocus={() => setFocused('name')}
                    onBlur={() => setFocused(null)}
                    required
                    placeholder="Your Name"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 pt-7 pb-3 text-bright placeholder-transparent focus:outline-none focus:border-accent/50 focus:bg-white/[0.05] transition-all duration-300 text-lg font-medium"
                  />
                  <label className={`absolute left-6 transition-all duration-300 pointer-events-none
                    ${form.name || focused === 'name' ? 'top-2.5 text-xs text-accent font-semibold tracking-wide' : 'top-5 text-base text-muted'}`}
                  >
                    Your Name
                  </label>
                </div>

                {/* Email Input */}
                <div className="relative group">
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused(null)}
                    required
                    placeholder="Your Email"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 pt-7 pb-3 text-bright placeholder-transparent focus:outline-none focus:border-accent/50 focus:bg-white/[0.05] transition-all duration-300 text-lg font-medium"
                  />
                  <label className={`absolute left-6 transition-all duration-300 pointer-events-none
                    ${form.email || focused === 'email' ? 'top-2.5 text-xs text-accent font-semibold tracking-wide' : 'top-5 text-base text-muted'}`}
                  >
                    Your Email
                  </label>
                </div>
              </div>

              {/* Message Input */}
              <div className="relative group mt-1">
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  onFocus={() => setFocused('message')}
                  onBlur={() => setFocused(null)}
                  required
                  rows="6"
                  placeholder="How can I help you?"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 pt-9 pb-4 text-bright placeholder-transparent focus:outline-none focus:border-accent/50 focus:bg-white/[0.05] transition-all duration-300 resize-none text-lg leading-relaxed font-medium"
                />
                <label className={`absolute left-6 transition-all duration-300 pointer-events-none
                  ${form.message || focused === 'message' ? 'top-3.5 text-xs text-accent font-semibold tracking-wide' : 'top-6 text-base text-muted'}`}
                >
                  How can I help you?
                </label>
              </div>

              {/* Hidden honeypot — invisible to humans, bots will fill it */}
              <input
                type="text"
                name="_hp"
                value={form._hp}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{ display: 'none' }}
              />

              <motion.button
                type="submit"
                disabled={sent || loading || verifying}
                whileHover={!loading && !verifying ? { scale: 1.05 } : {}}
                whileTap={!loading && !verifying ? { scale: 0.95 } : {}}
                className={`w-full mt-2 relative flex items-center justify-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 overflow-hidden group ${sent
                  ? 'bg-green-500/10 text-green-400 border border-green-500/30'
                  : verifying
                    ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/30 cursor-wait'
                    : loading
                      ? 'bg-accent/20 text-accent border border-accent/30 cursor-wait'
                      : 'bg-gradient-to-r from-primary to-secondary text-black hover:scale-105 transition'
                  }`}
              >

                {!sent && !verifying && !loading && (
                  <div className="absolute inset-0 bg-gradient-to-r from-accent to-accent2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                )}

                <span className="relative z-10 flex items-center gap-2">
                  {sent ? (
                    <>
                      <FiCheck size={24} />
                      Message Sent Successfully!
                    </>
                  ) : verifying ? (
                    <>
                      <div className="w-5 h-5 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin" />
                      Checking email...
                    </>
                  ) : loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <FiSend size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                    </>
                  )}
                </span>
              </motion.button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  )
}