import { useState } from "react";
import * as XLSX from "xlsx";
import Papa from "papaparse";

// COMPONENTS
import { Button } from "@/components/ui/button";
import Checkbox from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";

export default function JsonExporter({ data = [], fileName = "export" }) {
    const [wrapInArray, setWrapInArray] = useState(false);
    const [useCustomName, setUseCustomName] = useState(false);
    const [customName, setCustomName] = useState("");

    // const finalData = Array.isArray(data)
    //     ? data
    //     : wrapInArray
    //         ? [data]
    //         : [];
    // const finalData = Array.isArray(data) ? data : [data]; // always works

    const finalData = Array.isArray(data)
        ? data
        : data && typeof data === "object" && data.body
            ? Object.values(data.body) // <-- flatten body
            : [data];


    const exportName = useCustomName && customName.trim() !== ""
        ? customName
        : fileName;

    const handleExportCSV = () => {
        if (!finalData.length) return;
        const csv = Papa.unparse(finalData);
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.setAttribute("download", `${exportName}.csv`);
        link.click();
    };

    const handleExportExcel = () => {
        if (!finalData.length) return;
        const ws = XLSX.utils.json_to_sheet(finalData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        XLSX.writeFile(wb, `${exportName}.xlsx`);
    };

    return (
        <div className="flex gap-2 flex-wrap">
            <div className="flex items-center gap-4">
                <Button onClick={handleExportCSV} variant="outline">
                    Export CSV
                </Button>
                <Button onClick={handleExportExcel}>
                    Export Excel
                </Button>
            </div>

            {/* <div className="flex items-center gap-2 mt-2">
                <Checkbox
                    id="wrap"
                    checked={wrapInArray}
                    onCheckedChange={setWrapInArray}
                    label="Wrap object in array if needed"
                />
            </div> */}

            <div className="flex items-center gap-2 flex-wrap md:flex-nowrap">
                <Checkbox
                    id="customName"
                    checked={useCustomName}
                    onCheckedChange={setUseCustomName}
                    label="Custom file name"
                    labelClass="text-xs"
                />
                {useCustomName && (
                    <div className="flex flex-col items-start">
                        <p className="text-[0.7rem] mt-1 text-gray-700">Don't add any extension.</p>
                        <Input
                            className="w-50"
                            placeholder="File name"
                            value={customName}
                            onChange={(e) => setCustomName(e.target.value)}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
