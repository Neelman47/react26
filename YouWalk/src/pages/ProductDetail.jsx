import { useState, useEffect } from 'react'
import { useLoaderData, Link } from 'react-router-dom'
import { ShoppingBag, Heart, Share2, Minus, Plus, Check, Star, Truck, Shield, RefreshCw, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { products } from '../data/products'
import { useCart } from '../contexts/CartContext'
import { useWishlist } from '../contexts/WishlistContext'
import ProductCard from '../components/ProductCard'
import './ProductDetail.css'

const ProductDetail = () => {
  const { product } = useLoaderData()
  const { addToCart } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('description')
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0] || '')
      setSelectedColor(product.colors[0] || '')
      setIsWishlisted(isInWishlist(product.id))
    }
  }, [product, isInWishlist])

  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Product not found</h2>
        <Link to="/shop" className="btn btn-primary">Back to Shop</Link>
      </div>
    )
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  return (
    <div className="product-detail-page">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/">Home</Link>
          <ChevronRight size={14} />
          <Link to="/shop">Shop</Link>
          <ChevronRight size={14} />
          <span>{product.name}</span>
        </nav>

        <div className="product-detail">
          {/* Gallery */}
          <motion.div
            className="product-gallery"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="gallery-main">
              <img src={product.image} alt={product.name} />
              {product.isNew && <span className="badge badge-primary">New</span>}
              {product.isSale && <span className="badge badge-accent">Sale</span>}
            </div>
            <div className="gallery-thumbs">
              {[1, 2, 3, 4].map((_, i) => (
                <button key={i} className={`thumb ${i === 0 ? 'active' : ''}`}>
                  <img src={product.image} alt="" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            className="product-info"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="product-category">{product.category}</div>
            <h1 className="product-title">{product.name}</h1>

            {/* Rating */}
            <div className="product-rating">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill={i < 4 ? 'currentColor' : 'none'} />
                ))}
              </div>
              <span className="rating-text">4.8 ({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="product-price">
              {product.originalPrice && (
                <span className="price-original">${product.originalPrice}</span>
              )}
              <span className="price-current">${product.price}</span>
              {product.originalPrice && (
                <span className="price-save">
                  Save ${product.originalPrice - product.price}
                </span>
              )}
            </div>

            <p className="product-description">{product.description}</p>

            {/* Size */}
            <div className="option-group">
              <label className="option-label">Size</label>
              <div className="size-options">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color */}
            <div className="option-group">
              <label className="option-label">
                Color: <span>{selectedColor}</span>
              </label>
              <div className="color-options">
                {product.colors.map((color) => {
                  const colorMap = {
                    'Black': '#283618',
                    'White': '#fefae0',
                    'Brown': '#bc6c25',
                    'Tan': '#dda15e',
                    'Olive': '#606c38',
                    'Navy': '#1a237e',
                    'Gray': '#737373',
                    'Beige': '#d4c5a9',
                    'Red': '#d32f2f',
                    'Nude': '#f5deb3',
                    'Blue': '#1976d2',
                    'Pink': '#e91e63',
                    'Burgundy': '#6a1b9a',
                  }
                  return (
                    <button
                      key={color}
                      className={`color-option ${selectedColor === color ? 'selected' : ''}`}
                      style={{ backgroundColor: colorMap[color] || color.toLowerCase() }}
                      onClick={() => setSelectedColor(color)}
                      title={color}
                    >
                      {selectedColor === color && <Check size={14} />}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Quantity & Actions */}
            <div className="product-actions">
              <div className="quantity-selector">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  <Minus size={18} />
                </button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>
                  <Plus size={18} />
                </button>
              </div>
              <button 
                className={`btn btn-accent btn-lg flex-1 ${addedToCart ? 'btn-success' : ''}`}
                onClick={() => {
                  if (!selectedSize || !selectedColor) {
                    alert('Please select size and color')
                    return
                  }
                  addToCart(product, selectedSize, selectedColor, quantity)
                  setAddedToCart(true)
                  setTimeout(() => setAddedToCart(false), 2000)
                }}
              >
                <ShoppingBag size={20} />
                {addedToCart ? 'Added to Cart!' : 'Add to Cart'}
              </button>
              <button 
                className={`btn btn-secondary btn-icon ${isWishlisted ? 'btn-wishlisted' : ''}`}
                onClick={() => {
                  toggleWishlist(product)
                  setIsWishlisted(!isWishlisted)
                }}
                title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
              >
                <Heart size={20} fill={isWishlisted ? 'currentColor' : 'none'} />
              </button>
              <button 
                className="btn btn-secondary btn-icon"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: product.name,
                      text: product.description,
                      url: window.location.href,
                    })
                  } else {
                    navigator.clipboard.writeText(window.location.href)
                    alert('Link copied to clipboard!')
                  }
                }}
                title="Share"
              >
                <Share2 size={20} />
              </button>
            </div>

            {/* Features */}
            <div className="product-features">
              <div className="feature">
                <Truck size={20} />
                <span>Free shipping over $100</span>
              </div>
              <div className="feature">
                <RefreshCw size={20} />
                <span>30-day returns</span>
              </div>
              <div className="feature">
                <Shield size={20} />
                <span>2-year warranty</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="product-tabs">
          <div className="tabs-nav">
            {['description', 'reviews', 'shipping'].map((tab) => (
              <button
                key={tab}
                className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          <div className="tabs-content">
            {activeTab === 'description' && (
              <p>{product.description} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            )}
            {activeTab === 'reviews' && (
              <p>Customer reviews will be displayed here.</p>
            )}
            {activeTab === 'shipping' && (
              <p>Free standard shipping on orders over $100. Express shipping available.</p>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="related-products">
            <h2>You May Also Like</h2>
            <div className="products-grid grid grid-4">
              {relatedProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

export default ProductDetail
