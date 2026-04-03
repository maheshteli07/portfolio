import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail, FiSend, FiCheck, FiPhone, FiArrowRight, FiInstagram } from 'react-icons/fi'
import { CONTACT_INFO } from '../utils/data'
import emailjs from '@emailjs/browser'

// Initialize EmailJS with your public key from .env.local
if (import.meta.env.VITE_EMAILJS_PUBLIC_KEY) {
  emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY)
}

const CONTACT_LINKS = [
  { icon: FiMail, label: 'Email Address', value: CONTACT_INFO.email, href: `mailto:${CONTACT_INFO.email}` },
  { icon: FiPhone, label: 'Phone Number', value: CONTACT_INFO.phone, href: `tel:${CONTACT_INFO.phone}` },
  { icon: FiGithub, label: 'GitHub Profile', value: 'maheshteli07', href: 'https://github.com/maheshteli07' },
  { icon: FiLinkedin, label: 'LinkedIn Network', value: 'mahesh-teli', href: 'https://linkedin.com/in/mahesh-teli-328b28332/' },
  { icon: FiInstagram, label: 'Instagram Profile', value: 'mahesh__teli', href: 'https://instagram.com/mahesh__teli' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [focused, setFocused] = useState(null)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    setError(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!form.name || !form.email || !form.message) {
      setError('Please fill in all fields')
      return
    }

    setLoading(true)

    try {
      // Send email to your inbox
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_portfolio',
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_contact_msg',
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
          to_email: 'maheshteli729@gmail.com',
        }
      )

      setSent(true)
      setForm({ name: '', email: '', message: '' })
      setError(null)
      
      setTimeout(() => setSent(false), 4000)
    } catch (error) {
      console.error('Email sending failed:', error)
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
            Reach Out
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent2">brilliant.</span>
          </h2>
          <p className="text-base md:text-xl text-muted max-w-2xl leading-relaxed">
            Whether you have an idea, a project, or just want to chat about tech — my inbox is always open. Looking forward to connecting!
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

              <motion.button
                type="submit"
                disabled={sent || loading}
                whileHover={ !loading ? { scale: 1.01 } : {} }
                whileTap={ !loading ? { scale: 0.98 } : {} }
                className={`w-full mt-2 relative flex items-center justify-center gap-3 px-8 py-5 rounded-2xl font-bold text-lg transition-all duration-500 overflow-hidden group ${
                  sent 
                  ? 'bg-green-500/10 text-green-400 border border-green-500/30' 
                  : loading
                  ? 'bg-accent/20 text-accent border border-accent/30 cursor-wait'
                  : 'bg-white/5 text-bright border border-white/10 hover:border-transparent'
                }`}
              >
                {!sent && <div className="absolute inset-0 bg-gradient-to-r from-accent to-accent2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />}
                
                <span className="relative z-10 flex items-center gap-2">
                  {sent ? (
                    <>
                      <FiCheck size={24} />
                      Message Sent Successfully!
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