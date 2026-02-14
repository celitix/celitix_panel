// import * as XLSX from "xlsx";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";
// import toast from "react-hot-toast";

// // csv export
// export const exportToExcel = async (col, row, name) => {
//   if (row.length === 0) return toast.error("No data found");
//   const data = [col, ...row];

//   const worksheet = XLSX.utils.aoa_to_sheet(data);
//   const workbook = XLSX.utils.book_new();
//   XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
//   await XLSX.writeFile(workbook, `${name}.xlsx`);
// };

// // pdf export
// export const exportToPDF = (col, row, name) => {
//   if (row.length === 0) return toast.error("No data found");
//   const pdf = new jsPDF({ orientation: "portrait", unit: "px", format: "a4" });

//   pdf.setFont("Arial");

//   pdf.text(name, 20, 20);

//   autoTable(pdf, {
//     head: [col],
//     body: row,
//     startY: 30,
//     styles: { fontSize: 10, textColor: [50, 50, 50] },
//     headStyles: { fillColor: [244, 244, 244], textColor: 0, fontStyle: "bold" },
//     alternateRowStyles: { fillColor: [249, 249, 249] },
//     margin: { top: 30 },
//   });

//   pdf.save(`${name}.pdf`);
// };

import ExcelJS from "exceljs";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import toast from "react-hot-toast";

// Excel export using ExcelJS (replaces XLSX)
// export const exportToExcel = async (col, row, name) => {
//   if (row.length === 0) return toast.error("No data found");

//   const workbook = new ExcelJS.Workbook();
//   const worksheet = workbook.addWorksheet("Sheet1");

//   // Add header row
//   worksheet.addRow(col);

//   // Add data rows
//   row.forEach((r) => worksheet.addRow(r));

//   // Auto size columns
//   col.forEach((_, index) => {
//     const colRef = worksheet.getColumn(index + 1);
//     colRef.width = Math.max(
//       12,
//       ...worksheet
//         .getColumn(index + 1)
//         .values.map((v) => (v ? v.toString().length + 2 : 12))
//     );
//   });

//   // Create Excel file and download (Browser safe)
//   const buffer = await workbook.xlsx.writeBuffer();
//   const blob = new Blob([buffer], {
//     type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//   });

//   const link = document.createElement("a");
//   link.href = URL.createObjectURL(blob);
//   link.download = `${name}.xlsx`;
//   link.click();
// };

export const exportToExcel = async (col, row, name) => {
  if (row.length === 0) return toast.error("No data found");

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Sheet1");

  // Add the header row and make it bold
  const headerRow = worksheet.addRow(col);
  headerRow.font = { bold: true };

  // Add all data rows at once
  worksheet.addRows(row);

  // Auto-size columns based on content length
  worksheet.columns.forEach((column, i) => {
    let maxLength = 0;
    column.eachCell({ includeEmpty: true }, (cell) => {
      const columnLength = cell.value ? cell.value.toString().length : 10;
      if (columnLength > maxLength) {
        maxLength = columnLength;
      }
    });
    column.width = maxLength < 12 ? 12 : maxLength + 2;
  });

  // Generate and Download
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  const url = window.URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `${name}.xlsx`;
  anchor.click();

  // Clean up the URL object
  window.URL.revokeObjectURL(url);
};
// PDF export (same as before)
export const exportToPDF = (col, row, name) => {
  if (row.length === 0) return toast.error("No data found");

  const pdf = new jsPDF({ orientation: "portrait", unit: "px", format: "a4" });

  pdf.setFont("Arial");
  pdf.text(name, 20, 20);

  autoTable(pdf, {
    head: [col],
    body: row,
    startY: 30,
    styles: { fontSize: 10, textColor: [50, 50, 50] },
    headStyles: { fillColor: [244, 244, 244], textColor: 0, fontStyle: "bold" },
    alternateRowStyles: { fillColor: [249, 249, 249] },
    margin: { top: 30 },
  });

  pdf.save(`${name}.pdf`);
};
