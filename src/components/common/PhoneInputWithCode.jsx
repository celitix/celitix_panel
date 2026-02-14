// import React, { useMemo } from "react";
// import Select, { components } from "react-select";
// import { countryList } from "@/login/constants/countryList.js";
// import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";

// const PhoneInputWithSearchCode = ({
//     label = "Mobile Number",
//     selectedCode,
//     onCodeChange,
//     value,
//     onChange,
//     placeholder = "Enter mobile number",
//     disabled = false,
//     error = "",
// }) => {
//     // Prepare options from countryList
//     const options = useMemo(
//         () =>
//             countryList.map((c) => ({
//                 value: c.countryCode,
//                 label: `+${c.countryCode} ${c.countryName}`,
//                 maxLength: c.maxLength,
//             })),
//         []
//     );

//     // Get maxLength for selected code
//     const current = options.find((c) => c.value === Number(selectedCode));
//     const maxLength = current?.maxLength || 10;

//     // Custom Dropdown Indicator
//     const DropdownIndicator = (props) => (
//         <components.DropdownIndicator {...props}>
//             <KeyboardArrowDown
//                 style={{
//                     transition: "transform 0.2s ease",
//                     color: "#000",
//                     fontWeight: "bold",
//                     transform: props.selectProps.menuIsOpen
//                         ? "rotate(180deg)"
//                         : "rotate(0deg)",
//                 }}
//             />
//         </components.DropdownIndicator>
//     );

//     const customStyles = {
//         control: (provided) => ({
//             ...provided,
//             minWidth: "100px",
//             width: "120px",
//             borderRadius: "0",
//             borderRight: "1px solid #ccc",
//             height: "38px",
//             boxShadow: "none",
//             cursor: "pointer",
//         }),
//         menu: (provided) => ({
//             ...provided,
//             fontSize: "14px",
//             cursor: "pointer",
//         }),
//         option: (provided, state) => ({
//             ...provided,
//             backgroundColor: state.isSelected ? "#DDE7EE" : "white",
//             color: "black",
//             cursor: "pointer",
//         }),
//         singleValue: (provided) => ({
//             ...provided,
//             color: "black",
//         }),
//     };

//     return (
//         <div className="w-full">
//             {label && (
//                 <label className="block mb-2 text-sm font-medium text-gray-700">
//                     {label}
//                 </label>
//             )}

//             <div className="flex items-center border border-gray-300 rounded-md overflow-hidden shadow-sm focus:outline-none">
//                 <Select
//                     value={options.find((opt) => opt.value === selectedCode) || null}
//                     onChange={(selected) => onCodeChange(selected?.value || "")}
//                     options={options}
//                     isSearchable
//                     isDisabled={disabled}
//                     styles={customStyles}
//                     components={{ DropdownIndicator }}
//                     menuPosition="fixed"
//                     menuShouldBlockScroll={true}
//                     closeMenuOnSelect={true}
//                     placeholder="Code"
//                 />

//                 <input
//                     type="text"
//                     value={value}
//                     onChange={onChange}
//                     placeholder={placeholder}
//                     maxLength={maxLength}
//                     disabled={disabled}
//                     className="flex-1 px-3 py-2 text-sm outline-none bg-white"
//                 />
//             </div>

//             {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
//         </div>
//     );
// };

// export default PhoneInputWithSearchCode;


import React, { useMemo } from "react";
import Select, { components } from "react-select";

// ICONS
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";

// COMPONENTS
import { countryList } from "@/login/constants/countryList.js";

const PhoneInputWithSearchCode = ({
    label = "Mobile Number",
    selectedCode,
    onCodeChange,
    value,
    onChange,
    placeholder = "Enter mobile number",
    disabled = false,
    error = "",
}) => {
    // Prepare options from countryList
    const options = useMemo(
        () =>
            countryList.map((c) => ({
                value: c.countryCode,
                label: `+${c.countryCode} ${c.countryName}`,
                codeOnly: `+${c.countryCode}`,
                maxLength: c.maxLength,
            })),
        []
    );

    const defaultCode = selectedCode || 91;

    // Get maxLength for selected code
    // const current = options.find((c) => c.value === Number(selectedCode));
    const current = options.find((c) => c.value === Number(defaultCode));
    const maxLength = current?.maxLength || 10;

    // Custom Dropdown Indicator
    const DropdownIndicator = (props) => (
        <components.DropdownIndicator {...props}>
            <KeyboardArrowDown
                style={{
                    fontSize: "15px",
                    transition: "transform 0.2s ease",
                    color: "#000",
                    fontWeight: "bold",
                    transform: props.selectProps.menuIsOpen
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                }}
            />
        </components.DropdownIndicator>
    );

    // Custom Single Value: show only the code
    const SingleValue = ({ data, ...props }) => (
        <components.SingleValue {...props}>{data.codeOnly}</components.SingleValue>
    );

    const customStyles = {
        control: (provided) => ({
            ...provided,
            minWidth: "100px",
            width: "120px",
            borderRadius: "0",
            borderRight: "1px solid #ccc",
            height: "38px",
            boxShadow: "none",
            cursor: "pointer",
            fontSize: "15px",
            borderColor: "#fff",
            "&:hover": {
                borderColor: "#fff",
            },
            outline: "none",
        }),
        menu: (provided) => ({
            ...provided,
            fontSize: "13px",
            cursor: "pointer",
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? "#DDE7EE" : "white",
            color: "black",
            cursor: "pointer",
        }),
        singleValue: (provided) => ({
            ...provided,
            color: "black",
        }),
    };

    return (
        <div className="w-full">
            {label && (
                <label className="block mb-2 text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}

            <div className="flex items-center rounded-xl overflow-hidden shadow-sm focus:outline-none border">
                {/* Country Code Dropdown */}
                <Select
                    // value={options.find((opt) => opt.value === selectedCode) || null}
                    value={options.find((opt) => opt.value === Number(defaultCode)) || null}
                    onChange={(selected) => onCodeChange(selected?.value || 91)}
                    options={options}
                    isSearchable
                    isDisabled={disabled}
                    styles={customStyles}
                    components={{ DropdownIndicator, SingleValue }}
                    menuPosition="fixed"
                    menuShouldBlockScroll={true}
                    closeMenuOnSelect={true}
                    placeholder="Code"
                />

                {/* Phone Number Input */}
                <input
                    type="text"
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    maxLength={maxLength}
                    disabled={disabled}
                    className="flex-1 px-3 py-2 text-sm outline-none bg-white"
                />
            </div>

            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    );
};

export default PhoneInputWithSearchCode;
