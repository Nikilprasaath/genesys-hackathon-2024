import './ItemElement.css'
import { EdgeData, NodeData } from '../App'

function formatItem(item: NodeData | EdgeData) {
  return JSON.stringify(item)
    .replace(/([{,:])/g, '$1 ')
    .replace(/(})/g, ' $1')
}

export default function ItemElement({ item }: { item: NodeData | EdgeData }) {
  return (
    <div className="item-element">
      <pre style={{ margin: 0 }}>{formatItem(item)}</pre>
    </div>
  )
}
