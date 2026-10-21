import { Highlight, themes } from 'prism-react-renderer'

import { useTheme } from '../../hooks/useTheme'
import { cn } from '../../lib/utils'

/**
 * Syntax-highlighted code block with line numbers.
 */
export function CodeBlock({
  code,
  language = 'java',
  showLineNumbers = true,
  className,
  maxHeight,
}: {
  code: string
  language?: string
  showLineNumbers?: boolean
  className?: string
  maxHeight?: number
}) {
  const { theme } = useTheme()
  const prismTheme = theme === 'dark' ? themes.vsDark : themes.oneLight

  return (
    <div
      className={cn('overflow-hidden rounded-lg border border-line', className)}
      style={maxHeight ? { maxHeight, overflowY: 'auto' } : undefined}
    >
      <Highlight code={code} language={language} theme={prismTheme}>
        {({ className: preClass, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={cn(preClass, 'overflow-x-auto text-[13px] leading-relaxed')}
            style={{ ...style, margin: 0, padding: '0.9rem 1rem' }}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })} className="table-row">
                {showLineNumbers && (
                  <span
                    className="table-cell select-none pr-4 text-right opacity-40"
                    style={{ minWidth: '2.25rem' }}
                  >
                    {i + 1}
                  </span>
                )}
                <span className="table-cell">
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </span>
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  )
}
