import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, ShoppingBag, ArrowLeft, Search } from 'lucide-react'
import './NotFound.css'

const NotFound = () => {
  return (
    <div className="not-found-page">
      <div className="container">
        <motion.div
          className="not-found-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="not-found-visual">
            <motion.div
              className="error-code"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            >
              404
            </motion.div>
            <motion.div
              className="error-decoration"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: 'spring', stiffness: 150 }}
            />
          </div>

          <div className="not-found-text">
            <h1>Page Not Found</h1>
            <p>
              Oops! The page you're looking for seems to have walked away. 
              Don't worry, we'll help you find your way back.
            </p>
          </div>

          <div className="not-found-actions">
            <Link to="/" className="btn btn-primary btn-lg">
              <Home size={20} />
              Go Home
            </Link>
            <Link to="/shop" className="btn btn-secondary btn-lg">
              <ShoppingBag size={20} />
              Browse Shop
            </Link>
          </div>

          <div className="not-found-suggestions">
            <h3>You might be looking for:</h3>
            <div className="suggestions-grid">
              <Link to="/shop" className="suggestion-card">
                <ShoppingBag size={24} />
                <span>Shop</span>
              </Link>
              <Link to="/about" className="suggestion-card">
                <Search size={24} />
                <span>About Us</span>
              </Link>
              <Link to="/contact" className="suggestion-card">
                <Search size={24} />
                <span>Contact</span>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default NotFound

