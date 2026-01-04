import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import { Layout } from './layouts/Layout.jsx'
import { Login } from './components/Login.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <h1>bits builder coming soon</h1>,
  },
  {
    element: <Layout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />
}

export default App
