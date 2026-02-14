// import react, { useState, useEffect } from "react";
// import DropdownWithSearch from "@/whatsapp/components/DropdownWithSearch";
// import { InputSwitch } from "primereact/inputswitch";
// import { MultiSelect } from "primereact/multiselect";
// import UniversalButton from "./../../components/UniversalButton";

// const CommonComponent = ({ handleSave, tabs, toggleChecked, setToggleChecked }) => {
//   const [selectedOperator, setSelectedOperator] = useState("");
//   const [selectedComponent, setSelectedComponent] = useState("");
//   const [selectedComponentList, setSelectedComponentList] = useState([]);
//   console.log("selectedComponentList", selectedComponentList);

//   useEffect(() => {
//     if (!selectedComponent) return;
//     setSelectedComponentList((prev) =>
//       prev.includes(selectedComponent) ? prev : [...prev, selectedComponent],
//     );
//   }, [selectedComponent]);

//   const operatorOptions = [
//     { value: "==", label: "== (Equals)" },
//     { value: "!=", label: "!= (Not equals)" },
//     { value: "||", label: "|| (OR)" },
//     { value: "&&", label: "&& (AND)" },
//   ];

//   const components = tabs?.flatMap((tab) =>
//     tab.payload.map((c) => ({
//       label: c.type,
//       value: c.type,
//     })),
//   );

//   return (
//     <>
//       <div>
//         <div className="flex gap-4">
//           <InputSwitch
//             checked={toggleChecked}
//             onChange={(e) => setToggleChecked(e.value)}
//             className="mt-1"
//           />
//           {toggleChecked && (
//             <div className="w-70">
//               <DropdownWithSearch
//                 id={"comparisonOperators"}
//                 name={"comparisonOperators"}
//                 // label={"Comparison Operators"}
//                 placeholder={"Comparison Operators"}
//                 value={selectedOperator}
//                 options={operatorOptions}
//                 onChange={(e) => setSelectedOperator(e)}
//               />
//             </div>
//           )}
//         </div>

//         <div className="mt-4">
//           <div className="card flex justify-content-center">
//             <MultiSelect
//               value={selectedComponent}
//               onChange={(e) => setSelectedComponent(e.value)}
//               options={components}
//               optionLabel="label"
//               filter
//               filterDelay={400}
//               placeholder="Select Component"
//               maxSelectedLabels={3}
//               className="w-full md:w-20rem"
//             />
//           </div>
//         </div>
//         {selectedComponentList.length > 0 && (
//           <div className="mt-2 border border-gray-200 rounded-xl p-2 bg-gray-300 shadow-xl">
//             {selectedComponentList?.map((comp, i) => (
//               <p className="text-sm font-medium text-gray-800">{comp}</p>
//             ))}
//           </div>
//         )}

//         <div className="flex justify-center mt-5">
//           <UniversalButton label="Save" onClick={handleSave} />
//         </div>
//       </div>
//     </>
//   );
// };

// export default CommonComponent;
import react, { useState, useEffect } from "react";
import DropdownWithSearch from "@/whatsapp/components/DropdownWithSearch";
import { InputSwitch } from "primereact/inputswitch";
import { MultiSelect } from "primereact/multiselect";
import UniversalButton from "./../../components/UniversalButton";


const CommonComponent = ({ handleSave, tabs, toggleChecked, setToggleChecked }) => {
  const [selectedComponent, setSelectedComponent] = useState("");
  const [selectedOperator, setSelectedOperator] = useState("==");
  const [selectedOptionId, setSelectedOptionId] = useState("");

  // 1. Extract all components
  const allComponents = tabs?.flatMap(tab => tab.payload || []) || [];

  // 2. Filter triggerable components
  const triggerable = allComponents.filter(c =>
    ["dropDown", "radioButton", "checkBox", "chipSelector", "switch", "textInput"].includes(c.type)
  );

  // const componentOptions = triggerable.map(c => {
  //   // FALLBACK: If 'name' is missing, use 'storeId' or 'type_index'
  //   const identifier = c.name || c.storeId || `${c.type}_${c.index}`;
  //   return {
  //     label: `${c.type.toUpperCase()} - ${c.label || identifier}`,
  //     value: identifier,
  //     raw: c // keep reference to find options later
  //   };
  // });
  const componentOptions = triggerable.map(c => {
    // Priority: 1. Manually set name, 2. Pretty name, 3. fallback storeId
    const identifier = c.name || c.storeId;
    return {
      label: `${c.type.toUpperCase()} (${identifier})`,
      value: identifier,
    };
  });

  // Find the currently active component object based on the selected identifier
  const activeComp = triggerable.find(c =>
    (c.name === selectedComponent) || (c.storeId === selectedComponent) || (`${c.type}_${c.index}` === selectedComponent)
  );

  // 3. Define Operators
  const getOperators = () => {
    if (!activeComp) return [];
    if (["checkBox", "chipSelector"].includes(activeComp.type)) {
      return [
        { label: "Contains", value: "includes" },
        { label: "Does not contain", value: "excludes" }
      ];
    }
    return [
      { label: "Equals", value: "==" },
      { label: "Not Equals", value: "!=" }
    ];
  };

  // 4. Generate the Option List for "Value"
  const getValueOptions = () => {
    if (!activeComp) return [];

    // Look for data in your specific structure
    let rawOptions = [];

    if (activeComp["data-source"]) {
      rawOptions = activeComp["data-source"];
    } else if (activeComp.dropdown) {
      // Handle the nested structure: dropdown: { dropdown_1: { data-source: [...] } }
      const firstKey = Object.keys(activeComp.dropdown)[0];
      rawOptions = activeComp.dropdown[firstKey]?.["data-source"] || [];
    }

    return rawOptions.map(o => ({
      label: o.title || o.label || `ID: ${o.id}`,
      value: String(o.id || o.value)
    }));
  };

  const generateExpression = () => {
    if (!toggleChecked) return true;

    if (!selectedComponent || !selectedOptionId) return true;

    const name = selectedComponent;
    const val = selectedOptionId;

    switch (selectedOperator) {
      case "includes": return `\${form.${name}.includes('${val}')}`;
      case "excludes": return `\${!form.${name}.includes('${val}')}`;
      case "==": return `\${form.${name}=='${val}'}`;
      case "!=": return `\${form.${name}!='${val}'}`;
      default: return true;
    }
  };

  return (
    <div className="mt-4 p-4 bg-slate-50 border-2 border-slate-200 rounded-xl">
      <div className="flex items-center gap-2 mb-4 border-b pb-2">
        <InputSwitch checked={toggleChecked} onChange={(e) => setToggleChecked(e.value)} />
        <span className="text-sm font-black text-slate-700 uppercase tracking-widest">Logic Engine</span>
      </div>

      {toggleChecked && (
        <div className="space-y-4">
          <DropdownWithSearch
            label="1. If User interacts with:"
            options={componentOptions}
            value={selectedComponent}
            onChange={(val) => {
              setSelectedComponent(val);
              setSelectedOptionId("");
            }}
            placeholder="Select a component"
          />

          <div className="flex gap-2">
            <div className="w-1/2">
              <DropdownWithSearch
                label="2. Logic:"
                options={getOperators()}
                value={selectedOperator}
                onChange={(val) => setSelectedOperator(val)}
              />
            </div>

            <div className="w-1/2">
              <DropdownWithSearch
                label="3. When value is:"
                options={getValueOptions()}
                value={selectedOptionId}
                onChange={(val) => setSelectedOptionId(val)}
                disabled={!selectedComponent}
                placeholder="Select Choice"
              />
            </div>
          </div>

          <div className="bg-slate-900 p-3 rounded-lg border-l-4 border-green-500">
            <p className="text-[10px] text-gray-400 font-mono italic mb-1">Generated JSON Logic:</p>
            <code className="text-green-400 text-xs break-all leading-relaxed">{generateExpression()}</code>
          </div>
        </div>
      )}


      <div className="flex justify-center mt-5">
        <UniversalButton
          label="Save"
          onClick={() => {
            const expression = generateExpression();
            handleSave(expression);
          }}
        />
      </div>
    </div>
  );
};

export default CommonComponent;
