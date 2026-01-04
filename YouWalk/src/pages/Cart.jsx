import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Truck, Check } from 'lucide-react'
import { motion } from 'framer-motion'
import { useCart } from '../contexts/CartContext'
import './Cart.css'

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart()
  const [promoCode, setPromoCode] = useState('')
  const [appliedPromo, setAppliedPromo] = useState(null)
  
  const promoCodes = {
    'WELCOME10': 0.1,
    'SAVE20': 0.2,
    'FREESHIP': 'freeship',
  }

  const handleApplyPromo = () => {
    const code = promoCode.toUpperCase().trim()
    if (promoCodes[code]) {
      setAppliedPromo({ code, discount: promoCodes[code] })
    } else {
      alert('Invalid promo code')
    }
  }

  const subtotal = getCartTotal()
  const shipping = subtotal > 100 ? 0 : 10
  const tax = subtotal * 0.08
  
  let discount = 0
  if (appliedPromo) {
    if (typeof appliedPromo.discount === 'number') {
      discount = subtotal * appliedPromo.discount
    } else if (appliedPromo.discount === 'freeship') {
      discount = shipping
    }
  }
  
  const total = subtotal + shipping + tax - discount

  return (
    <div className="cart-page">
      <div className="container">
        <div className="cart-header">
          <h1>Shopping Cart</h1>
          <p>{cartItems.length} items in your cart</p>
        </div>

        {cartItems.length > 0 ? (
          <div className="cart-layout">
            {/* Cart Items */}
            <div className="cart-items">
              {cartItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="cart-item"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="cart-item__image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="cart-item__details">
                    <h3>{item.name}</h3>
                    <p className="cart-item__meta">
                      Size: {item.size} • Color: {item.color}
                    </p>
                    <div className="cart-item__price">${item.price}</div>
                  </div>
                  <div className="cart-item__quantity">
                    <button 
                      className="qty-btn"
                      onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                    >
                      <Minus size={16} />
                    </button>
                    <span>{item.quantity}</span>
                    <button 
                      className="qty-btn"
                      onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <div className="cart-item__total">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                  <button 
                    className="cart-item__remove"
                    onClick={() => removeFromCart(item.id, item.size, item.color)}
                    aria-label="Remove item"
                  >
                    <Trash2 size={18} />
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Summary */}
            <div className="cart-summary">
              <div className="summary-card">
                <h2>Order Summary</h2>
                
                {/* Promo Code */}
                <div className="promo-code">
                  <Tag size={18} />
                  {appliedPromo ? (
                    <div className="promo-applied">
                      <Check size={16} />
                      <span>{appliedPromo.code}</span>
                      <button 
                        className="promo-remove"
                        onClick={() => {
                          setAppliedPromo(null)
                          setPromoCode('')
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <>
                      <input
                        type="text"
                        placeholder="Promo code"
                        className="form-input"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleApplyPromo()}
                      />
                      <button 
                        className="btn btn-secondary btn-sm"
                        onClick={handleApplyPromo}
                      >
                        Apply
                      </button>
                    </>
                  )}
                </div>

                <div className="summary-divider" />

                <div className="summary-rows">
                  <div className="summary-row">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="summary-row discount">
                      <span>Discount ({appliedPromo.code})</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="summary-row">
                    <span>Shipping</span>
                    <span className={shipping === 0 ? 'free' : ''}>
                      {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="summary-row">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                </div>

                <div className="summary-divider" />

                <div className="summary-row total">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <button 
                  className="btn btn-accent btn-lg checkout-btn"
                  onClick={() => {
                    if (cartItems.length === 0) {
                      alert('Your cart is empty!')
                    } else {
                      alert('Checkout functionality - In a real app, this would redirect to payment')
                    }
                  }}
                >
                  Proceed to Checkout
                  <ArrowRight size={18} />
                </button>
                
                <Link to="/shop" className="btn btn-ghost continue-btn">
                  Continue Shopping
                </Link>

                {/* Shipping Info */}
                <div className="shipping-info">
                  <Truck size={18} />
                  <span>Free shipping on orders over $100</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <motion.div
            className="empty-cart"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="empty-cart__icon">
              <ShoppingBag size={48} />
            </div>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added anything to your cart yet.</p>
            <Link to="/shop" className="btn btn-primary btn-lg">
              Start Shopping
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Cart
