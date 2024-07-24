import reloadIcon from '../assets/reload-16.svg'
import yLogo from '../assets/ylogo-text.svg'
import './DemoDescription.css'

export default function DemoDescription() {
  return (
    <>
      <div className="demo-sidebar-header">
        <a href="https://www.yworks.com/products/yfiles">
          <img src={yLogo} alt="yWorks Logo" className="demo-left-logo" />
        </a>
      </div>
      <div className="demo-sidebar-content">
        <h1>React Demo with Functional Components</h1>
        <p>
          This demo shows how to integrate yFiles in a{' '}
          <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">
            React
          </a>{' '}
          application with{' '}
          <a href="https://www.typescriptlang.org/" target="_blank" rel="noopener noreferrer">
            TypeScript
          </a>{' '}
          in project bootstrapped with{' '}
          <a href="https://vitejs.dev/" target="_blank" rel="noopener noreferrer">
            Vite
          </a>
          .
        </p>
        <p>
          This application consists of separate React components for the different parts, i.e. the
          yFiles <code>GraphComponent</code>, the tooltips, the toolbar and the sidebars.
        </p>
        <p>
          The React component for the graph is populated by a given <code>graphData</code> JSON blob
          via its component properties. The JSON data is also displayed in the panel on the right
          hand side.
        </p>
        <p>
          With the help of the yFiles <code>GraphBuilder</code>, the diagram is automatically
          updated when the given <code>graphData</code> changes.
        </p>
        <p>
          The nodes are rendered via the <code>NodeTemplate</code> react component class and the
          edge labels via the <code>LabelTemplate</code> react component class.
        </p>
        <p>
          The node, edge and label tooltips are also dynamically rendered React components. In fact,
          they are reused components that are also rendered in the &apos;Graph Data&apos; sidebar.
        </p>
        <h2>Running the demo</h2>
        <p>
          The demo is using the <code>Vite</code> for tooling, thus the following steps are required
          to start it:
        </p>
        <code>
          &gt; npm install <br />
          &gt; npm run dev
        </code>
        <p>This will start the development server of the toolkit.</p>
        <h2>Things to Try</h2>
        <ul>
          <li>
            Clicking the buttons in the toolbar will execute certain actions in the React component
            for the diagram.
          </li>
          <li>
            The bound <code>graphData</code> can be changed with the panel on the right hand side.
            &apos;Add Node&apos; creates a random child node in the diagram and &apos;Remove
            Node&apos; removes a random node of the diagram.
          </li>
          <li>
            The graph is automatically updated when the attached <code>graphData</code> changes.
          </li>
          <li>
            After the graph has been changed, click{' '}
            <img
              style={{
                verticalAlign: 'middle'
              }}
              src={reloadIcon}
              alt="reload-icon"
            />{' '}
            to reload the initial sample graph.
          </li>
          <li>
            Vite's development server automatically updates the application upon code changes.
          </li>
        </ul>
        <h2>App Generator</h2>
        <p>
          Use the{' '}
          <a
            href="https://www.yworks.com/products/app-generator"
            target="_blank"
            rel="noopener noreferrer"
          >
            App Generator
          </a>{' '}
          to create visualization prototypes – quickly and easily.
        </p>
      </div>
    </>
  )
}
