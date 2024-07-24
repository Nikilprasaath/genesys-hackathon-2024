import {
  Arrow,
  EdgePathLabelModel,
  GraphComponent,
  GraphItemTypes,
  GraphViewerInputMode,
  IGraph,
  License,
  PolylineEdgeStyle,
  Size
} from 'yfiles'
import ReactComponentNodeStyle from '../utils/ReactComponentNodeStyle.ts'
import NodeTemplate from '../components/NodeTemplate.tsx'
import { useLayoutEffect, useMemo, useRef } from 'react'
import yFilesLicense from '../license.json'
import LabelTemplate from '../components/LabelTemplate'
import ReactComponentLabelStyle from './ReactComponentLabelStyle'

function configureDefaultStyles(graph: IGraph) {
  graph.nodeDefaults.size = new Size(250, 100)
  graph.nodeDefaults.style = new ReactComponentNodeStyle(NodeTemplate)
  graph.edgeDefaults.style = new PolylineEdgeStyle({
    smoothingLength: 25,
    stroke: '4px #008000',
    targetArrow: new Arrow({
      fill: '#66485B',
      scale: 2,
      type: 'triangle'
    })
  })
  graph.edgeDefaults.labels.style = new ReactComponentLabelStyle(LabelTemplate)
  graph.edgeDefaults.labels.layoutParameter = new EdgePathLabelModel({
    autoRotation: false,
    sideOfEdge: 'on-edge'
  }).createDefaultParameter()
}

export function useGraphComponent() {
  const graphComponentContainer = useRef<HTMLDivElement>(null)

  const graphComponent = useMemo(() => {
    // include the yFiles License
    License.value = yFilesLicense
    // initialize the GraphComponent
    const gc = new GraphComponent()
    // register interaction
    gc.inputMode = new GraphViewerInputMode({
      // nodes and labels should be selectable
      selectableItems: GraphItemTypes.NODE | GraphItemTypes.LABEL
    })
    // specify default styles for newly created nodes and edges
    configureDefaultStyles(gc.graph)
    return gc
  }, [])

  useLayoutEffect(() => {
    const gcContainer = graphComponentContainer.current!
    graphComponent.div.style.width = '100%'
    graphComponent.div.style.height = '100%'
    graphComponent.div.style.color = '#FFFFFF'
    gcContainer.appendChild(graphComponent.div)

    return () => {
      gcContainer.innerHTML = ''
    }
  }, [graphComponentContainer, graphComponent])

  return { graphComponentContainer, graphComponent }
}
