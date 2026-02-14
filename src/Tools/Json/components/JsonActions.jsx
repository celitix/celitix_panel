import toast from "react-hot-toast";

// COMPONENTS
import { Button } from "@/components/ui/button";
// import { toast } from "sonner";

export default function JsonActions({ jsonInput, setJsonInput, setParsedJson }) {
    const handleValidate = () => {
        try {
            const parsed = JSON.parse(jsonInput);
            setParsedJson(parsed);
            toast.success("Valid JSON parsed successfully");
        } catch (e) {
            setParsedJson(null);
            toast.error("Invalid JSON");
        }
    };

    // const handleStringify = () => {
    //     try {
    //         const parsed = JSON.parse(jsonInput);
    //         setJsonInput(JSON.stringify(parsed));
    //         toast.success("Stringified JSON");
    //     } catch {
    //         toast.error("Invalid JSON");
    //     }
    // };

    const handleStringify = () => {
        try {
            const parsed = JSON.parse(jsonInput); // parse current input
            // stringify without indentation (compact)
            const stringified = JSON.stringify(parsed);
            setJsonInput(stringified);
            setParsedJson(parsed); // also update parsedJson for preview/export
            toast.success("JSON stringified successfully");
        } catch (e) {
            toast.error("Invalid JSON: " + e.message);
        }
    };


    const handlePrettify = () => {
        try {
            const parsed = JSON.parse(jsonInput);
            setJsonInput(JSON.stringify(parsed, null, 2));
            setParsedJson(parsed); // also update parsedJson so export works
            toast.success("Prettified JSON");
        } catch {
            toast.error("Invalid JSON");
        }
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(jsonInput);
            toast.success("Copied to clipboard");
        } catch {
            toast.error("Failed to copy");
        }
    };
    const handleParseDoubleEncoded = () => {
        try {
            let input = jsonInput.trim();

            // Remove outer quotes if the entire input is a string
            if (input.startsWith('"') && input.endsWith('"')) {
                input = input.slice(1, -1);
            }

            // Unescape inner quotes
            input = input.replace(/\\"/g, '"');

            // Now parse
            const parsed = JSON.parse(input);

            setJsonInput(JSON.stringify(parsed, null, 2));
            setParsedJson(parsed);
            toast.success("Double-encoded JSON parsed successfully");
        } catch (e) {
            toast.error("Cannot parse double-encoded JSON: " + e.message);
        }
    };


    return (
        <div className="flex flex-wrap gap-2">
            <Button onClick={handleValidate}>Validate</Button>
            <Button variant="outline" onClick={handlePrettify}>
                Prettify
            </Button>
            <Button variant="outline" onClick={handleStringify}>
                Stringify
            </Button>
            <Button variant="outline" onClick={handleParseDoubleEncoded}>
                Parse Double JSON
            </Button>
            {/* <Button variant="ghost" onClick={handleCopy}>
                Copy JSON
            </Button> */}
        </div>
    );
}
