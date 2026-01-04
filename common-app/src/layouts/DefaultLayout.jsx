import { Outlet } from 'react-router-dom';
import { Navbar } from "../components/layout/Navbar"

export const DefaultLayout = () => {
    const navbarConfig = {
      brand: {
        label: "BitsBuilders",
        to: "/",
      },
      menus: [
        {
          label: "Home",
          to: "/",
        },
        {
          label: "Services",
          children: [
            {
              label: "Web Development",
              to: "/services/web",
            },
            {
              label: "Training",
              children: [
                {
                  label: "React Training",
                  to: "/services/training/react",
                },
                {
                  label: "Node Training",
                  to: "/services/training/node",
                },
              ],
            },
          ],
        },
        {
          label: "About",
          to: "/about",
        },
        {
          label: "Contact",
          to: "/contact",
        },
      ],
    }

  return (
    <div>
      <Navbar config={navbarConfig} />      
      <Outlet />
    </div>
  );
};

export default DefaultLayout
