import { SvgText } from './SvgTextComponent'
import { ReactComponentLabelStyleProps } from '../utils/ReactComponentLabelStyle'

export default function LabelTemplate({
  width,
  height,
  selected,
  text
}: ReactComponentLabelStyleProps<{ name: string }>) {
  return (
    <g>
      <rect
        style={{
          fill: selected ? '#441c36' : '#ffA500',
          stroke: '#66485B',
          strokeWidth: 1.5
        }}
        x={0}
        y={0}
        rx={10}
        ry={10}
        width={width}
        height={height}
      />
      <SvgText
        text={text}
        font="bold 12px sans-serif"
        maxWidth={width - 4}
        maxHeight={height}
        x={width / 2}
        y={height / 2 - 10}
        fill={selected ? '#dad2d7' : '#441c36'}
        style={{ textAnchor: 'middle', dominantBaseline: 'middle' }}
      />
    </g>
  )
}
