import './ReactGraphComponent.css'
import { ContextMenuComponent } from './ContextMenuComponent.tsx'
// import { ReactGraphOverviewComponent } from './GraphOverviewComponent.tsx'
import { GraphData } from '../App.tsx'
import { useMemo, useState} from 'react'
import { ICommand} from 'yfiles'
import DemoToolbar from './DemoToolbar.tsx'
import { LayoutSupport } from '../utils/LayoutSupport.ts'
import { useTooltips } from '../utils/use-tooltips.tsx'
import { useGraphSearch } from '../utils/use-graph-search.ts'
import { useGraphBuilder } from '../utils/use-graph-builder.ts'
import { useGraphComponent } from '../utils/use-graph-component.ts'

interface ReactGraphComponentProps {
  graphData: GraphData
  onResetData(): void
}

export function ReactGraphComponent({ graphData, onResetData }: ReactGraphComponentProps) {
  // get hold of the GraphComponent
  const { graphComponent, graphComponentContainer } = useGraphComponent()

  // register tooltips on graph items
  useTooltips(graphComponent)

  // update graph on data changes
  const layoutSupport = useMemo(() => new LayoutSupport(graphComponent), [graphComponent])
  useGraphBuilder(graphComponent, graphData, layoutSupport)

  // register search on graph items
  const [searchQuery, setSearchQuery] = useState('')
  useGraphSearch(graphComponent, searchQuery)
  

  return (
    <>
      <div className="toolbar">
        <DemoToolbar
          resetData={onResetData}
          zoomIn={() => ICommand.INCREASE_ZOOM.execute(null, graphComponent)}
          zoomOut={() => ICommand.DECREASE_ZOOM.execute(null, graphComponent)}
          resetZoom={() => ICommand.ZOOM.execute(1.0, graphComponent)}
          fitContent={() => ICommand.FIT_GRAPH_BOUNDS.execute(null, graphComponent)}
          searchChange={(evt) => setSearchQuery(evt.target.value)}
        /> 
      </div>
      <div className="main">
        <div
          className="graph-component-container"
          style={{ width: '100%', height: '100%' }}
          ref={graphComponentContainer}
        />
        <ContextMenuComponent graphComponent={graphComponent} />
        <div style={{ position: 'absolute', left: '20px', top: '20px' }}>
          {/* <ReactGraphOverviewComponent graphComponent={graphComponent} /> */}
        </div>
      </div>
    </>
  )
}
