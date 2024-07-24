import type { ReactComponentNodeStyleProps } from '../utils/ReactComponentNodeStyle'
import { SvgText } from './SvgTextComponent'

export default function NodeTemplate({
  width,
  height,
  selected,
  tag,
  colour
}: ReactComponentNodeStyleProps<{ name: string }>) {
  return (
    <g>
      <rect
        style={{ fill: colour, stroke: '#66485B', strokeWidth: 1.5 }}
        x={0}
        y={0}
        rx={10}
        ry={10}
        width={width}
        height={height}
      />
      <SvgText
        text={tag.name}
        font="bold 17px sans-serif"
        maxWidth={width - 4}
        maxHeight={height}
        x={width / 2}
        y={height / 2 - 9}
        fill="#000000"
        style={{ textAnchor: 'middle', dominantBaseline: 'middle' }}
      />
    </g>
  )
}
