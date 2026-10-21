import { useEffect, useRef } from 'react'

import { Compartment, EditorState } from '@codemirror/state'
import {
  EditorView,
  drawSelection,
  highlightActiveLine,
  highlightActiveLineGutter,
  keymap,
  lineNumbers,
  rectangularSelection,
} from '@codemirror/view'
import { defaultKeymap, history, historyKeymap, indentWithTab } from '@codemirror/commands'
import { java } from '@codemirror/lang-java'
import {
  bracketMatching,
  defaultHighlightStyle,
  indentOnInput,
  syntaxHighlighting,
} from '@codemirror/language'
import { closeBrackets, closeBracketsKeymap } from '@codemirror/autocomplete'
import { highlightSelectionMatches, searchKeymap } from '@codemirror/search'

/** Lets the read-only state be toggled without recreating the editor. */
const readOnlyCompartment = new Compartment()

/**
 * A CodeMirror theme built from the site's own CSS custom properties, so the
 * editor always matches the surrounding theme.
 */
const theme = EditorView.theme({
  '&': {
    color: 'var(--color-ink)',
    backgroundColor: 'var(--color-canvas)',
    fontSize: '13px',
  },
  '.cm-content': {
    fontFamily: 'var(--font-mono)',
    caretColor: 'var(--color-brand)',
    padding: '10px 0',
  },
  '.cm-cursor, .cm-dropCursor': { borderLeftColor: 'var(--color-brand)' },
  '&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection': {
    backgroundColor: 'color-mix(in oklab, var(--color-brand) 25%, transparent)',
  },
  '.cm-gutters': {
    backgroundColor: 'var(--color-canvas)',
    color: 'var(--color-faint)',
    border: 'none',
    borderRight: '1px solid var(--color-line)',
  },
  '.cm-activeLine': { backgroundColor: 'color-mix(in oklab, var(--color-ink) 4%, transparent)' },
  '.cm-activeLineGutter': { backgroundColor: 'transparent', color: 'var(--color-muted)' },
  '.cm-matchingBracket, &.cm-focused .cm-matchingBracket': {
    backgroundColor: 'color-mix(in oklab, var(--color-brand) 30%, transparent)',
    outline: '1px solid var(--color-brand)',
  },
  '.cm-selectionMatch': { backgroundColor: 'color-mix(in oklab, var(--color-warn) 25%, transparent)' },
  '.cm-panels': {
    backgroundColor: 'var(--color-surface)',
    color: 'var(--color-ink)',
    border: '1px solid var(--color-line)',
  },
  '.cm-searchMatch': { backgroundColor: 'color-mix(in oklab, var(--color-warn) 35%, transparent)' },
  '.cm-tooltip': {
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-line)',
    color: 'var(--color-ink)',
  },
  '.cm-tooltip-autocomplete > ul > li[aria-selected]': {
    backgroundColor: 'var(--color-brand-soft)',
    color: 'var(--color-brand)',
  },
})

export interface JavaEditorProps {
  value: string
  onChange?: (value: string) => void
  readOnly?: boolean
  minHeight?: number
  maxHeight?: number
  ariaLabel?: string
  /** Called when the user presses Ctrl/Cmd+Enter. */
  onSubmit?: () => void
}

/**
 * A Java code editor. It keeps its own CodeMirror state and only pushes
 * changes upwards, so typing stays smooth even in a large file.
 */
export function JavaEditor({
  value,
  onChange,
  readOnly = false,
  minHeight = 260,
  maxHeight = 560,
  ariaLabel = 'Java code editor',
  onSubmit,
}: JavaEditorProps) {
  const hostRef = useRef<HTMLDivElement>(null)
  const viewRef = useRef<EditorView | null>(null)
  const onChangeRef = useRef(onChange)
  const onSubmitRef = useRef(onSubmit)

  onChangeRef.current = onChange
  onSubmitRef.current = onSubmit

  // Create the editor once.
  useEffect(() => {
    if (!hostRef.current) return

    const submitKeymap = [
      {
        key: 'Mod-Enter',
        run: () => {
          onSubmitRef.current?.()
          return true
        },
      },
    ]

    const state = EditorState.create({
      doc: value,
      extensions: [
        lineNumbers(),
        highlightActiveLineGutter(),
        highlightActiveLine(),
        drawSelection(),
        rectangularSelection(),
        history(),
        indentOnInput(),
        bracketMatching(),
        closeBrackets(),
        syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
        java(),
        highlightSelectionMatches(),
        readOnlyCompartment.of(EditorState.readOnly.of(readOnly)),
        EditorView.lineWrapping,
        keymap.of([...closeBracketsKeymap, ...defaultKeymap, ...historyKeymap, ...searchKeymap, ...submitKeymap, indentWithTab]),
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            onChangeRef.current?.(update.state.doc.toString())
          }
        }),
        theme,
      ],
    })

    const view = new EditorView({ state, parent: hostRef.current })
    viewRef.current = view

    return () => {
      view.destroy()
      viewRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Push external changes (e.g. "reset to the reference solution") into the editor.
  useEffect(() => {
    const view = viewRef.current
    if (!view) return
    const current = view.state.doc.toString()
    if (current === value) return
    view.dispatch({
      changes: { from: 0, to: current.length, insert: value },
    })
  }, [value])

  // Keep the read-only state in sync.
  useEffect(() => {
    const view = viewRef.current
    if (!view) return
    view.dispatch({
      effects: readOnlyCompartment.reconfigure(EditorState.readOnly.of(readOnly)),
    })
  }, [readOnly])

  return (
    <div
      ref={hostRef}
      role="textbox"
      aria-label={ariaLabel}
      aria-readonly={readOnly}
      className="overflow-hidden rounded-lg border border-line"
      style={{ minHeight, maxHeight }}
    />
  )
}
