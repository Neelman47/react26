import {  createBrowserRouter } from "react-router-dom"
import { Layout } from '../layouts/Layout.jsx'
import { Login } from '../pages/Login.jsx'
import { NotFound } from '../pages/404/NotFound.jsx'

const router = createBrowserRouter([
    {
      path: "*",
      element: <NotFound />,
    },
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

export default router
