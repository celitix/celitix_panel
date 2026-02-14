import InputField from "@/whatsapp/components/InputField";
import React from "react";

const Location = ({
  id,
  nodesInputData,
  setNodesInputData,
  nodes,
}: {
  id: number;
  nodesInputData: any;
  setNodesInputData: React.Dispatch<React.SetStateAction<{}>>;
  nodes: any[];
}) => {
  return (
    <div>
      <InputField
        id="locationTitle"
        name="locationTitle"
        tooltipContent="Enter Location Title. MaxLength: 20"
        placeholder="Enter Location Title"
        label="Location Title"
        value={nodesInputData[id]?.textMessage}
        onChange={(e) => {
          setNodesInputData((prev) => ({
            ...prev,
            [id]: {
              ...prev[id],
              textMessage: e.target.value,
            },
          }));
        }}
      />
    </div>
  );
};

export default Location;
