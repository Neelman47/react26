import { useState, useEffect, useMemo } from 'react'
import { useLoaderData, useSearchParams, useNavigate, Link } from 'react-router-dom'
import { Grid3X3, List, SlidersHorizontal, X, Search } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import ProductCard from '../components/ProductCard'
import { products, categories, getProductsByCategory } from '../data/products'
import { useWishlist } from '../contexts/WishlistContext'
import './Shop.css'

const Shop = () => {
  const loaderData = useLoaderData()
  const allProducts = loaderData?.products || products
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const { wishlist } = useWishlist()
  const categoryParam = loaderData?.category || searchParams.get('category') || searchParams.get('filter') || 'all'
  const searchQuery = loaderData?.search || searchParams.get('search') || ''
  const filterParam = loaderData?.filter || searchParams.get('filter') || ''
  
  const [selectedCategory, setSelectedCategory] = useState(categoryParam)
  const [viewMode, setViewMode] = useState('grid')
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [selectedSizes, setSelectedSizes] = useState([])
  const [selectedColors, setSelectedColors] = useState([])
  const [priceRange, setPriceRange] = useState({ min: '', max: '' })

  useEffect(() => {
    if (filterParam === 'wishlist') {
      setSelectedCategory('wishlist')
    } else if (categoryParam !== selectedCategory) {
      setSelectedCategory(categoryParam)
    }
  }, [categoryParam, filterParam, selectedCategory])

  const filteredProducts = useMemo(() => {
    let result = getProductsByCategory(selectedCategory === 'wishlist' ? 'all' : selectedCategory)
    
    // Filter by wishlist
    if (selectedCategory === 'wishlist') {
      result = result.filter(p => wishlist.some(w => w.id === p.id))
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      )
    }
    
    // Filter by sizes
    if (selectedSizes.length > 0) {
      result = result.filter(p => 
        selectedSizes.some(size => p.sizes.includes(size))
      )
    }
    
    // Filter by colors
    if (selectedColors.length > 0) {
      result = result.filter(p => 
        selectedColors.some(color => p.colors.includes(color))
      )
    }
    
    // Filter by price range
    if (priceRange.min) {
      result = result.filter(p => p.price >= parseFloat(priceRange.min))
    }
    if (priceRange.max) {
      result = result.filter(p => p.price <= parseFloat(priceRange.max))
    }
    
    // Apply filter params
    if (filterParam === 'new') {
      result = result.filter(p => p.isNew)
    } else if (filterParam === 'sale') {
      result = result.filter(p => p.isSale)
    } else if (filterParam === 'bestsellers') {
      result = result.sort((a, b) => (b.reviews || 0) - (a.reviews || 0))
    }
    
    return result
  }, [selectedCategory, searchQuery, selectedSizes, selectedColors, priceRange, filterParam, wishlist])

  const toggleSize = (size) => {
    setSelectedSizes(prev => 
      prev.includes(size) 
        ? prev.filter(s => s !== size)
        : [...prev, size]
    )
  }

  const toggleColor = (color) => {
    setSelectedColors(prev => 
      prev.includes(color) 
        ? prev.filter(c => c !== color)
        : [...prev, color]
    )
  }

  const clearFilters = () => {
    setSelectedSizes([])
    setSelectedColors([])
    setPriceRange({ min: '', max: '' })
    setSelectedCategory('all')
    navigate('/shop')
  }

  return (
    <div className="shop-page">
      {/* Page Header - Compact Modern */}
      <section className="shop-header">
        <div className="container">
          <div className="shop-header__content">
            <div className="shop-header__main">
              <span className="shop-header__badge">Premium Collection</span>
              <h1>Shop</h1>
              <p>Discover our complete collection of premium footwear</p>
            </div>
            <div className="shop-header__meta">
              <span className="shop-header__breadcrumb">
                Home / Shop {selectedCategory !== 'all' && `/ ${selectedCategory}`}
              </span>
              <span className="shop-header__count">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'}
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="shop-content">
        <div className="container">
          {/* Toolbar */}
          <div className="shop-toolbar">
            <div className="toolbar-left">
              <button
                className="btn btn-secondary btn-sm mobile-filter-btn"
                onClick={() => setShowMobileFilters(true)}
              >
                <SlidersHorizontal size={18} />
                Filters
              </button>
              {searchQuery && (
                <p className="results-text">
                  Results for "<strong>{searchQuery}</strong>"
                </p>
              )}
            </div>
            <div className="toolbar-right">
              <div className="category-tabs">
                {categories.slice(0, 5).map((cat) => (
                  <button
                    key={cat.id}
                    className={`category-tab ${selectedCategory === cat.id ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedCategory(cat.id)
                      navigate(`/shop?category=${cat.id}`)
                    }}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
              <div className="view-toggle">
                <button
                  className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3X3 size={18} />
                </button>
                <button
                  className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                >
                  <List size={18} />
                </button>
              </div>
            </div>
          </div>

          <div className="shop-layout">
            {/* Sidebar */}
            <aside className="shop-sidebar">
              {(selectedSizes.length > 0 || selectedColors.length > 0 || priceRange.min || priceRange.max || searchQuery) && (
                <div className="sidebar-section">
                  <button className="btn btn-secondary btn-sm" onClick={clearFilters} style={{ width: '100%' }}>
                    Clear All Filters
                  </button>
                </div>
              )}
              <div className="sidebar-section">
                <h3 className="sidebar-title">Categories</h3>
                <div className="category-list">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      className={`category-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                      onClick={() => {
                        setSelectedCategory(cat.id)
                        navigate(`/shop?category=${cat.id}`)
                      }}
                    >
                      <span>{cat.name}</span>
                      <span className="count">{cat.count}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="sidebar-section">
                <h3 className="sidebar-title">Price Range</h3>
                <div className="price-inputs">
                  <input 
                    type="number" 
                    placeholder="Min" 
                    className="form-input" 
                    min="0"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                  />
                  <span>TO</span>
                  <input 
                    type="number" 
                    placeholder="Max" 
                    className="form-input" 
                    min="0"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                  />
                </div>
                {(priceRange.min || priceRange.max) && (
                  <button 
                    className="btn btn-ghost btn-sm"
                    onClick={() => setPriceRange({ min: '', max: '' })}
                    style={{ marginTop: 'var(--space-3)' }}
                  >
                    Clear
                  </button>
                )}
              </div>

              <div className="sidebar-section">
                <h3 className="sidebar-title">Size</h3>
                <div className="size-grid">
                  {['6', '7', '8', '9', '10', '11', '12'].map((size) => (
                    <button
                      key={size}
                      className={`size-btn ${selectedSizes.includes(size) ? 'active' : ''}`}
                      onClick={() => toggleSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="sidebar-section">
                <h3 className="sidebar-title">Color</h3>
                <div className="color-grid">
                  {[
                    { name: 'Black', hex: '#283618' },
                    { name: 'White', hex: '#fefae0' },
                    { name: 'Brown', hex: '#bc6c25' },
                    { name: 'Tan', hex: '#dda15e' },
                    { name: 'Olive', hex: '#606c38' },
                    { name: 'Gray', hex: '#737373' },
                  ].map((color) => (
                    <button
                      key={color.name}
                      className={`color-btn ${selectedColors.includes(color.name) ? 'active' : ''}`}
                      style={{ backgroundColor: color.hex }}
                      onClick={() => toggleColor(color.name)}
                      title={color.name}
                      aria-label={color.name}
                    />
                  ))}
                </div>
              </div>
            </aside>

            {/* Products */}
            <main className="shop-main">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedCategory}
                  className={`products-grid ${viewMode === 'grid' ? 'grid grid-4' : 'list-view'}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product, index) => (
                      <ProductCard key={product.id} product={product} index={index} />
                    ))
                  ) : (
                    <motion.div
                      className="no-products"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="no-products__icon">
                        <Search size={64} strokeWidth={1.5} />
                      </div>
                      <h2 className="no-products__title">No Products Found</h2>
                      <p className="no-products__message">
                        {searchQuery 
                          ? `We couldn't find any products matching "${searchQuery}"`
                          : selectedCategory !== 'all'
                          ? `No products available in ${selectedCategory} category right now.`
                          : 'No products match your current filters.'}
                      </p>
                      <div className="no-products__actions">
                        <button 
                          className="btn btn-primary btn-lg"
                          onClick={clearFilters}
                        >
                          Clear Filters
                        </button>
                        <Link to="/shop" className="btn btn-secondary btn-lg">
                          Browse All Products
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
            </main>
          </div>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      <AnimatePresence>
        {showMobileFilters && (
          <motion.div
            className="mobile-filters-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowMobileFilters(false)}
          >
            <motion.div
              className="mobile-filters-panel"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mobile-filters-header">
                <h3>Filters</h3>
                <button onClick={() => setShowMobileFilters(false)}>
                  <X size={24} />
                </button>
              </div>
              {/* Filters content */}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Shop
