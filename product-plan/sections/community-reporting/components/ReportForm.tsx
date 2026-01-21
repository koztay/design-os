import { useState } from 'react'
import type {
  ReportFormProps,
  ReportType,
  Location,
  NewReportData,
} from '../types'
import { ReportTypeSelector } from './ReportTypeSelector'
import { LocationPicker } from './LocationPicker'
import { PhotoUpload } from './PhotoUpload'

// Design tokens: blue (primary), emerald (secondary), slate (neutral)
// Typography: Inter

type FormStep = 'type' | 'details' | 'photo' | 'location' | 'review'

const STEPS: { id: FormStep; label: string }[] = [
  { id: 'type', label: 'Type' },
  { id: 'details', label: 'Details' },
  { id: 'photo', label: 'Photo' },
  { id: 'location', label: 'Location' },
  { id: 'review', label: 'Review' },
]

const MAX_DESCRIPTION_LENGTH = 500

export function ReportForm({
  reportTypes,
  currentLocation,
  isOffline,
  onSubmit,
  onCancel,
  onRequestLocation,
  onCapturePhoto,
  onSelectPhoto,
}: ReportFormProps) {
  const [currentStep, setCurrentStep] = useState<FormStep>('type')
  const [selectedType, setSelectedType] = useState<ReportType | null>(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [photoUrl, setPhotoUrl] = useState<string | null>(null)
  const [location, setLocation] = useState<Location | null>(currentLocation)

  const currentStepIndex = STEPS.findIndex((s) => s.id === currentStep)

  const canProceed = () => {
    switch (currentStep) {
      case 'type':
        return selectedType !== null
      case 'details':
        return title.trim().length >= 5 && description.trim().length >= 10
      case 'photo':
        return true // Photo is optional
      case 'location':
        return location !== null
      case 'review':
        return true
      default:
        return false
    }
  }

  const handleNext = () => {
    const nextIndex = currentStepIndex + 1
    if (nextIndex < STEPS.length) {
      setCurrentStep(STEPS[nextIndex].id)
    }
  }

  const handleBack = () => {
    const prevIndex = currentStepIndex - 1
    if (prevIndex >= 0) {
      setCurrentStep(STEPS[prevIndex].id)
    } else {
      onCancel?.()
    }
  }

  const handleSubmit = () => {
    if (selectedType && location) {
      const reportData: NewReportData = {
        type: selectedType,
        title: title.trim(),
        description: description.trim(),
        location,
        photoUrl: photoUrl || undefined,
      }
      onSubmit?.(reportData)
    }
  }

  const getTypeLabel = (type: ReportType) => {
    return reportTypes.find((t) => t.id === type)?.label || type
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={handleBack}
              className="flex items-center gap-1 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
              <span>{currentStepIndex === 0 ? 'Cancel' : 'Back'}</span>
            </button>
            <h1 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              New Report
            </h1>
            <div className="w-16" /> {/* Spacer for centering */}
          </div>

          {/* Progress indicator */}
          <div className="flex items-center gap-1">
            {STEPS.map((step, index) => (
              <div key={step.id} className="flex-1 flex items-center">
                <div
                  className={`
                    h-1.5 flex-1 rounded-full transition-colors
                    ${index <= currentStepIndex ? 'bg-blue-600' : 'bg-slate-200 dark:bg-slate-700'}
                  `}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Step {currentStepIndex + 1} of {STEPS.length}
            </span>
            <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
              {STEPS[currentStepIndex].label}
            </span>
          </div>
        </div>
      </header>

      {/* Offline banner */}
      {isOffline && (
        <div className="bg-amber-50 dark:bg-amber-900/30 border-b border-amber-200 dark:border-amber-800 px-4 py-2">
          <p className="text-sm text-amber-800 dark:text-amber-200 text-center">
            You're offline. Report will be saved and synced later.
          </p>
        </div>
      )}

      {/* Form content */}
      <main className="flex-1 max-w-lg mx-auto w-full px-4 py-6">
        {/* Step: Type */}
        {currentStep === 'type' && (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                What are you reporting?
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                Select the type that best describes your report
              </p>
            </div>
            <ReportTypeSelector
              types={reportTypes}
              selectedType={selectedType}
              onSelect={setSelectedType}
            />
          </div>
        )}

        {/* Step: Details */}
        {currentStep === 'details' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                Describe the {selectedType === 'obstacle' ? 'obstacle' : selectedType === 'improvement' ? 'improvement' : 'fix'}
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                Help others understand what you found
              </p>
            </div>

            {/* Title */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
              >
                Title <span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Brief summary (e.g., 'Broken sidewalk near metro')"
                className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                maxLength={100}
              />
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 text-right">
                {title.length}/100
              </p>
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
              >
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Provide details about the issue, including any helpful context for other wheelchair users..."
                rows={5}
                className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow resize-none"
                maxLength={MAX_DESCRIPTION_LENGTH}
              />
              <p className={`mt-1 text-xs text-right ${description.length > MAX_DESCRIPTION_LENGTH * 0.9 ? 'text-amber-600 dark:text-amber-400' : 'text-slate-500 dark:text-slate-400'}`}>
                {description.length}/{MAX_DESCRIPTION_LENGTH}
              </p>
            </div>
          </div>
        )}

        {/* Step: Photo */}
        {currentStep === 'photo' && (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                Add a photo
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                Photos help verify your report and assist other users
              </p>
            </div>
            <PhotoUpload
              photoUrl={photoUrl}
              onCapturePhoto={() => {
                onCapturePhoto?.()
                // Simulate photo capture for demo
                setPhotoUrl('/photos/new-report.jpg')
              }}
              onSelectPhoto={() => {
                onSelectPhoto?.()
                // Simulate photo selection for demo
                setPhotoUrl('/photos/new-report.jpg')
              }}
              onRemovePhoto={() => setPhotoUrl(null)}
            />
          </div>
        )}

        {/* Step: Location */}
        {currentStep === 'location' && (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                Confirm the location
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                Make sure the pin is placed accurately
              </p>
            </div>
            <LocationPicker
              location={location}
              onRequestLocation={() => {
                onRequestLocation?.()
                // Use current location from props
                if (currentLocation) {
                  setLocation(currentLocation)
                }
              }}
              onUpdateLocation={setLocation}
            />
          </div>
        )}

        {/* Step: Review */}
        {currentStep === 'review' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                Review your report
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                Make sure everything looks correct before submitting
              </p>
            </div>

            {/* Summary card */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
              {/* Type badge */}
              <div className={`
                px-4 py-2 text-sm font-medium
                ${selectedType === 'obstacle' ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-200' : ''}
                ${selectedType === 'improvement' ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-200' : ''}
                ${selectedType === 'fixed-issue' ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200' : ''}
              `}>
                {selectedType && getTypeLabel(selectedType)}
              </div>

              <div className="p-4 space-y-4">
                {/* Title */}
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">
                    Title
                  </p>
                  <p className="font-medium text-slate-900 dark:text-slate-100">
                    {title || 'No title'}
                  </p>
                </div>

                {/* Description */}
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">
                    Description
                  </p>
                  <p className="text-slate-700 dark:text-slate-300 text-sm">
                    {description || 'No description'}
                  </p>
                </div>

                {/* Photo */}
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">
                    Photo
                  </p>
                  {photoUrl ? (
                    <div className="w-24 h-18 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                      <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                      </svg>
                    </div>
                  ) : (
                    <p className="text-sm text-slate-500 dark:text-slate-400 italic">
                      No photo attached
                    </p>
                  )}
                </div>

                {/* Location */}
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">
                    Location
                  </p>
                  {location ? (
                    <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                      <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{location.address || `${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}`}</span>
                    </div>
                  ) : (
                    <p className="text-sm text-slate-500 dark:text-slate-400 italic">
                      No location set
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Edit links */}
            <div className="flex flex-wrap gap-2">
              {STEPS.slice(0, -1).map((step) => (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(step.id)}
                  className="px-3 py-1.5 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                >
                  Edit {step.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer with action buttons */}
      <footer className="sticky bottom-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-4 py-4 safe-area-pb">
        <div className="max-w-lg mx-auto">
          {currentStep === 'review' ? (
            <button
              onClick={handleSubmit}
              disabled={!canProceed()}
              className={`
                w-full py-4 font-semibold rounded-xl transition-all
                ${canProceed()
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed'}
              `}
            >
              {isOffline ? 'Save Report (Sync Later)' : 'Submit Report'}
            </button>
          ) : (
            <div className="flex gap-3">
              {currentStep === 'photo' && (
                <button
                  onClick={handleNext}
                  className="flex-1 py-4 font-semibold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors"
                >
                  Skip
                </button>
              )}
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className={`
                  flex-1 py-4 font-semibold rounded-xl transition-all
                  ${canProceed()
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed'}
                `}
              >
                Continue
              </button>
            </div>
          )}
        </div>
      </footer>
    </div>
  )
}
