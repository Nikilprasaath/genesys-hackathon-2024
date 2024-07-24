import { GraphSearch } from '../demo-utils/GraphSearch.ts'
import { GraphComponent, INode } from 'yfiles'
import { useCallback, useEffect, useMemo } from 'react'

class NodeTagSearch extends GraphSearch {
  matches(node: INode, text: string): boolean {
    if (node.tag) {
      const data = node.tag
      return data.name.toLowerCase().indexOf(text.toLowerCase()) !== -1
    }
    return false
  }
}

export function useGraphSearch(graphComponent: GraphComponent, searchQuery: string) {
  const graphSearch = useMemo(() => new NodeTagSearch(graphComponent), [graphComponent])

  const updateSearch = useCallback(
    () => graphSearch.updateSearch(searchQuery),
    [searchQuery, graphSearch]
  )

  useEffect(() => {
    graphComponent.graph.addNodeCreatedListener(updateSearch)
    graphComponent.graph.addNodeRemovedListener(updateSearch)
    return () => {
      graphComponent.graph.removeNodeCreatedListener(updateSearch)
      graphComponent.graph.removeNodeRemovedListener(updateSearch)
    }
  }, [graphComponent, searchQuery, updateSearch])

  useEffect(() => {
    updateSearch()
  }, [searchQuery, updateSearch])
}
