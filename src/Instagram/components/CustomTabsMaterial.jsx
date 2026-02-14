// import React, { useState, useRef, useEffect } from "react";
// import { motion } from "framer-motion";
// import {
//     Tabs,
//     TabsHeader,
//     TabsBody,
//     Tab,
//     TabPanel,
// } from "@material-tailwind/react";

// /**
//  * CustomTabs Component
//  * @param {Array} tabsData - Array of { label, value, icon, content }
//  * @param {String} defaultValue - Default active tab value
//  * @param {String} className - Additional Tailwind classes for styling
//  */
// const CustomTabsMaterial = ({ tabsData, defaultValue, className = "" }) => {

//     return (
//         <Tabs value={defaultValue || (tabsData?.length > 0 ? tabsData[0].value : "")} className={className}>
//             {/* Tabs Header */}
//             <TabsHeader >
//                 {tabsData?.map(({ label, value, icon: Icon }) => (
//                     <Tab key={value} value={value}>
//                         <div className="flex items-center gap-2 ">
//                             {Icon && <Icon className="w-5 h-5" />}
//                             {label}
//                         </div>
//                     </Tab>
//                 ))}
//             </TabsHeader>

//             {/* Tabs Content */}
//             <TabsBody>
//                 {tabsData?.map(({ value, content }) => (
//                     <TabPanel key={value} value={value} className="py-4">
//                         {content}
//                     </TabPanel>
//                 ))}
//             </TabsBody>
//         </Tabs>
//     );
// };

// export default CustomTabsMaterial;

import React, { useState, useEffect } from "react";
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";
import { motion, AnimatePresence } from "framer-motion";

const CustomTabsMaterial = ({ tabsData, defaultValue, className = "" }) => {
    const [activeTab, setActiveTab] = useState(
        defaultValue || tabsData?.[0]?.value
    );

    // Use this to prevent animation on first mount if preferred
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => setIsMounted(true), []);

    return (
        <Tabs value={activeTab} className={`w-full ${className}`}>
            {/* HEADER: Production-level glass container */}
            <div className="relative p-1 bg-gray-100/80 backdrop-blur-lg rounded-2xl border border-white/20 shadow-inner  overflow-auto">
                <TabsHeader
                    className="bg-transparent p-0 relative z-10"
                    // We disable the default indicator to use our custom Framer one
                    indicatorProps={{ className: "hidden" }}
                >
                    {tabsData?.map(({ label, value, icon: Icon }) => {
                        const isActive = activeTab === value;
                        return (
                            <Tab
                                key={value}
                                value={value}
                                onClick={() => setActiveTab(value)}
                                className="relative py-3 transition-colors duration-300 mx-1"
                            >
                                <div className="flex flex-wrap text-nowrap items-center justify-center gap-2.5 relative z-20">
                                    {Icon && (
                                        <Icon
                                            className={`w-5 h-5 transition-all duration-500 ${isActive
                                                ? "text-blue-600 scale-110"
                                                : "text-gray-400 group-hover:text-gray-600"
                                                }`}
                                        />
                                    )}
                                    <span
                                        className={`text-sm font-semibold tracking-tight transition-all duration-300 ${isActive ? "text-blue-600" : "text-gray-500"
                                            }`}
                                    >
                                        {label}
                                    </span>
                                </div>

                                {/* THE PILL: Framer Motion for smooth sliding */}
                                {isActive && (
                                    <motion.div
                                        layoutId="active-pill"
                                        className="absolute inset-0 bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.08)] border border-gray-100 z-10"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                            </Tab>
                        );
                    })}
                </TabsHeader>
            </div>

            {/* BODY: Animated content without flicker */}
            <div className="mt-4 overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: 10, filter: "blur(4px)" }}
                        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, x: -10, filter: "blur(4px)" }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="w-full"
                    >
                        <TabPanel value={activeTab} className="">
                            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-scroll relative">
                                {tabsData.find((t) => t.value === activeTab)?.content}
                            </div>
                        </TabPanel>
                    </motion.div>
                </AnimatePresence>
            </div>
        </Tabs>
    );
};

export default CustomTabsMaterial;
