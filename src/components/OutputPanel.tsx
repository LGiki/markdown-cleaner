import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BookA, Check, Copy } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'

interface OutputPanelProps {
  value: string
  charCount: number
}

export function OutputPanel({ value, charCount }: OutputPanelProps) {
  const { t } = useTranslation()
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    if (!value) return
    await navigator.clipboard.writeText(value)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1400)
  }

  return (
    <Card className='flex flex-col min-h-[420px]'>
      <CardHeader className='md:space-y-2 flex-shrink-0'>
        <CardTitle className="text-base md:text-lg">{t('output.title')}</CardTitle>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className='flex items-center gap-2'>
            <BookA className='w-4 h-4' />
            {t('output.chars', { count: charCount })}
          </span>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleCopy}
            disabled={!value}
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
          value={value}
          readOnly
          className='h-full min-h-[200px] md:min-h-0'
          name='plain-text'
          placeholder={t('output.placeholder')}
        />
      </CardContent>
    </Card>
  )
}
