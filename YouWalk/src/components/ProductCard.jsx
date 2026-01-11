import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Heart, ShoppingBag, Eye, Star, TrendingUp, Award } from 'lucide-react'
import { motion } from 'framer-motion'
import { useCart } from '../contexts/CartContext'
import { useWishlist } from '../contexts/WishlistContext'
import './ProductCard.css'

const ProductCard = ({ product, index = 0 }) => {
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()
  const [isWishlisted, setIsWishlisted] = useState(isInWishlist(product.id))
  return (
    <motion.article
      className="product-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      {/* Image Container */}
      <div className="product-card__image-wrapper">
        <Link to={`/product/${product.id}`} className="product-card__image">
          <img src={product.image} alt={product.name} loading="lazy" />
          <div className="product-card__overlay" />
        </Link>
        
        {/* Status Badges */}
        <div className="product-card__badges">
          {product.isNew && (
            <span className="badge badge-new">
              <TrendingUp size={12} />
              New Arrival
            </span>
          )}
          {product.isSale && (
            <span className="badge badge-sale">
              -25% Off
            </span>
          )}
          {product.featured && (
            <span className="badge badge-featured">
              <Award size={12} />
              Featured
            </span>
          )}
        </div>
        
        {/* Quick Actions */}
        <div className="product-card__actions">
          <button 
            className="action-btn" 
            aria-label="Quick View" 
            title="Quick View"
            onClick={() => navigate(`/product/${product.id}`)}
          >
            <Eye size={18} strokeWidth={2} />
          </button>
          <button 
            className={`action-btn ${isWishlisted ? 'action-btn--active' : ''}`}
            aria-label={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'} 
            title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
            onClick={() => {
              toggleWishlist(product)
              setIsWishlisted(!isWishlisted)
            }}
          >
            <Heart size={18} strokeWidth={2} fill={isWishlisted ? 'currentColor' : 'none'} />
          </button>
          <button 
            className="action-btn action-btn--primary" 
            aria-label="Add to Cart" 
            title="Add to Cart"
            onClick={() => {
              addToCart(product, product.sizes[0], product.colors[0], 1)
            }}
          >
            <ShoppingBag size={18} strokeWidth={2} />
          </button>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="product-card__content">
        {/* Category Tag */}
        <div className="product-card__meta">
          <span className="category-tag">{product.category}</span>
          <span className="stock-status">In Stock</span>
        </div>
        
        {/* Product Name */}
        <Link to={`/product/${product.id}`} className="product-card__title-link">
          <h3 className="product-card__title">{product.name}</h3>
        </Link>
        
        {/* Product Description */}
        <p className="product-card__description">
          Premium quality footwear with modern design
        </p>
        
        {/* Rating & Reviews */}
        <div className="product-card__rating">
          <div className="rating-left">
            <div className="stars-container">
              {[...Array(5)].map((_, i) => {
                const rating = product.rating || 4.5
                const filled = i < Math.floor(rating)
                const halfFilled = i === Math.floor(rating) && rating % 1 >= 0.5
                return (
                  <Star
                    key={i}
                    size={14}
                    fill={filled || halfFilled ? '#fbbf24' : 'none'}
                    strokeWidth={filled || halfFilled ? 0 : 2}
                    className={filled || halfFilled ? 'star-filled' : 'star-empty'}
                  />
                )
              })}
            </div>
            <span className="rating-value">{product.rating?.toFixed(1) || '4.5'}</span>
          </div>
          <span className="rating-reviews">({product.reviews || 0} reviews)</span>
        </div>
        
        {/* Price & Action */}
        <div className="product-card__footer">
          <div className="product-card__pricing">
            <div className="price-wrapper">
              {product.originalPrice && (
                <span className="price-original">${product.originalPrice}</span>
              )}
              <div className="price-main-group">
                <span className="price-current">${product.price}</span>
                {product.originalPrice && (
                  <span className="price-save">Save ${product.originalPrice - product.price}</span>
                )}
              </div>
            </div>
          </div>
          
          <Link to={`/product/${product.id}`} className="btn-view-details">
            View Details
          </Link>
        </div>
      </div>
    </motion.article>
  )
}

export default ProductCard
