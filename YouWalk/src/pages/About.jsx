import { motion } from 'framer-motion'
import { Award, Users, Heart, Target, Sparkles, ArrowRight, Globe, Truck, Shield, Zap, CheckCircle, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import './About.css'

const About = () => {
  const values = [
    { 
      icon: Award, 
      title: 'Quality First', 
      description: 'Premium materials and exceptional craftsmanship in every pair. We source only the finest leathers and fabrics, ensuring durability and comfort that lasts.' 
    },
    { 
      icon: Heart, 
      title: 'Customer Love', 
      description: 'Your satisfaction drives everything we do. From design to delivery, we prioritize your experience and happiness above all else.' 
    },
    { 
      icon: Target, 
      title: 'Innovation', 
      description: 'Constantly evolving to bring you the latest in comfort and style. Our design team stays ahead of trends while maintaining timeless appeal.' 
    },
    { 
      icon: Users, 
      title: 'Community', 
      description: 'Building connections through shared passion for footwear. Join thousands who trust Steply for their daily adventures.' 
    },
  ]

  const stats = [
    { value: '50K+', label: 'Happy Customers', icon: Users },
    { value: '200+', label: 'Product Styles', icon: Sparkles },
    { value: '15+', label: 'Countries Shipped', icon: Globe },
    { value: '4.9', label: 'Average Rating', icon: Star },
  ]

  const features = [
    { icon: Truck, title: 'Fast Shipping', description: 'Free shipping on orders over $100. Express delivery available worldwide.' },
    { icon: Shield, title: 'Quality Guarantee', description: '2-year warranty on all products. We stand behind every pair we make.' },
    { icon: Zap, title: 'Easy Returns', description: '30-day hassle-free returns. If you\'re not satisfied, we\'ll make it right.' },
    { icon: CheckCircle, title: 'Authentic Products', description: '100% authentic, directly from our workshop. No middlemen, no compromises.' },
  ]

  const timeline = [
    { year: '2020', title: 'Founded', description: 'Steply was born from a vision to create footwear that combines style, comfort, and sustainability.' },
    { year: '2021', title: 'First Collection', description: 'Launched our debut collection with 20 styles, receiving overwhelming positive response.' },
    { year: '2022', title: 'Global Expansion', description: 'Expanded to 15 countries, reaching customers worldwide with our premium designs.' },
    { year: '2024', title: 'Innovation Leader', description: 'Recognized as a leader in sustainable footwear innovation and customer satisfaction.' },
  ]

  return (
    <div className="about-page">
      {/* Hero */}
      <section className="about-hero">
        <div className="container">
          <motion.div
            className="about-hero__content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="section-eyebrow">
              <Sparkles size={14} />
              Our Story
            </span>
            <h1>Redefining Comfort & Style</h1>
            <p>
              Steply was born from a simple belief: everyone deserves footwear that 
              combines exceptional comfort with contemporary style.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="section story-section">
        <div className="container">
          <div className="story-grid">
            <motion.div
              className="story-image"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop"
                alt="Our Story"
              />
            </motion.div>
            <motion.div
              className="story-content"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="section-eyebrow">Our Journey</span>
              <h2>The Steply Story</h2>
              <p>
                Founded in 2020, Steply started as a passion project to revolutionize 
                how people think about their shoes. We believed that footwear should be 
                more than just functional—it should be an expression of who you are.
              </p>
              <p>
                What began in a small workshop has grown into a trusted brand known for 
                quality craftsmanship, innovative designs, and unwavering commitment to 
                customer satisfaction. Every pair we create is a testament to our dedication 
                to excellence.
              </p>
              <p>
                Our team of designers and craftspeople work tirelessly to bring you 
                footwear that seamlessly blends fashion-forward aesthetics with 
                everyday functionality. We source premium materials from trusted suppliers 
                and employ traditional techniques alongside modern innovations.
              </p>
              <div className="story-features">
                <div className="story-feature">
                  <CheckCircle size={20} />
                  <span>Handcrafted Quality</span>
                </div>
                <div className="story-feature">
                  <CheckCircle size={20} />
                  <span>Sustainable Materials</span>
                </div>
                <div className="story-feature">
                  <CheckCircle size={20} />
                  <span>Ethical Production</span>
                </div>
              </div>
              <Link to="/shop" className="btn btn-primary btn-lg">
                Explore Collection
                <ArrowRight size={18} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section timeline-section">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">
              <Target size={14} />
              Our Growth
            </span>
            <h2 className="section-title">Milestones</h2>
            <p className="section-subtitle">
              Key moments in our journey to becoming a trusted footwear brand
            </p>
          </div>
          <div className="timeline">
            {timeline.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                className="timeline-item"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <div className="timeline-year">{milestone.year}</div>
                <div className="timeline-content">
                  <h3>{milestone.title}</h3>
                  <p>{milestone.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  className="stat-item"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="stat-icon">
                    <Icon size={32} />
                  </div>
                  <span className="stat-value">{stat.value}</span>
                  <span className="stat-label">{stat.label}</span>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section features-section">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">
              <Shield size={14} />
              Why Choose Us
            </span>
            <h2 className="section-title">What Sets Us Apart</h2>
            <p className="section-subtitle">
              Experience the difference of premium quality and exceptional service
            </p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  className="feature-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="feature-icon">
                    <Icon size={28} />
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section values-section">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">
              <Heart size={14} />
              What We Stand For
            </span>
            <h2 className="section-title">Our Core Values</h2>
            <p className="section-subtitle">
              The principles that guide everything we do, from design to delivery
            </p>
          </div>
          <div className="values-grid">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={value.title}
                  className="value-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="value-card__icon">
                    <Icon size={28} />
                  </div>
                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Mission - Modern Design (Compact) */}
      <section className="section mission-section">
        <div className="container">
          <motion.div
            className="mission-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mission-content">
              <motion.div
                className="mission-text"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <div className="mission-header">
                  <span className="mission-badge">Our Mission</span>
                  <h2 className="mission-title">Empowering Every Step</h2>
                  <div className="mission-divider"></div>
                </div>
                
                <div className="mission-description">
                  <p>
                    Our mission is to empower individuals to express their unique style through 
                    premium footwear that doesn't compromise on comfort or quality. We believe 
                    that the right pair of shoes can transform not just your outfit, but your 
                    entire day.
                  </p>
                  <p>
                    Through sustainable practices, ethical sourcing, and innovative design, we're 
                    committed to creating a positive impact—one step at a time. Every product we 
                    create reflects our dedication to excellence and our respect for both our 
                    customers and our planet.
                  </p>
                </div>

                <div className="mission-features">
                  <div className="mission-feature-item">
                    <div className="feature-number">01</div>
                    <div className="feature-content">
                      <h4>Premium Quality</h4>
                      <p>Handcrafted excellence in every pair</p>
                    </div>
                  </div>
                  <div className="mission-feature-item">
                    <div className="feature-number">02</div>
                    <div className="feature-content">
                      <h4>Sustainable</h4>
                      <p>Eco-friendly materials & practices</p>
                    </div>
                  </div>
                  <div className="mission-feature-item">
                    <div className="feature-number">03</div>
                    <div className="feature-content">
                      <h4>Customer First</h4>
                      <p>Your satisfaction drives everything</p>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                className="mission-visual"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <div className="mission-image-wrapper">
                  <div className="mission-image-frame">
                    <img
                      src="https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&h=600&fit=crop&q=80"
                      alt="Our Mission"
                      loading="lazy"
                    />
                  </div>
                  <div className="mission-decoration"></div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="section about-cta">
        <div className="container">
          <motion.div
            className="cta-box"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>Ready to Walk in Style?</h2>
            <p>Discover our latest collection and find your perfect pair.</p>
            <Link to="/shop" className="btn btn-accent btn-lg">
              Shop Now
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default About
