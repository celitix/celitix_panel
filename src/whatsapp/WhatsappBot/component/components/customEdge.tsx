import React from "react";
import {
  BaseEdge,
  EdgeLabelRenderer,
  getBezierPath,
  EdgeProps,
  useReactFlow,
} from "@xyflow/react";

// ICONS
import { MdClose } from "react-icons/md";

// COMPONENTS
import CustomTooltip from "@/components/common/CustomTooltip";

export default function DeletableEdge(props: EdgeProps) {
  const {
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    markerEnd,
    style,
    label,
  } = props;
  const { setEdges } = useReactFlow();

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const onDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEdges((eds) => eds.filter((edge) => edge.id !== id));
  };

  return (
    <>
      <BaseEdge id={id} path={edgePath} markerEnd={markerEnd} style={style} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            pointerEvents: "all",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
          className="nodrag nopan"
        >
          {label ? (
            <span className="text-xs bg-white border border-gray-200 px-2 py-0.5 rounded">
              {label}
            </span>
          ) : null}
          <CustomTooltip title="delete node">
            <button
              onClick={onDelete}
              className="p-0.5 leading-[18px] flex items-center justify-center rounded-full border border-red-300 bg-white font-bold cursor-pointer hover:border-white hover:scale-135 transition-all ease-in hover:bg-red-500  text-gray-700 hover:text-white"
              title="Delete edge"
            >
              <MdClose className="text-red-800 hover:text-white" />
            </button>
          </CustomTooltip>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
