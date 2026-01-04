import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ShoppingBag, Menu, X, Search, Heart, LayoutDashboard, User, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../contexts/CartContext'
import { useWishlist } from '../contexts/WishlistContext'
import ThemeToggle from './ThemeToggle'
import './Header.css'

const Header = ({ isScrolled }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showUserMenu, setShowUserMenu] = useState(false)
  const userMenuRef = useRef(null)
  const { getCartCount } = useCart()
  const { wishlist } = useWishlist()
  const location = useLocation()
  const navigate = useNavigate()
  
  const cartCount = getCartCount()
  const wishlistCount = wishlist.length

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
    setShowUserMenu(false)
  }, [location])

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/shop', label: 'Shop' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ]

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location])

  return (
    <motion.header
      className={`header ${isScrolled ? 'header--scrolled' : ''}`}
      initial={false}
      animate={{
        backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 1)',
        backdropFilter: isScrolled ? 'blur(12px)' : 'blur(0px)',
      }}
    >
      {/* Announcement Bar */}
      <div className="announcement-bar">
        <p>Free shipping on orders over $100 • <Link to="/shop">Shop Now</Link></p>
      </div>

      <div className="header__container">
        {/* Logo */}
        <Link to="/" className="header__logo">
          <div className="logo-icon">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="8" fill="#283618"/>
              <path d="M8 22L12 10H16L12 22H8Z" fill="#fefae0"/>
              <path d="M14 22L18 10H22L18 22H14Z" fill="#dda15e"/>
              <circle cx="24" cy="12" r="3" fill="#bc6c25"/>
            </svg>
          </div>
          <span className="logo-text">Steply</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="header__nav">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${location.pathname === link.path ? 'nav-link--active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions - Optimized Layout */}
        <div className="header__actions">
          {/* Search - Always Visible Compact */}
          <div className="header-search-wrapper">
            <Search size={18} className="search-icon" />
            <input
              id="header-search-input"
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && searchQuery.trim()) {
                  navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`)
                  setSearchQuery('')
                }
              }}
              className="header-search-input-compact"
            />
          </div>

          {/* Primary Actions - Cart & Wishlist */}
          <div className="header__primary-actions">
            <Link to="/shop?filter=wishlist" className="action-btn wishlist-btn" aria-label="Wishlist">
              <Heart size={18} strokeWidth={2} />
              {wishlistCount > 0 && (
                <span className="cart-badge">{wishlistCount}</span>
              )}
            </Link>
            <Link to="/cart" className="action-btn cart-btn" aria-label="Cart">
              <ShoppingBag size={18} strokeWidth={2} />
              {cartCount > 0 && (
                <span className="cart-badge">{cartCount}</span>
              )}
            </Link>
          </div>

          {/* User Menu - Dropdown */}
          <div className="user-menu-wrapper" ref={userMenuRef}>
            <button
              className="user-menu-trigger"
              onClick={() => setShowUserMenu(!showUserMenu)}
              aria-label="User menu"
            >
              <User size={18} strokeWidth={2} />
              <ChevronDown size={14} className={`chevron ${showUserMenu ? 'open' : ''}`} />
            </button>
            <AnimatePresence>
              {showUserMenu && (
                <motion.div
                  className="user-menu-dropdown"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    to="/dashboard"
                    className="user-menu-item"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <LayoutDashboard size={16} />
                    <span>Dashboard</span>
                  </Link>
                  <div className="user-menu-divider" />
                  <div className="user-menu-item theme-toggle-item">
                    <span>Theme</span>
                    <ThemeToggle />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            className="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link, index) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  to={link.path}
                  className={`mobile-nav-link ${location.pathname === link.path ? 'mobile-nav-link--active' : ''}`}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <div className="mobile-nav-divider" />
            <Link to="/dashboard" className="mobile-nav-link">
              <LayoutDashboard size={18} /> Dashboard
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Header
