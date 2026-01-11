import { createBrowserRouter } from 'react-router-dom'
import Layout from './layouts/Layout'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductDetail from './pages/ProductDetail'
import About from './pages/About'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import Dashboard from './pages/Dashboard'
import Analytics from './pages/Analytics'
import NotFound from './pages/NotFound'
import { products, getProductById } from './data/products'

// Loaders
const homeLoader = async () => {
  return { products: products.slice(0, 4) }
}

const shopLoader = async ({ request }) => {
  const url = new URL(request.url)
  const category = url.searchParams.get('category') || 'all'
  const search = url.searchParams.get('search') || ''
  const filter = url.searchParams.get('filter') || ''
  
  return { category, search, filter, products }
}

const productLoader = async ({ params }) => {
  const product = getProductById(params.id)
  if (!product) {
    throw new Response('Product not found', { status: 404 })
  }
  return { product }
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: homeLoader,
      },
      {
        path: 'shop',
        element: <Shop />,
        loader: shopLoader,
      },
      {
        path: 'product/:id',
        element: <ProductDetail />,
        loader: productLoader,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'analytics',
        element: <Analytics />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
])

