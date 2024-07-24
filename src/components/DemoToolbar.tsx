import { ChangeEvent } from 'react'
import './DemoToolbar.css'

interface DemoToolbarProps {
  resetData(): void
  resetZoom(): void
  fitContent(): void
  zoomIn(): void
  zoomOut(): void
  searchChange(e: ChangeEvent<HTMLInputElement>): void
}

export default function DemoToolbar(props: DemoToolbarProps) {
  return (
    <div className="demo-toolbar">
      <button className="demo-icon-yIconReload" title="Reset Data" onClick={props.resetData} />
      <span className="demo-separator" />
      <button className="demo-icon-yIconZoomIn" title="Zoom In" onClick={props.zoomIn} />
      <button
        className="demo-icon-yIconZoomOriginal"
        title="Reset Zoom"
        onClick={props.resetZoom}
      />
      <button className="demo-icon-yIconZoomOut" title="Zoom Out" onClick={props.zoomOut} />
      <button className="demo-icon-yIconZoomFit" title="Fit Diagram" onClick={props.fitContent} />
      <input className="search" placeholder="Search Nodes" onChange={props.searchChange} />
    </div>
  )
}
