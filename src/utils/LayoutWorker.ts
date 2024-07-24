import { LayoutExecutorAsyncWorker, LayoutGraph, License, OrthogonalLayout,EdgeRouter } from 'yfiles'
import licenseData from '../license.json'

License.value = licenseData

function applyLayout(graph: LayoutGraph): void {
  new OrthogonalLayout({ integratedEdgeLabeling: true }).applyLayout(graph)
}

// eslint-disable-next-line no-restricted-globals
self.addEventListener(
  'message',
  (e) => {
    const executor = new LayoutExecutorAsyncWorker(applyLayout)
    executor.process(e.data).then(postMessage).catch(postMessage)
  },
  false
)
