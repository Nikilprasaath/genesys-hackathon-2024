 import './App.css'
 import axios from 'axios';
 import { useCallback, useEffect, useState } from 'react'
 import { ReactGraphComponent } from './components/ReactGraphComponent.tsx'
 import graphDatajson from "./data.json"

//  console.log(graphDatajson)
 
 export interface NodeData {
   id: number
   name: string
  //  colour: string
   health: number
 }
 
 export interface EdgeData {
   fromNode: number
   toNode: number
   succesRate: number
 }
 
 export interface GraphData {
   nodesSource: NodeData[]
   edgesSource: EdgeData[]
 }
  
 
 function App() {
   const [graphData, setGraphData] = useState({nodesSource:[],edgesSource:[]})

   const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://ag-infinite-loopers-bucket.s3-website-us-east-1.amazonaws.com/`
      );
      setGraphData(response.data);
    } catch (error) {
      // Handle errors
      setGraphData(graphDatajson)
    }
  }
 
  //  const addNode = useCallback(() => {
  //    const newIdx = graphData.nodesSource.reduce((maxId, item) => Math.max(maxId, item.id), 0) + 1
  //    const parentNodeIdx = Math.floor(Math.random() * graphData.nodesSource.length)
  //    setGraphData((prevGraphData) => {
  //      const nodesSource = prevGraphData.nodesSource.concat({
  //        id: newIdx,
  //        name: `Node ${newIdx}`
  //      })
 
  //      // Create an edge if the graph was not empty
  //      let edgesSource = prevGraphData.edgesSource
  //      if (parentNodeIdx > -1) {
  //        edgesSource = prevGraphData.edgesSource.concat({
  //          fromNode: nodesSource[parentNodeIdx].id,
  //          toNode: newIdx
  //         //  successRate: 
  //        })
  //      }
 
  //      return {
  //        nodesSource,
  //        edgesSource
  //      }
  //    })
  //  }, [graphData, setGraphData])
 
  //  const removeNode = useCallback(() => {
  //    setGraphData((prevGraphData) => {
  //      const randomNodeIdx = Math.floor(Math.random() * prevGraphData.nodesSource.length)
  //      const newNodesSource = [...prevGraphData.nodesSource]
  //      newNodesSource.splice(randomNodeIdx, 1)
 
  //      const nodeId = prevGraphData.nodesSource[randomNodeIdx].id
  //      const newEdgesSource = prevGraphData.edgesSource.filter(
  //        (edge) => edge.fromNode !== nodeId && edge.toNode !== nodeId
  //      )
  //      return {
  //        nodesSource: newNodesSource,
  //        edgesSource: newEdgesSource
  //      }
  //    })
  //  }, [setGraphData])
 
   const resetData = useCallback(() => {
    const GRAPH_DATA = {
      nodesSource: [
        {
          id: 0,
          name: 'Frontend',
          health: 70
        },
        {
          id: 1,
          name: 'Ad Service',
          health: 100
        },
        {
          id: 2,
          name: 'Checkout Service',
          health: 35
        },
        {
         id: 3,
         name: 'Cart Service',
         health: 40
       },
       {
         id: 4,
         name: 'Currency Service',
         health: 100
       },
       {
         id: 5,
         name: 'Email Service',
         health: 30
       },
       {
         id: 6,
         name: 'Payment Service',
         health: 90
       },
       {
         id: 7,
         name: 'Recommendation Service',
         health: 45
       },
       {
         id: 8,
         name: 'Shipping Service',
         health: 70
       },
       {
         id: 9,
         name: 'queue(Kafka)',
         health: 45
       },
       {
         id: 10,
         name: 'Accounting Service',
         health: 40
       },
       {
         id: 11,
         name: 'Fraud Detection Service',
         health: 15
       },
       {
         id: 12,
         name: 'Cache(redis)',
         health: 55
       },
       {
         id: 13,
         name: 'Product Catalog Service',
         health: 75
       },
       {
         id: 14,
         name: 'Quote Service',
         health: 85
       }
      ],
      edgesSource: [
        {
          fromNode: 0,
          toNode: 1,
          successRate: 70
        },
        {
          fromNode: 0,
          toNode: 3,
          successRate: 100
        },
        {
         fromNode: 0,
         toNode: 4,
         successRate: 80
       },
       {
         fromNode: 0,
         toNode: 2,
         successRate: 40
       },
       {
         fromNode: 0,
         toNode: 13,
         successRate: 50
       },
       {
         fromNode: 0,
         toNode: 7,
         successRate: 85
       },
       {
         fromNode: 0,
         toNode: 8,
         successRate: 75
       },
       {
         fromNode: 2,
         toNode: 9,
         successRate: 60
       },
       {
         fromNode: 2,
         toNode: 3,
         successRate: 55
       },
       {
         fromNode: 2,
         toNode: 4,
         successRate: 40
       },
       {
         fromNode: 2,
         toNode: 5,
         successRate: 80
       },
       {
         fromNode: 2,
         toNode: 6,
         successRate: 100
       },
       {
         fromNode: 2,
         toNode: 13,
         successRate: 95
       },
       {
         fromNode: 2,
         toNode: 8,
         successRate: 45
       },
       {
         fromNode: 9,
         toNode: 10,
         successRate: 30
       },
       {
         fromNode: 9,
         toNode: 11,
         successRate: 25
       },
       {
         fromNode: 3,
         toNode: 12,
         successRate: 70
       },
       {
         fromNode: 7,
         toNode: 13,
         successRate: 85
       },
       {
         fromNode: 8,
         toNode: 15,
         successRate: 10
       },
       {
         fromNode: 0,
         toNode: 7,
         successRate: 45
       }
      ]
    }

    fetchData()
   }, [setGraphData])

  //  useEffect(() => {
  //   let counter = 0
  //   setTimeout(function() {
  //     setInterval(function() {
  //       counter += 1
  //       console.log(counter)
  //       resetData()
  
  //     }, 15000)
    
  //   })
  //  },[])

  useEffect(() => {
    fetchData()
  },[])
 
   return (
     <div className="app">
       <ReactGraphComponent graphData={graphData} onResetData={resetData} />
     </div>
   )
 }
 
 export default App
 