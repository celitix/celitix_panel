// // components/Tour.jsx
// import React, { useEffect, useRef, useState } from "react";
// import { TourProvider, useTour } from "@reactour/tour";
// import Drawer from "@mui/material/Drawer";
// import Button from "@mui/material/Button";

// const TourStepsList = ({ steps, onClose }) => {
//   const { setIsOpen, setCurrentStep } = useTour();

//   const openStep = (index) => {
//     setCurrentStep(index);
//     setIsOpen(true);
//     if (onClose) onClose();
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-lg border border-gray-300 p-4">
//       <h3 className="font-semibold text-lg mb-3">Tour Steps</h3>
//       <ul className="space-y-2">
//         {steps.map((step, index) => (
//           <li
//             key={index}
//             onClick={() => openStep(index)}
//             className="p-3 border rounded cursor-pointer hover:bg-blue-50 transition"
//           >
//             <p className="font-medium text-sm">
//               {index + 1}. {step.title}
//             </p>
//             <p className="text-xs text-gray-500">{step.description}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// const InnerTour = ({ steps }) => {
//   const { isOpen, setIsOpen, setCurrentStep } = useTour();
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//   const hasAutoStarted = useRef(false);

//   // auto-start only once per page load
//   useEffect(() => {
//     if (!hasAutoStarted.current) {
//       setCurrentStep(0);
//       setIsOpen(true);
//       hasAutoStarted.current = true;
//     }
//   }, [setCurrentStep, setIsOpen]);

//   // lock body scroll
//   useEffect(() => {
//     document.body.style.overflow = isOpen ? "hidden" : "auto";
//     return () => (document.body.style.overflow = "auto");
//   }, [isOpen]);

//   // close drawer when tour opens
//   useEffect(() => {
//     if (isOpen) setIsDrawerOpen(false);
//   }, [isOpen]);

//   const startTour = () => {
//     setCurrentStep(0);
//     setIsOpen(true);
//   };

//   return (
//     // <div className="">
//     //   <div className="flex justify-between pt-10">
//     //     <button
//     //       className="fixed bottom-5 right-10 px-3 py-2 shadow rounded-full bg-green-300"
//     //       onClick={() => setIsDrawerOpen((v) => !v)}
//     //     >
//     //       Tour Details
//     //     </button>
//     //   </div>

//     //   {isDrawerOpen && (
//     //     <>
//     //       <div
//     //         className="fixed inset-0 bg-black/50 z-40"
//     //         onClick={() => setIsDrawerOpen(false)}
//     //       />
//     //       <aside className="fixed top-0 right-0 h-full w-72 bg-white p-4 z-50 overflow-y-auto">
//     //         <button
//     //           className="px-3 py-2 mb-5 shadow rounded-full bg-blue-300"
//     //           onClick={startTour}
//     //         >
//     //           Open Tour
//     //         </button>
//     //         {steps && steps.length > 0 && (
//     //           <TourStepsList
//     //             steps={steps}
//     //             onClose={() => setIsDrawerOpen(false)}
//     //           />
//     //         )}
//     //       </aside>
//     //     </>
//     //   )}
//     // </div>
//     <>
//       <Button
//         variant="contained"
//         color="success"
//         onClick={() => setIsDrawerOpen(true)}
//         sx={{ position: "fixed", bottom: 20, right: 40, zIndex: 1500 }}
//       >
//         Tour Details
//       </Button>

//       <Drawer
//         anchor="right"
//         open={isDrawerOpen}
//         onClose={() => setIsDrawerOpen(false)}
//         PaperProps={{ sx: { width: 300, p: 3 } }} // width & padding for drawer
//       >
//         <Button
//           variant="outlined"
//           color="primary"
//           onClick={() => {
//             setCurrentStep(0);
//             setIsOpen(true);
//             setIsDrawerOpen(false);
//           }}
//           sx={{ mb: 3 }}
//         >
//           Open Tour
//         </Button>

//         {steps && steps.length > 0 && (
//           <TourStepsList steps={steps} onClose={() => setIsDrawerOpen(false)} />
//         )}
//       </Drawer>
//     </>
//   );
// };

// const TourController = ({ steps, setClick }) => {
//   const { currentStep } = useTour();
//   const prevStepRef = useRef(null);

//   useEffect(() => {
//     const current = steps[currentStep];
//     const previous = prevStepRef.current;

//     // ENTERING #click → show paragraph
//     if (current?.selector === "#click" ) {
//       setClick(true);
//     }
//     // if (previous?.selector === "#click" ) {
//       //   setClick(true);
//       // }

//       // LEAVING #para → hide paragraph
//       if (previous?.selector === "#para" && current?.selector !== "#para") {
//         console.log("previous: " , previous.selector )
//         console.log("close para");
//         setClick(false);
//       }

//       prevStepRef.current = current;
//   }, [currentStep, steps, setClick]);

//   return null;
// };

// const Tour = ({ steps, setClick }) => {
//   return (
//     <TourProvider
//       steps={steps}
//       smoothScroll
//       scrollDuration={2500}
//       styles={{
//         mask: (base) => ({
//           ...base,
//           transition: "all 0.4s ease",
//         }),

//         maskArea: (base) => ({
//           ...base,
//           rx: 8,
//           padding: 20, //
//           transition: "all 0.4s ease",
//         }),
//         popover: (base) => ({
//           ...base,

//           /* prevent cutting from left/right */
//           left: Math.max(16, base.left ?? 0),
//           right: "auto",
//           marginTop: "12px",

//           maxWidth: "320px",
//           borderRadius: "14px",
//           padding: "24px 22px",

//           backgroundColor: "#ffffff",
//           boxShadow: "0 20px 40px rgba(0,0,0,0.15)",

//           transition: "all 0.3s ease",
//         }),
//         navigation: (base) => ({
//           ...base,
//           display: "flex",
//           justifyContent: "center",
//           gap: "2px",
//           maxWidth: "100%",
//           margin: "0px auto 0",
//           padding: "0 5px",
//         }),

//         badge: (base) => ({
//           ...base,
//           backgroundColor: "#2563eb",
//           fontSize: "12px",
//         }),
//         close: (base) => ({
//           ...base,
//           color: "#374151",
//           top: 10,
//           right: 12,

//           backgroundColor: "#f3f4f6",
//           borderRadius: "50%",
//           width: "12px",
//           height: "12px",

//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",

//           cursor: "pointer",
//         }),

//         dot: (base, state) => ({
//           ...base,
//           backgroundColor: state.current ? "#2563eb" : "#d1d5db",
//         }),
//       }} >
//       <TourController steps={steps} setClick={setClick} />
//       <InnerTour steps={steps} />
//     </TourProvider>
//   );
// };

// export default Tour;






// components/Tour.jsx
import React, { useEffect, useRef, useState } from "react";
import { TourProvider, useTour } from "@reactour/tour";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";

const TourStepsList = ({ steps, onClose }) => {
  const { setIsOpen, setCurrentStep } = useTour();

  const openStep = (index) => {
    setCurrentStep(index);
    setIsOpen(true);
    if (onClose) onClose();
  };

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-300 p-4">
      <h3 className="font-semibold text-lg mb-3">Tour Steps</h3>
      <ul className="space-y-2">
        {steps.map((step, index) => (
          <li
            key={index}
            onClick={() => openStep(index)}
            className="p-3 border rounded cursor-pointer hover:bg-blue-50 transition"
          >
            <p className="font-medium text-sm">
              {index + 1}. {step.title}
            </p>
            <p className="text-xs text-gray-500">{step.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

const InnerTour = ({ steps }) => {
  const { isOpen, setIsOpen, setCurrentStep } = useTour();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const hasAutoStarted = useRef(false);

  // auto-start only once per page load
  useEffect(() => {
    if (!hasAutoStarted.current) {
      setCurrentStep(0);
      setIsOpen(true);
      hasAutoStarted.current = true;
    }
  }, [setCurrentStep, setIsOpen]);

  // lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [isOpen]);

  // close drawer when tour opens
  useEffect(() => {
    if (isOpen) setIsDrawerOpen(false);
  }, [isOpen]);

  const startTour = () => {
    setCurrentStep(0);
    setIsOpen(true);
  };

  return (
    // <div className="">
    //   <div className="flex justify-between pt-10">
    //     <button
    //       className="fixed bottom-5 right-10 px-3 py-2 shadow rounded-full bg-green-300"
    //       onClick={() => setIsDrawerOpen((v) => !v)}
    //     >
    //       Tour Details
    //     </button>
    //   </div>

    //   {isDrawerOpen && (
    //     <>
    //       <div
    //         className="fixed inset-0 bg-black/50 z-40"
    //         onClick={() => setIsDrawerOpen(false)}
    //       />
    //       <aside className="fixed top-0 right-0 h-full w-72 bg-white p-4 z-50 overflow-y-auto">
    //         <button
    //           className="px-3 py-2 mb-5 shadow rounded-full bg-blue-300"
    //           onClick={startTour}
    //         >
    //           Open Tour
    //         </button>
    //         {steps && steps.length > 0 && (
    //           <TourStepsList
    //             steps={steps}
    //             onClose={() => setIsDrawerOpen(false)}
    //           />
    //         )}
    //       </aside>
    //     </>
    //   )}
    // </div>
    <>
      <Button
        variant="contained"
        color="success"
        onClick={() => setIsDrawerOpen(true)}
        sx={{ position: "fixed", bottom: 20, right: 40, zIndex: 1500 }}
      >
        Tour Details
      </Button>

      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        PaperProps={{ sx: { width: 300, p: 3 } }} // width & padding for drawer
      >
        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            setCurrentStep(0);
            setIsOpen(true);
            setIsDrawerOpen(false);
          }}
          sx={{ mb: 3 }}
        >
          Open Tour
        </Button>

        {steps && steps.length > 0 && (
          <TourStepsList steps={steps} onClose={() => setIsDrawerOpen(false)} />
        )}
      </Drawer>
    </>
  );
};

const TourController = ({ steps, setClick, setopenDropDown }) => {
  const { currentStep } = useTour();
  const prevStepRef = useRef(null);

  // useEffect(() => {
  //   const current = steps[currentStep];
  //   const previous = prevStepRef.current;

  //   // ENTERING #click → show paragraph
  //   if (current?.selector === "#click") {
  //     setClick(true);
  //   }
  //   // if (previous?.selector === "#click" ) {
  //   //   setClick(true);
  //   // }

  //   // LEAVING #para → hide paragraph
  //   if (previous?.selector === "#para" && current?.selector !== "#para") {
  //     // console.log("previous: ", previous.selector);
  //     // console.log("close para");
  //     setClick(false);
  //   }

  //   /* ---------------- DROPDOWN CONTROL ---------------- */

  //   // ENTERING dropdown step → OPEN dropdown
  //   // if (current?.selector === "#dropdown") {
  //     //   setopenDropDown(true);
  //     // }

  //     // ENTERING india step → make sure dropdown still open
  //     if (current?.selector === "#india") {
  //       console.log("previous: ", previous.selector);
  //       console.log("current: ", current.selector);
  //       setopenDropDown(true);
  //         setTimeout(() => {
  //   const select = document.getElementById("dropdown");
  //   if (select) {
  //     select.value = "two"; // India
  //     select.dispatchEvent(new Event("change", { bubbles: true }));
  //   }
  // }, 300);
  //     }

  //     // LEAVING india step → CLOSE dropdown
  //     // if (previous?.selector === "#india" && current?.selector !== "#india") {
  //     if ( current?.selector !== "#india") {
  //     setopenDropDown(false);
  //   }

  //   prevStepRef.current = current;
  // }, [currentStep, steps, setClick, setopenDropDown]);

  useEffect(() => {
    const current = steps[currentStep];
    const previous = prevStepRef.current;

    if (current?.selector === "#click") {
      setClick(true);
    } 

    // LEAVING #para → hide paragraph
    if (previous?.selector === "#para" && current?.selector !== "#para") { 
      setClick(false);
    }
    if (current?.selector === "#para") {
      setClick(true);
    } 

    // LEAVING #para → hide paragraph
    // if (previous?.selector === "#para" && current?.selector !== "#para") { 
    //   setClick(false);
    // }

    

    prevStepRef.current = current;
  }, [currentStep, steps, setClick, setopenDropDown]);

  return null;
};

const Tour = ({ steps, setClick, setopenDropDown }) => {
  return (
    <TourProvider
      steps={steps}
      smoothScroll
      scrollDuration={2500}
      styles={{
        mask: (base) => ({
          ...base,
          transition: "all 0.4s ease",
        }),

        maskArea: (base) => ({
          ...base,
          rx: 8,
          padding: 20, //
          transition: "all 0.4s ease",
        }),
        popover: (base) => ({
          ...base, 
          /* prevent cutting from left/right */
          left: Math.max(16, base.left ?? 0),
          right: "auto",
          marginTop: "12px",
          marginRight: "0px",

          maxWidth: "320px",
          borderRadius: "14px",
          padding: "24px 22px",

          backgroundColor: "#ffffff",
          boxShadow: "0 20px 40px rgba(0,0,0,0.15)",

          transition: "all 0.3s ease",
        }),
        navigation: (base) => ({
          ...base,
          display: "flex",
          justifyContent: "center",
          gap: "2px",
          maxWidth: "100%",
          margin: "0px auto 0",
          padding: "0 5px",
        }),
        dot: (base, state) => ({
          ...base,
          backgroundColor: state.current ? "#2563eb" : "#d1d5db",
        }),
        
        badge: (base) => ({
          ...base,
          backgroundColor: "#2563eb",
          fontSize: "12px",
        }),
        close: (base) => ({
          ...base,
          color: "#374151",
          top: 10,
          right: 12,
          
          backgroundColor: "#f3f4f6",
          borderRadius: "50%",
          width: "12px",
          height: "12px",
          
          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          cursor: "pointer",
        }),
        
      }}
    >
      <TourController
        steps={steps}
        setClick={setClick}
        setopenDropDown={setopenDropDown}
      />
      <InnerTour steps={steps} />
    </TourProvider>
  );
};

export default Tour;
