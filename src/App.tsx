import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useCallback, useState } from 'react';
import { SendMessageTypes } from './models/INodeTypes';
import DrawerComponent from './subcomponents/Drawers/Drawer';
import type { INodeData } from './models/INodeData';
import { Toaster, toast } from 'react-hot-toast';
import Button from '@mui/material/Button';

const initialNodes: INodeData[] = [];
const initialEdges: any[] = [];
export default function App() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [hasChanges, setHasChanges] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const onNodesChange = useCallback((changes: any) => {
    setHasChanges(true);
    setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot));
  }, []);

  const onEdgesChange = useCallback((changes: any) => {
    setHasChanges(true);
    setEdges((edgesSnapshot: any) => applyEdgeChanges(changes, edgesSnapshot));
  }, []);

  const onConnect = useCallback(
    (params: any) => {
      let sourceId = Number(params.source.split("-")[1])
      if (!checkIfSourceHasEdge(edges) || sourceId != 1) {
        setEdges((edgesSnapshot: any) => {
          setHasChanges(true);
          return addEdge(params, edgesSnapshot);
        });
      } else {
        toast.error('Source Node can not have more than 2 edges');
      }
    },
    [edges]
  );

  const handleSave = () => {
    try {
      let set = new Set();
      edges.map((edge) => {
        let sourceId = Number(edge.source.split("-")[1]);
        let destId = Number(edge.target.split("-")[1])
        set.add(sourceId)
        set.add(destId)
      })
      if (set.size == nodes.length) {
        toast.success('Flow saved!');
        setHasChanges(false);
      }
      else {
        toast.error('Cannot save Flow');
      }
    } catch (err) {
      toast.error('Cannot save Flow');
    }
  };

  const AddNode = () => {
    try {
      const GAP_Y = 100;
      const GAP_X = 50;

      let newPosition = { x: 0, y: 0 };

      if (nodes.length > 0) {
        const lastNode = nodes.reduce((prev, current) =>
          current.position.y > prev.position.y ? current : prev
        );

        newPosition = {
          x: lastNode.position.x + GAP_X,
          y: lastNode.position.y + GAP_Y,
        };
      }

      const newNodeId = `customnode-${nodes.length + 1}`;
      const newNode: INodeData = {
        id: newNodeId,
        type: 'SendMessage',
        position: newPosition,
        data: { label: `Write Message`, UpdateNodeData: UpdateNodeData },
      };

      setNodes((prevNodes) => [...prevNodes, newNode]);
    } catch (err) {
      console.error('Error adding node:', err);
    }
  };

  const UpdateNodeData = (Id: number, label: string) => {
    setNodes((prevNodes) => {
      const updatedNodes = [...prevNodes];
      const nodeToUpdate = { ...updatedNodes[Id - 1] };
      nodeToUpdate.data = { ...nodeToUpdate.data, label };
      updatedNodes[Id - 1] = nodeToUpdate;
      return updatedNodes;
    });

  }

  const checkIfSourceHasEdge = (Edges: any) => {
    try {
      let found = false;
      Edges.forEach((e: any) => {
        let nodeId = e?.source?.split('-')[1];
        if (nodeId === '1') {
          found = true;
        }
      });
      return found;
    } catch (err) {
      console.log(err);
      return true;
    }
  };

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <Toaster position="top-center" />

      <div
        style={{
          position: 'absolute',
          top: 10,
          right: 20,
          zIndex: 1000,
          display: 'flex',
          gap: '10px',
        }}
      >
        {hasChanges && (
          <Button
            variant="outlined"
            onClick={handleSave}
            sx={{
              borderColor: '#1976d2',
              color: '#1976d2',
              textTransform: 'none',
            }}
          >
            Save Changes
          </Button>
        )}

        <Button
          variant="outlined"
          onClick={() => setDrawerOpen(true)}
          sx={{ textTransform: 'none' }}
        >
          Add Node
        </Button>
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={SendMessageTypes}
        onConnect={onConnect}
        fitView
      >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
      <DrawerComponent open={drawerOpen} setOpen={setDrawerOpen} AddNode={AddNode} />
    </div>
  );
}
