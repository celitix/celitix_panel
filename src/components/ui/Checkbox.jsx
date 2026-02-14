import React from "react";

export default function Checkbox({
  id,
  checked = false,
  onCheckedChange,
  label,
  labelClass
}) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onCheckedChange(e.target.checked)}
        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
      />
      {label && (
        <label htmlFor={id} className={`text-sm text-gray-700 cursor-pointer ${labelClass}`}>
          {label}
        </label>
      )}
    </div>
  );
}
