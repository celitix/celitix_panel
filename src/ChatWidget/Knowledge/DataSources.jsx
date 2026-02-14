// import React, { useState } from "react";
// import {
//   Plus,
//   CirclePlay,
//   Search,
//   Folder,
//   Logs,
//   ChevronDown,
//   NotebookPen,
//   Inbox,
//   FileSpreadsheet,
//   Check,
//   CircleSlash2,
//   Globe,
// } from "lucide-react";
// import { SiZendesk } from "react-icons/si";
// import DataSourcesTable from "./components/DataSourcesTable";
// import AddKnowledgeDialog from "./components/AddKnowledge";

// const DataSources = () => {
//   // *********************************** Shows dropdown *******************************************************************
//   const [showsOpen, setShowsOpen] = useState(false);
//   const [selectedShows, setSelectedShows] = useState([]);
//   const toggleShows = (item) => {
//     setSelectedShows((prev) =>
//       prev.includes(item) ? prev.filter((c) => c !== item) : [...prev, item]
//     );
//   };

//   const shows = [
//     { name: "Folder", icon: <Folder size={18} className="gray-800" /> },
//     { name: "Q&A", icon: <Logs size={18} className="gray-800" /> },
//   ];

//   // ************************************** Source Dropdown ****************************************************************

//   const [sourceOpen, setSourceOpen] = useState(false);
//   const [selectedSource, setSelectedSource] = useState([]);
//   const toggleSource = (item) => {
//     setSelectedSource((prev) =>
//       prev.includes(item) ? prev.filter((c) => c !== item) : [...prev, item]
//     );
//   };

//   const sources = [
//     {
//       name: "Mannual",
//       icon: <NotebookPen size={18} className="text-gray-800" />,
//     },
//     { name: "Website", icon: <Globe size={18} className="text-gray-800" /> },
//     {
//       name: "Zendesk",
//       icon: <SiZendesk size={18} className="text-gray-800" />,
//     },
//     { name: "Inbox", icon: <Inbox size={18} className="text-gray-800" /> },
//     {
//       name: "CSV",
//       icon: <FileSpreadsheet size={18} className="text-gray-800" />,
//     },
//   ];

//   // *********************************************************************Used By*************************************************************************

//   const [usedByOpen, setUsedByOpen] = useState(false);
//   const [selectedUsedBy, setSelectedUsedBy] = useState([]);
//   const toggleUsedBy = (item) => {
//     setSelectedUsedBy((prev) =>
//       prev.includes(item) ? prev.filter((c) => c !== item) : [...prev, item]
//     );
//   };

//   const usedBy = [
//     {
//       name: "Used by AI",
//       icon: <Check size={18} className="text-green-600" />,
//     },
//     {
//       name: "Not Used by AI",
//       icon: <CircleSlash2 size={18} className="text-gray-600" />,
//     },
//     {
//       name: "Used by Copilot",
//       icon: <Check size={18} className="text-green-600" />,
//     },
//     {
//       name: "Not Used by Copilot",
//       icon: <CircleSlash2 size={18} className="text-gray-600" />,
//     },
//   ];

//   // ***************************************************************Audiences************************************************************************
//   const [audiencesOpen, setAudiencesOpen] = useState(false);
//   const [selectedAudiences, setSelectedAudiences] = useState([]);
//   const toggleAudiences = (item) => {
//     setSelectedAudiences((prev) =>
//       prev.includes(item) ? prev.filter((c) => c !== item) : [...prev, item]
//     );
//   };

//   const audiences = [
//     {
//       name: "Everyone",
//     },
//   ];

//   const [addKnowledgeOpen, setAddKnowledgeOpen] = useState(false);

//   return (
//     <div className="bg-gray-50 p-4 rounded-md shadow-sm border">
//       {/* **************************************************************************First rows************************************************************************* */}
//       <div className="flex justify-between items-center ">
//         <div className="flex flex-col">
//           <h2 className="text-lg text-gray-800 font-semibold">
//             {" "}
//             Data sources{" "}
//           </h2>
//           <p className="text-sm text-gray-600 mb-4">
//             Lyro will use the knowledge you add here to answer customer
//             questions.
//           </p>
//         </div>
//         <div className=" flex gap-2">
//           <button className="text-gray-700 text-sm flex items-center gap-1 px-2 py-1 bg-gray-50 rounded-md border border-gray-300 hover:bg-gray-300 transition duration-200">
//             <CirclePlay size={15} />
//             Test AI
//           </button>
//           <button
//             className="flex items-center gap-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition duaration-200 "
//             onClick={() => setAddKnowledgeOpen(true)}
//           >
//             <Plus size={20} />
//             Add Knowledge
//           </button>
//         </div>
//       </div>

//       {/* *******************************************************************************Second row************************************************************************* */}
//       <div className="flex  gap-4 mt-4">
//         <div className="relative w-full md:w-72 mt-4">
//           <Search
//             size={18}
//             className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//           />

//           <input
//             type="text"
//             placeholder="Search by keyword or URL"
//             className=" w-full pl-10 pr-4 py-2 rounded-full text-sm bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all"
//           />
//         </div>

//         <div className="relative mt-4">
//           <button
//             onClick={() => setShowsOpen(!showsOpen)}
//             className="flex items-center gap-2  rounded-full bg-gray-200 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all
//                       text-sm text-gray-700  "
//           >
//             <span>
//               Shows: {selectedShows.length === 0 ? "All" : selectedShows.length}
//             </span>
//             <ChevronDown
//               size={16}
//               className={`transition-transform ${
//                 showsOpen ? "rotate-180" : ""
//               }`}
//             />
//           </button>

//           {showsOpen && (
//             <div className="absolute mt-2 bg-white shadow-xl border rounded-xl w-36 p-2 text-sm text-gray-700 z-50">
//               {shows.map((c) => (
//                 <label
//                   key={c.name}
//                   className="flex items-center gap-3 px-3 py-2 rounded cursor-pointer hover:bg-gray-100"
//                 >
//                   <input
//                     type="checkbox"
//                     className="w-4 h-4 accent-blue-700 border-gray-300 rounded"
//                     checked={selectedShows.includes(c.name)}
//                     onChange={() => toggleShows(c.name)}
//                   />

//                   <span>{c.icon}</span>
//                   <span>{c.name}</span>
//                 </label>
//               ))}
//             </div>
//           )}
//         </div>

//         <div className="relative mt-4">
//           <button
//             onClick={() => setSourceOpen(!sourceOpen)}
//             className="flex items-center gap-2  rounded-full bg-gray-200 px-3 py-2
//                       text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all"
//           >
//             <span>
//               Sources:{" "}
//               {selectedSource.length === 0 ? "All" : selectedSource.length}
//             </span>
//             <ChevronDown
//               size={16}
//               className={`transition-transform ${
//                 sourceOpen ? "rotate-180" : ""
//               }`}
//             />
//           </button>

//           {sourceOpen && (
//             <div className="absolute mt-2 bg-white shadow-xl border rounded-xl w-36 p-2 text-sm text-gray-700 z-50">
//               {sources.map((c) => (
//                 <label
//                   key={c.name}
//                   className="flex items-center gap-3 px-3 py-2 rounded cursor-pointer hover:bg-gray-100"
//                 >
//                   <input
//                     type="checkbox"
//                     className="w-4 h-4 accent-blue-700 border-gray-300 rounded"
//                     checked={selectedSource.includes(c.name)}
//                     onChange={() => toggleSource(c.name)}
//                   />

//                   <span>{c.icon}</span>
//                   <span>{c.name}</span>
//                 </label>
//               ))}
//             </div>
//           )}
//         </div>

//         <div className="relative mt-4">
//           <button
//             onClick={() => setUsedByOpen(!usedByOpen)}
//             className="flex items-center gap-2 rounded-full bg-gray-200 px-3 py-2
//                text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all"
//           >
//             <span>
//               Used By:{" "}
//               {selectedUsedBy.length === 0 ? "All" : selectedUsedBy.length}
//             </span>

//             <ChevronDown
//               size={16}
//               className={`transition-transform ${
//                 usedByOpen ? "rotate-180" : ""
//               }`}
//             />
//           </button>

//           {usedByOpen && (
//             <div
//               className="absolute mt-2 bg-white shadow-xl border rounded-xl
//                     w-46 p-2 text-sm text-gray-700 z-50"
//             >
//               {usedBy.map((c) => (
//                 <label
//                   key={c.name}
//                   className="flex items-center gap-3 px-3 py-2 rounded cursor-pointer hover:bg-gray-100"
//                 >
//                   <input
//                     type="checkbox"
//                     className="w-4 h-4 accent-blue-700 rounded"
//                     checked={selectedUsedBy.includes(c.name)}
//                     onChange={() => toggleUsedBy(c.name)}
//                   />
//                   <span>{c.icon}</span>
//                   <span>{c.name}</span>
//                 </label>
//               ))}
//             </div>
//           )}
//         </div>

//         <div className="relative mt-4">
//           <button
//             onClick={() => setAudiencesOpen(!audiencesOpen)}
//             className="flex items-center gap-2 rounded-full bg-gray-200 px-3 py-2
//                text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all"
//           >
//             <span>
//               Audiences:{" "}
//               {selectedAudiences.length === 0
//                 ? "All"
//                 : selectedAudiences.length}
//             </span>

//             <ChevronDown
//               size={16}
//               className={`transition-transform ${
//                 audiencesOpen ? "rotate-180" : ""
//               }`}
//             />
//           </button>

//           {audiencesOpen && (
//             <div
//               className="absolute mt-2 bg-white shadow-xl border rounded-xl
//                     w-36 p-2 text-sm text-gray-700 z-50"
//             >
//               {audiences.map((c) => (
//                 <label
//                   key={c.name}
//                   className="flex items-center gap-3 px-3 py-2 rounded cursor-pointer hover:bg-gray-100"
//                 >
//                   <input
//                     type="checkbox"
//                     className="w-4 h-4 accent-blue-700 rounded"
//                     checked={selectedAudiences.includes(c.name)}
//                     onChange={() => toggleAudiences(c.name)}
//                   />
//                   <span>{c.icon}</span>
//                   <span>{c.name}</span>
//                 </label>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="mt-6  max-w-6xl">
//         <h3 className="text-gray-800 text-lg font-semibold"> Results: 1 </h3>

//         <DataSourcesTable />

//         {/* <AddKnowledgeDialog
//           open={addKnowledgeOpen}
//           onClose={() => setAddKnowledgeOpen(false)}
//           onSelectSource={(type) => {
//             console.log("Selected:", type);
//             setAddKnowledgeOpen(false);
//           }}
//         /> */}
//         <AddKnowledgeDialog
//           open={addKnowledgeOpen}
//           onClose={() => setAddKnowledgeOpen(false)}
//           onSelectSource={(type) => {
//             setAddKnowledgeOpen(false);

//             setTimeout(() => {
//               if (type === "website") setWebsiteDialogOpen(true);
//               if (type === "manual") setManualDrawer(true);
//               if (type === "csv") setCSVDialogOpen(true);
//               if (type === "zendesk") setZendeskDialogOpen(true);
//             }, 120);
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default DataSources;

import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Sidebar } from "primereact/sidebar";


// ICONS
import {
  Plus,
  CirclePlay,
  Search,
  Folder,
  Logs,
  ChevronDown,
  NotebookPen,
  Inbox,
  FileSpreadsheet,
  Check,
  CircleSlash2,
  Globe,
} from "lucide-react";
import { SiZendesk } from "react-icons/si";

// COMPONENTS
import DataSourcesTable from "./components/DataSourcesTable";
import AddKnowledgeDialog from "./components/AddKnowledge";


export default function DataSources() {
  // ---------- MAIN DIALOG STATES ----------
  const [addKnowledgeOpen, setAddKnowledgeOpen] = useState(false);
  const [websiteDialogOpen, setWebsiteDialogOpen] = useState(false);
  const [manualDrawerOpen, setManualDrawerOpen] = useState(false);
  const [csvDialogOpen, setCsvDialogOpen] = useState(false);
  const [zendeskDialogOpen, setZendeskDialogOpen] = useState(false);

  // ---------- WEBSITE DIALOG STATE ----------
  const [scanMode, setScanMode] = useState("priority");
  const [websiteURL, setWebsiteURL] = useState("");

  // ---------- MANUAL DRAWER STATE ----------
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  // ---------- CSV DIALOG STATE ----------
  const [csvFile, setCsvFile] = useState(null);
  const [duplicateMode, setDuplicateMode] = useState("replace");

  // ---------- ZENDESK DIALOG STATE ----------
  const [zendeskUrl, setZendeskUrl] = useState("");

  // Fake table data (you probably already have this)
  const [dataSources] = useState([
    {
      id: 1,
      name: "abc.com",
      source: "Website",
      updated: "Nov 15, 2025, 10:06 AM",
    },
  ]);

  // ---------- HANDLER FROM AddKnowledge DIALOG ----------

  const handleKnowledgeSelect = (type) => {
    setAddKnowledgeOpen(false);
    setTimeout(() => {
      if (type === "website") setWebsiteDialogOpen(true);
      if (type === "manual") setManualDrawerOpen(true);
      if (type === "csv") setCsvDialogOpen(true);
      if (type === "zendesk") setZendeskDialogOpen(true);
    }, 160);
  };

  // ---------- CSV FILE HANDLER ----------
  const handleCsvFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCsvFile(file);
  };

  const handleDropCsv = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    setCsvFile(file);
  };

  const preventDefault = (e) => e.preventDefault();

  // For now: only console.log as you requested
  const handleCsvImport = () => {
    if (!csvFile) return;
    console.log("CSV IMPORT:", {
      fileName: csvFile.name,
      fileSize: csvFile.size,
      duplicateMode,
    });
    setCsvDialogOpen(false);
    setCsvFile(null);
  };

  const handleWebsiteImport = () => {
    if (!websiteURL.trim()) return;
    console.log("WEBSITE IMPORT:", {
      url: websiteURL,
      mode: scanMode,
    });
    setWebsiteDialogOpen(false);
    setWebsiteURL("");
    setScanMode("priority");
  };

  const handleManualSave = () => {
    console.log("MANUAL KNOWLEDGE:", { question, answer });
    setManualDrawerOpen(false);
    setQuestion("");
    setAnswer("");
  };

  const handleZendeskImport = () => {
    if (!zendeskUrl.trim()) return;
    console.log("ZENDESK IMPORT:", { url: zendeskUrl });
    setZendeskDialogOpen(false);
    setZendeskUrl("");
  };

  // *********************************** Shows dropdown *******************************************************************
  const [showsOpen, setShowsOpen] = useState(false);
  const [selectedShows, setSelectedShows] = useState([]);
  const toggleShows = (item) => {
    setSelectedShows((prev) =>
      prev.includes(item) ? prev.filter((c) => c !== item) : [...prev, item]
    );
  };

  const shows = [
    { name: "Folder", icon: <Folder size={18} className="gray-800" /> },
    { name: "Q&A", icon: <Logs size={18} className="gray-800" /> },
  ];

  // ************************************** Source Dropdown ****************************************************************

  const [sourceOpen, setSourceOpen] = useState(false);
  const [selectedSource, setSelectedSource] = useState([]);
  const toggleSource = (item) => {
    setSelectedSource((prev) =>
      prev.includes(item) ? prev.filter((c) => c !== item) : [...prev, item]
    );
  };

  const sources = [
    {
      name: "Mannual",
      icon: <NotebookPen size={18} className="text-gray-800" />,
    },
    { name: "Website", icon: <Globe size={18} className="text-gray-800" /> },
    {
      name: "Zendesk",
      icon: <SiZendesk size={18} className="text-gray-800" />,
    },
    { name: "Inbox", icon: <Inbox size={18} className="text-gray-800" /> },
    {
      name: "CSV",
      icon: <FileSpreadsheet size={18} className="text-gray-800" />,
    },
  ];

  // *********************************************************************Used By*************************************************************************

  const [usedByOpen, setUsedByOpen] = useState(false);
  const [selectedUsedBy, setSelectedUsedBy] = useState([]);
  const toggleUsedBy = (item) => {
    setSelectedUsedBy((prev) =>
      prev.includes(item) ? prev.filter((c) => c !== item) : [...prev, item]
    );
  };

  const usedBy = [
    {
      name: "Used by AI",
      icon: <Check size={18} className="text-green-600" />,
    },
    {
      name: "Not Used by AI",
      icon: <CircleSlash2 size={18} className="text-gray-600" />,
    },
    {
      name: "Used by Copilot",
      icon: <Check size={18} className="text-green-600" />,
    },
    {
      name: "Not Used by Copilot",
      icon: <CircleSlash2 size={18} className="text-gray-600" />,
    },
  ];

  // ***************************************************************Audiences************************************************************************
  const [audiencesOpen, setAudiencesOpen] = useState(false);
  const [selectedAudiences, setSelectedAudiences] = useState([]);
  const toggleAudiences = (item) => {
    setSelectedAudiences((prev) =>
      prev.includes(item) ? prev.filter((c) => c !== item) : [...prev, item]
    );
  };

  const audiences = [
    {
      name: "Everyone",
    },
  ];

  // const [addKnowledgeOpen, setAddKnowledgeOpen] = useState(false);

  return (
    // <div className="p-6 w-full">
    <div className="bg-gray-50 p-6 w-full rounded-md shadow-sm border">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Data sources</h1>
          <p className="text-sm text-gray-500 mt-1">
            Lyro will use the knowledge you add here to answer customer
            questions.
          </p>
        </div>

        <button
          onClick={() => setAddKnowledgeOpen(true)}
          className="flex items-center gap-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition"
        >
          <Plus size={18} />
          Add knowledge
        </button>
      </div>

      {/* DATA SOURCE TABLE */}
      {/* <div className="bg-white rounded-2xl border border-gray-200 shadow-sm mt-4">
        <div className="px-6 py-3 text-sm font-semibold">
          Results: {dataSources.length}
        </div>
        <div className="grid grid-cols-3 px-6 py-2 text-xs text-gray-500 border-t">
          <div>Name</div>
          <div>Source</div>
          <div>Last updated</div>
        </div>
        {dataSources.map((row) => (
          <div
            key={row.id}
            className="grid grid-cols-3 px-6 py-3 text-sm border-t hover:bg-gray-50"
          >
            <div className="font-medium">{row.name}</div>
            <div>{row.source}</div>
            <div className="text-xs text-gray-600">{row.updated}</div>
          </div>
        ))}
      </div> */}

      <div className="flex gap-4 mt-4">
        {/* SEARCH INPUT */}
        <div className="relative w-full md:w-72 mt-4">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search by keyword or URL"
            className="w-full pl-10 pr-4 py-2 rounded-full text-sm bg-gray-200 
                 focus:outline-none focus:ring-1 focus:ring-blue-500 
                 focus:border-blue-500 transition-all"
          />
        </div>

        {/* SHOWS DROPDOWN */}
        <div className="relative mt-4">
          <button
            onClick={() => setShowsOpen(!showsOpen)}
            className="flex items-center gap-2 rounded-full bg-gray-200 
                 px-3 py-2 text-sm text-gray-700 
                 focus:outline-none focus:ring-1 focus:ring-blue-500 
                 transition-all"
          >
            <span>
              Shows: {selectedShows.length === 0 ? "All" : selectedShows.length}
            </span>
            <ChevronDown
              size={16}
              className={`${showsOpen ? "rotate-180" : ""}`}
            />
          </button>

          {showsOpen && (
            <div className="absolute mt-2 bg-white shadow-xl border rounded-xl w-36 p-2 text-sm z-50">
              {shows.map((c) => (
                <label
                  key={c.name}
                  className="flex items-center gap-3 px-3 py-2 rounded cursor-pointer hover:bg-gray-100"
                >
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-blue-700 border-gray-300 rounded"
                    checked={selectedShows.includes(c.name)}
                    onChange={() => toggleShows(c.name)}
                  />
                  <span>{c.icon}</span>
                  <span>{c.name}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* SOURCE DROPDOWN */}
        <div className="relative mt-4">
          <button
            onClick={() => setSourceOpen(!sourceOpen)}
            className="flex items-center gap-2 rounded-full bg-gray-200 px-3 py-2 
                 text-sm text-gray-700 focus:outline-none 
                 focus:ring-1 focus:ring-blue-500 transition-all"
          >
            <span>
              Sources:{" "}
              {selectedSource.length === 0 ? "All" : selectedSource.length}
            </span>
            <ChevronDown
              size={16}
              className={`${sourceOpen ? "rotate-180" : ""}`}
            />
          </button>

          {sourceOpen && (
            <div className="absolute mt-2 bg-white shadow-xl border rounded-xl w-36 p-2 text-sm z-50">
              {sources.map((c) => (
                <label
                  key={c.name}
                  className="flex items-center gap-3 px-3 py-2 rounded cursor-pointer hover:bg-gray-100"
                >
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-blue-700 border-gray-300 rounded"
                    checked={selectedSource.includes(c.name)}
                    onChange={() => toggleSource(c.name)}
                  />
                  <span>{c.icon}</span>
                  <span>{c.name}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* USED BY DROPDOWN */}
        <div className="relative mt-4">
          <button
            onClick={() => setUsedByOpen(!usedByOpen)}
            className="flex items-center gap-2 rounded-full bg-gray-200 px-3 py-2
                 text-sm text-gray-700 focus:outline-none 
                 focus:ring-1 focus:ring-blue-500 transition-all"
          >
            <span>
              Used By:{" "}
              {selectedUsedBy.length === 0 ? "All" : selectedUsedBy.length}
            </span>
            <ChevronDown
              size={16}
              className={`${usedByOpen ? "rotate-180" : ""}`}
            />
          </button>

          {usedByOpen && (
            <div className="absolute mt-2 bg-white shadow-xl border rounded-xl w-48 p-2 text-sm z-50">
              {usedBy.map((c) => (
                <label
                  key={c.name}
                  className="flex items-center gap-3 px-3 py-2 rounded cursor-pointer hover:bg-gray-100"
                >
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-blue-700 rounded"
                    checked={selectedUsedBy.includes(c.name)}
                    onChange={() => toggleUsedBy(c.name)}
                  />
                  <span>{c.icon}</span>
                  <span>{c.name}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* AUDIENCES DROPDOWN */}
        <div className="relative mt-4">
          <button
            onClick={() => setAudiencesOpen(!audiencesOpen)}
            className="flex items-center gap-2 rounded-full bg-gray-200 px-3 py-2
                 text-sm text-gray-700 focus:outline-none 
                 focus:ring-1 focus:ring-blue-500 transition-all"
          >
            <span>
              Audiences:{" "}
              {selectedAudiences.length === 0
                ? "All"
                : selectedAudiences.length}
            </span>
            <ChevronDown
              size={16}
              className={`${audiencesOpen ? "rotate-180" : ""}`}
            />
          </button>

          {audiencesOpen && (
            <div className="absolute mt-2 bg-white shadow-xl border rounded-xl w-36 p-2 text-sm z-50">
              {audiences.map((c) => (
                <label
                  key={c.name}
                  className="flex items-center gap-3 px-3 py-2 rounded cursor-pointer hover:bg-gray-100"
                >
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-blue-700 rounded"
                    checked={selectedAudiences.includes(c.name)}
                    onChange={() => toggleAudiences(c.name)}
                  />
                  <span>{c.icon}</span>
                  <span>{c.name}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 max-w-6xl">
        <h3 className="text-gray-800 text-lg font-semibold">Results: 1</h3>
        <DataSourcesTable />
      </div>

      {/* =====================================================
          ADD KNOWLEDGE SELECTOR DIALOG
      ====================================================== */}
      <AddKnowledgeDialog
        open={addKnowledgeOpen}
        onClose={() => setAddKnowledgeOpen(false)}
        onSelectSource={handleKnowledgeSelect}
      />

      {/* =====================================================
          WEBSITE URL DIALOG
      ====================================================== */}
      <Dialog
        visible={websiteDialogOpen}
        onHide={() => setWebsiteDialogOpen(false)}
        modal
        closable={false}
        className="rounded-2xl"
        style={{ width: "650px" }}
      >
        {/* Close */}
        <button
          onClick={() => setWebsiteDialogOpen(false)}
          className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-100"
        >
          <i className="pi pi-times text-gray-500" />
        </button>

        <h2 className="text-lg font-semibold text-gray-900">
          Provide website URL to import knowledge
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Choose how you want to share knowledge. This will teach Lyro how to
          answer questions related to your business.
        </p>

        {/* Scan mode */}
        <div className="mt-6">
          <p className="text-sm font-semibold text-gray-900">
            How to import knowledge?
          </p>
          <div className="flex gap-3 mt-3">
            <button
              onClick={() => setScanMode("priority")}
              className={`flex-1 p-4 border rounded-lg text-sm ${
                scanMode === "priority"
                  ? "border-blue-600 bg-blue-50 text-blue-600"
                  : "border-gray-300 hover:bg-gray-50"
              }`}
            >
              <div className="font-medium">Scan priority pages</div>
              <p className="text-xs text-gray-500 mt-1">
                Lyro will scan important nested pages using your domain.
              </p>
            </button>

            <button
              onClick={() => setScanMode("single")}
              className={`flex-1 p-4 border rounded-lg text-sm ${
                scanMode === "single"
                  ? "border-blue-600 bg-blue-50 text-blue-600"
                  : "border-gray-300 hover:bg-gray-50"
              }`}
            >
              <div className="font-medium">Scan single page</div>
              <p className="text-xs text-gray-500 mt-1">
                Only the provided URL will be imported.
              </p>
            </button>
          </div>
        </div>

        {/* URL input */}
        <div className="mt-8">
          <label className="text-sm font-medium text-gray-700">
            Provide URL
          </label>
          <input
            type="text"
            placeholder="Website URL"
            className="w-full mt-2 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-1 focus:ring-blue-500"
            value={websiteURL}
            onChange={(e) => setWebsiteURL(e.target.value)}
          />
          <p className="text-xs text-gray-400 mt-1">
            e.g. https://mypage.com/faq
          </p>
          <p className="text-xs text-gray-500 mt-2">
            • This process may take a few minutes and will continue in the
            background.
          </p>
        </div>

        <div className="flex justify-end gap-3 mt-6 text-sm">
          <button
            onClick={() => setWebsiteDialogOpen(false)}
            className="border border-gray-300 px-4 py-2 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            disabled={!websiteURL.trim()}
            onClick={handleWebsiteImport}
            className={`px-5 py-2 rounded-md ${
              websiteURL.trim()
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Import knowledge
          </button>
        </div>
      </Dialog>

      {/* =====================================================
          MANUAL KNOWLEDGE DRAWER (RIGHT SIDEBAR)
      ====================================================== */}
      <Sidebar
        visible={manualDrawerOpen}
        position="right"
        onHide={() => setManualDrawerOpen(false)}
        showCloseIcon={false}
        className="!w-[600px] md:!w-[750px] lg:!w-[850px]"
      >
        <div className="flex justify-between items-center border-b pb-4">
          <h2 className="text-lg font-semibold text-gray-800">Add</h2>
          <div className="flex items-center gap-3">
            <button
              onClick={handleManualSave}
              className="text-white bg-blue-600 text-sm px-4 py-1.5 rounded-md hover:bg-blue-700 transition"
            >
              Save and close
            </button>
            <button
              onClick={() => setManualDrawerOpen(false)}
              className="rounded-full hover:bg-gray-200 p-2"
            >
              <i className="pi pi-times text-gray-500" />
            </button>
          </div>
        </div>

        <div className="flex w-full gap-6 mt-6">
          {/* Left form */}
          <div className="flex-1 flex flex-col gap-4">
            <label className="text-xs font-semibold text-gray-600">
              Content
            </label>
            <input
              type="text"
              placeholder="Question"
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:ring-1 focus:ring-blue-500"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            <textarea
              placeholder="Answer"
              className="w-full h-[360px] border border-blue-500 rounded-md px-4 py-3 text-sm focus:ring-1 focus:ring-blue-600"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
          </div>

          {/* Right info panel */}
          <div className="w-[220px] border-l pl-5 text-xs">
            <div className="mb-6">
              <p className="font-semibold text-gray-700 mb-2">DATA</p>
              <p className="font-medium text-gray-800">
                Source <span className="text-blue-600 ml-1">Manual</span>
              </p>
              <p className="text-gray-500 mt-1">Last updated: -</p>
            </div>

            <div className="mb-6">
              <p className="font-semibold text-gray-700 mb-2">USED BY</p>
              <p className="text-gray-500">Lyro AI Agent -</p>
              <p className="text-gray-500">Copilot -</p>
            </div>

            <div>
              <p className="font-semibold text-gray-700 mb-2">AUDIENCE</p>
              <button className="w-full border border-gray-300 rounded-md px-2 py-1 text-left text-gray-700">
                Everyone
              </button>
              <p className="text-[10px] text-gray-400 mt-1">
                Lyro AI Agent and Copilot will use the same audience.
              </p>
            </div>
          </div>
        </div>
      </Sidebar>

      {/* =====================================================
          CSV IMPORT DIALOG
      ====================================================== */}
      <Dialog
        visible={csvDialogOpen}
        onHide={() => setCsvDialogOpen(false)}
        modal
        closable={false}
        className="rounded-2xl"
        style={{ width: "650px" }}
      >
        <button
          onClick={() => setCsvDialogOpen(false)}
          className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-100"
        >
          <i className="pi pi-times text-gray-500" />
        </button>

        <h2 className="text-lg font-semibold text-gray-900">
          Import Q&As from .CSV file
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Add your questions and answers in the sheet. Upload .CSV file to feed
          Lyro with knowledge or download our sample to prepare your file.
        </p>

        {/* Info box */}
        <div className="mt-4 border border-blue-100 bg-blue-50 rounded-xl p-3 text-xs text-gray-700">
          The file must contain two columns: <b>Question</b> and <b>Answer</b>.
          Both should be brief. Use the attached example as a starting point for
          your file.{" "}
          <button className="text-blue-600 hover:underline">
            Download sample
          </button>
        </div>

        {/* Drop zone */}
        <div
          className="mt-5 border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-center text-sm text-gray-500 cursor-pointer hover:border-blue-400 hover:bg-blue-50/40"
          onDrop={handleDropCsv}
          onDragOver={preventDefault}
          onDragEnter={preventDefault}
          onClick={() => document.getElementById("csv-input-hidden")?.click()}
        >
          <input
            id="csv-input-hidden"
            type="file"
            accept=".csv"
            className="hidden"
            onChange={handleCsvFileChange}
          />
          <div className="text-3xl mb-2">⤓</div>
          {csvFile ? (
            <p className="text-sm text-gray-700">
              Selected file: <b>{csvFile.name}</b>
            </p>
          ) : (
            <>
              <p>
                <span className="text-blue-600">Browse</span> or drag &amp; drop
                it here
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Accepts .CSV files up to 0.5 MB in size and 500 entries.
              </p>
            </>
          )}
        </div>

        {/* Duplicate handling */}
        <div className="mt-6">
          <p className="text-sm font-semibold text-gray-900">
            How should we proceed if the same Q&As are found?
          </p>
          <div className="mt-3 space-y-2 text-sm text-gray-700">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="duplicateMode"
                value="replace"
                checked={duplicateMode === "replace"}
                onChange={() => setDuplicateMode("replace")}
              />
              Import new and replace duplicated Q&As with CSV content
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="duplicateMode"
                value="skip"
                checked={duplicateMode === "skip"}
                onChange={() => setDuplicateMode("skip")}
              />
              Import new and skip duplicated Q&As from CSV file
            </label>
          </div>
        </div>

        <div className="flex justify-end mt-6 gap-3 text-sm">
          <button
            onClick={() => {
              setCsvDialogOpen(false);
              setCsvFile(null);
            }}
            className="border border-gray-300 px-4 py-2 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            disabled={!csvFile}
            onClick={handleCsvImport}
            className={`px-5 py-2 rounded-md ${
              csvFile
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Import
          </button>
        </div>
      </Dialog>

      {/* =====================================================
          ZENDESK IMPORT DIALOG
      ====================================================== */}
      <Dialog
        visible={zendeskDialogOpen}
        onHide={() => setZendeskDialogOpen(false)}
        modal
        closable={false}
        className="rounded-2xl"
        style={{ width: "650px" }}
      >
        <button
          onClick={() => setZendeskDialogOpen(false)}
          className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-100"
        >
          <i className="pi pi-times text-gray-500" />
        </button>

        <h2 className="text-lg font-semibold text-gray-900">
          Import Zendesk public articles
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Provide the URL of your Zendesk Help Center. We&apos;ll import all
          public articles and use them as knowledge for Lyro.
        </p>

        <div className="mt-6">
          <label className="text-sm font-medium text-gray-700">
            Enter URL of your website
          </label>
          <input
            type="text"
            placeholder="e.g. mypage.zendesk.com"
            className="w-full mt-2 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-1 focus:ring-blue-500"
            value={zendeskUrl}
            onChange={(e) => setZendeskUrl(e.target.value)}
          />
        </div>

        <p className="text-xs text-gray-500 mt-3">
          • Zendesk articles must be public, and the maximum number of imported
          articles is 500. Need more? Upgrade to the Plus plan.{" "}
          <button className="text-blue-600 hover:underline">Contact us</button>
        </p>

        <div className="flex justify-end mt-6 gap-3 text-sm">
          <button
            onClick={() => setZendeskDialogOpen(false)}
            className="border border-gray-300 px-4 py-2 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            disabled={!zendeskUrl.trim()}
            onClick={handleZendeskImport}
            className={`px-5 py-2 rounded-md ${
              zendeskUrl.trim()
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Import
          </button>
        </div>
      </Dialog>
    </div>
  );
}
