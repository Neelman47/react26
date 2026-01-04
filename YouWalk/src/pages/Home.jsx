import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, TrendingUp, Award, Truck, Shield, RefreshCw } from 'lucide-react'
import { motion } from 'framer-motion'
import ProductCard from '../components/ProductCard'
import { products } from '../data/products'
import './Home.css'

const Home = () => {
  const featuredProducts = products.slice(0, 4)
  const newArrivals = products.filter(p => p.isNew).slice(0, 4)

  const features = [
    { icon: Truck, title: 'Free Shipping', description: 'On orders over $100' },
    { icon: Shield, title: 'Secure Payment', description: '100% protected' },
    { icon: RefreshCw, title: 'Easy Returns', description: '30-day returns' },
    { icon: Award, title: 'Top Quality', description: 'Premium materials' },
  ]

  const categories = [
    { 
      name: 'Sneakers', 
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop', 
      count: products.filter(p => p.category === 'Sneakers').length 
    },
    { 
      name: 'Heels', 
      image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&h=600&fit=crop', 
      count: products.filter(p => p.category === 'Heels').length 
    },
    { 
      name: 'Boots', 
      image: 'https://images.unsplash.com/photo-1605812860427-4024433a70fd?w=600&h=600&fit=crop', 
      count: products.filter(p => p.category === 'Boots').length 
    },
    { 
      name: 'Athletic', 
      image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=600&h=600&fit=crop', 
      count: products.filter(p => p.category === 'Athletic').length 
    },
  ]

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero__bg-pattern" />
        <div className="container">
          <div className="hero__grid">
            <motion.div
              className="hero__content"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="hero__badge"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Sparkles size={16} />
                New Collection 2024
              </motion.div>
              
              <h1 className="hero__title">
                Walk Your Way
                <span className="hero__title-accent">In Style</span>
              </h1>
              
              <p className="hero__description">
                Discover premium footwear designed for comfort, style, and the modern lifestyle. 
                Every step is a statement.
              </p>
              
              <div className="hero__actions">
                <Link to="/shop" className="btn btn-accent btn-lg">
                  Shop Now
                  <ArrowRight size={20} />
                </Link>
                <Link to="/about" className="btn btn-secondary btn-lg">
                  Learn More
                </Link>
              </div>
              
              <div className="hero__stats">
                <div className="stat">
                  <span className="stat__value">50K+</span>
                  <span className="stat__label">Happy Customers</span>
                </div>
                <div className="stat">
                  <span className="stat__value">4.9</span>
                  <span className="stat__label">Rating</span>
                </div>
                <div className="stat">
                  <span className="stat__value">200+</span>
                  <span className="stat__label">Styles</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              className="hero__image"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <div className="hero__image-wrapper">
                <img
                  src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&h=1200&fit=crop"
                  alt="Featured Sneaker"
                />
              </div>
              <div className="hero__floating-card">
                <TrendingUp size={20} />
                <div>
                  <span className="floating-card__title">Best Seller</span>
                  <span className="floating-card__value">+28% this week</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="features-bar">
        <div className="container">
          <div className="features-bar__grid">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  className="feature-item"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="feature-item__icon">
                    <Icon size={24} />
                  </div>
                  <div className="feature-item__text">
                    <h4>{feature.title}</h4>
                    <p>{feature.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="section categories-section">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">
              <Sparkles size={14} />
              Browse Collection
            </span>
            <h2 className="section-title">Shop by Category</h2>
            <p className="section-subtitle">
              Find your perfect pair from our diverse collection
            </p>
          </div>
          
          <div className="categories-grid">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                className="category-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <Link to={`/shop?category=${category.name.toLowerCase()}`}>
                  <div className="category-card__image">
                    <img src={category.image} alt={category.name} />
                  </div>
                  <div className="category-card__content">
                    <h3>{category.name}</h3>
                    <span>{category.count} Products</span>
                    <ArrowRight size={20} className="category-card__arrow" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section products-section">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">
              <Award size={14} />
              Curated Selection
            </span>
            <h2 className="section-title">Featured Products</h2>
            <p className="section-subtitle">
              Handpicked favorites loved by our customers
            </p>
          </div>
          
          <div className="products-grid grid grid-4">
            {featuredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
          
          <div className="section-footer">
            <Link to="/shop" className="btn btn-outline btn-lg">
              View All Products
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="section products-section products-section--alt">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">
              <TrendingUp size={14} />
              Just Dropped
            </span>
            <h2 className="section-title">New Arrivals</h2>
            <p className="section-subtitle">
              Fresh styles added to our collection
            </p>
          </div>
          
          <div className="products-grid grid grid-4">
            {newArrivals.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section cta-section">
        <div className="container">
          <motion.div
            className="cta-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="cta-card__content">
              <h2>Summer Sale</h2>
              <p>Up to 30% off on selected styles. Limited time offer.</p>
              <Link to="/shop?filter=sale" className="btn btn-primary btn-lg">
                Shop Sale
                <ArrowRight size={18} />
              </Link>
            </div>
            <div className="cta-card__image">
              <img
                src="https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&h=600&fit=crop"
                alt="Summer Sale"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home
