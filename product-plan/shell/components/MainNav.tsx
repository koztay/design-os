import React from 'react'
import { Map, MessageSquarePlus, Database, Settings } from 'lucide-react'
import type { NavigationItem } from './AppShell'

export interface MainNavProps {
  navigationItems: NavigationItem[]
  onNavigate?: (href: string) => void
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  map: Map,
  report: MessageSquarePlus,
  data: Database,
  settings: Settings,
}

export function MainNav({ navigationItems, onNavigate }: MainNavProps) {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 z-50"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="flex items-center justify-around max-w-screen-xl mx-auto px-2 py-2">
        {navigationItems.map((item) => {
          const Icon = item.icon ? (iconMap[item.icon.toLowerCase()] || Map) : Map
          const isActive = item.isActive

          return (
            <button
              key={item.href}
              onClick={() => onNavigate?.(item.href)}
              className={`
                flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-lg
                min-w-[72px] min-h-[64px] transition-colors duration-200
                ${
                  isActive
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950'
                    : 'text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }
              `}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon className="w-6 h-6" aria-hidden="true" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
