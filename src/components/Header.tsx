import { useTranslation } from 'react-i18next'
import { Moon, Sun } from 'lucide-react'

import { Switch } from '@/components/ui/switch'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'

interface HeaderProps {
  theme: 'light' | 'dark'
  onThemeChange: (theme: 'light' | 'dark') => void
}

export function Header({ theme, onThemeChange }: HeaderProps) {
  const { t } = useTranslation()

  return (
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
          <Sun className="h-4 w-4 text-muted-foreground" />
          <Switch
            checked={theme === 'dark'}
            onCheckedChange={(checked) => onThemeChange(checked ? 'dark' : 'light')}
          />
          <Moon className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>
    </header>
  )
}
