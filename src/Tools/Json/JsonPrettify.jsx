import { useState, useEffect } from "react";

// COMPONENTS
import JsonEditor from "./components/JsonEditor";
import JsonPreview from "./components/JsonPreview";
import JsonActions from "./components/JsonActions";
import JsonExporter from "./components/JsonExporter";

export default function JsonPrettify() {
    const [jsonInput, setJsonInput] = useState(`[
  { "id": 1, "name": "Alice", "age": 25 },
  { "id": 2, "name": "Bob", "age": 30 },
  { "id": 3, "name": "Charlie", "age": 28 }
]`);
    const [parsedJson, setParsedJson] = useState(null);
    const [selectedKey, setSelectedKey] = useState("");
    return (
        <div className="">
            {/* Header */}
            <div className="w-full text-center">
                <h1 className="text-xl font-bold">JSON Tools</h1>
                <p className="text-gray-600 text-xs">
                    Validate, format, and export JSON data easily.
                </p>
            </div>
            <div className="bg-white shadow rounded-xl p-4 flex items-center justify-between mt-4 flex-wrap gap-4">
                {/* Actions */}
                <JsonActions
                    jsonInput={jsonInput}
                    setJsonInput={setJsonInput}
                    setParsedJson={setParsedJson}
                />
                <JsonExporter data={parsedJson} fileName="json_data" />
            </div>
            {/* Editor + Preview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                <div className="bg-white shadow rounded-xl p-4">
                    <JsonEditor
                        jsonInput={jsonInput}
                        setJsonInput={setJsonInput}
                        parsedJson={parsedJson}
                        setParsedJson={setParsedJson}
                        selectedKey={selectedKey}
                        setSelectedKey={setSelectedKey}
                    />
                </div>
                <div className="bg-white shadow rounded-xl p-4">
                    <JsonPreview
                        parsedJson={parsedJson}
                        highlightedKey={selectedKey}
                    />
                </div>
            </div>
        </div>
    );
}