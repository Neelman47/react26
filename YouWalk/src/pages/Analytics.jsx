import { Link } from 'react-router-dom'
import { 
  TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, 
  Calendar, Download, Filter, RefreshCw, Globe, 
  Smartphone, Monitor, Tablet, Users, Clock, MousePointer,
  BarChart3, PieChart, Activity, Target, Eye, ShoppingCart
} from 'lucide-react'
import { motion } from 'framer-motion'
import { salesData } from '../data/products'
import './Analytics.css'

const Analytics = () => {
  const trafficSources = [
    { name: 'Organic Search', value: 45, color: '#10b981' },
    { name: 'Direct', value: 25, color: '#3b82f6' },
    { name: 'Social Media', value: 18, color: '#8b5cf6' },
    { name: 'Referral', value: 12, color: '#f59e0b' },
  ]

  const deviceStats = [
    { name: 'Desktop', value: 58, icon: Monitor },
    { name: 'Mobile', value: 35, icon: Smartphone },
    { name: 'Tablet', value: 7, icon: Tablet },
  ]

  const pageViews = [
    { page: '/shop', views: 12450, bounce: 32 },
    { page: '/', views: 8920, bounce: 28 },
    { page: '/product/1', views: 6780, bounce: 45 },
    { page: '/cart', views: 3240, bounce: 52 },
    { page: '/checkout', views: 1890, bounce: 15 },
  ]

  const metrics = [
    { label: 'Page Views', value: '45.2K', change: 12.5, icon: Eye },
    { label: 'Unique Visitors', value: '12.8K', change: 8.3, icon: Users },
    { label: 'Avg. Session', value: '4m 32s', change: -2.1, icon: Clock },
    { label: 'Bounce Rate', value: '38.2%', change: -5.4, icon: MousePointer },
  ]

  return (
    <div className="analytics-page">
      <div className="container">
        {/* Header */}
        <div className="analytics-header">
          <div className="analytics-header__text">
            <h1>Analytics</h1>
            <p>Track your store's performance and visitor insights</p>
          </div>
          <div className="analytics-header__actions">
            <div className="date-picker">
              <Calendar size={18} />
              <span>Last 30 days</span>
            </div>
            <button className="btn btn-secondary btn-sm">
              <Filter size={16} />
              Filter
            </button>
            <button className="btn btn-secondary btn-sm">
              <Download size={16} />
              Export
            </button>
            <button className="btn btn-ghost btn-icon btn-sm">
              <RefreshCw size={18} />
            </button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="metrics-grid">
          {metrics.map((metric, index) => {
            const Icon = metric.icon
            const isPositive = metric.change >= 0
            return (
              <motion.div
                key={metric.label}
                className="metric-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="metric-card__icon">
                  <Icon size={20} />
                </div>
                <div className="metric-card__content">
                  <span className="metric-card__label">{metric.label}</span>
                  <div className="metric-card__value">{metric.value}</div>
                  <div className={`metric-card__change ${isPositive ? 'positive' : 'negative'}`}>
                    {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                    {Math.abs(metric.change)}%
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        <div className="analytics-grid">
          {/* Traffic Chart */}
          <motion.div
            className="analytics-card traffic-chart"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="card-header">
              <div>
                <h2 className="card-title">
                  <Activity size={20} />
                  Traffic Overview
                </h2>
                <p className="card-subtitle">Visitor trends over time</p>
              </div>
            </div>
            <div className="line-chart">
              <div className="line-chart__grid">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="grid-line" />
                ))}
              </div>
              <svg className="line-chart__svg" viewBox="0 0 800 200" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <motion.path
                  d="M0,150 C50,140 100,100 150,110 C200,120 250,80 300,70 C350,60 400,90 450,60 C500,30 550,50 600,40 C650,30 700,60 750,30 L800,20 L800,200 L0,200 Z"
                  fill="url(#gradient)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                />
                <motion.path
                  d="M0,150 C50,140 100,100 150,110 C200,120 250,80 300,70 C350,60 400,90 450,60 C500,30 550,50 600,40 C650,30 700,60 750,30 L800,20"
                  fill="none"
                  stroke="var(--color-accent)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5 }}
                />
              </svg>
              <div className="line-chart__labels">
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m) => (
                  <span key={m}>{m}</span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Traffic Sources */}
          <motion.div
            className="analytics-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="card-header">
              <div>
                <h2 className="card-title">
                  <PieChart size={20} />
                  Traffic Sources
                </h2>
                <p className="card-subtitle">Where your visitors come from</p>
              </div>
            </div>
            <div className="traffic-sources">
              <div className="donut-chart">
                <svg viewBox="0 0 100 100">
                  {trafficSources.map((source, index) => {
                    const offset = trafficSources.slice(0, index).reduce((acc, s) => acc + s.value, 0)
                    return (
                      <motion.circle
                        key={source.name}
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke={source.color}
                        strokeWidth="20"
                        strokeDasharray={`${source.value * 2.51} 251`}
                        strokeDashoffset={-offset * 2.51}
                        transform="rotate(-90 50 50)"
                        initial={{ strokeDasharray: '0 251' }}
                        animate={{ strokeDasharray: `${source.value * 2.51} 251` }}
                        transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                      />
                    )
                  })}
                </svg>
                <div className="donut-center">
                  <span className="donut-value">100%</span>
                  <span className="donut-label">Total</span>
                </div>
              </div>
              <div className="sources-legend">
                {trafficSources.map((source) => (
                  <div key={source.name} className="legend-item">
                    <span className="legend-dot" style={{ background: source.color }} />
                    <span className="legend-name">{source.name}</span>
                    <span className="legend-value">{source.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Devices */}
          <motion.div
            className="analytics-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="card-header">
              <div>
                <h2 className="card-title">
                  <Globe size={20} />
                  Device Breakdown
                </h2>
                <p className="card-subtitle">Visitors by device type</p>
              </div>
            </div>
            <div className="device-stats">
              {deviceStats.map((device) => {
                const Icon = device.icon
                return (
                  <div key={device.name} className="device-item">
                    <div className="device-icon">
                      <Icon size={24} />
                    </div>
                    <div className="device-info">
                      <span className="device-name">{device.name}</span>
                      <div className="device-bar">
                        <motion.div
                          className="device-bar-fill"
                          initial={{ width: 0 }}
                          animate={{ width: `${device.value}%` }}
                          transition={{ delay: 0.6, duration: 0.8 }}
                        />
                      </div>
                    </div>
                    <span className="device-value">{device.value}%</span>
                  </div>
                )
              })}
            </div>
          </motion.div>

          {/* Top Pages */}
          <motion.div
            className="analytics-card pages-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="card-header">
              <div>
                <h2 className="card-title">
                  <BarChart3 size={20} />
                  Top Pages
                </h2>
                <p className="card-subtitle">Most visited pages</p>
              </div>
            </div>
            <div className="pages-table">
              <div className="pages-table__header">
                <span>Page</span>
                <span>Views</span>
                <span>Bounce Rate</span>
              </div>
              {pageViews.map((page, index) => (
                <motion.div
                  key={page.page}
                  className="pages-table__row"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <span className="page-name">{page.page}</span>
                  <span className="page-views">{page.views.toLocaleString()}</span>
                  <span className={`page-bounce ${page.bounce > 40 ? 'high' : ''}`}>
                    {page.bounce}%
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Analytics
