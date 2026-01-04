import {  createBrowserRouter } from "react-router-dom"
import { LoginLayout } from '../layouts/LoginLayout.jsx'
import { DefaultLayout } from '../layouts/DefaultLayout.jsx'
import { Login } from '../pages/Login.jsx'
import { Home } from '../pages/Home.jsx'
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
        element: <LoginLayout />,
        children: [
            {
                path: "login",
                element: <Login />,
            },
        ],
    },
    {
        element: <DefaultLayout />,
        children: [
            {
                path: "home",
                element: <Home />,
            },
        ],
    },
]);

export default router
