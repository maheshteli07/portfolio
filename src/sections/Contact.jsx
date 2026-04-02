import { useState } from 'react'
import { motion } from 'framer-motion'
import SectionHeading from '../components/SectionHeading'
import { FiGithub, FiLinkedin, FiMail, FiSend, FiCheck, FiPhone } from 'react-icons/fi'
import { CONTACT_INFO } from '../utils/data'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

const CONTACT_LINKS = [
  { icon: FiMail, label: 'Email', value: CONTACT_INFO.email, href: `mailto:${CONTACT_INFO.email}` },
  { icon: FiPhone, label: 'Phone', value: CONTACT_INFO.phone, href: `tel:${CONTACT_INFO.phone}` },
  { icon: FiGithub, label: 'GitHub', value: 'github.com/maheshteli07', href: 'https://github.com/maheshteli07' },
  { icon: FiLinkedin, label: 'LinkedIn', value: 'linkedin.com/in/mahesh-teli', href: 'https://linkedin.com/in/mahesh-teli-328b28332/' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setForm({ name: '', email: '', message: '' })
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <section id="contact" className="py-32 md:py-40 px-6 relative overflow-hidden">
      {/* Background animation */}
      <motion.div
        animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute bottom-20 left-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeading
          title="Get In Touch"
          subtitle="I'm always open to opportunities and conversations about technology and innovation."
        />

        <div className="grid lg:grid-cols-2 gap-12 md:gap-16">
          {/* Left: info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-8"
          >
            <motion.p 
              className="text-lg md:text-xl text-muted leading-relaxed"
              animate={{ opacity: [1, 0.85, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              Whether you have an opportunity to collaborate, a project idea, or just want to connect — my inbox is always open. 
              I'd love to hear from you and discuss how we can work together!
            </motion.p>

            <motion.div 
              className="flex flex-col gap-5"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {CONTACT_LINKS.map(({ icon: Icon, label, value, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={itemVariants}
                  whileHover={{ x: 8, scale: 1.02 }}
                  className="glass-card rounded-xl p-6 md:p-8 group transition-all hover:border-accent/50"
                >
                  <div className="flex items-center gap-5 md:gap-6">
                    <motion.div 
                      className="w-14 h-14 md:w-16 md:h-16 rounded-lg border border-border/50 flex items-center justify-center text-accent group-hover:border-accent/50 transition-colors text-2xl md:text-3xl"
                      whileHover={{ rotate: 12, scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon size={32} />
                    </motion.div>
                    <div>
                      <div className="font-mono text-sm md:text-base text-muted mb-1">{label}</div>
                      <motion.div 
                        className="text-base md:text-lg text-text group-hover:text-accent transition-colors font-semibold"
                        animate={{ opacity: [1, 0.9, 1] }}
                        transition={{ duration: 3, repeat: Infinity, delay: Math.random() * 1 }}
                      >
                        {value}
                      </motion.div>
                    </div>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.form 
              onSubmit={handleSubmit} 
              className="glass-card rounded-2xl p-8 md:p-10 flex flex-col gap-6 hover:border-accent/50"
              animate={{ opacity: sent ? 0.8 : 1 }}
              transition={{ duration: 0.3 }}
            >
              {[
                { name: 'name', placeholder: 'Your Name', type: 'text' },
                { name: 'email', placeholder: 'your@email.com', type: 'email' },
              ].map((field, i) => (
                <motion.div 
                  key={field.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <motion.input
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={form[field.name]}
                    onChange={handleChange}
                    required
                    whileFocus={{ scale: 1.02, borderColor: '#00d4ff' }}
                    className="w-full text-base md:text-lg px-6 py-4 md:py-5 rounded-lg bg-surface border border-border/50 text-bright placeholder-muted/40 focus:outline-none focus:border-accent/50 focus:bg-surface/80 transition-all duration-300 font-mono"
                  />
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <motion.textarea
                  name="message"
                  placeholder="Your message here..."
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  whileFocus={{ scale: 1.02, borderColor: '#00d4ff' }}
                  className="w-full text-base md:text-lg px-6 py-4 md:py-5 rounded-lg bg-surface border border-border/50 text-bright placeholder-muted/40 focus:outline-none focus:border-accent/50 focus:bg-surface/80 transition-all duration-300 font-mono resize-none"
                />
              </motion.div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(0, 212, 255, 0.4)' }}
                whileTap={{ scale: 0.98 }}
                animate={{ 
                  background: sent 
                    ? ['linear-gradient(to right, #00d4ff, #00d4ff)', 'linear-gradient(to right, #00d4ff, #80f)']
                    : 'linear-gradient(to right, #00d4ff, rgba(0, 212, 255, 0.8))'
                }}
                transition={{ duration: 0.3 }}
                className="w-full text-base md:text-lg px-6 py-4 md:py-5 bg-gradient-to-r from-accent to-accent/80 text-bg rounded-lg font-bold flex items-center justify-center gap-3 hover:shadow-lg transition-all duration-300"
              >
                <motion.div
                  animate={{ rotate: sent ? 360 : 0, scale: sent ? 1.2 : 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {sent ? <FiCheck size={24} /> : <FiSend size={24} />}
                </motion.div>
                {sent ? 'Sent!' : 'Send Message'}
              </motion.button>
            </motion.form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}