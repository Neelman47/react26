import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, Sparkles } from 'lucide-react'
import './Contact.css'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, this would send data to a backend
    console.log('Form submitted:', formData)
    alert('Thank you for your message! We will get back to you soon.')
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  const contactInfo = [
    { icon: Phone, title: 'Phone', content: '+1 (555) 123-4567', link: 'tel:+15551234567' },
    { icon: Mail, title: 'Email', content: 'hello@stiply.com', link: 'mailto:hello@stiply.com' },
    { icon: MapPin, title: 'Address', content: '123 Fashion St, New York, NY 10001' },
    { icon: Clock, title: 'Hours', content: 'Mon-Fri: 9AM-6PM EST' },
  ]

  return (
    <div className="contact-page">
      {/* Hero */}
      <section className="contact-hero">
        <div className="container">
          <motion.div
            className="contact-hero__content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="section-eyebrow">
              <MessageSquare size={14} />
              Get in Touch
            </span>
            <h1>We'd Love to Hear From You</h1>
            <p>Have a question or feedback? Send us a message and we'll respond as soon as possible.</p>
          </motion.div>
        </div>
      </section>

      <section className="section contact-section">
        <div className="container">
          <div className="contact-grid">
            {/* Form */}
            <motion.div
              className="contact-form-card"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2>Send us a Message</h2>
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-input form-input-lg"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-input form-input-lg"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="form-input form-input-lg"
                    placeholder="How can we help?"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="form-input form-input-lg"
                    rows="6"
                    placeholder="Your message..."
                    required
                  />
                </div>
                <button type="submit" className="btn btn-accent btn-lg">
                  <Send size={18} />
                  Send Message
                </button>
              </form>
            </motion.div>

            {/* Info */}
            <motion.div
              className="contact-info"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2>Contact Information</h2>
              <p className="contact-info__intro">
                Reach out to us through any of the channels below. We're here to help!
              </p>
              <div className="contact-info__list">
                {contactInfo.map((info) => {
                  const Icon = info.icon
                  return (
                    <div key={info.title} className="contact-info__item">
                      <div className="contact-info__icon">
                        <Icon size={20} />
                      </div>
                      <div>
                        <h4>{info.title}</h4>
                        {info.link ? (
                          <a href={info.link}>{info.content}</a>
                        ) : (
                          <p>{info.content}</p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
              
              {/* Map Placeholder */}
              <div className="contact-map">
                <div className="map-placeholder">
                  <MapPin size={32} />
                  <span>Interactive map</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
