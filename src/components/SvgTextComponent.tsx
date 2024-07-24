import { useEffect, useRef } from 'react'
import { Font, Size, TextRenderSupport, TextWrapping } from 'yfiles'

type SvgTextProps = {
  text: string
  font?: string
  x?: number
  y?: number
  maxWidth?: number
  maxHeight?: number
  className?: string
  fill?: string
  style?: React.CSSProperties
}

export function SvgText({
  text = '',
  font = 'normal 12px sans-serif',
  x = 0,
  y = 0,
  maxWidth = Number.MAX_VALUE,
  maxHeight = Number.MAX_VALUE,
  className = '',
  fill,
  style
}: SvgTextProps) {
  const textElement = useRef<SVGTextElement>(null)

  useEffect(() => {
    const element = textElement.current!
    TextRenderSupport.addText(
      textElement.current!,
      text,
      Font.from(font),
      new Size(maxWidth, maxHeight),
      TextWrapping.WORD_ELLIPSIS
    )
    return () => {
      while (element.firstChild) {
        element.firstChild.remove()
      }
    }
  }, [text, font, maxWidth, maxHeight])

  return (
    <text
      transform={`translate(${x}, ${y})`}
      ref={textElement}
      className={className}
      fill={fill}
      style={style}
    />
  )
}
