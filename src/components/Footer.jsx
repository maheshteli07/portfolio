import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiInstagram, FiMail } from 'react-icons/fi'
import { SiLeetcode } from 'react-icons/si'
import { CONTACT_INFO } from '../utils/data'

export default function Footer() {
  const socialLinks = [
    { icon: FiGithub, href: 'https://github.com/maheshteli07', label: 'GitHub' },
    { icon: FiLinkedin, href: 'https://linkedin.com/in/mahesh-teli-328b28332/', label: 'LinkedIn' },
    { icon: SiLeetcode, href: 'https://leetcode.com/u/maheshteli07/', label: 'LeetCode' },
    { icon: FiInstagram, href: 'https://instagram.com/mahesh__teli', label: 'Instagram' },
    { icon: FiMail, href: `mailto:${CONTACT_INFO.email}`, label: 'Email' },
  ]

  return (
    <footer className="bg-bg/50 backdrop-blur border-t border-border py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-4"
          >
            <h3 className="text-xl md:text-2xl font-bold text-accent">MT</h3>
            <p className="text-base text-muted">Building amazing digital experiences</p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-xl font-bold text-bright mb-4">Quick Links</h4>
            <ul className="flex flex-col gap-3">
              {['About', 'Skills', 'Projects', 'Contact'].map(item => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="text-base text-muted hover:text-accent transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-xl font-bold text-bright mb-4">Follow Me</h4>
            <div className="flex gap-6">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="w-12 h-12 md:w-14 md:h-14 rounded-xl border border-accent/30 flex items-center justify-center text-accent hover:bg-accent/10 transition-all duration-300 text-2xl"
                >
                  <Icon size={24} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent my-8" />

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center"
        >
          <p className="text-base text-muted">
            © 2024 Mahesh Teli. All rights reserved.
          </p>
          <p className="text-sm text-muted/60 mt-2 font-mono">
            Designed & Built with React, Tailwind & Framer Motion
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
