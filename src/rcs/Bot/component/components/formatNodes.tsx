// import React from "react";

// const formatNodes = (nodes) => {
//   const firstNodePosition = nodes[0]?.position?.x;
//   const alignedNodes = nodes.map((node: any, index: number) => ({
//     ...node,
//     position: { x: index * 200, y: 100 },
//   }));

//   console.log(alignedNodes);
//   return alignedNodes;

//   //   return <div>FormatNodes</div>;
// };

// export default formatNodes;

// layout.ts
import dagre from "dagre";
import { Edge, Node, Position } from "@xyflow/react";

type Dir = "LR" | "RL" | "TB" | "BT";

const NODE_WIDTH = 260; // fallback width for custom nodes
const NODE_HEIGHT = 64; // fallback height; list nodes may grow taller

export function formatNodes(
  nodes: Node[],
  edges: Edge[],
  direction: Dir = "LR",
  {
    nodesep = 60, // horizontal spacing between nodes
    ranksep = 80, // vertical spacing between ranks
    ranker = "network-simplex" as
      | "tight-tree"
      | "longest-path"
      | "network-simplex",
  } = {}
) {
  const g = new dagre.graphlib.Graph();
  g.setGraph({
    rankdir: direction, // LR = left->right, TB = top->bottom
    nodesep,
    ranksep,
    ranker,
    marginx: 20,
    marginy: 20,
  });
  g.setDefaultEdgeLabel(() => ({}));

  // tell dagre each node’s size (use measured dimensions if you have them in node.style)
  nodes.forEach((n) => {
    const width =
      (typeof n.measured?.width === "number" && n.measured.width) ||
      (typeof (n.style as any)?.width === "number" && (n.style as any).width) ||
      NODE_WIDTH;

    const height =
      (typeof n.measured?.height === "number" && n.measured.height) ||
      (typeof (n.style as any)?.height === "number" &&
        (n.style as any).height) ||
      (Array.isArray((n.data as any)?.items)
        ? 36 + 28 * (n.data as any).items.length
        : NODE_HEIGHT);

    g.setNode(n.id, { width, height });
  });

  edges.forEach((e) => {
    g.setEdge(e.source, e.target);
  });

  dagre.layout(g);

  const isHorizontal = direction === "LR" || direction === "RL";

  const layoutedNodes: Node[] = nodes.map((n) => {
    const { x, y } = g.node(n.id);
    return {
      ...n,
      targetPosition: isHorizontal ? Position.Left : Position.Top,
      sourcePosition: isHorizontal ? Position.Right : Position.Bottom,
      position: {
        // react-flow expects top-left; dagre returns center
        x: x - g.node(n.id).width / 2,
        y: y - g.node(n.id).height / 2,
      },
      // prevent RF from auto-shifting positions after we place them
      // (only if you’re programmatically laying out)
      draggable: true,
    };
  });

  return { node: layoutedNodes, edge: edges };
}
