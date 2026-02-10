import { useMemo } from 'react'

export type StripOptions = {
  removeBold: boolean
  removeItalics: boolean
  removeLinks: boolean
  removeImages: boolean
  removeCodeBlocks: boolean
  removeHeaders: boolean
  removeLists: boolean
}

const stripMarkdown = (input: string, options: StripOptions) => {
  let text = input

  if (options.removeCodeBlocks) {
    text = text.replace(/```[^\n]*\n([\s\S]*?)```/g, '$1')
    text = text.replace(/~~~[^\n]*\n([\s\S]*?)~~~/g, '$1')
    text = text.replace(/`([^`]+)`/g, '$1')
  }

  if (options.removeImages) {
    text = text.replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
  }

  if (options.removeLinks) {
    text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    text = text.replace(/<([^>]+)>/g, '$1')
  }

  if (options.removeHeaders) {
    text = text.replace(/^\s{0,3}#{1,6}\s*/gm, '')
  }

  if (options.removeLists) {
    text = text.replace(/^\s*([-*+])\s+/gm, '')
    text = text.replace(/^\s*\d+[.)]\s+/gm, '')
  }

  if (options.removeBold) {
    text = text.replace(/\*\*([\s\S]+?)\*\*/g, '$1')
    text = text.replace(/__([\s\S]+?)__/g, '$1')
  }

  if (options.removeItalics) {
    text = text.replace(/\*([^*]+?)\*/g, '$1')
    text = text.replace(/_([^_]+?)_/g, '$1')
  }

  return text.replace(/\n{3,}/g, '\n\n').trimEnd()
}

export function useMarkdownStripper(input: string, options: StripOptions) {
  const output = useMemo(() => stripMarkdown(input, options), [input, options])
  return output
}
