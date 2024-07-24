import { useEffect, useRef } from 'react'
import './GraphOverviewComponent.css'
import { GraphComponent, GraphOverviewComponent } from 'yfiles'

interface ReactGraphOverviewComponentProps {
  graphComponent: GraphComponent
}

export function ReactGraphOverviewComponent({ graphComponent }: ReactGraphOverviewComponentProps) {
  const overviewElement = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const overviewParent = overviewElement.current!
    const overviewComponent = new GraphOverviewComponent(graphComponent)
    overviewParent.appendChild(overviewComponent.div)
    return () => {
      overviewParent.removeChild(overviewComponent.div)
      overviewComponent.cleanUp()
    }
  }, [graphComponent])

  return (
    <div className="overview-container">
      <div className="overview-title">Overview</div>
      <div className="graph-overview-component" ref={overviewElement} />
    </div>
  )
}
