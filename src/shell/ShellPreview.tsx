import { PublicShell } from './components/PublicShell'
import { AdminShell, defaultAdminNavItems } from './components/AdminShell'
import { useState } from 'react'

const publicNavItems = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Blog', href: '/blog' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
]

export default function ShellPreview() {
    const [currentShell, setCurrentShell] = useState<'public' | 'admin'>('public')
    const [currentPath, setCurrentPath] = useState('/')
    const [isDarkMode, setIsDarkMode] = useState(false)

    const handleNavigate = (href: string) => {
        setCurrentPath(href)
        console.log('Navigate to:', href)
    }

    return (
        <div className={isDarkMode ? 'dark' : ''}>
            {/* Shell Toggle */}
            <div className="fixed bottom-4 right-4 z-[100] flex gap-2">
                <button
                    onClick={() => setCurrentShell('public')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${currentShell === 'public'
                            ? 'bg-indigo-600 text-white'
                            : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                        }`}
                >
                    Public
                </button>
                <button
                    onClick={() => setCurrentShell('admin')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${currentShell === 'admin'
                            ? 'bg-indigo-600 text-white'
                            : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                        }`}
                >
                    Admin
                </button>
            </div>

            {currentShell === 'public' ? (
                <PublicShell
                    navigationItems={publicNavItems}
                    currentPath={currentPath}
                    isDarkMode={isDarkMode}
                    onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
                    onNavigate={handleNavigate}
                >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
                            Public Shell Preview
                        </h1>
                        <p className="text-lg text-slate-600 dark:text-slate-400">
                            This is the public-facing navigation shell. Section content will render here.
                        </p>
                        <p className="mt-4 text-slate-500 dark:text-slate-500">
                            Current path: <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">{currentPath}</code>
                        </p>
                    </div>
                </PublicShell>
            ) : (
                <AdminShell
                    navigationItems={defaultAdminNavItems}
                    currentPath={currentPath}
                    user={{ name: 'Admin User', email: 'admin@aegontech.com' }}
                    onNavigate={handleNavigate}
                    onLogout={() => console.log('Logout')}
                >
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-sm">
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                            Admin Shell Preview
                        </h1>
                        <p className="text-slate-600 dark:text-slate-400">
                            This is the admin panel shell. Management content will render here.
                        </p>
                        <p className="mt-4 text-slate-500 dark:text-slate-500">
                            Current path: <code className="bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">{currentPath}</code>
                        </p>
                    </div>
                </AdminShell>
            )}
        </div>
    )
}
