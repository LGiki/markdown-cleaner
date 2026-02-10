import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BookA, Check, Clipboard, Copy, Eraser, Moon, RotateCcw, Sun } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { type StripOptions, useMarkdownStripper } from '@/hooks/useMarkdownStripper'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
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
  const { t } = useTranslation()
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

  const optionItems: { key: keyof StripOptions; labelKey: string; descriptionKey: string }[] = [
    {
      key: 'removeBold',
      labelKey: 'options.bold.label',
      descriptionKey: 'options.bold.description',
    },
    {
      key: 'removeItalics',
      labelKey: 'options.italics.label',
      descriptionKey: 'options.italics.description',
    },
    {
      key: 'removeLinks',
      labelKey: 'options.links.label',
      descriptionKey: 'options.links.description',
    },
    {
      key: 'removeImages',
      labelKey: 'options.images.label',
      descriptionKey: 'options.images.description',
    },
    {
      key: 'removeCodeBlocks',
      labelKey: 'options.code.label',
      descriptionKey: 'options.code.description',
    },
    {
      key: 'removeHeaders',
      labelKey: 'options.headers.label',
      descriptionKey: 'options.headers.description',
    },
    {
      key: 'removeLists',
      labelKey: 'options.lists.label',
      descriptionKey: 'options.lists.description',
    },
  ]

  return (
    <div className="min-h-screen pb-16 text-foreground flex flex-col">
      <header className="border-b border-border/70 bg-background/80 backdrop-blur flex-shrink-0">
        <div className="container flex flex-col sm:flex-row flex-wrap items-start sm:items-center justify-between gap-4 py-4 md:py-6">
          <div className="space-y-1 md:space-y-2">
            <h1 className="text-2xl md:text-3xl font-semibold lg:text-4xl">
              {t('app.title')}
            </h1>
            <p className="text-sm text-muted-foreground md:text-base max-w-xl">
              {t('app.subtitle')}
            </p>
          </div>
          <div className="flex items-center gap-2 md:gap-3 rounded-full border border-border/70 bg-card px-3 md:px-4 py-2 shadow-soft">
            <LanguageSwitcher />
            <div className="w-px h-4 bg-border" />
            <span className="text-xs uppercase tracking-widest text-muted-foreground hidden sm:inline">{t('theme.label')}</span>
            <Sun className="h-4 w-4 text-muted-foreground" />
            <Switch
              checked={theme === 'dark'}
              onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
              aria-label={t('theme.label')}
            />
            <Moon className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </header>

      <main className="container mt-4 md:mt-8 grid gap-4 grid-cols-1 md:grid-cols-2 grid-rows-[auto_auto_auto] md:grid-rows-[1fr_auto] flex-1">
        <Card className='flex flex-col min-h-[300px] md:min-h-0'>
          <CardHeader className='space-y-2 flex-shrink-0'>
            <CardTitle className="text-base md:text-lg">{t('input.title')}</CardTitle>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span className='flex items-center gap-2'>
                <BookA className='w-4 h-4' />
                {t('input.chars', { count: inputLength })}
              </span>
              <div className='flex items-center gap-1 md:gap-2'>
                {
                  inputLength !== 0 && <Button variant="ghost" size="sm" onClick={() => setInput('')} className="px-2 md:px-3">
                    <Eraser className='h-4 w-4' />
                    <span className="hidden sm:inline">{t('input.clear')}</span>
                  </Button>
                }
                <Button variant="secondary" size="sm" onClick={() => setInput('')} className="px-2 md:px-3">
                  <Clipboard className="h-4 w-4" />
                  <span className="hidden sm:inline">{t('input.paste')}</span>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className='flex-1 h-0'>
            <Textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              className='h-full min-h-[200px] md:min-h-0'
              placeholder={t('input.placeholder')}
              name='markdown-input'
            />
          </CardContent>
        </Card>

        <Card className='flex flex-col min-h-[300px] md:min-h-0'>
          <CardHeader className='space-y-2 flex-shrink-0'>
            <CardTitle className="text-base md:text-lg">{t('output.title')}</CardTitle>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span className='flex items-center gap-2'>
                <BookA className='w-4 h-4' />
                {t('output.chars', { count: outputLength })}
              </span>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleCopy}
                disabled={!output}
                className="px-2 md:px-3"
              >
                {copied ? (
                  <span className="inline-flex items-center gap-1 md:gap-2">
                    <Check className="h-4 w-4" />
                    <span className="hidden sm:inline">{t('output.copied')}</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 md:gap-2">
                    <Copy className="h-4 w-4" />
                    <span className="hidden sm:inline">{t('output.copy')}</span>
                  </span>
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent className='flex-1 h-0'>
            <Textarea
              value={output}
              readOnly
              className='h-full min-h-[200px] md:min-h-0'
              name='plain-text'
            />
          </CardContent>
        </Card>

          <Card className="md:col-span-2">
            <CardHeader className='space-y-2'>
              <div className="flex items-center justify-between gap-4">
                <CardTitle className="text-base md:text-lg">{t('options.title')}</CardTitle>
                <Button
                  size='sm'
                  variant="outline"
                  onClick={() => setOptions({ ...defaultOptions })}
                  className="shrink-0"
                >
                  <RotateCcw className='w-4 h-4'/>
                  {t('options.reset')}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {optionItems.map((item) => (
                <div key={item.key} className="flex items-start gap-3 text-sm p-2 -m-2 rounded-lg hover:bg-muted/50 transition-colors">
                  <Checkbox
                    id={`option-${item.key}`}
                    checked={options[item.key]}
                    onCheckedChange={() => handleOptionChange(item.key)}
                    className="mt-0.5 shrink-0"
                  />
                  <label htmlFor={`option-${item.key}`} className="space-y-1 min-w-0 cursor-pointer">
                    <span className="block font-medium text-foreground">{t(item.labelKey)}</span>
                    <span className="block text-xs text-muted-foreground leading-relaxed">{t(item.descriptionKey)}</span>
                  </label>
                </div>
              ))}
            </CardContent>
          </Card>
      </main>
    </div>
  )
}

export default App
