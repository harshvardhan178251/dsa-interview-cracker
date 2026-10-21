import { useCallback, useState } from 'react'

import { Button } from './Button'

export function CopyButton({
  text,
  label = 'Copy',
  className,
}: {
  text: string
  label?: string
  className?: string
}) {
  const [copied, setCopied] = useState(false)

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      // Clipboard API unavailable (insecure context) — fall back to a textarea.
      const area = document.createElement('textarea')
      area.value = text
      area.style.position = 'fixed'
      area.style.opacity = '0'
      document.body.appendChild(area)
      area.select()
      try {
        document.execCommand('copy')
      } catch {
        /* nothing else we can do */
      }
      document.body.removeChild(area)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1600)
  }, [text])

  return (
    <Button size="sm" variant="ghost" onClick={copy} className={className} title="Copy to clipboard">
      {copied ? (
        <span className="text-ok">Copied ✓</span>
      ) : (
        <span className="flex items-center gap-1.5">
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="9" y="9" width="12" height="12" rx="2" />
            <path d="M5 15V5a2 2 0 0 1 2-2h10" />
          </svg>
          {label}
        </span>
      )}
    </Button>
  )
}
