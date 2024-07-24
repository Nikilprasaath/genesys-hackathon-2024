import {
  GraphComponent,
  GraphItemTypes,
  GraphViewerInputMode,
  IEdge,
  IModelItem,
  INode,
  Point,
  QueryItemToolTipEventArgs,
  TimeSpan,
  type ToolTipQueryEventArgs
} from 'yfiles'
import { useEffect } from 'react'
import { createRoot } from 'react-dom/client'

/**
 * The tooltip may either be a plain string or it can also be a rich HTML element. In this case, we
 * show the latter by using a dynamically compiled React component.
 * @param {IModelItem} item
 * @returns {HTMLElement}
 */
function createTooltipContent(item: IModelItem): HTMLDivElement {
  const title =
    item instanceof INode ? 'Node Data' : item instanceof IEdge ? 'Edge Data' : 'Label Data'
  const content = JSON.stringify(item.tag)

  const tooltipContainer = document.createElement('div')
  const root = createRoot(tooltipContainer)
  root.render(
    <div className="tooltip">
      <h4>{title}</h4>
      <p>{content}</p>
    </div>
  )

  return tooltipContainer
}

/**
 * Dynamic tooltips are implemented by adding a tooltip provider as an event handler for
 * the {@link MouseHoverInputMode#addQueryToolTipListener QueryToolTip} event of the
 * {@link GraphViewerInputMode} using the
 * {@link ToolTipQueryEventArgs} parameter.
 * The {@link ToolTipQueryEventArgs} parameter provides three relevant properties:
 * Handled, QueryLocation, and ToolTip. The Handled property is a flag which indicates
 * whether the tooltip was already set by one of possibly several tooltip providers. The
 * QueryLocation property contains the mouse position for the query in world coordinates.
 * The tooltip is set by setting the ToolTip property.
 */
export function useTooltips(graphComponent: GraphComponent) {
  useEffect(() => {
    const inputMode = graphComponent.inputMode as GraphViewerInputMode

    // show tooltips only for nodes, edges and labels
    inputMode.toolTipItems = GraphItemTypes.NODE | GraphItemTypes.EDGE | GraphItemTypes.LABEL

    // Customize the tooltip's behavior to our liking.
    const mouseHoverInputMode = inputMode.mouseHoverInputMode
    mouseHoverInputMode.toolTipLocationOffset = new Point(15, 15)
    mouseHoverInputMode.delay = TimeSpan.fromMilliseconds(500)
    mouseHoverInputMode.duration = TimeSpan.fromSeconds(5)

    // Register a listener for when a tooltip should be shown.
    const queryItemTooltipListener = (
      _: GraphViewerInputMode,
      evt: QueryItemToolTipEventArgs<IModelItem>
    ) => {
      if (evt.handled) {
        // Tooltip content has already been assigned -> nothing to do.
        return
      }

      // Use a rich HTML element as tooltip content. Alternatively, a plain string would do as well.
      evt.toolTip = createTooltipContent(evt.item!)

      // Indicate that the tooltip content has been set.
      evt.handled = true
    }
    inputMode.addQueryItemToolTipListener(queryItemTooltipListener)

    return () => {
      inputMode.removeQueryItemToolTipListener(queryItemTooltipListener)
    }
  }, [graphComponent])
}
