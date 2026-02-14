// import React from "react";

// const EmailFormatter = ({ htmlContent }) => {
//   if (!htmlContent) return null;

//   // Replace paragraph and <br> tags with line breaks for spacing
//   let formatted = htmlContent
//     .replace(/<\/p>/gi, "\n\n")
//     .replace(/<br\s*\/?>/gi, "\n");


//   // Convert <strong> and <b> tags → markdown-style **text**
//   formatted = formatted.replace(/<(strong|b)>(.*?)<\/\1>/gi, "**$2**");

//   // Convert <em> or <i> → _text_
//   formatted = formatted.replace(/<(em|i)>(.*?)<\/\1>/gi, "_$2_");

//   // Convert <u> → underlined text using a simple markup ~text~
//   formatted = formatted.replace(/<u>(.*?)<\/u>/gi, "~$1~");

//   // Remove all *remaining* HTML tags safely
//   formatted = formatted.replace(/<[^>]*>/g, "");

//   // Decode HTML entities
//   const textArea = document.createElement("textarea");
//   textArea.innerHTML = formatted;
//   const decodedText = textArea.value.trim();

//   // Render text with React-safe bold/italic replacements
//   const renderStyledText = (text) => {
//     const parts = [];
//     let lastIndex = 0;

//     const regex =
//       /(\*\*(.*?)\*\*)|(_(.*?)_)|(~(.*?)~)/g;
//     let match;

//     while ((match = regex.exec(text)) !== null) {

//       if (match.index > lastIndex) {
//         parts.push(text.substring(lastIndex, match.index));
//       }

//       if (match[1]) {
//         parts.push(<strong key={match.index}>{match[2]}</strong>);
//       } else if (match[3]) {
//         parts.push(<em key={match.index}>{match[4]}</em>);
//       } else if (match[5]) {
//         parts.push(
//           <span key={match.index} className="underline">
//             {match[6]}
//           </span>
//         );
//       }

//       lastIndex = regex.lastIndex;
//     }

//     if (lastIndex < text.length) {
//       parts.push(text.substring(lastIndex));
//     }

//     return parts;
//   };

//   return (
//     <pre className="whitespace-pre-wrap text-gray-800">
//       {renderStyledText(decodedText)}
//     </pre>
//   );
// };

// export default EmailFormatter;


// import React from "react";

// const EmailFormatter = ({ htmlContent }) => {
//   if (!htmlContent) return null;

//   let formatted = htmlContent
//     // Convert block tags to a single newline instead of double
//     .replace(/<\/p>/gi, "\n")
//     .replace(/<br\s*\/?>/gi, "\n");

//   // Convert styled tags to markdown-like markers
//   formatted = formatted.replace(/<(strong|b)>(.*?)<\/\1>/gi, "**$2**");
//   formatted = formatted.replace(/<(em|i)>(.*?)<\/\1>/gi, "_$2_");
//   formatted = formatted.replace(/<u>(.*?)<\/u>/gi, "~$1~");

//   // Remove remaining HTML tags
//   formatted = formatted.replace(/<[^>]*>/g, "");

//   // Decode HTML entities
//   const textArea = document.createElement("textarea");
//   textArea.innerHTML = formatted;
//   let decodedText = textArea.value;

//   decodedText = decodedText.replace(/\n{2,}/g, "\n\n");

//   // Render bold/italic/underline react elements
//   const renderStyledText = (text) => {
//     const parts = [];
//     let lastIndex = 0;
//     const regex = /(\*\*(.*?)\*\*)|(_(.*?)_)|(~(.*?)~)/g;
//     let match;

//     while ((match = regex.exec(text)) !== null) {
//       if (match.index > lastIndex) {
//         parts.push(text.substring(lastIndex, match.index));
//       }

//       if (match[1]) parts.push(<strong key={match.index}>{match[2]}</strong>);
//       else if (match[3]) parts.push(<em key={match.index}>{match[4]}</em>);
//       else if (match[5])
//         parts.push(
//           <span key={match.index} className="underline">
//             {match[6]}
//           </span>
//         );

//       lastIndex = regex.lastIndex;
//     }

//     if (lastIndex < text.length) {
//       parts.push(text.substring(lastIndex));
//     }

//     return parts;
//   };

//   return (
//     <pre className="whitespace-pre-wrap text-gray-800 leading-5">
//       {renderStyledText(decodedText.trim())}
//     </pre>
//   );
// };

// export default EmailFormatter;


// import React from "react";
// import DOMPurify from "dompurify";

// const styleMapping = `
//   <style>
//     .formatted-email p {
//       margin: 0.4rem 0;
//       line-height: 1.4;
//     }

//     .formatted-email ol,
//     .formatted-email ul {
//       padding-left: 1.25rem;
//       margin: 0.4rem 0;
//     }

//     .formatted-email ol {
//       list-style-type: decimal;
//     }

//     .formatted-email ul {
//       list-style-type: disc;
//     }

//     .formatted-email li {
//       margin: 0.25rem 0;
//       line-height: 1.4;
//     }

//     .formatted-email .ql-align-right { text-align: right; }
//     .formatted-email .ql-align-center { text-align: center; }
//     .formatted-email .ql-align-justify { text-align: justify; }

//     .formatted-email a {
//       color: #2563eb;
//       text-decoration: underline;
//     }
//   </style>
// `;

// const EmailFormatter = ({ htmlContent }) => {
//   if (!htmlContent) return null;

//   let cleaned = htmlContent.replace(/<span class="ql-ui".*?<\/span>/gi, "");

//   // FIX: Convert Quill <li data-list="bullet"> inside <ol> to <ul>
//   cleaned = cleaned.replace(
//     /<ol>([\s\S]*?)<\/ol>/gi,
//     (match, inner) => {
//       // If inner contains bullet items → convert to <ul>
//       if (inner.includes('data-list="bullet"')) {
//         return `<ul>${inner
//           .replace(/<li[^>]*data-list="bullet"[^>]*>/g, "<li>")
//           }</ul>`;
//       }
//       // ordered list remains <ol>
//       return `<ol>${inner.replace(/<li[^>]*data-list="ordered"[^>]*>/g, "<li>")}</ol>`;
//     }
//   );

//   const sanitized = DOMPurify.sanitize(cleaned, { USE_PROFILES: { html: true } });

//   return (
//     <div
//       className="formatted-email text-gray-900"
//       dangerouslySetInnerHTML={{
//         __html: styleMapping + sanitized,
//       }}
//     />
//   );
// };

// export default EmailFormatter;



import React, { useRef, useEffect } from "react";

const EmailFormatter = ({ htmlContent }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current && htmlContent) {
      // Set the initial HTML content
      ref.current.innerHTML = htmlContent;

      // Fix lists: Convert <ol> with bullet data-list to <ul>
      const ols = ref.current.querySelectorAll("ol");
      ols.forEach((ol) => {
        const firstLi = ol.querySelector('li[data-list]');
        if (firstLi && firstLi.getAttribute("data-list") === "bullet") {
          const ul = document.createElement("ul");
          ul.innerHTML = ol.innerHTML;
          ol.parentNode.replaceChild(ul, ol);
        }
      });

      // Remove unnecessary Quill UI spans (they are empty and for editing)
      const qlUis = ref.current.querySelectorAll(".ql-ui");
      qlUis.forEach((span) => span.remove());
    }
  }, [htmlContent]);

  return (
    <>
      <style>{`
        .email-preview {
          font-family: Arial, sans-serif;
          font-size: 14px;
          line-height: 1.5;
          color: #333;
          max-width: 600px; /* Email-like width */
          // margin: auto;
          padding: 20px;
          // background-color: #fff;
          // border: 1px solid #ddd;
          // border-radius: 4px;
        }
        .email-preview p {
          margin: 0 0 1em 0;
        }
        .email-preview ol,
        .email-preview ul {
          padding-left: 1.5em;
          margin: 0 0 1em 0;
        }
        .email-preview ol li[data-list="ordered"] {
          list-style-type: decimal;
        }
        .email-preview ul li[data-list="bullet"] {
          list-style-type: disc;
        }
        .email-preview a {
          color: #007bff;
          text-decoration: underline;
        }
        .email-preview a:hover {
          text-decoration: none;
        }
        .email-preview strong {
          font-weight: bold;
        }
        .email-preview em {
          font-style: italic;
        }
        .email-preview u {
          text-decoration: underline;
        }
        .email-preview .ql-align-center {
          text-align: center;
        }
        .email-preview .ql-align-right {
          text-align: right;
        }
        .email-preview .ql-align-justify {
          text-align: justify;
        }
        /* Support nested lists if needed */
        .email-preview ol ol,
        .email-preview ul ul,
        .email-preview ol ul,
        .email-preview ul ol {
          margin: 0;
          padding-left: 1.5em;
        }
      `}</style>
      <div ref={ref} className="email-preview" />
    </>
  );
};

export default EmailFormatter;