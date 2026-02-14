import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

import { EditorState, StateEffect } from "@codemirror/state";
import { EditorSelection } from "@codemirror/state";
import { EditorView, basicSetup } from "codemirror";
import { json } from "@codemirror/lang-json";

// ICONS
import WrapTextIcon from '@mui/icons-material/WrapText';
import { Copy } from "lucide-react";

// COMPONENTS
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";


export default function JsonEditor({ jsonInput, setJsonInput, parsedJson, setParsedJson }) {
    const [heightOption, setHeightOption] = useState("400"); // default fixed height
    const [customHeight, setCustomHeight] = useState(300);
    const [editorView, setEditorView] = useState(null);
    const [selectedKey, setSelectedKey] = useState("");
    const textareaRef = useRef(null);
    const [wrapText, setWrapText] = useState(true);
    const editorRef = useRef(null);
    const [darkMode, setDarkMode] = useState(true);
    const [gotoLine, setGotoLine] = useState("");
    const [totalLines, setTotalLines] = useState(1);


    const handleGotoLine = () => {
        if (!editorView) return;

        const lineNumber = parseInt(gotoLine, 10);
        if (isNaN(lineNumber) || lineNumber < 1) {
            toast.error("Please enter a valid line number");
            return;
        }

        const state = editorView.state;
        const totalLines = state.doc.lines;

        if (lineNumber > totalLines) {
            toast.error(`Line number out of range (max: ${totalLines})`);
            return;
        }

        try {
            const line = state.doc.line(lineNumber);

            editorView.dispatch({
                selection: { anchor: line.from },
                scrollIntoView: true,
            });
 
            editorView.focus();
            toast.success(` Moved to line ${lineNumber}`);
            setGotoLine("");
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong while jumping to the line");
        }
    };


    const darkTheme = EditorView.theme({
        "&": {
            color: "white",
            backgroundColor: "#034",
        },
        ".cm-content": {
            caretColor: "#0e9",
        },
        "&.cm-focused .cm-cursor": {
            borderLeftColor: "#0e9",
        },
        "&.cm-focused .cm-selectionBackground, ::selection": {
            backgroundColor: "#074",
        },
        ".cm-gutters": {
            backgroundColor: "#045",
            color: "#ddd",
            border: "none",
        },
    }, { dark: true });

    const lightTheme = EditorView.theme({
        "&": {
            color: "black",
            backgroundColor: "#f5f5f5",
        },
        ".cm-content": {
            caretColor: "#000",
        },
        "&.cm-focused .cm-cursor": {
            borderLeftColor: "#000",
        },
        "&.cm-focused .cm-selectionBackground, ::selection": {
            backgroundColor: "#cce",
        },
        ".cm-gutters": {
            backgroundColor: "#e0e0e0",
            color: "#555",
            border: "none",
        },
    }, { dark: false });

    const toggleTheme = () => {
        if (!editorView) return;

        const newMode = !darkMode;
        setDarkMode(newMode);

        editorView.dispatch({
            effects: StateEffect.reconfigure.of([
                basicSetup,
                json(),
                newMode ? darkTheme : lightTheme,
            ]),
        });
    };

    const handleCopy = async () => {
        if (!editorView) return;
        await navigator.clipboard.writeText(editorView.state.doc.toString());
        toast.success("Copied JSON input");
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
                EditorView.updateListener.of((update) => {
                    if (update.docChanged) setJsonInput(update.state.doc.toString());
                }),
            ]),
        });
    };


    const handleFormat = () => {
        if (!editorView) return;

        const current = editorView.state.doc.toString().trim();

        // Try normal parse first
        try {
            const parsed = JSON.parse(current);
            const formatted = JSON.stringify(parsed, null, 2);

            editorView.dispatch({
                changes: { from: 0, to: editorView.state.doc.length, insert: formatted },
            });

            setParsedJson(parsed);
            toast.success("JSON formatted successfully");
            return; // stop here, no wrapping needed
        } catch {
            // Only try wrapping if the text does not already start with [ or {
            if (!current.startsWith("[") && !current.startsWith("{")) {
                try {
                    const cleaned = current.replace(/,\s*$/, "");
                    const wrapped = `[${cleaned}]`;
                    const parsed = JSON.parse(wrapped);
                    const formatted = JSON.stringify(parsed, null, 2);

                    editorView.dispatch({
                        changes: { from: 0, to: editorView.state.doc.length, insert: formatted },
                    });

                    setParsedJson(parsed);
                    toast.success("JSON formatted and wrapped in array");
                    return;
                } catch {
                    toast.error("Cannot format: invalid JSON");
                    return;
                }
            } else {
                toast.error("Cannot format: invalid JSON");
                return;
            }
        }
    };


    const editorHeight =
        heightOption === "custom"
            ? Number(customHeight)
            : heightOption === "auto"
                ? "auto"
                : Number(heightOption);

    // Auto resize effect
    useEffect(() => {
        if (heightOption === "auto" && textareaRef.current) {
            textareaRef.current.style.height = "auto"; // reset height
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [jsonInput, heightOption]);

    // Initialize CodeMirror
    useEffect(() => {
        if (editorRef.current && !editorView) {
            const myTheme = EditorView.theme({
                "&": {
                    color: "white",
                    backgroundColor: "#034",
                },
                ".cm-content": {
                    caretColor: "#0e9",
                },
                "&.cm-focused .cm-cursor": {
                    borderLeftColor: "#0e9",
                },
                "&.cm-focused .cm-selectionBackground, ::selection": {
                    backgroundColor: "#074",
                },
                ".cm-gutters": {
                    backgroundColor: "#045",
                    color: "#ddd",
                    border: "none",
                },
            }, { dark: true });
            const view = new EditorView({
                // state: EditorState.create({
                //     doc: jsonInput,
                //     extensions: [
                //         basicSetup,
                //         json(),
                //         EditorView.updateListener.of((update) => {
                //             if (update.docChanged) {
                //                 setJsonInput(update.state.doc.toString());
                //             }
                //         }),
                //     ],
                // }),
                state: EditorState.create({
                    doc: jsonInput,
                    extensions: [
                        basicSetup,
                        json(),
                        wrapText ? EditorView.lineWrapping : [],
                        // myTheme,
                        EditorView.updateListener.of((update) => {
                            if (update.docChanged) setJsonInput(update.state.doc.toString());
                        }),
                    ],
                }),
                parent: editorRef.current,
            });

            setEditorView(view);

            // cleanup on unmount
            return () => view.destroy();
        }
    }, [editorRef]);

    // Inside JsonEditor.jsx
    useEffect(() => {
        if (editorView && jsonInput !== editorView.state.doc.toString()) {
            editorView.dispatch({
                changes: { from: 0, to: editorView.state.doc.length, insert: jsonInput },
            });
        }
    }, [jsonInput, editorView]);

    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-2 flex-wrap">
                <h2 className="text-lg font-semibold">JSON Input</h2>
                <div className="flex gap-1">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center border rounded-sm">
                            <input
                                type="number"
                                min="1"
                                placeholder="Goto Line"
                                value={gotoLine}
                                onChange={(e) => setGotoLine(e.target.value)}
                                className="w-30 p-1 text-xs focus:outline-none border-r-2"
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        handleGotoLine();
                                    }
                                }}
                            />
                            <Button size="sm" variant="outline" onClick={handleGotoLine} className="h-full border-none text-xs focus:outline-none shadow-none hover:bg-white">
                                Go
                            </Button>
                        </div>
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
                    <Button size="sm" variant="outline" onClick={handleFormat}>
                        Format
                    </Button>
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
                    {/* <Button onClick={toggleTheme}>Toggle Theme</Button> */}


                </div>
            </div>

            {/* Height Selector */}

            {/* <textarea
                ref={textareaRef}
                className="w-full font-mono text-sm border rounded p-2 resize-none"
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                style={{
                    height: editorHeight === "auto" ? "auto" : `${editorHeight}px`,
                    minHeight: 50,
                    width: "100%",
                    boxSizing: "border-box",
                    overflow: "hidden",
                }}
            /> */}
            <div
                ref={editorRef}
                className="w-full border rounded text-sm font-mono"
                style={{
                    height: editorHeight === "auto" ? "auto" : `${editorHeight}px`,
                    minHeight: 50,
                    overflow: "auto",
                }}
            />
        </div>
    );
}
