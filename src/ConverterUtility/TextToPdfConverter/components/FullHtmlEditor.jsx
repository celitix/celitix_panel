import CodeMirror from '@uiw/react-codemirror';
import { html } from '@codemirror/lang-html';
import { oneDark } from '@codemirror/theme-one-dark';
import DOMPurify from 'dompurify';

export const FullHtmlEditor = ({ value, onChange }) => {
  const handleChange = (val) => {
    onChange(val);
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="bg-gray-800 text-white text-xs px-3 py-2 flex justify-between">
        <span>HTML Template Editor (Full HTML supported)</span>
        <button
          onClick={() => {
            const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PDF Template</title>
  <style>
    body { font-family: 'Helvetica', sans-serif; padding: 40px; background: #f9f9f9; }
    .watermark {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(-45deg);
      font-size: 80px;
      color: rgba(0,0,0,0.1);
      pointer-events: none;
      z-index: -1;
      user-select: none;
    }
    .bg-image {
      background: url('https://yourdomain.com/watermark-bg.png') center/cover no-repeat;
      min-height: 100vh;
    }
  </style>
</head>
<body>
  <div class="watermark">CONFIDENTIAL</div>
  ${val}
</body>
</html>`;
            onChange(fullHtml);
          }}
          className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-xs"
        >
          Add Watermark Template
        </button>
      </div>

      <CodeMirror
        value={value}
        height="600px"
        theme={oneDark}
        extensions={[html()]}
        onChange={handleChange}
        basicSetup={{
          lineNumbers: true,
          foldGutter: true,
          highlightActiveLine: true,
        }}
      />
    </div>
  );
};