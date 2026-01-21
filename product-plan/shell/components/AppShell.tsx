import React from 'react'
import { MainNav } from './MainNav'

export interface NavigationItem {
  label: string
  href: string
  icon?: string
  isActive?: boolean
}

export interface AppShellProps {
  children: React.ReactNode
  navigationItems: NavigationItem[]
  onNavigate?: (href: string) => void
}

export function AppShell({ children, navigationItems, onNavigate }: AppShellProps) {
  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-900 font-[Inter]">
      {/* Main Content Area */}
      <main className="pb-20 md:pb-24">
        {children}
      </main>

      {/* Bottom Navigation */}
      <MainNav
        navigationItems={navigationItems}
        onNavigate={onNavigate}
      />
    </div>
  )
}
