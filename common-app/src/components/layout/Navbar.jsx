import { NavLink, useLocation } from "react-router-dom"
import "./navbar.css"

export const Navbar = ({ config }) => {
  const location = useLocation()

  const isActivePath = (path) => {
    if (!path) return false
    return location.pathname === path || location.pathname.startsWith(path)
  }

  const renderMenu = (menu, index, level = 0) => {
    // Dropdown
    if (menu.children && menu.children.length) {
      const dropdownId = `dropdown-${menu.label}-${index}`

      return (
        <li key={index} className={`nav-item dropdown ${level > 0 ? "dropdown-submenu" : ""}`}>
          <a
            className={`nav-link dropdown-toggle ${isActivePath(menu.to) ? "active" : ""}`}
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {menu.label}
          </a>

          <ul className="dropdown-menu">
            {menu.children.map((child, i) => renderMenu(child, i, level + 1))}
          </ul>
        </li>
      )
    }

    // Normal link
    return (
      <li key={index} className="nav-item">
        <NavLink
          to={menu.to}
          className={({ isActive }) =>
            `nav-link ${isActive || isActivePath(menu.to) ? "active" : ""}`
          }
        >
          {menu.label}
        </NavLink>
      </li>
    )
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <NavLink className="navbar-brand" to={config.brand.to}>
          {config.brand.label}
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav ms-auto">
            {config.menus.map((menu, index) => renderMenu(menu, index))}
          </ul>
        </div>
      </div>
    </nav>
  )
}
