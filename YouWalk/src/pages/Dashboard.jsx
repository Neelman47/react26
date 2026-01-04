import { Link } from 'react-router-dom'
import { 
  TrendingUp, TrendingDown, DollarSign, ShoppingBag, Users, Target,
  ArrowUpRight, ArrowDownRight, MoreHorizontal, Package, Eye, Clock,
  ChevronRight, BarChart3, Activity, Zap
} from 'lucide-react'
import { motion } from 'framer-motion'
import { dashboardStats, recentOrders, topProducts, salesData } from '../data/products'
import './Dashboard.css'

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Revenue',
      value: `$${dashboardStats.totalRevenue.toLocaleString()}`,
      change: dashboardStats.revenueGrowth,
      icon: DollarSign,
      color: 'green',
    },
    {
      title: 'Total Orders',
      value: dashboardStats.totalOrders.toLocaleString(),
      change: dashboardStats.ordersGrowth,
      icon: ShoppingBag,
      color: 'blue',
    },
    {
      title: 'Total Customers',
      value: dashboardStats.totalCustomers.toLocaleString(),
      change: dashboardStats.customersGrowth,
      icon: Users,
      color: 'purple',
    },
    {
      title: 'Conversion Rate',
      value: `${dashboardStats.conversionRate}%`,
      change: dashboardStats.conversionGrowth,
      icon: Target,
      color: 'orange',
    },
  ]

  const getStatusColor = (status) => {
    const colors = {
      completed: 'success',
      processing: 'warning',
      pending: 'warning',
      shipped: 'info',
    }
    return colors[status] || 'default'
  }

  return (
    <div className="dashboard-page">
      <div className="container">
        {/* Header */}
        <div className="dashboard-header">
          <div className="dashboard-header__text">
            <h1>Dashboard</h1>
            <p>Welcome back! Here's what's happening with your store.</p>
          </div>
          <div className="dashboard-header__actions">
            <Link to="/analytics" className="btn btn-secondary">
              <BarChart3 size={18} />
              View Analytics
            </Link>
            <button className="btn btn-primary">
              <Zap size={18} />
              Quick Actions
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            const isPositive = stat.change >= 0
            return (
              <motion.div
                key={stat.title}
                className="stat-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="stat-card__header">
                  <div className={`stat-card__icon stat-card__icon--${stat.color}`}>
                    <Icon size={20} />
                  </div>
                  <button className="stat-card__more">
                    <MoreHorizontal size={18} />
                  </button>
                </div>
                <div className="stat-card__content">
                  <h3 className="stat-card__title">{stat.title}</h3>
                  <div className="stat-card__value">{stat.value}</div>
                  <div className={`stat-card__change ${isPositive ? 'positive' : 'negative'}`}>
                    {isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                    <span>{Math.abs(stat.change)}%</span>
                    <span className="stat-card__period">vs last month</span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        <div className="dashboard-grid">
          {/* Sales Chart */}
          <motion.div
            className="dashboard-card chart-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="card-header">
              <div>
                <h2 className="card-title">Sales Overview</h2>
                <p className="card-subtitle">Monthly revenue for 2024</p>
              </div>
              <div className="card-actions">
                <select className="form-input form-input-sm">
                  <option>This Year</option>
                  <option>Last Year</option>
                </select>
              </div>
            </div>
            <div className="chart-container">
              <div className="chart-bars">
                {salesData.map((data, index) => (
                  <div key={data.month} className="chart-bar-wrapper">
                    <motion.div
                      className="chart-bar"
                      initial={{ height: 0 }}
                      animate={{ height: `${(data.sales / 45000) * 100}%` }}
                      transition={{ delay: 0.3 + index * 0.05, duration: 0.5 }}
                    />
                    <span className="chart-label">{data.month}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Top Products */}
          <motion.div
            className="dashboard-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="card-header">
              <div>
                <h2 className="card-title">Top Products</h2>
                <p className="card-subtitle">Best selling items</p>
              </div>
              <Link to="/shop" className="btn btn-ghost btn-sm">
                View All
                <ChevronRight size={16} />
              </Link>
            </div>
            <div className="top-products-list">
              {topProducts.map((product, index) => (
                <div key={product.name} className="top-product-item">
                  <div className="top-product__rank">#{index + 1}</div>
                  <div className="top-product__info">
                    <h4>{product.name}</h4>
                    <span>{product.sales} sales</span>
                  </div>
                  <div className="top-product__revenue">
                    ${product.revenue.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Recent Orders */}
        <motion.div
          className="dashboard-card orders-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="card-header">
            <div>
              <h2 className="card-title">Recent Orders</h2>
              <p className="card-subtitle">Latest transactions</p>
            </div>
            <Link to="/orders" className="btn btn-ghost btn-sm">
              View All
              <ChevronRight size={16} />
            </Link>
          </div>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="order-id">{order.id}</td>
                    <td>
                      <div className="customer-info">
                        <div className="avatar avatar-sm">
                          {order.customer.charAt(0)}
                        </div>
                        <div>
                          <div className="customer-name">{order.customer}</div>
                          <div className="customer-email">{order.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="order-date">{order.date}</td>
                    <td className="order-amount">${order.amount}</td>
                    <td>
                      <span className={`status-badge status-badge--${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-ghost btn-icon btn-sm">
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Dashboard
