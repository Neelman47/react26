import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Instagram, Twitter, Facebook, Youtube, Mail, MapPin, Phone, ArrowRight } from 'lucide-react'
import './Footer.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    if (email.trim()) {
      // In a real app, this would send to backend
      console.log('Newsletter subscription:', email)
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  const footerLinks = {
    shop: [
      { label: 'All Products', path: '/shop' },
      { label: 'New Arrivals', path: '/shop?filter=new' },
      { label: 'Best Sellers', path: '/shop?filter=bestsellers' },
      { label: 'Sale', path: '/shop?filter=sale' },
    ],
    company: [
      { label: 'About Us', path: '/about' },
      { label: 'Careers', path: '/careers' },
      { label: 'Press', path: '/press' },
      { label: 'Blog', path: '/blog' },
    ],
    support: [
      { label: 'Contact', path: '/contact' },
      { label: 'FAQ', path: '/faq' },
      { label: 'Shipping', path: '/shipping' },
      { label: 'Returns', path: '/returns' },
    ],
    legal: [
      { label: 'Privacy Policy', path: '/privacy' },
      { label: 'Terms of Service', path: '/terms' },
      { label: 'Cookie Policy', path: '/cookies' },
    ],
  }

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Youtube, href: '#', label: 'Youtube' },
  ]

  return (
    <footer className="footer">
      {/* Newsletter Section */}
      <div className="footer__newsletter">
        <div className="container">
          <div className="newsletter-content">
            <div className="newsletter-text">
              <h3>Join Our Community</h3>
              <p>Subscribe to get special offers, free giveaways, and exclusive deals.</p>
            </div>
            <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
              <div className="newsletter-input-wrapper">
                <Mail size={20} className="newsletter-icon" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="newsletter-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-accent btn-lg" disabled={subscribed}>
                {subscribed ? 'Subscribed!' : 'Subscribe'}
                {!subscribed && <ArrowRight size={18} />}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="footer__main">
        <div className="container">
          <div className="footer__grid">
            {/* Brand Column */}
            <div className="footer__brand">
              <Link to="/" className="footer__logo">
                <div className="logo-icon">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <rect width="32" height="32" rx="10" fill="#0f0f0f"/>
                    <path d="M8 22L12 10H16L12 22H8Z" fill="#fff"/>
                    <path d="M14 22L18 10H22L18 22H14Z" fill="#ff6b2c"/>
                    <circle cx="24" cy="12" r="3" fill="#fff"/>
                  </svg>
                </div>
                <span className="logo-text">Steply</span>
              </Link>
              <p className="footer__description">
                Premium footwear for the modern lifestyle. Step into comfort and style.
              </p>
              <div className="footer__social">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      className="social-link"
                      aria-label={social.label}
                    >
                      <Icon size={20} />
                    </a>
                  )
                })}
              </div>
            </div>

            {/* Links Columns */}
            <div className="footer__links-col">
              <h4 className="footer__title">Shop</h4>
              <ul className="footer__links">
                {footerLinks.shop.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer__links-col">
              <h4 className="footer__title">Company</h4>
              <ul className="footer__links">
                {footerLinks.company.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer__links-col">
              <h4 className="footer__title">Support</h4>
              <ul className="footer__links">
                {footerLinks.support.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Column */}
            <div className="footer__links-col">
              <h4 className="footer__title">Contact</h4>
              <ul className="footer__contact">
                <li>
                  <Phone size={16} />
                  <span>+1 (555) 123-4567</span>
                </li>
                <li>
                  <Mail size={16} />
                  <span>hello@stiply.com</span>
                </li>
                <li>
                  <MapPin size={16} />
                  <span>New York, NY 10001</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer__bottom">
        <div className="container">
          <div className="footer__bottom-content">
            <p>&copy; {currentYear} Steply. All rights reserved.</p>
            <div className="footer__bottom-links">
              {footerLinks.legal.map((link, index) => (
                <span key={link.path}>
                  <Link to={link.path}>{link.label}</Link>
                  {index < footerLinks.legal.length - 1 && <span className="separator">•</span>}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
