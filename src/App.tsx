import { useEffect, useMemo, useState } from 'react'
import { BookA, Check, Clipboard, Copy, Eraser, Moon, Sun } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { type StripOptions, useMarkdownStripper } from '@/hooks/useMarkdownStripper'
import '@fontsource/ibm-plex-mono/600.css';
import { Checkbox } from './components/ui/checkbox'


const defaultOptions: StripOptions = {
  removeBold: true,
  removeItalics: true,
  removeLinks: true,
  removeImages: true,
  removeCodeBlocks: true,
  removeHeaders: true,
  removeLists: true,
}

const sampleMarkdown = String.raw`#header Quick start

**Bold** and *italics* are stripped.

- Lists are cleaned
- Even numbered ones

1. First
2. Second

![Alt text](https://placehold.co/300x200)

[Link label](https://example.com)

\`\`\`ts
const hello = "code block"
\`\`\`

Inline \`code\` stays readable.`

function App() {
  const [input, setInput] = useState(sampleMarkdown)
  const [options, setOptions] = useLocalStorage<StripOptions>('md-stripper-options', defaultOptions)
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('md-stripper-theme', 'light')
  const [copied, setCopied] = useState(false)

  const output = useMarkdownStripper(input, options)

  const inputLength = useMemo(() => input.length, [input])
  const outputLength = useMemo(() => output.length, [output])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  const handleCopy = async () => {
    if (!output) return
    await navigator.clipboard.writeText(output)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1400)
  }

  const handleOptionChange = (key: keyof StripOptions) => {
    setOptions({ ...options, [key]: !options[key] })
  }

  const optionItems: { key: keyof StripOptions; label: string; description: string }[] = [
    {
      key: 'removeBold',
      label: 'Bold',
      description: 'Strip **bold** and __bold__ markers.',
    },
    {
      key: 'removeItalics',
      label: 'Italics',
      description: 'Remove *italic* and _italic_ markers.',
    },
    {
      key: 'removeLinks',
      label: 'Hyperlinks',
      description: 'Keep link text, remove URLs.',
    },
    {
      key: 'removeImages',
      label: 'Images',
      description: 'Drop image URLs, keep alt text.',
    },
    {
      key: 'removeCodeBlocks',
      label: 'Code',
      description: 'Unwrap fenced blocks and inline code.',
    },
    {
      key: 'removeHeaders',
      label: 'Headers',
      description: 'Strip # and non-standard #header marks.',
    },
    {
      key: 'removeLists',
      label: 'Lists',
      description: 'Remove list bullets and numbering.',
    },
  ]

  return (
    <div className="min-h-screen pb-16 text-foreground flex flex-col">
      <header className="border-b border-border/70 bg-background/80 backdrop-blur flex-shrink-0">
        <div className="container flex flex-wrap items-center justify-between gap-4 py-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold sm:text-4xl">
              Markdown Cleaner
            </h1>
            <p className="text-sm text-muted-foreground sm:text-base">
              Paste raw Markdown, choose exactly what to remove, and export clean text in one click.
            </p>
          </div>
          <div className="flex items-center gap-3 rounded-full border border-border/70 bg-card px-4 py-2 shadow-soft">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">Theme</span>
            <Sun className="h-4 w-4 text-muted-foreground" />
            <Switch
              checked={theme === 'dark'}
              onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
              aria-label="Toggle dark mode"
            />
            <Moon className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </header>

      <main className="container mt-8 grid gap-4 grid-cols-2 grid-rows-[1fr_auto] flex-1 h-0">
        <Card className='flex flex-col'>
          <CardHeader className='space-y-2 flex-shrink-0'>
            <CardTitle>Markdown Input</CardTitle>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span className='flex items-center gap-2'>
                <BookA className='w-4 h-4' />
                {inputLength} chars
              </span>
              <div className='flex items-center gap-2'>
                {
                  inputLength !== 0 && <Button variant="ghost" size="sm" onClick={() => setInput('')}>
                    <Eraser className='h-4 w-4' />
                    Clear
                  </Button>
                }
                <Button variant="secondary" size="sm" onClick={() => setInput('')}>
                  <Clipboard className="h-4 w-4" />
                  Paste
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className='flex-1 h-0'>
            <Textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              className='h-full'
              placeholder="Paste Markdown here..."
              name='markdown-input'
            />
          </CardContent>
        </Card>

        <Card className='flex flex-col'>
          <CardHeader className='space-y-2 flex-shrink-0'>
            <CardTitle>Plain Text Output</CardTitle>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span className='flex items-center gap-2'>
                <BookA className='w-4 h-4' />
                {outputLength} chars
              </span>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleCopy}
                disabled={!output}
              >
                {copied ? (
                  <span className="inline-flex items-center gap-2">
                    <Check className="h-4 w-4" /> Copied
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2">
                    <Copy className="h-4 w-4" /> Copy
                  </span>
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent className='flex-1 h-0'>
            <Textarea
              value={output}
              readOnly
              className='h-full'
              name='plain-text'
            />
          </CardContent>
        </Card>

          <Card className="col-span-2">
            <CardHeader className='space-y-2'>
              <CardTitle>Strip Options</CardTitle>
              <Button
                size='sm'
                variant="outline"
                className="w-full"
                onClick={() => setOptions({ ...defaultOptions })}
              >
                Reset Options
              </Button>
            </CardHeader>
            <CardContent className="grid grid-cols-3 gap-4">
              {optionItems.map((item) => (
                <label key={item.key} className="flex items-start gap-3 text-sm">
                  <Checkbox
                    checked={options[item.key]}
                    onCheckedChange={() => handleOptionChange(item.key)}
                    aria-label={item.label}
                  />
                  <span className="space-y-1">
                    <span className="block font-medium text-foreground">{item.label}</span>
                    <span className="block text-xs text-muted-foreground">{item.description}</span>
                  </span>
                </label>
              ))}
            </CardContent>
          </Card>
      </main>
    </div>
  )
}

export default App
