import type { ILabel, IRenderContext, TaggedSvgVisual } from 'yfiles'
import {
  Font,
  GraphComponent,
  LabelStyleBase,
  Size,
  SvgVisual,
  TextRenderSupport,
  TextWrapping
} from 'yfiles'
import { ComponentClass, createElement, FunctionComponent } from 'react'
import { type Root, createRoot } from 'react-dom/client'

/**
 * The interface of the props passed to the SVG react component for rendering the label contents.
 */
export interface ReactComponentLabelStyleProps<TTag = any> {
  width: number
  height: number
  selected: boolean
  tag: TTag
  text: string
}

type RenderType<TTag> =
  | ComponentClass<ReactComponentLabelStyleProps<TTag>>
  | FunctionComponent<ReactComponentLabelStyleProps<TTag>>

declare type Cache<TTag> = { props: ReactComponentLabelStyleProps<TTag>; root: Root }

/**
 * Utility type for type-safe implementation of the Visual that stores the props
 * it has been created for along with the React Root.
 */
type ReactStyleSvgVisual<TTag> = TaggedSvgVisual<SVGGElement, Cache<TTag>>

/**
 * A simple ILabelStyle implementation that uses React Components/render functions
 * for rendering the label visualizations with SVG
 * Use it like this:
 * ```
 *  declare type TagType = { name: string }
 *
 *  const MyLabelTemplate = ({ width, height, tag }: ReactComponentLabelStyleProps<TagType>) => (
 *    <g>
 *      <rect width={width} height={height} fill="blue" />
 *      <text y="10">{tag.name}</text>
 *   </g>
 *  )
 *
 *  const style = new ReactComponentSvgLabelStyle(LabelTemplate)
 *
 *  const tag: TagType = { name: 'yFiles' }
 *  graph.addLabel({ owner, style, tag })
 * ```
 */
export default class ReactComponentLabelStyle<TTag> extends LabelStyleBase<
  ReactStyleSvgVisual<TTag>
> {
  constructor(private readonly type: RenderType<TTag>) {
    super()
  }

  createProps(context: IRenderContext, label: ILabel): ReactComponentLabelStyleProps<TTag> {
    return {
      width: label.layout.width,
      height: label.layout.height,
      selected:
        context.canvasComponent instanceof GraphComponent &&
        context.canvasComponent.selection.isSelected(label),
      tag: label.tag as TTag,
      text: label.text
    }
  }

  createVisual(context: IRenderContext, label: ILabel): ReactStyleSvgVisual<TTag> {
    const gElement = document.createElementNS('http://www.w3.org/2000/svg', 'g')
    const props = this.createProps(context, label)
    const element = createElement(this.type, props)
    const root = createRoot(gElement)
    root.render(element)
    const cache = { props, root } satisfies Cache<TTag>
    const svgVisual = SvgVisual.from(gElement, cache)

    // Ensure that React resources are released when the label gets removed from the yFiles scene
    // graph.
    context.setDisposeCallback(
      svgVisual,
      (_: IRenderContext, removedVisual: ReactStyleSvgVisual<any>) => {
        removedVisual.tag.root.unmount()
        return null
      }
    )
    const layout = label.layout
    SvgVisual.setTranslate(gElement, layout.anchorX, layout.anchorY - layout.height)
    return svgVisual
  }

  updateVisual(
    context: IRenderContext,
    oldVisual: ReactStyleSvgVisual<TTag>,
    label: ILabel
  ): ReactStyleSvgVisual<TTag> {
    const newProps = this.createProps(context, label)
    const cache = oldVisual.tag
    const cachedProps = cache.props
    if (
      cachedProps.width !== newProps.width ||
      cachedProps.height !== newProps.height ||
      cachedProps.selected !== newProps.selected ||
      cachedProps.tag !== newProps.tag ||
      cachedProps.text !== newProps.text
    ) {
      const element = createElement<ReactComponentLabelStyleProps<TTag>>(this.type, newProps)
      oldVisual.tag.root.render(element)
      cache.props = newProps
    }
    const layout = label.layout
    SvgVisual.setTranslate(oldVisual.svgElement, layout.anchorX, layout.anchorY - layout.height)
    return oldVisual
  }

  protected getPreferredSize(label: ILabel): Size {
    // Measure the label text and add some padding
    const textSize = TextRenderSupport.measureText({
      text: label.text,
      font: Font.from('normal 12px sans-serif'),
      wrapping: TextWrapping.WORD_ELLIPSIS
    })
    return new Size(textSize.width + 10, textSize.height + 2)
  }
}
