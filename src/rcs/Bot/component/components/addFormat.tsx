// components/FormatToolbar.tsx
import React from "react";
import { motion } from "framer-motion";
import { Tooltip } from "@mui/material";
import {
  FormatBoldOutlined,
  FormatItalicOutlined,
  FormatStrikethroughOutlined,
} from "@mui/icons-material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import CustomEmojiPicker from "@/whatsapp/components/CustomEmojiPicker";

type Props = {
  inputRef: React.RefObject<HTMLTextAreaElement>;
  value: string;
  onChange: (next: string) => void;
  id: string | number;
  listMode: Record<string | number, boolean>;
  setListMode: React.Dispatch<
    React.SetStateAction<Record<string | number, boolean>>
  >;
};

export default function FormatToolbar({
  inputRef,
  value,
  onChange,
  id,
  listMode,
  setListMode,
  onSelect,
}: Props) {
  const addInlineFormat = React.useCallback(
    (formatType: "bold" | "italic" | "strike" | "list") => {
      const el = inputRef.current;
      if (!el) return;

      const input = value || "";
      const selectionStart = el.selectionStart ?? 0;
      const selectionEnd = el.selectionEnd ?? 0;

      const inline = {
        bold: { start: "*", end: "*" },
        italic: { start: "_", end: "_" },
        strike: { start: "~", end: "~" },
      } as const;

      if (formatType !== "list") {
        const selected = input.slice(selectionStart, selectionEnd);
        const { start, end } = inline[formatType];
        const newValue =
          input.slice(0, selectionStart) +
          start +
          selected +
          end +
          input.slice(selectionEnd);

        onChange(newValue);

        requestAnimationFrame(() => {
          const pos = selectionEnd + start.length + end.length;
          el.setSelectionRange(pos, pos);
          el.focus();
        });
        return;
      }

      // LIST handling
      const hasSelection = selectionStart !== selectionEnd;
      if (hasSelection) {
        const selected = input.slice(selectionStart, selectionEnd);
        const transformed = selected
          .split(/\r?\n/)
          .map((l) =>
            l.trim().length ? (l.startsWith("- ") ? l : `- ${l}`) : l
          )
          .join("\n");

        const newValue =
          input.slice(0, selectionStart) +
          transformed +
          input.slice(selectionEnd);
        onChange(newValue);

        requestAnimationFrame(() => {
          inputRef.current?.setSelectionRange(
            selectionStart,
            selectionStart + transformed.length
          );
          inputRef.current?.focus();
        });
      } else {
        const insert = "- ";
        const newValue =
          input.slice(0, selectionStart) + insert + input.slice(selectionStart);
        onChange(newValue);

        setListMode((m) => ({ ...m, [id]: true }));

        requestAnimationFrame(() => {
          const pos = selectionStart + insert.length;
          inputRef.current?.setSelectionRange(pos, pos);
          inputRef.current?.focus();
        });
      }
    },
    [id, inputRef, onChange, setListMode, value]
  );

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (!listMode[id]) return;

      const el = e.currentTarget;
      const v = el.value;
      const { selectionStart, selectionEnd } = el;

      const lineStart = v.lastIndexOf("\n", selectionStart - 1) + 1;
      const nextNl = v.indexOf("\n", selectionStart);
      const lineEnd = nextNl === -1 ? v.length : nextNl;
      const currentLine = v.slice(lineStart, lineEnd);

      if (e.key === "Enter") {
        e.preventDefault();

        const trimmed = currentLine.trim();
        if (!trimmed || trimmed === "-" || trimmed === "- ") {
          const newVal =
            v.slice(0, selectionStart) + "\n" + v.slice(selectionEnd);
          onChange(newVal);
          setListMode((m) => ({ ...m, [id]: false }));

          requestAnimationFrame(() => {
            const pos = selectionStart + 1;
            inputRef.current?.setSelectionRange(pos, pos);
            inputRef.current?.focus();
          });
          return;
        }

        const insert = "\n- ";
        const newVal =
          v.slice(0, selectionStart) + insert + v.slice(selectionEnd);
        onChange(newVal);

        requestAnimationFrame(() => {
          const pos = selectionStart + insert.length;
          inputRef.current?.setSelectionRange(pos, pos);
          inputRef.current?.focus();
        });
      }

      if (e.key === "Backspace") {
        const caretInFirstTwo = selectionStart - lineStart <= 2;
        const startsWithDash = /^-\s?/.test(currentLine);

        if (caretInFirstTwo && startsWithDash) {
          e.preventDefault();
          const withoutDash = currentLine.replace(/^-\s?/, "");
          const newVal = v.slice(0, lineStart) + withoutDash + v.slice(lineEnd);
          onChange(newVal);

          const shouldExit = withoutDash.trim().length === 0;
          if (shouldExit) setListMode((m) => ({ ...m, [id]: false }));

          requestAnimationFrame(() => {
            const pos = lineStart;
            inputRef.current?.setSelectionRange(pos, pos);
            inputRef.current?.focus();
          });
        }
      }
    },
    [id, inputRef, listMode, onChange, setListMode]
  );

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="flex items-center gap-2 mt-2 bg-white border border-slate-200 rounded-xl px-2 py-2 shadow w-max"
      >
        <Tooltip title="Bold" arrow>
          <button
            type="button"
            onClick={() => addInlineFormat("bold")}
            className="hover:bg-indigo-100 text-indigo-500 rounded-md p-1 transition cursor-pointer"
          >
            <FormatBoldOutlined fontSize="small" />
          </button>
        </Tooltip>

        <Tooltip title="Italic" arrow>
          <button
            type="button"
            onClick={() => addInlineFormat("italic")}
            className="hover:bg-indigo-100 text-indigo-500 rounded-md p-1 transition cursor-pointer"
          >
            <FormatItalicOutlined fontSize="small" />
          </button>
        </Tooltip>

        <Tooltip title="Strikethrough" arrow>
          <button
            type="button"
            onClick={() => addInlineFormat("strike")}
            className="hover:bg-indigo-100 text-indigo-500 rounded-md p-1 transition cursor-pointer"
          >
            <FormatStrikethroughOutlined fontSize="small" />
          </button>
        </Tooltip>

        <Tooltip title="List" arrow>
          <button
            type="button"
            onClick={() => addInlineFormat("list")}
            className="hover:bg-indigo-100 text-indigo-500 rounded-md p-1 transition cursor-pointer"
          >
            <FormatListBulletedIcon fontSize="small" />
          </button>
        </Tooltip>
        <div className="w-px h-5 bg-slate-300 mx-1"></div>
        <Tooltip title="Emoji Picker" arrow>
          <CustomEmojiPicker position="top" onSelect={onSelect} />
        </Tooltip>
      </motion.div>

  
      {/* @ts-ignore */}
      {((FormatToolbar as any).handleKeyDown = handleKeyDown)}
    </div>
  );
}

export function useListKeydown(args: {
  id: string | number;
  inputRef: React.RefObject<HTMLTextAreaElement>;
  value: string;
  onChange: (next: string) => void;
  listMode: Record<string | number, boolean>;
  setListMode: React.Dispatch<
    React.SetStateAction<Record<string | number, boolean>>
  >;
}) {
  const { id, inputRef, value, onChange, listMode, setListMode } = args;
  return React.useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (!listMode[id]) return;

      const el = e.currentTarget;
      const v = el.value;
      const { selectionStart, selectionEnd } = el;

      const lineStart = v.lastIndexOf("\n", selectionStart - 1) + 1;
      const nextNl = v.indexOf("\n", selectionStart);
      const lineEnd = nextNl === -1 ? v.length : nextNl;
      const currentLine = v.slice(lineStart, lineEnd);

      if (e.key === "Backspace") {
        const caretInFirstTwo = selectionStart - lineStart <= 2;
        const startsWithDash = /^-\s?/.test(currentLine);
        if (caretInFirstTwo && startsWithDash) {
          e.preventDefault();
          const withoutDash = currentLine.replace(/^-\s?/, "");
          const newVal = v.slice(0, lineStart) + withoutDash + v.slice(lineEnd);
          onChange(newVal);
          const shouldExit = withoutDash.trim().length === 0;
          if (shouldExit) setListMode((m) => ({ ...m, [id]: false }));
          requestAnimationFrame(() => {
            const pos = lineStart;
            inputRef.current?.setSelectionRange(pos, pos);
            inputRef.current?.focus();
          });
        }
      }
    },
    [id, inputRef, listMode, onChange, setListMode]
  );
}











// usecase



//  const [value, setValue] = React.useState("");
//   const [listMode, setListMode] = React.useState<
//     Record<string | number, boolean>
//   >({});
//   const editorId = "message";

//   // Hook gives you a keydown handler that supports list-enter/backspace logic
//   const onKeyDown = useListKeydown({
//     id: editorId,
//     inputRef,
//     value,
//     onChange: setValue,
//     listMode,
//     setListMode,
//   });



//  <FormatToolbar
//           id={id}
//           inputRef={inputRef}
//           value={nodesInputData[id]?.message || ""}
//           onChange={(next) =>
//             setNodesInputData((prev) => ({
//               ...prev,
//               [id]: { ...prev[id], message: next },
//             }))
//           }
//           listMode={listMode}
//           setListMode={setListMode}
//           onSelect={insertEmoji}
//         />
//         <Textarea
//             id="textBox"
//             placeholder="Enter message"
//             value={nodesInputData[id]?.message || ""}
//             onChange={(e) =>
//               setNodesInputData((prev) => ({
//                 ...prev,
//                 [id]: { ...prev[id], message: e.target.value },
//               }))
//             }
//             className="resize-none h-50"
//             maxLength={4096}
//             ref={inputRef}
//             onKeyDown={onKeyDown}
//           />
