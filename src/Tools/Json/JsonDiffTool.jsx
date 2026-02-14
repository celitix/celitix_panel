import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { diff } from "deep-diff";

import { EditorState, StateEffect } from "@codemirror/state";
import { EditorView, basicSetup } from "codemirror";
import { Decoration } from "@codemirror/view";
import { json } from "@codemirror/lang-json";

// ICONS
import { Copy, Code2 } from "lucide-react";
import WrapTextIcon from "@mui/icons-material/WrapText";

// COMPONENTS
import { Button } from "@/components/ui/button";

export default function JsonDiffTool() {
    const [leftJson, setLeftJson] = useState(`{
        "id": 1,
        "name": "Alice",
        "age": 25
    }`);
    const [rightJson, setRightJson] = useState(`{
        "id": 1,
        "name": "Alice",
        "age": 26,
        "city": "New York"
    }`);

    const [wrapText, setWrapText] = useState(true);

    const leftEditorRef = useRef(null);
    const rightEditorRef = useRef(null);

    const [leftView, setLeftView] = useState(null);
    const [rightView, setRightView] = useState(null);

    const escapeRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const buildExtensions = (isLeft, decoSet = null) => {
        const updateListener = EditorView.updateListener.of((update) => {
            if (!update.docChanged) return;
            const txt = update.state.doc.toString();
            if (isLeft) setLeftJson(txt);
            else setRightJson(txt);
        });

        const exts = [
            basicSetup,
            json(),
            wrapText ? EditorView.lineWrapping : [],
            updateListener,
        ];

        if (decoSet) {
            exts.push(EditorView.decorations.of(decoSet));
        }

        return exts;
    };

    // Initialize left editor
    useEffect(() => {
        if (!leftEditorRef.current || leftView) return;

        const view = new EditorView({
            state: EditorState.create({
                doc: leftJson,
                extensions: buildExtensions(true),
            }),
            parent: leftEditorRef.current,
        });

        setLeftView(view);

        return () => view.destroy();
    }, [leftEditorRef]);

    // Initialize right editor
    useEffect(() => {
        if (!rightEditorRef.current || rightView) return;

        const view = new EditorView({
            state: EditorState.create({
                doc: rightJson,
                extensions: buildExtensions(false),
            }),
            parent: rightEditorRef.current,
        });

        setRightView(view);

        return () => view.destroy();
    }, [rightEditorRef]);

    useEffect(() => {
        if (!leftView) return;
        const docStr = leftView.state.doc.toString();
        if (leftJson !== docStr) {
            leftView.dispatch({
                changes: { from: 0, to: leftView.state.doc.length, insert: leftJson },
            });
        }
    }, [leftJson, leftView]);

    useEffect(() => {
        if (!rightView) return;
        const docStr = rightView.state.doc.toString();
        if (rightJson !== docStr) {
            rightView.dispatch({
                changes: { from: 0, to: rightView.state.doc.length, insert: rightJson },
            });
        }
    }, [rightJson, rightView]);

    const handleToggleWrap = () => {
        const newWrap = !wrapText;
        setWrapText(newWrap);

        [{ view: leftView, isLeft: true }, { view: rightView, isLeft: false }].forEach(
            ({ view, isLeft }) => {
                if (!view) return;
                view.dispatch({
                    effects: StateEffect.reconfigure.of(buildExtensions(isLeft)),
                });
            }
        );
    };

    const handleCopy = async (side) => {
        const view = side === "left" ? leftView : rightView;
        if (!view) return;
        await navigator.clipboard.writeText(view.state.doc.toString());
        toast.success(`Copied ${side === "left" ? "Left" : "Right"} JSON`);
    };

    const handleFormat = (side) => {
        const view = side === "left" ? leftView : rightView;
        if (!view) return;
        const content = view.state.doc.toString().trim();
        try {
            const parsed = JSON.parse(content);
            const formatted = JSON.stringify(parsed, null, 2);
            view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: formatted } });
            toast.success(`${side === "left" ? "Left" : "Right"} JSON formatted`);
        } catch {
            toast.error("Invalid JSON");
        }
    };

    // const buildDecorationSet = (marks) => {
    //     if (!marks || marks.length === 0) return Decoration.set([]);
    //     const decos = marks.map((m) => Decoration.mark({ class: m.className }).range(m.from, m.to));
    //     return Decoration.set(decos);
    // };

    const buildDecorationSet = (marks) => {
        if (!marks || marks.length === 0) return Decoration.set([]);

        const sortedMarks = [...marks].sort((a, b) => a.from - b.from);

        const decos = sortedMarks.map((m) =>
            Decoration.mark({ class: m.className }).range(m.from, m.to)
        );

        return Decoration.set(decos);
    };

    const handleHighlightDiff = () => {
        if (!leftView || !rightView) {
            toast.error("Editors not ready");
            return;
        }

        let leftParsed, rightParsed;
        try {
            leftParsed = JSON.parse(leftJson);
            rightParsed = JSON.parse(rightJson);
        } catch {
            toast.error("Both JSONs must be valid for comparison");
            return;
        }

        const differences = diff(leftParsed, rightParsed);
        if (!differences) {
            leftView.dispatch({ effects: StateEffect.reconfigure.of(buildExtensions(true)) });
            rightView.dispatch({ effects: StateEffect.reconfigure.of(buildExtensions(false)) });
            toast.success("Both JSONs are identical!");
            return;
        }

        const leftMarks = [];
        const rightMarks = [];

        const docLeft = leftView.state.doc.toString();
        const docRight = rightView.state.doc.toString();

        differences.forEach((d) => {
            const path = d.path ?? [];
            const key = path[path.length - 1];
            if (key === undefined) return;

            const keyPattern = new RegExp(`"${escapeRegExp(String(key))}"\\s*:`, "g");

            let m;
            while ((m = keyPattern.exec(docLeft)) !== null) {
                const matchStr = m[0];
                const start = m.index;
                const secondQuoteInMatch = matchStr.indexOf('"', 1);
                const end = start + (secondQuoteInMatch >= 0 ? secondQuoteInMatch + 1 : matchStr.length);
                leftMarks.push({ from: start, to: end, className: "cm-diff-left" });
            }

            keyPattern.lastIndex = 0;
            while ((m = keyPattern.exec(docRight)) !== null) {
                const matchStr = m[0];
                const start = m.index;
                const secondQuoteInMatch = matchStr.indexOf('"', 1);
                const end = start + (secondQuoteInMatch >= 0 ? secondQuoteInMatch + 1 : matchStr.length);
                rightMarks.push({ from: start, to: end, className: "cm-diff-right" });
            }
        });

        const leftDeco = buildDecorationSet(leftMarks);
        const rightDeco = buildDecorationSet(rightMarks);

        leftView.dispatch({ effects: StateEffect.reconfigure.of(buildExtensions(true, leftDeco)) });
        rightView.dispatch({ effects: StateEffect.reconfigure.of(buildExtensions(false, rightDeco)) });
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center md:justify-between justify-center flex-wrap md:flex-nowrap gap-4">
                <h2 className="text-lg font-semibold text-nowrap">JSON Diff Tool</h2>
                <p className="text-xs text-gray-500">
                    Paste or edit your JSON data in the editors below to compare differences.
                    This tool highlights key changes between two JSON objects — perfect for debugging,
                    API responses, or configuration reviews.
                </p>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={handleHighlightDiff}>
                        Compare JSONs
                    </Button>
                    <Button
                        size="icon"
                        variant={wrapText ? "outline" : "ghost"}
                        onClick={handleToggleWrap}
                        className={wrapText ? "bg-blue-100 text-blue-600" : ""}
                    >
                        <WrapTextIcon sx={{ fontSize: "20px", color: wrapText ? "#2563eb" : "inherit" }} />
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Left Editor */}
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-gray-700">JSON A</span>
                        <div className="flex gap-1">
                            <Button size="sm" variant="outline" onClick={() => handleFormat("left")}>
                                <Code2 size={14} /> Format
                            </Button>
                            <Button size="icon" variant="ghost" onClick={() => handleCopy("left")} className="cursor-pointer">
                                <Copy size={14} />
                            </Button>
                        </div>
                    </div>
                    <div
                        ref={leftEditorRef}
                        className="w-full border rounded text-sm font-mono bg-gray-50"
                        style={{ height: "72vh", minHeight: 100, overflow: "auto" }}
                    />
                </div>

                {/* Right Editor */}
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-gray-700">JSON B</span>
                        <div className="flex gap-1">
                            <Button size="sm" variant="outline" onClick={() => handleFormat("right")}>
                                <Code2 size={14} /> Format
                            </Button>
                            <Button size="icon" variant="ghost" onClick={() => handleCopy("right")} className="cursor-pointer">
                                <Copy size={14} />
                            </Button>
                        </div>
                    </div>
                    <div
                        ref={rightEditorRef}
                        className="w-full border rounded text-sm font-mono bg-gray-50"
                        style={{ height: "72vh", minHeight: 100, overflow: "auto" }}
                    />
                </div>
            </div>
        </div>
    );
}
