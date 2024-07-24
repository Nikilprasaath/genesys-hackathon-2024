import LayoutWorker from './LayoutWorker?worker'
import { GraphComponent, LayoutExecutorAsync } from 'yfiles'

const layoutWorker = new LayoutWorker()

/**
 * Keeps track of layout requests on the graph and makes sure that there is always a clean layout
 * afterwards.
 */
export class LayoutSupport {
  private executor: LayoutExecutorAsync
  private needsLayout = false
  private isLayoutRunning = false
  constructor(graphComponent: GraphComponent) {
    // helper function that performs the actual message passing to the web worker
    const webWorkerMessageHandler = (data: unknown): Promise<any> => {
      return new Promise((resolve) => {
        layoutWorker.onmessage = (e: any) => resolve(e.data)
        layoutWorker.postMessage(data)
      })
    }

    this.executor = new LayoutExecutorAsync({
      messageHandler: webWorkerMessageHandler,
      graphComponent: graphComponent,
      duration: '1s',
      animateViewport: true,
      easedAnimation: true
    })
  }

  /**
   * Can be called subsequent times, to schedule layouts without interfering with currently
   * running layouts.
   */
  async scheduleLayout() {
    this.needsLayout = true
    if (this.isLayoutRunning) {
      return
    }

    while (this.needsLayout) {
      this.isLayoutRunning = true
      this.needsLayout = false

      await this.executor.start()

      this.isLayoutRunning = false
    }
  }
}
