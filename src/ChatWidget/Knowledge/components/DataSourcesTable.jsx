import { useState, useEffect, useRef } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

// ICONS
import { MoreVertical, Globe, Trash, RefreshCw, Info } from "lucide-react";

const sampleData = [
  {
    id: 1,
    name: "abc.com",
    source: "Website",
    usedBy: ["Lyro", "Copilot"],
    audience: "Everyone",
    updated: "Nov 15, 2025, 10:06 AM",
  },
];

const DataSourcesTable = () => {
  const [data] = useState(sampleData);
  const [selectedRows, setSelectedRows] = useState([]);
  const [openMenuRow, setOpenMenuRow] = useState(null);

  const [resyncOpen, setResyncOpen] = useState(false);
  const [resyncRow, setResyncRow] = useState(null);

  const menuRef = useRef(null);

  const allSelected = selectedRows.length === data.length && data.length > 0;

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedRows([]);
    } else {
      setSelectedRows(data.map((item) => item.id));
    }
  };

  const toggleSelectRow = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleMenu = (id) => {
    setOpenMenuRow((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenuRow(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  
  return (
    <div className="w-full mt-6 bg-white rounded-2xl border border-gray-200 shadow-sm">
      {/* Toolbar */}
      <div className="flex items-center px-6 justify-between py-3">
        {selectedRows.length === 0 ? (
          <span className="text-sm font-semibold">Results: {data.length}</span>
        ) : (
          <div className="flex items-center gap-3 text-sm">
            <span className="font-semibold">
              {selectedRows.length} selected
            </span>

            <button className="text-[#2F70FF] border border-gray-300 rounded-lg px-3 py-1.5 hover:bg-gray-50">
              Set audience
            </button>

            <button className="text-red-500 border border-gray-300 rounded-lg px-3 py-1.5 hover:bg-gray-50">
              Delete
            </button>
          </div>
        )}
      </div>

      {/* Header */}
      <div className="grid grid-cols-6 text-xs font-semibold text-gray-500 py-3 px-6 border-t bg-gray-50">
        <input
          type="checkbox"
          className="w-4 h-4 accent-blue-600"
          checked={allSelected}
          onChange={toggleSelectAll}
        />

        <div>Name</div>
        <div>Source</div>
        <div>Used By</div>
        <div>Audience</div>
        <div>Last updated</div>
      </div>

      {/* Rows */}
      {data.map((item) => (
        <div
          key={item.id}
          className="grid grid-cols-6 text-sm px-6 items-center py-4 border-t
                     hover:bg-gray-50 transition"
        >
          {/* Checkbox */}
          <input
            type="checkbox"
            className="w-4 h-4 accent-blue-600"
            checked={selectedRows.includes(item.id)}
            onChange={() => toggleSelectRow(item.id)}
          />

          {/* Name */}
          <div className="font-medium flex items-center gap-1 cursor-pointer hover:underline">
            {item.name} <span>›</span>
          </div>

          {/* Source */}
          <div className="flex items-center gap-2 text-xs">
            <Globe size={16} className="text-blue-600" />
            <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-md">
              {item.source}
            </span>
          </div>

          {/* Used by */}
          <div className="flex gap-2">
            {item.usedBy.map((t) => (
              <span
                key={t}
                className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full"
              >
                ✔ {t}
              </span>
            ))}
          </div>

          {/* Audience */}
          <div>
            <span className="bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded-md">
              {item.audience}
            </span>
          </div>

          {/* Updated + Menu */}
          <div className="relative flex justify-between items-center">
            <span className="text-xs text-gray-600">{item.updated}</span>

            <button
              onClick={() => toggleMenu(item.id)}
              className="p-1 rounded hover:bg-gray-200"
            >
              <MoreVertical size={18} />
            </button>

            {/* Menu */}
            {openMenuRow === item.id && (
              <div
                ref={menuRef}
                className="absolute right-0 top-7 bg-white border shadow-lg rounded-md text-sm w-28 z-50"
              >
                <div
                  className="p-2 hover:bg-gray-100 cursor-pointer flex gap-1"
                  onClick={() => {
                    setResyncRow(item.id);
                    setResyncOpen(true);
                    setOpenMenuRow(null);
                  }}
                >
                  <RefreshCw size={15} className="mt-1" /> Re-sync
                </div>

                {/* *********************************************************************Re-sync Dialog************************************************************************************* */}
                <Dialog
                  visible={resyncOpen}
                  onHide={() => setResyncOpen(false)}
                  modal
                  closable={false}
                  className="rounded-2xl"
                  style={{ width: "500px" }}
                >
                  {/* Close button */}
                  <button
                    onClick={() => setResyncOpen(false)}
                    className="absolute right-3 top-3 p-2 rounded-full hover:bg-gray-100"
                  >
                    <i className="pi pi-times text-gray-500"></i>
                  </button>

                  <div className="mt-2 flex items-start gap-4">
                    <div className="bg-blue-50 text-blue-600 p-2 rounded-lg">
                      <Info size={20} />
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">
                        Are you sure you want to re-sync?
                      </h3>
                      <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                        Re-syncing will delete all previously imported content
                        and download it again. Any edits made to Q&amp;As from a
                        website source will be lost.
                      </p>
                    </div>
                  </div>

                  {/* Footer Buttons */}
                  <div className="flex justify-end gap-3 mt-6 text-sm">
                    <button
                      onClick={() => setResyncOpen(false)}
                      className="border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 rounded-md px-4 py-2 transition"
                    >
                      Cancel
                    </button>

                    <button
                      onClick={() => {
                        console.log("Re-sync confirmed for:", resyncRow);
                        setResyncOpen(false);
                      }}
                      className="bg-blue-600 !text-white hover:bg-blue-700 border-none p-2 rounded-md"
                    >
                      Yes, re-sync
                    </button>
                  </div>
                </Dialog>

                <div className="p-2 hover:bg-gray-100 cursor-pointer text-red-500 flex gap-1">
                  <Trash size={15} className="mt-1" /> Delete
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DataSourcesTable;
