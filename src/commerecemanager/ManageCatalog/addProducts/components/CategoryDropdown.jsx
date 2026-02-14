import { useEffect, useState } from "react";
import { fbProductCategories } from "./fbProductCategories";

const CategoryDropdown = ({
  label = "Category",
  value = [],            // controlled value
  onChange,              // returns array path
}) => {
  const [tree, setTree] = useState({});
  const [activePath, setActivePath] = useState([]);
  const [open, setOpen] = useState(false);

  // ---------------------------
  // Build category tree
  // ---------------------------
  const buildTree = (data) => {
    const t = {};
    data.forEach(({ category }) => {
      const levels = category.split(" > ").map((l) => l.trim());
      let cur = t;

      levels.forEach((level) => {
        if (!cur[level]) cur[level] = {};
        cur = cur[level];
      });
    });
    return t;
  };

  useEffect(() => {
    setTree(buildTree(fbProductCategories));
  }, []);

  // ---------------------------
  // Get options for current level
  // ---------------------------
  const getOptions = () => {
    let cur = tree;
    activePath.forEach((p) => {
      cur = cur?.[p] || {};
    });
    return Object.keys(cur);
  };

  const options = getOptions();

  // ---------------------------
  // Open dropdown (RESET TO ROOT)
  // ---------------------------
  const handleOpen = () => {
    setActivePath([]);     // ✅ always start from first step
    setOpen(true);
  };

  // ---------------------------
  // Handle option click
  // ---------------------------
  const handleOptionClick = (opt) => {
    let cur = tree;
    activePath.forEach((p) => {
      cur = cur?.[p] || {};
    });

    const nextNode = cur?.[opt] || {};
    const newPath = [...activePath, opt];

    // If leaf node → final selection
    if (Object.keys(nextNode).length === 0) {
      onChange?.(newPath);   // ✅ send value to parent
      setOpen(false);
      setActivePath([]);
    } else {
      // Go deeper
      setActivePath(newPath);
    }
  };

  // ---------------------------
  // UI
  // ---------------------------
  return (
    <div className="relative w-full">
      <label className="text-sm font-medium text-gray-700">
        {label}
      </label>

      {/* Trigger */}
      <button
        type="button"
        onClick={handleOpen}
        className="w-full mt-1 flex items-center justify-between rounded-md border px-3 py-2 text-sm bg-white
                   border-gray-300 hover:border-gray-400 transition"
      >
        <span
          className={`truncate ${
            value.length ? "text-gray-900" : "text-gray-400"
          }`}
        >
          {value.length ? value.join(" > ") : "Select Category"}
        </span>

        <svg
          className={`w-4 h-4 text-gray-400 transition-transform ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-50 w-full mt-2 rounded-xl border bg-white shadow-xl max-h-72 overflow-auto">
          {options.map((opt) => (
            <div
              key={opt}
              onClick={() => handleOptionClick(opt)}
              className="px-4 py-2.5 text-sm cursor-pointer hover:bg-gray-100 transition text-gray-700"
            >
              {opt}
            </div>
          ))}

          {options.length === 0 && (
            <div className="px-4 py-3 text-sm text-gray-400">
              No sub-categories available
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CategoryDropdown;
