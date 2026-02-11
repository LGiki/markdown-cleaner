import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { BookA, Clipboard, Eraser } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'

interface InputPanelProps {
  value: string
  onChange: (value: string) => void
  charCount: number
}

export function InputPanel({ value, onChange, charCount }: InputPanelProps) {
  const { t } = useTranslation()

  const handlePaste = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText()
      onChange(text)
    } catch (error) {
      console.error('Failed to read clipboard:', error)
    }
  }, [onChange])

  return (
    <Card className='flex flex-col min-h-[420px]'>
      <CardHeader className='md:space-y-2 flex-shrink-0'>
        <CardTitle className="text-base md:text-lg">{t('input.title')}</CardTitle>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className='flex items-center gap-2'>
            <BookA className='w-4 h-4' />
            {t('input.chars', { count: charCount })}
          </span>
          <div className='flex items-center gap-1 md:gap-2'>
            {charCount !== 0 && (
              <Button variant="ghost" size="sm" onClick={() => onChange('')} className="px-2 md:px-3">
                <Eraser className='h-4 w-4' />
                <span className="hidden sm:inline">{t('input.clear')}</span>
              </Button>
            )}
            <Button variant="secondary" size="sm" onClick={handlePaste} className="px-2 md:px-3">
              <Clipboard className="h-4 w-4" />
              <span className="hidden sm:inline">{t('input.paste')}</span>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className='flex-1 h-0'>
        <Textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className='h-full min-h-[200px] md:min-h-0'
          placeholder={t('input.placeholder')}
          name='markdown-input'
        />
      </CardContent>
    </Card>
  )
}
