import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import React, { useEffect } from "react";

export const Agent = ({
  id,
  nodesInputData,
  setNodesInputData,
  agentState,
}: {
  id: number;
  nodesInputData: any;
  setNodesInputData: React.Dispatch<React.SetStateAction<{}>>;
  agentState: {
    agent: any[];
    dept: any[];
  };
}) => {
  const agentOption = agentState.agent.map((item: any) => ({
    value: item.sr_no,
    label: item.name,
  }));

  const departmentOption = agentState.dept.map((item: any) => ({
    value: item.departmentId,
    label: item.departmentName,
  }));

  useEffect(() => {
    setNodesInputData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        type: nodesInputData[id]?.type || nodesInputData[id]?.radio,
        id:
          nodesInputData[id]?.id ||
          nodesInputData[id]?.agentId ||
          nodesInputData[id]?.departmentId,
      },
    }));
  }, []);

  return (
    <div className="flex gap-2 flex-col">
      <AnimatedDropdown
        id="selectAgentorDept"
        name="selectAgentorDept"
        label="Select Agent or Department"
        options={[
          { value: "agent", label: "Agent" },
          { value: "department", label: "Department" },
        ]}
        value={nodesInputData[id]?.type}
        onChange={(e: any) => {
          setNodesInputData((prev) => ({
            ...prev,
            [id]: {
              ...prev[id],
              type: e,
            },
          }));
        }}
      />

      <AnimatedDropdown
        id="selectAgentorDept"
        name="selectAgentorDept"
        label="Select Agent or Department"
        options={
          nodesInputData[id]?.type === "agent"
            ? agentOption
            : nodesInputData[id]?.type === "department"
            ? departmentOption
            : []
        }
        value={nodesInputData[id]?.id}
        onChange={(e: any) => {
          setNodesInputData((prev) => ({
            ...prev,
            [id]: {
              ...prev[id],
              id: e,
            },
          }));
        }}
      />
    </div>
  );
};
