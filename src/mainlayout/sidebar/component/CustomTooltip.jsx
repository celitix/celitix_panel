// import { motion, AnimatePresence } from "framer-motion";

// const CustomTooltip = ({ show, text, children }) => {
//   return (
//     <div className="relative flex items-center">
//       {children}

//       <AnimatePresence>
//         {show && (
//           <motion.div
//             initial={{ opacity: 0, x: -6 }}
//             animate={{ opacity: 1, x: 0 }}
//             exit={{ opacity: 0, x: -6 }}
//             transition={{ duration: 0.15 }}
//             className="absolute left-0 ml-3 z-[9999]
//                        whitespace-nowrap rounded-md
//                        bg-gray-900 text-white text-xs
//                        px-3 py-1.5 shadow-lg"
//           >
//             {text}

//             {/* Arrow */}
//             <span className="absolute left-[-5px] top-1/2 -translate-y-1/2
//                              w-2.5 h-2.5 rotate-45 bg-gray-900" />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default CustomTooltip;



// import { useRef } from "react";
// import { Popper, Paper } from "@mui/material";
// import { motion } from "framer-motion";

// const CustomTooltip = ({ show, text, children }) => {
//   const anchorRef = useRef(null);

//   return (
//     <div ref={anchorRef} className="flex items-center">
//       {children}

//       <Popper
//         open={show}
//         anchorEl={anchorRef.current}
//         placement="right"
//         modifiers={[
//           { name: "offset", options: { offset: [0, 8] } },
//         ]}
//         sx={{ zIndex: 9999, backgroundColor: "#000", borderRadius: "10px" }}
//       >
//         <Paper elevation={4} sx={{ backgroundColor: "#000", borderRadius: "10px" }}>
//           <motion.div
//             initial={{ opacity: 0, x: -6 }}
//             animate={{ opacity: 1, x: 0 }}
//             exit={{ opacity: 0, x: -6 }}
//             transition={{ duration: 0.15 }}
//             className="whitespace-nowrap rounded-md
//                text-white text-xs
//               px-3 py-1.5 shadow-lg"
//           >
//             {text}

//             <span className="absolute left-[-5px] top-1/2 -translate-y-1/2
//                              w-2.5 h-2.5 rotate-45 bg-gray-900" />
//           </motion.div>
//         </Paper>
//       </Popper>
//     </div>
//   );
// };

// export default CustomTooltip;


import { useRef } from "react";
import { Popper, Paper } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

const CustomTooltip = ({ show, text, children }) => {
  const anchorRef = useRef(null);

  return (
    <div ref={anchorRef} className="flex items-center">
      {children}

      <Popper
        open={show}
        anchorEl={anchorRef.current}
        placement="right"
        // Ensure Popper sits above other elements
        style={{ zIndex: 9999, pointerEvents: 'none' }}
        modifiers={[
          { name: "offset", options: { offset: [0, 12] } },
        ]}
      >
        {/* AnimatePresence allows the 'exit' animation to trigger */}
        <AnimatePresence>
          {show && (
            <Paper elevation={0} sx={{ background: "transparent", boxShadow: 'none' }}>
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="relative whitespace-nowrap rounded-lg
                           bg-gray-900 text-white text-xs
                           px-3 py-1.5 shadow-xl"
              >
                {text}

                {/* The Arrow: Matching the bg-gray-900 of the parent div */}
                <div
                  className="absolute left-[-4px] top-1/2 -translate-y-1/2
                             w-2.5 h-2.5 rotate-45 bg-gray-900"
                />
              </motion.div>
            </Paper>
          )}
        </AnimatePresence>
      </Popper>
    </div>
  );
};

export default CustomTooltip;
