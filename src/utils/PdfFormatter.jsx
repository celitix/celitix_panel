



// import React, { useRef, useEffect } from "react";

// const PdfFormatter = ({ htmlContent }) => {
//   const ref = useRef(null);

//   useEffect(() => {
//     if (ref.current && htmlContent) {
//       ref.current.innerHTML = htmlContent;

//       // Fix Quill bullet lists disguised as <ol>
//       const fakeBulletLists = ref.current.querySelectorAll('ol li[data-list="bullet"]');
//       fakeBulletLists.forEach((li) => {
//         const ol = li.parentElement;
//         if (ol.tagName === "OL") {
//           const ul = document.createElement("ul");
//           while (ol.firstChild) ul.appendChild(ol.firstChild);
//           ol.parentNode.replaceChild(ul, ol);
//         }
//       });

//       // Remove Quill UI artifacts
//       ref.current.querySelectorAll(".ql-ui, .ql-toolbar, .ql-clipboard").forEach(el => el.remove());
//     }
//   }, [htmlContent]);

//   return (
//     <>
//       <style jsx>{`
//         .mainparent {
//             position: relative;
//             z-index: 5;
//         }
//         .pdf-watermark {
//           position: absolute !important;
//           top: 0;
//           left: 0;
//           right: 0;
//           bottom: 0;
//           margin: auto;
//           z-index: -1;
//         }
//         .pdf-document {
//           font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
//           line-height: 1.6;
//           color: #1a1a1a;
//           // padding: 30px;
//           background: white;
//           // min-height: 100vh;
//           overflow-wrap: break-word;
//           word-break: break-word;
//         }

//         /* Headings - Professional Hierarchy */
//         .pdf-document h1 {
//           font-size: 28px;
//           font-weight: 700;
//           margin: 32px 0 16px 0;
//           color: #111;
//         }
//         .pdf-document h2 {
//           font-size: 24px;
//           font-weight: 700;
//           margin: 28px 0 14px 0;
//           color: #111;
//           border-bottom: 2px solid #e5e7eb;
//           padding-bottom: 8px;
//         }
//         .pdf-document h3 {
//           font-size: 20px;
//           font-weight: 600;
//           margin: 24px 0 12px 0;
//           color: #222;
//         }
//         .pdf-document h4 {
//           font-size: 18px;
//           font-weight: 600;
//           margin: 20px 0 10px 0;
//         }
//         .pdf-document h5 {
//           font-size: 16px;
//           font-weight: 600;
//           margin: 18px 0 8px 0;
//           text-transform: uppercase;
//           letter-spacing: 0.5px;
//           color: #444;
//         }
//         .pdf-document h6 {
//           font-size: 14px;
//           font-weight: 600;
//           margin: 16px 0 8px 0;
//           color: #555;
//         }

//         /* Paragraph & Text */
//         .pdf-document p {
//           margin: 0 0 14px 0;
//           font-size: 15px;
//         }

//         .pdf-document span, .pdf-document div {
//           font-size: inherit;
//         }

//         /* Text Formatting */
//         .pdf-document strong, .pdf-document b {
//           font-weight: 700;
//         }
//         .pdf-document em, .pdf-document i {
//           font-style: italic;
//         }
//         .pdf-document u {
//           text-decoration: underline;
//         }
//         .pdf-document s, .pdf-document strike, .pdf-document del {
//           text-decoration: line-through;
//         }
//         .pdf-document sub {
//           font-size: 0.8em;
//           vertical-align: sub;
//         }
//         .pdf-document sup {
//           font-size: 0.8em;
//           vertical-align: super;
//         }

//         /* Links */
//         .pdf-document a {
//           color: #2563eb;
//           text-decoration: underline;
//         }
//         .pdf-document a:hover {
//           color: #1d4ed8;
//         }

//         /* Lists */
//         .pdf-document ul, .pdf-document ol {
//           margin: 14px 0;
//           padding-left: 28px;
//         }
//         .pdf-document li {
//           margin: 6px 0;
//           font-size: 15px;
//         }
//         .pdf-document ul li {
//           list-style-type: disc;
//         }
//         .pdf-document ul ul li {
//           list-style-type: circle;
//         }
//         .pdf-document ul ul ul li {
//           list-style-type: square;
//         }
//         .pdf-document ol {
//           counter-reset: list-counter;
//         }
//         .pdf-document ol > li {
//           list-style: none;
//           position: relative;
//         }
//         .pdf-document ol > li:before {
//           content: counter(list-counter) ".";
//           counter-increment: list-counter;
//           position: absolute;
//           left: -24px;
//           font-weight: 600;
//           color: #444;
//         }

//         /* Blockquote */
//         .pdf-document blockquote {
//           border-left: 4px solid #e5e7eb;
//           margin: 20px 0;
//           padding: 10px 20px;
//           background-color: #f9fafb;
//           font-style: italic;
//           color: #444;
//         }

//         /* Code */
//         .pdf-document code {
//           font-family: 'Courier New', Courier, monospace;
//           background: #f3f4f6;
//           padding: 2px 6px;
//           border-radius: 4px;
//           font-size: 14px;
//         }
//         .pdf-document pre {
//           background: #1f2937;
//           color: #e5e7eb;
//           padding: 16px;
//           border-radius: 8px;
//           overflow-x: auto;
//           font-size: 14px;
//           margin: 16px 0;
//         }

//         /* Tables - Professional Look */
//         .pdf-document table {
//           width: 100%;
//           border-collapse: collapse;
//           margin: 20px 0;
//           font-size: 14px;
//         }
//         .pdf-document th,
//         .pdf-document td {
//           border: 1px solid #d1d5db;
//           padding: 10px 12px;
//           text-align: left;
//         }
//         .pdf-document th {
//           background-color: #f3f4f6;
//           font-weight: 600;
//           color: #111;
//         }
//         .pdf-document tr:nth-child(even) {
//           background-color: #f9fafb;
//         }

//         /* Horizontal Rule */
//         .pdf-document hr {
//           border: none;
//           border-top: 2px solid #e5e7eb;
//           margin: 32px 0;
//         }

//         /* Text Alignment */
//         .pdf-document .ql-align-center { text-align: center; }
//         .pdf-document .ql-align-right  { text-align: right; }
//         .pdf-document .ql-align-justify { text-align: justify; }

//         /* Quill Font Sizes */
//         .pdf-document .ql-size-small  { font-size: 12px; }
//         .pdf-document .ql-size-large  { font-size: 18px; }
//         .pdf-document .ql-size-huge   { font-size: 24px; }

//         /* Font Families */
//         .pdf-document .ql-font-serif    { font-family: Georgia, serif; }
//         .pdf-document .ql-font-monospace { font-family: 'Courier New', monospace; }

//         /* Indent */
//         .pdf-document .ql-indent-1 { padding-left: 3em; }
//         .pdf-document .ql-indent-2 { padding-left: 6em; }
//         .pdf-document .ql-indent-3 { padding-left: 9em; }

//         /* Clean up any remaining Quill classes */
//         .pdf-document [class^="ql-"]:empty {
//           display: none;
//         }
//       `}</style>

//       <div ref={ref} className="pdf-document relative" />
//     </>
//   );
// };

// export default PdfFormatter;


// PdfFormatter.jsx
// PdfFormatter.jsx
import React, { useRef, useEffect } from "react";

const PdfFormatter = ({ htmlContent }) => {
  const iframeRef = useRef(null);

  useEffect(() => {
    if (!htmlContent || !iframeRef.current) return;

    const iframe = iframeRef.current;
    const doc = iframe.contentDocument || iframe.contentWindow.document;

    // Clear previous content
    doc.open();
    doc.write(htmlContent);
    doc.close();

    const applyWatermarkFix = () => {
      try {
        const body = doc.body;
        if (!body) return;

        // Extract background-image URL safely from the original <style>
        let bgImageUrl = "";
        let bgSize = "60%";
        let bgOpacity = "0.2";

        const styleTags = doc.querySelectorAll("style");
        for (let styleTag of styleTags) {
          const text = styleTag.textContent || styleTag.innerHTML;
          const urlMatch = text.match(/background-image\s*:\s*url\(["']?(.*?)["']?\)/i);
          const sizeMatch = text.match(/background-size\s*:\s*([^;]+)/i);
          const opacityMatch = text.match(/opacity\s*:\s*([^;}]+)/i);

          if (urlMatch) bgImageUrl = urlMatch[1];
          if (sizeMatch) bgSize = sizeMatch[1].trim();
          if (opacityMatch) bgOpacity = opacityMatch[1].trim();
        }

        // Remove all existing styles that interfere
        body.style.backgroundImage = "none";
        body.style.opacity = "1";

        // Inject fix CSS
        const fixStyle = doc.createElement("style");
        fixStyle.textContent = `
          body {
            background: white !important;
            opacity: 1 !important;
            position: relative;
            padding: 40px !important;
            font-family: Arial, sans-serif;
            font-size: 15px;
            line-height: 1.7;
            color: #000;
            min-height: 100vh;
          }

          body::before {
            content: "";
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background-image: url("${bgImageUrl}");
            background-repeat: no-repeat;
            background-position: center center;
            background-size: ${bgSize};
            opacity: ${bgOpacity};
            pointer-events: none;
            z-index: -1;
          }

          body * {
            opacity: 1 !important;
            position: relative;
            z-index: 1;
          }

          /* Table styling */
          table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
          }
          th, td {
            border: 1px solid #ccc;
            padding: 10px;
            text-align: left;
          }
          th {
            { background: #f8f9fa; }

          /* Page break indicator */
          .page-break {
            page-break-after: always;
            break-after: page;
          }
        `;

        // Remove old fix if exists
        const oldFix = doc.getElementById("pdf-watermark-fix");
        if (oldFix) oldFix.remove();

        fixStyle.id = "pdf-watermark-fix";
        doc.head.appendChild(fixStyle);

      } catch (err) {
        console.warn("Watermark fix failed:", err);
      }
    };

    // Try multiple times until ready (robust)
    const tryApply = () => {
      if (doc.readyState === "complete") {
        setTimeout(applyWatermarkFix, 50);
      } else {
        setTimeout(tryApply, 100);
      }
    };

    iframe.onload = tryApply;

    // Fallback: also run after a few times
    let attempts = 0;
    const interval = setInterval(() => {
      attempts++;
      if (attempts > 20) {
        clearInterval(interval);
        return;
      }
      if (doc.body && doc.querySelector("style")) {
        applyWatermarkFix();
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [htmlContent]);

  return (
    <iframe
      ref={iframeRef}
      style={{
        width: "100%",
        height: "80vh",
        border: "none",
        borderRadius: "12px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
        background: "white",
      }}
      title="PDF Template Preview"
      sandbox="allow-same-origin"
    />
  );
};

export default PdfFormatter;