import { Moon, Sun } from 'lucide-react'
import { useThemeStore } from '../stores/themeStore'
import './ThemeToggle.css'

const ThemeToggle = () => {
  const { theme, toggleTheme } = useThemeStore()

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <Moon size={20} strokeWidth={2} />
      ) : (
        <Sun size={20} strokeWidth={2} />
      )}
    </button>
  )
}

export default ThemeToggle

