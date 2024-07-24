import { GraphBuilder, GraphComponent, IGraph, PolylineEdgeStyle, Arrow } from 'yfiles'
import { EdgeData, GraphData, NodeData } from '../App.tsx'
import { LayoutSupport } from './LayoutSupport.ts'
import { useEffect, useMemo } from 'react'

function createGraphBuilder(graph: IGraph) {
  const graphBuilder = new GraphBuilder(graph)
  const nodesSource = graphBuilder.createNodesSource({
    // Stores the nodes of the graph
    data: [] as NodeData[],
    // Identifies the id property of a node object
    id: 'id',
    // Use the 'name' property as node label
    tag: (item) => ({ name: item.name, health: item.health })
  })
  const edgesSource = graphBuilder.createEdgesSource({
    // Stores the edges of the graph
    data: [] as EdgeData[],
    // Identifies the property of an edge object that contains the source node's id
    sourceId: 'fromNode',
    // Identifies the property of an edge object that contains the target node's id
    targetId: 'toNode'
  })
  // Define a utility method that resolves a node's id to the name of the node
  const idToName = (id: number) => graphBuilder.getNodeById(id)?.tag.name

  // Add edge labels
  edgesSource.edgeCreator.createLabelBinding({
    // Edge label text should contain the names of the source and target node
    // text: (edgeData) => idToName(edgeData.fromNode) + ' - ' + idToName(edgeData.toNode)+ ", SuccessRate: " + edgeData.succesRate,
    
    tag: (edgeData) => {
      return {
        fromNode: idToName(edgeData.fromNode),
        toNode: idToName(edgeData.toNode),
        tag: edgeData.succesRate
      }
    }
  })

  return { graphBuilder, nodesSource, edgesSource }
}

export function useGraphBuilder(
  graphComponent: GraphComponent,
  data: GraphData,
  layoutSupport: LayoutSupport
) {
  
  graphComponent.graph.clear()

  const { graphBuilder, nodesSource, edgesSource } = useMemo(
    () => createGraphBuilder(graphComponent.graph),
    [graphComponent]
  )

  const style = (colour: string) => { 
    const edgeStyle = new PolylineEdgeStyle({
    smoothingLength: 25,
    stroke: '4px '+ colour,
    targetArrow: new Arrow({
      fill: colour,
      scale: 2,
      type: 'triangle'
    })
  })
  return edgeStyle
}

  

  useEffect(() => {
    graphBuilder.setData(nodesSource, data.nodesSource)
    graphBuilder.setData(edgesSource, data.edgesSource)
    graphBuilder.updateGraph()
    layoutSupport.scheduleLayout()
    // graphComponent.graph.setStyle(graphComponent.graph.nodes.get(2), newStyle)
    // graphComponent.graph.setStyle(graphComponent.graph.edges.get(1), style )
    const edges = graphComponent.graph.edges.toArray() 
    edges.map((edge)=>{
    let colour
    // if (edge.tag.successRate == "") {
    //   colour = "#AA336A"
    // }
    if (edge.tag.successRate > 80) {
      colour = "#008000"
    } else if (edge.tag.successRate > 40) {
      colour = "#fbbc04"
    } else {
      colour = "#FF0000"
    }
      graphComponent.graph.setStyle(edge, style(colour))
    })
    
  }, [graphComponent, graphBuilder, data, nodesSource, edgesSource, layoutSupport])
}
