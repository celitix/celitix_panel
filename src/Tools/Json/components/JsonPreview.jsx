import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

import { EditorState, StateEffect } from "@codemirror/state";
import { EditorView, basicSetup } from "codemirror";
import { json } from "@codemirror/lang-json";

// ICONS
import { Copy } from "lucide-react";
import WrapTextIcon from "@mui/icons-material/WrapText";

// COMPONENTS
import { Button } from "@/components/ui/button";


export default function JsonPreview({ parsedJson, highlightedKey }) {
    const [heightOption, setHeightOption] = useState("400");
    const [customHeight, setCustomHeight] = useState(300);
    const [editorView, setEditorView] = useState(null);
    const [wrapText, setWrapText] = useState(true);
    const editorRef = useRef(null);

    const handleCopy = async () => {
        if (!editorView) return;
        await navigator.clipboard.writeText(editorView.state.doc.toString());
        toast.success("Copied JSON preview");
    };

    const handleToggleWrap = () => {
        if (!editorView) return;
        const newWrap = !wrapText;
        setWrapText(newWrap);

        editorView.dispatch({
            effects: StateEffect.reconfigure.of([
                basicSetup,
                json(),
                newWrap ? EditorView.lineWrapping : [],
            ]),
        });
    };

    // Initialize CodeMirror
    useEffect(() => {
        if (editorRef.current && !editorView) {
            const initialDoc = parsedJson
                ? JSON.stringify(parsedJson, null, 2)
                : "Invalid JSON";

            const view = new EditorView({
                state: EditorState.create({
                    doc: initialDoc,
                    extensions: [
                        basicSetup,
                        json(),
                        wrapText ? EditorView.lineWrapping : [],
                        EditorView.editable.of(false),
                    ],
                }),
                parent: editorRef.current,
            });

            setEditorView(view);
            return () => view.destroy();
        }
    }, [editorRef]);

    useEffect(() => {
        if (editorView) {
            const newDoc = parsedJson
                ? JSON.stringify(parsedJson, null, 2)
                : "Invalid JSON";

            editorView.dispatch({
                changes: { from: 0, to: editorView.state.doc.length, insert: newDoc },
            });
        }
    }, [parsedJson, editorView]);

    const editorHeight =
        heightOption === "custom"
            ? Number(customHeight)
            : heightOption === "auto"
                ? "auto"
                : Number(heightOption);

    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold">Preview</h2>
                <div className="flex gap-1">
                    <div className="flex items-center gap-2 mb-2">
                        {/* <label className="text-gray-700 text-sm font-medium">Height:</label> */}
                        <select
                            className="border rounded-sm p-1 text-sm"
                            value={heightOption}
                            onChange={(e) => setHeightOption(e.target.value)}
                        >
                            <option value="200">200px</option>
                            <option value="300">300px</option>
                            <option value="400">400px</option>
                            <option value="auto">Auto</option>
                            <option value="custom">Custom</option>
                        </select>

                        {heightOption === "custom" && (
                            <input
                                type="number"
                                className="border rounded p-1 w-20 text-sm"
                                placeholder="px"
                                value={customHeight}
                                onChange={(e) => setCustomHeight(e.target.value)}
                            />
                        )}
                    </div>
                    <Button
                        size="icon"
                        variant={wrapText ? "outline" : "ghost"}
                        onClick={handleToggleWrap}
                        className={wrapText ? "bg-blue-100 text-blue-600" : ""}
                    >
                        <WrapTextIcon
                            sx={{ fontSize: "20px", color: wrapText ? "#2563eb" : "inherit" }}
                        />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={handleCopy}>
                        <Copy size={16} />
                    </Button>
                </div>
            </div>
            <div
                ref={editorRef}
                className="w-full border rounded text-sm font-mono bg-gray-50"
                style={{
                    height: editorHeight === "auto" ? "auto" : `${editorHeight}px`,
                    minHeight: 50,
                    overflow: "auto",
                }}
            />
        </div>
    );
}
