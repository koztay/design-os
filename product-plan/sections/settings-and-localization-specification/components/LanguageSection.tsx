import type { LanguageSettings, Language } from '../types'

interface LanguageSectionProps {
  settings: LanguageSettings
  onLanguageChange?: (language: Language) => void
}

export function LanguageSection({ settings, onLanguageChange }: LanguageSectionProps) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Language</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Choose your preferred language for the app interface
        </p>
      </div>

      <div className="flex gap-3">
        {settings.available.map((lang) => (
          <button
            key={lang.code}
            onClick={() => onLanguageChange?.(lang.code)}
            className={`flex-1 p-4 rounded-xl border-2 transition-all ${
              settings.current === lang.code
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
            }`}
          >
            <div className="text-center">
              <p className={`text-lg font-medium ${
                settings.current === lang.code
                  ? 'text-blue-700 dark:text-blue-400'
                  : 'text-slate-900 dark:text-slate-100'
              }`}>
                {lang.nativeLabel}
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                {lang.label}
              </p>
            </div>
            {settings.current === lang.code && (
              <div className="flex justify-center mt-2">
                <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>
    </section>
  )
}
