import './DemoDataPanel.css'
import ItemElement from './ItemElement'
import plusIcon from '../assets/plus-16.svg'
import minusIcon from '../assets/minus-16.svg'
import { GraphData } from '../App'

interface DemoDataPanelProps {
  graphData: GraphData
  onRemoveNode(): void
  onAddNode(): void
}

export default function DemoDataPanel(props: DemoDataPanelProps) {
  const nodeItems = props.graphData.nodesSource.map((node) => (
    <ItemElement item={node} key={node.id} />
  ))

  const edgeItems = props.graphData.edgesSource.map((edge) => (
    <ItemElement item={edge} key={`${edge.fromNode}-${edge.toNode}`} />
  ))

  return (
    <div>
      <div className="demo-sidebar-content">
        <h2>Graph Data</h2>
        <p>
          The following buttons add/remove items in the internal <code>graphData</code> object, that
          is bound to the <code>GraphComponent</code>. Upon change, the graph will be updated and
          rearranged.
        </p>
        <div className="controls">
          <button className="control-button" onClick={props.onAddNode}>
            <img src={plusIcon} alt="AddNodeIcon" />
            <span>Add Node to Data</span>
          </button>
          <button
            className="control-button"
            onClick={props.onRemoveNode}
            disabled={props.graphData.nodesSource.length === 0}
          >
            <img src={minusIcon} alt="RemoveNodeIcon" />
            <span>Remove Node from Data</span>
          </button>
        </div>
        <h2>Nodes Source</h2>
        {nodeItems}
        <h2>Edges Source</h2>
        {edgeItems}
      </div>
    </div>
  )
}
