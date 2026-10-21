import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import { CodeBlock } from './CodeBlock'
import { rewriteDocLink } from '../../lib/docLinks'
import type { DocCategory } from '../../lib/docLinks'

/** Where the repository lives — used to turn `.java` links into working URLs. */
const REPO_URL = import.meta.env.VITE_REPO_URL ?? 'https://github.com/harshvardhan178251/dsa-interview-cracker'

/**
 * Renders the companion markdown of a problem (statement, input format, dry-run
 * tables, complexity and interview notes).
 */
export function MarkdownView({
  content,
  category = 'guide',
  sourceDir,
}: {
  content: string
  /** The category of the document, so its relative links resolve to site routes. */
  category?: DocCategory
  /** Where this document lives in the source tree, for resolving `.java` links. */
  sourceDir?: string
}) {
  if (!content.trim()) {
    return (
      <p className="text-sm text-faint">
        No written walkthrough for this problem yet — the source code and the runner are still
        available.
      </p>
    )
  }

  return (
    <div className="md">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          pre({ children }) {
            const child = Array.isArray(children) ? children[0] : children
            const props = (child as { props?: { className?: string; children?: unknown } })?.props
            const className = props?.className ?? ''
            const code = String(props?.children ?? '').replace(/\n$/, '')
            const match = /language-(\w+)/.exec(className)
            return <CodeBlock code={code} language={match?.[1] ?? 'text'} showLineNumbers={false} />
          },
          code({ children, className }) {
            return <code className={className}>{children}</code>
          },
          a({ href, children }) {
            const rewritten = href ? rewriteDocLink(href, category, REPO_URL, sourceDir) : null
            const target = rewritten ?? href
            const external = /^(https?:|mailto:)/i.test(target ?? '')
            return (
              <a
                href={target}
                {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
              >
                {children}
              </a>
            )
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
