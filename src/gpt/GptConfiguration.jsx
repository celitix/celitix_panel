// import React, { useState } from "react";
// import axios from "axios";

// const GptConfiguration = () => {
//   const [url, setUrl] = useState("");
//   const [message, setMessage] = useState("");
//   const [mainPurpose, setMainPurpose] = useState("");
//   const [services, setServices] = useState([]);

//   // Handle URL fetch and GPT analysis
//   const handleUrlSubmit = async () => {
//     if (!url) {
//       setMessage("Please enter a valid URL.");
//       return;
//     }
//     setMessage("Fetching content and analyzing main purpose and services...");
//     try {
//       const res = await fetch(url);
//       const text = await res.text();

//       // Ask GPT for main purpose and services offered
//       const analysisRes = await axios.post(
//         "https://api.openai.com/v1/responses",
//         {
//           model: "gpt-4o-mini",
//           input: [
//             {
//               role: "developer",
//               content:
//                 "You are an assistant that extracts the main work and services from website content.",
//             },
//             {
//               role: "user",
//               content: `Please read the following website content and provide:
// 1) A single sentence describing the website's main work or purpose.
// 2) A bullet list of the core services or products offered by this website.

// Website Content Start:\n${text.slice(0, 2000)}\nWebsite Content End.`,
//             },
//           ],
//           temperature: 0.5,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
//           },
//         }
//       );

//       const reply = analysisRes.data.choices[0].message.content;
//       const lines = reply
//         .split("\n")
//         .map((l) => l.trim())
//         .filter(Boolean);

//       // First line is purpose, rest are services
//       setMainPurpose(lines[0]);
//       const serviceLines = lines
//         .slice(1)
//         .map((l) => l.replace(/^[-*\d\.]+\s*/, "").trim());
//       setServices(serviceLines);
//       setMessage("Analysis complete.");
//     } catch (err) {
//       console.error(err);
//       setMessage("Failed to analyze content.");
//     }
//   };

//   return (
//     // <div className="flex flex-col gap-8 p-8 bg-gradient-to-r from-blue-50 to-white">
//     //   <section className="bg-white p-6 rounded-2xl shadow-lg">
//     //     <h2 className="text-2xl font-bold text-blue-700 mb-4">
//     //       Website Analyzer
//     //     </h2>
//     //     <div className="flex flex-col md:flex-row gap-4">
//     //       <input
//     //         type="url"
//     //         placeholder="https://example.com"
//     //         value={url}
//     //         onChange={(e) => setUrl(e.target.value)}
//     //         className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-200"
//     //       />
//     //       <button
//     //         onClick={handleUrlSubmit}
//     //         className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//     //       >
//     //         Analyze Website
//     //       </button>
//     //     </div>
//     //     {message && <p className="mt-3 text-gray-700">{message}</p>}

//     //     {mainPurpose && (
//     //       <div className="mt-4 p-4 bg-gray-50 rounded-md">
//     //         <h3 className="font-semibold mb-2">Main Purpose:</h3>
//     //         <p className="whitespace-pre-line text-gray-800">{mainPurpose}</p>
//     //       </div>
//     //     )}

//     //     {services.length > 0 && (
//     //       <div className="mt-4 p-4 bg-gray-50 rounded-md">
//     //         <h3 className="font-semibold mb-2">Services Offered:</h3>
//     //         <ul className="list-disc list-inside text-gray-800">
//     //           {services.map((svc, idx) => (
//     //             <li key={idx}>{svc}</li>
//     //           ))}
//     //         </ul>
//     //       </div>
//     //     )}
//     //   </section>
//     // </div>
//   );
// };

// export default GptConfiguration;

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconButton, Collapse } from "@mui/material";


// ICONS
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { TbMessageQuestion } from "react-icons/tb";
import { MdPlaylistAddCheck } from "react-icons/md";
import { TbMoodEmpty } from "react-icons/tb";

// COMPONENTS
import InputField from "@/whatsapp/components/InputField";

const GptConfiguration = () => {
  const [url, setUrl] = useState("");
  const [info, setInfo] = useState(null);
  const [showQAForm, setShowQAForm] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [qaList, setQaList] = useState([]);
  const [showList, setShowList] = useState(true);

  const handleSearch = () => {
    if (url.trim()) {
      setInfo({
        title: "Fetched Info Title",
        description:
          "This is simulated data fetched from the entered URL for demo purposes.",
      });
    }
  };

  const handleSaveQA = () => {
    if (question && answer) {
      setQaList([...qaList, { question, answer }]);
      setQuestion("");
      setAnswer("");
      setShowQAForm(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 p-8 bg-gradient-to-b from-blue-50 to-purple-50 min-h-screen">
      {/* ---------- LEFT SECTION ---------- */}
      <motion.div
        className="flex-1 space-y-8"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* URL SEARCH */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-6 rounded-xl shadow-lg border border-blue-100 bg-white/80 backdrop-blur-md transition-all duration-300"
        >
          <h2 className="text-2xl text-center font-bold mb-4 text-blue-700">
            <SearchIcon /> Fetch Info by URL
          </h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <InputField
              label="Paste URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full "
            />
            <button
              onClick={handleSearch}
              className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold  rounded-lg p-2 w-17 h-10 mt-5
               shadow-md hover:shadow-lg hover:ring-2 hover:ring-indigo-300 focus:ring-2 focus:ring-indigo-400 transition-all"
            >
              Search
            </button>
          </div>

          <AnimatePresence>
            {info && (
              <motion.div
                className="mt-5 bg-blue-50 border border-blue-200 rounded-lg p-4 shadow-sm"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-lg font-bold text-blue-700">
                  {info.title}
                </h3>
                <p className="text-gray-600 mt-2">{info.description}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Q&A FORM */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-6 rounded-xl shadow-lg border border-purple-100 bg-white/80 backdrop-blur-md transition-all duration-300"
        >
          <h2 className="flex items-center justify-center gap-2 text-2xl font-bold mb-4 text-blue-700">
            <TbMessageQuestion className="text-3xl" />
            Add Q&A
          </h2>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowQAForm(!showQAForm)}
            className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold px-4 py-2 rounded-lg mt-1 shadow-md hover:shadow-lg hover:ring-2 hover:ring-indigo-300 focus:ring-2 focus:ring-indigo-400 transition-all"
          >
            {showQAForm ? "Cancel" : "Add"}
          </motion.button>

          <AnimatePresence>
            {showQAForm && (
              <motion.div
                className="mt-5 space-y-4"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <InputField
                  label="Question"
                  fullWidth
                  variant="outlined"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                />
                <InputField
                  label="Answer"
                  fullWidth
                  multiline
                  rows={3}
                  variant="outlined"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSaveQA}
                  className="bg-gradient-to-r from-indigo-500 to-teal-500 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:shadow-lg hover:ring-2 hover:ring-teal-300 focus:ring-2 focus:ring-teal-400 transition-all"
                >
                  Save
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* ---------- RIGHT SECTION (Q&A LIST) ---------- */}
      <motion.div
        className="md:w-1/2 bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-indigo-100 p-6"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="flex items-center justify-center gap-2 text-2xl font-bold text-indigo-700 text-center">
            <MdPlaylistAddCheck /> Saved Q&A
          </h2>
          <IconButton
            onClick={() => setShowList(!showList)}
            className="md:hidden"
          >
            {showList ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </div>

        <Collapse in={showList || window.innerWidth >= 768}>
          {qaList.length === 0 ? (
            <p
              className=" italic text-center mt-6 px-2 py-4 border-1 border-purple-500 shadow-md
             bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 
               bg-clip-text text-transparent animate-pulse rounded-lg "
            >
              No Q&A added yet. Start by adding your first question!
            </p>
          ) : (
            <div className="space-y-4">
              {qaList.map((item, index) => (
                <motion.div
                  key={index}
                  className="p-4 rounded-lg border border-indigo-100 bg-gradient-to-r from-indigo-50 to-blue-50 shadow-sm hover:shadow-md transition-all"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <p className="font-semibold text-gray-800">
                    <span className="text-indigo-600">Q:</span> {item.question}
                  </p>
                  <p className="text-gray-700 mt-1">
                    <span className="text-blue-600">A:</span> {item.answer}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </Collapse>
      </motion.div>
    </div>
  );
};

export default GptConfiguration;
