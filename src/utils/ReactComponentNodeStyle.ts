import type { INode, IRenderContext, TaggedSvgVisual } from 'yfiles'
import { GraphComponent, NodeStyleBase, SvgVisual } from 'yfiles'
import { ComponentClass, createElement, FunctionComponent } from 'react'
import { type Root, createRoot } from 'react-dom/client'

/**
 * The interface of the props passed to the SVG react component for rendering the node contents.
 */
export interface ReactComponentNodeStyleProps<TTag = any> {
  width: number
  height: number
  selected: boolean
  tag: TTag
  colour?: string
}

type RenderType<TTag> =
  | ComponentClass<ReactComponentNodeStyleProps<TTag>>
  | FunctionComponent<ReactComponentNodeStyleProps<TTag>>

declare type Cache<TTag> = { props: ReactComponentNodeStyleProps<TTag>; root: Root }

/**
 * Utility type for type-safe implementation of the Visual that stores the props
 * it has been created for along with the React Root.
 */
type ReactStyleSvgVisual<TTag> = TaggedSvgVisual<SVGGElement, Cache<TTag>>

/**
 * A simple INodeStyle implementation that uses React Components/render functions
 * for rendering the node visualizations with SVG
 * Use it like this:
 * ```
 *  declare type TagType = { name: string }
 *
 *  const MyNodeTemplate = ({ width, height, tag }: ReactComponentNodeStyleProps<TagType>) => (
 *    <g>
 *      <rect width={width} height={height} fill="blue" />
 *      <text y="10">{tag.name}</text>
 *   </g>
 *  )
 *
 *  const style = new ReactComponentSvgNodeStyle(NodeTemplate)
 *
 *  const tag: TagType = { name: 'yFiles' }
 *  graph.createNode({ style, tag })
 * ```
 */
export default class ReactComponentNodeStyle<TTag> extends NodeStyleBase<
  ReactStyleSvgVisual<TTag>
> {
  constructor(private readonly type: RenderType<TTag>) {
    super()
  }

  createProps(context: IRenderContext, node: INode): ReactComponentNodeStyleProps<TTag> {
    let colour
    // if (node.tag.health == "" ) {
    //   colour = "#AA336A"
    // }
    if (node.tag.health > 80) {
      colour = "#008000"
    } else if (node.tag.health > 40) {
      colour = "#fbbc04"
    } else {
      colour = "#FF0000"
    }
    return {
      width: node.layout.width,
      height: node.layout.height,
      selected:
        context.canvasComponent instanceof GraphComponent &&
        context.canvasComponent.selection.selectedNodes.isSelected(node),
      tag: node.tag as TTag,
      colour: colour

    }
  }

  createVisual(context: IRenderContext, node: INode): ReactStyleSvgVisual<TTag> {
    const gElement = document.createElementNS('http://www.w3.org/2000/svg', 'g')
    const props = this.createProps(context, node)
    const element = createElement(this.type, props)
    const root = createRoot(gElement)
    root.render(element)
    const cache = { props, root } satisfies Cache<TTag>
    const svgVisual = SvgVisual.from(gElement, cache)

    // Ensure that React resources are released when the node gets removed from the yFiles scene
    // graph.
    context.setDisposeCallback(
      svgVisual,
      (_: IRenderContext, removedVisual: ReactStyleSvgVisual<any>) => {
        removedVisual.tag.root.unmount()
        return null
      }
    )

    SvgVisual.setTranslate(gElement, node.layout.x, node.layout.y)
    return svgVisual
  }

  updateVisual(
    context: IRenderContext,
    oldVisual: ReactStyleSvgVisual<TTag>,
    node: INode
  ): ReactStyleSvgVisual<TTag> {
    const newProps = this.createProps(context, node)
    const cache = oldVisual.tag
    const cachedProps = cache.props
    if (
      cachedProps.width !== newProps.width ||
      cachedProps.height !== newProps.height ||
      cachedProps.selected !== newProps.selected ||
      cachedProps.tag !== newProps.tag ||
      cachedProps.colour !== newProps.colour
    ) {
      const element = createElement<ReactComponentNodeStyleProps<TTag>>(this.type, newProps)
      oldVisual.tag.root.render(element)
      cache.props = newProps
    }
    SvgVisual.setTranslate(oldVisual.svgElement, node.layout.x, node.layout.y)
    return oldVisual
  }
}
