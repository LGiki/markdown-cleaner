import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useLocalStorage } from '@/hooks/useLocalStorage'
import { type StripOptions, useMarkdownStripper } from '@/hooks/useMarkdownStripper'
import { Header } from '@/components/Header'
import { InputPanel } from '@/components/InputPanel'
import { OutputPanel } from '@/components/OutputPanel'
import { OptionsPanel } from '@/components/OptionsPanel'
import '@fontsource/ibm-plex-mono/600.css'


const defaultOptions: StripOptions = {
  removeBold: true,
  removeItalics: true,
  removeLinks: true,
  removeImages: true,
  removeCodeBlocks: true,
  removeHeaders: true,
  removeLists: true,
}

function App() {
  useTranslation()
  const [input, setInput] = useState('')
  const [options, setOptions] = useLocalStorage<StripOptions>('md-stripper-options', defaultOptions)
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('md-stripper-theme', 'light')

  const output = useMarkdownStripper(input, options)

  const inputLength = useMemo(() => input.length, [input])
  const outputLength = useMemo(() => output.length, [output])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  const handleResetOptions = () => {
    setOptions({ ...defaultOptions })
  }

  return (
    <div className="min-h-screen pb-4 md:pb-8 text-foreground flex flex-col">
      <Header theme={theme} onThemeChange={setTheme} />

      <main className="container mt-4 md:mt-8 grid gap-4 grid-cols-1 md:grid-cols-2 grid-rows-[auto_auto_auto] md:grid-rows-[1fr_auto] flex-1">
        <InputPanel
          value={input}
          onChange={setInput}
          charCount={inputLength}
        />

        <OutputPanel
          value={output}
          charCount={outputLength}
        />

        <OptionsPanel
          options={options}
          onChange={setOptions}
          onReset={handleResetOptions}
        />
      </main>
    </div>
  )
}

export default App
