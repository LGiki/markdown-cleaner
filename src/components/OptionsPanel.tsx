import { useTranslation } from 'react-i18next'
import { CheckCheck } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { type StripOptions } from '@/hooks/useMarkdownStripper'

interface OptionsPanelProps {
  options: StripOptions
  onChange: (options: StripOptions) => void
  onReset: () => void
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

export function OptionsPanel({ options, onChange, onReset }: OptionsPanelProps) {
  const { t } = useTranslation()

  const handleOptionChange = (key: keyof StripOptions) => {
    onChange({ ...options, [key]: !options[key] })
  }

  return (
    <Card className="md:col-span-2">
      <CardHeader className='space-y-2'>
        <div className="flex items-center justify-between gap-4">
          <CardTitle className="text-base md:text-lg">{t('options.title')}</CardTitle>
          <Button
            size='sm'
            variant="outline"
            onClick={onReset}
            className="shrink-0"
          >
            <CheckCheck className='w-4 h-4' />
            {t('options.reset')}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 sm:gap-2 md:gap-3 lg:gap-4">
        {optionItems.map((item) => (
          <div
            key={item.key}
            className="flex items-center gap-3 text-sm p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
          >
            <Checkbox
              id={`option-${item.key}`}
              checked={options[item.key]}
              className="mt-0.5 shrink-0"
              onCheckedChange={() => handleOptionChange(item.key)}
            />
            <label htmlFor={`option-${item.key}`} className="space-y-1 min-w-0 cursor-pointer flex-1 w-0">
              <span className="block font-medium text-foreground">{t(item.labelKey)}</span>
              <span className="block text-xs text-muted-foreground leading-relaxed">{t(item.descriptionKey)}</span>
            </label>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
