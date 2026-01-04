import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const useThemeStoreBase = create(
  persist(
    (set) => ({
      theme: 'light',
      toggleTheme: () => set((state) => {
        const newTheme = state.theme === 'light' ? 'dark' : 'light'
        if (typeof document !== 'undefined') {
          document.documentElement.setAttribute('data-theme', newTheme)
        }
        return { theme: newTheme }
      }),
      setTheme: (theme) => {
        if (typeof document !== 'undefined') {
          document.documentElement.setAttribute('data-theme', theme)
        }
        set({ theme })
      },
    }),
    {
      name: 'stiply-theme',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

// Initialize theme on store creation
if (typeof document !== 'undefined') {
  const stored = localStorage.getItem('stiply-theme')
  if (stored) {
    try {
      const parsed = JSON.parse(stored)
      const theme = parsed?.state?.theme || 'light'
      document.documentElement.setAttribute('data-theme', theme)
    } catch {
      document.documentElement.setAttribute('data-theme', 'light')
    }
  } else {
    document.documentElement.setAttribute('data-theme', 'light')
  }
}

export const useThemeStore = useThemeStoreBase

