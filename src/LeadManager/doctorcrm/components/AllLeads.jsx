// import * as React from 'react';
// import { useState } from "react";

// import PropTypes from 'prop-types';
// import { alpha } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TablePagination from '@mui/material/TablePagination';
// import TableRow from '@mui/material/TableRow';
// import TableSortLabel from '@mui/material/TableSortLabel';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Paper from '@mui/material/Paper';
// import Checkbox from '@mui/material/Checkbox';
// import IconButton from '@mui/material/IconButton';
// import Tooltip from '@mui/material/Tooltip';
// // import FormControlLabel from '@mui/material/FormControlLabel';
// // import Switch from '@mui/material/Switch';
// import DeleteIcon from '@mui/icons-material/Delete';
// import FilterListIcon from '@mui/icons-material/FilterList';
// import { visuallyHidden } from '@mui/utils';

// function createData(id, name, calories, fat, carbs, protein) {
//   return {
//     id,
//     name,
//     calories,
//     fat,
//     carbs,
//     protein,
//   };
// }

// const rows = [
//   createData(1, 'Cupcake', 305, 3.7, 67, 4.3),
//   createData(2, 'Donut', 452, 25.0, 51, 4.9),
//   createData(3, 'Eclair', 262, 16.0, 24, 6.0),
//   createData(4, 'Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData(5, 'Gingerbread', 356, 16.0, 49, 3.9),
//   createData(6, 'Honeycomb', 408, 3.2, 87, 6.5),
//   createData(7, 'Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData(8, 'Jelly Bean', 375, 0.0, 94, 0.0),
//   createData(9, 'KitKat', 518, 26.0, 65, 7.0),
//   createData(10, 'Lollipop', 392, 0.2, 98, 0.0),
//   createData(11, 'Marshmallow', 318, 0, 81, 2.0),
//   createData(12, 'Nougat', 360, 19.0, 9, 37.0),
//   createData(13, 'Oreo', 437, 18.0, 63, 4.0),
// ];

// function descendingComparator(a, b, orderBy) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

// function getComparator(order, orderBy) {
//   return order === 'desc'
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// }

// const headCells = [
//   {
//     id: 'name',
//     numeric: false,
//     disablePadding: true,
//     label: 'Patient Name',
//   },
//   {
//     id: 'calories',
//     numeric: true,
//     disablePadding: true,
//     label: 'Age',
//   },
//   {
//     id: 'fat',
//     numeric: true,
//     disablePadding: false,
//     label: 'Appointment Date',
//   },
//   {
//     id: 'carbs',
//     numeric: true,
//     disablePadding: false,
//     label: 'Priority',
//   },
//   {
//     // id: 'protein',
//     numeric: true,
//     disablePadding: false,
//     label: 'Action',
//   },
// ];

// function EnhancedTableHead(props) {
//   const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
//     props;
//   const createSortHandler = (property) => (event) => {
//     onRequestSort(event, property);
//   };

//   return (
//     <TableHead >
//       <TableRow className=' '>
//         {/* <TableCell padding="checkbox">
//           <Checkbox
//             color="primary"
//             indeterminate={numSelected > 0 && numSelected < rowCount}
//             checked={rowCount > 0 && numSelected === rowCount}
//             onChange={onSelectAllClick}
//             inputProps={{
//               'aria-label': 'select all desserts',
//             }}
//           />
//         </TableCell> */}
//         {headCells.map((headCell) => (
//           <TableCell
//             key={headCell.id}
//             align={headCell.numeric ? 'right' : 'left'}
//             padding={headCell.disablePadding ? 'none' : 'normal'}
//             sortDirection={orderBy === headCell.id ? order : false}
//             className=''
//           >
//             <TableSortLabel
//               active={orderBy === headCell.id}
//               direction={orderBy === headCell.id ? order : 'asc'}
//               onClick={createSortHandler(headCell.id)}
//             >
//               {headCell.label}
//               {orderBy === headCell.id ? (
//                 <Box component="span" sx={visuallyHidden}>
//                   {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
//                 </Box>
//               ) : null}
//             </TableSortLabel>
//           </TableCell>
//         ))}
//       </TableRow>
//     </TableHead>
//   );
// }

// EnhancedTableHead.propTypes = {
//   numSelected: PropTypes.number.isRequired,
//   onRequestSort: PropTypes.func.isRequired,
//   onSelectAllClick: PropTypes.func.isRequired,
//   order: PropTypes.oneOf(['asc', 'desc']).isRequired,
//   orderBy: PropTypes.string.isRequired,
//   rowCount: PropTypes.number.isRequired,
// };

// function EnhancedTableToolbar(props) {
//   const { numSelected } = props;
//   return (
//     <Toolbar
//       sx={[
//         {
//           pl: { sm: 2 },
//           pr: { xs: 1, sm: 1 },
//         },
//         numSelected > 0 && {
//           bgcolor: (theme) =>
//             alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
//         },
//       ]}
//     >
//       {numSelected > 0 ? (
//         <Typography
//           sx={{ flex: '1 1 100%' }}
//           color="inherit"
//           variant="subtitle1"
//           component="div"
//         >
//           {numSelected} selected
//         </Typography>
//       ) : (
//         <Typography
//           sx={{ flex: '1 1 100%' }}
//           variant="h6"
//           id="tableTitle"
//           component="div"
//         >
//           All Leads
//         </Typography>
//       )}
//       {numSelected > 0 ? (
//         <Tooltip title="Delete">
//           <IconButton>
//             <DeleteIcon />
//           </IconButton>
//         </Tooltip>
//       ) : (
//         <Tooltip title="Filter list">
//           <IconButton>
//             <FilterListIcon />
//           </IconButton>
//         </Tooltip>
//       )}
//     </Toolbar>
//   );
// }

// EnhancedTableToolbar.propTypes = {
//   numSelected: PropTypes.number.isRequired,
// };

// export default function EnhancedTable() {
//   const [order, setOrder] = useState('asc');
//   const [orderBy, setOrderBy] = useState('calories');
//   const [selected, setSelected] = useState([]);
//   const [page, setPage] = useState(0);
//   // const [dense, setDense] = useState(false);
//   const [rowsPerPage, setRowsPerPage] = useState(5);

//   const handleRequestSort = (event, property) => {
//     const isAsc = orderBy === property && order === 'asc';
//     setOrder(isAsc ? 'desc' : 'asc');
//     setOrderBy(property);
//   };

//   const handleSelectAllClick = (event) => {
//     if (event.target.checked) {
//       const newSelected = rows.map((n) => n.id);
//       setSelected(newSelected);
//       return;
//     }
//     setSelected([]);
//   };

//   const handleClick = (event, id) => {
//     const selectedIndex = selected.indexOf(id);
//     let newSelected = [];

//     if (selectedIndex === -1) {
//       newSelected = newSelected.concat(selected, id);
//     } else if (selectedIndex === 0) {
//       newSelected = newSelected.concat(selected.slice(1));
//     } else if (selectedIndex === selected.length - 1) {
//       newSelected = newSelected.concat(selected.slice(0, -1));
//     } else if (selectedIndex > 0) {
//       newSelected = newSelected.concat(
//         selected.slice(0, selectedIndex),
//         selected.slice(selectedIndex + 1),
//       );
//     }
//     setSelected(newSelected);
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   // const handleChangeDense = (event) => {
//   //   setDense(event.target.checked);
//   // };

//   // Avoid a layout jump when reaching the last page with empty rows.
//   const emptyRows =
//     page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

//   const visibleRows = React.useMemo(
//     () =>
//       [...rows]
//         .sort(getComparator(order, orderBy))
//         .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
//     [order, orderBy, page, rowsPerPage],
//   );

//   return (
//     <Box sx={{ width: '100%' }}>
//       <Paper sx={{ width: '100%', mb: 2 }}>
//         <EnhancedTableToolbar numSelected={selected.length} />
//         <TableContainer className='p-4' >
//           <Table
//             // sx={{ minWidth: 750 }}
//             aria-labelledby="tableTitle"
//             // size={dense ? 'small' : 'medium'}

//           >
//             <EnhancedTableHead
//               numSelected={selected.length}
//               order={order}
//               orderBy={orderBy}
//               onSelectAllClick={handleSelectAllClick}
//               onRequestSort={handleRequestSort}
//               rowCount={rows.length}
//             />
//             <TableBody>
//               {visibleRows.map((row, index) => {
//                 const isItemSelected = selected.includes(row.id);
//                 const labelId = `enhanced-table-checkbox-${index}`;

//                 return (
//                   <TableRow
//                     hover
//                     onClick={(event) => handleClick(event, row.id)}
//                     role="checkbox"
//                     aria-checked={isItemSelected}
//                     tabIndex={-1}
//                     key={row.id}
//                     selected={isItemSelected}
//                     sx={{ cursor: 'pointer' }}
//                   >
//                     {/* <TableCell padding="checkbox">
//                       <Checkbox
//                         color="primary"
//                         checked={isItemSelected}
//                         inputProps={{
//                           'aria-labelledby': labelId,
//                         }}
//                       />
//                     </TableCell> */}
//                     <TableCell
//                       component="th"
//                       id={labelId}
//                       scope="row"
//                       padding="none"
//                     >
//                       {row.name}
//                     </TableCell>
//                     <TableCell align="right">{row.calories}</TableCell>
//                     <TableCell align="right">{row.fat}</TableCell>
//                     <TableCell align="right">{row.carbs}</TableCell>
//                     <TableCell align="right">{row.protein}</TableCell>
//                   </TableRow>
//                 );
//               })}
//               {emptyRows > 0 && (
//                 <TableRow
//                   // style={{
//                   //   height: (dense ? 33 : 53) * emptyRows,
//                   // }}
//                 >
//                   <TableCell colSpan={6} />
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <TablePagination
//           rowsPerPageOptions={[5, 10, 25]}
//           component="div"
//           count={rows.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       </Paper>
//       {/* <FormControlLabel
//         control={<Switch checked={dense} onChange={handleChangeDense} />}
//         label="Dense padding"
//       /> */}
//     </Box>
//   );
// }

// import * as React from "react";
// import { useState } from "react";
// import PropTypes from "prop-types";
// import Box from "@mui/material/Box";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TablePagination from "@mui/material/TablePagination";
// import TableRow from "@mui/material/TableRow";
// import TableSortLabel from "@mui/material/TableSortLabel";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
// import Paper from "@mui/material/Paper";
// import IconButton from "@mui/material/IconButton";
// import Tooltip from "@mui/material/Tooltip";
// import FilterListIcon from "@mui/icons-material/FilterList";
// import { visuallyHidden } from "@mui/utils";

// /* -------------------- DATA -------------------- */

// function createData(id, name, age, date, priority) {
//   return { id, name, age, date, priority };
// }

// const rows = [
//   createData(1, "Rahul Sharma", 32, "12-09-2025", "High"),
//   createData(2, "Anita Verma", 45, "13-09-2025", "Medium"),
//   createData(3, "Amit Singh", 29, "14-09-2025", "Low"),
//   createData(4, "Neha Patel", 37, "15-09-2025", "High"),
//   createData(5, "Rohit Kumar", 50, "16-09-2025", "Medium"),
// ];

// /* -------------------- SORT HELPERS -------------------- */

// function descendingComparator(a, b, orderBy) {
//   if (b[orderBy] < a[orderBy]) return -1;
//   if (b[orderBy] > a[orderBy]) return 1;
//   return 0;
// }

// function getComparator(order, orderBy) {
//   return order === "desc"
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// }

// /* -------------------- TABLE HEAD -------------------- */

// const headCells = [
//   { id: "sr", label: "Sr No.", numeric: false, sortable: false },
//   { id: "name", label: "Patient Name", numeric: false, sortable: true },
//   { id: "age", label: "Age", numeric: true, sortable: true },
//   { id: "date", label: "Appointment Date", numeric: true, sortable: true },
//   { id: "priority", label: "Priority", numeric: true, sortable: true },
// ];

// function EnhancedTableHead({ order, orderBy, onRequestSort }) {
//   const createSortHandler = (property) => (event) => {
//     onRequestSort(event, property);
//   };

//   return (
//     <TableHead>
//       <TableRow>
//         {headCells.map((headCell) => (
//           <TableCell
//             key={headCell.id}
//             align={headCell.numeric ? "right" : "left"}
//             sortDirection={
//               headCell.sortable && orderBy === headCell.id ? order : false
//             }
//           >
//             {headCell.sortable ? (
//               <TableSortLabel
//                 active={orderBy === headCell.id}
//                 direction={orderBy === headCell.id ? order : "asc"}
//                 onClick={createSortHandler(headCell.id)}
//               >
//                 {headCell.label}
//                 {orderBy === headCell.id && (
//                   <Box component="span" sx={visuallyHidden}>
//                     {order === "desc"
//                       ? "sorted descending"
//                       : "sorted ascending"}
//                   </Box>
//                 )}
//               </TableSortLabel>
//             ) : (
//               headCell.label
//             )}
//           </TableCell>
//         ))}
//       </TableRow>
//     </TableHead>
//   );
// }

// EnhancedTableHead.propTypes = {
//   order: PropTypes.oneOf(["asc", "desc"]).isRequired,
//   orderBy: PropTypes.string.isRequired,
//   onRequestSort: PropTypes.func.isRequired,
// };

// /* -------------------- TOOLBAR -------------------- */

// function EnhancedTableToolbar() {
//   return (
//     <Toolbar sx={{ pl: 2, pr: 1 }}>
//       <Typography sx={{ flex: 1 }} variant="h6">
//         All Leads
//       </Typography>
//       <Tooltip title="Filter list">
//         <IconButton>
//           <FilterListIcon />
//         </IconButton>
//       </Tooltip>
//     </Toolbar>
//   );
// }

// /* -------------------- MAIN TABLE -------------------- */

// export default function EnhancedTable() {
//   const [order, setOrder] = useState("asc");
//   const [orderBy, setOrderBy] = useState("name");
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);

//   const handleRequestSort = (event, property) => {
//     if (property === "sr") return;
//     const isAsc = orderBy === property && order === "asc";
//     setOrder(isAsc ? "desc" : "asc");
//     setOrderBy(property);
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const visibleRows = React.useMemo(
//     () =>
//       [...rows]
//         .sort(getComparator(order, orderBy))
//         .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
//     [order, orderBy, page, rowsPerPage]
//   );

//   return (
//     <Box sx={{ width: "100%" }}>
//       <Paper sx={{ width: "100%", mb: 2 }}>
//         <EnhancedTableToolbar />

//         <TableContainer sx={{ p: 2 }}>
//           <Table>
//             <EnhancedTableHead
//               order={order}
//               orderBy={orderBy}
//               onRequestSort={handleRequestSort}
//             />

//             <TableBody>
//               {visibleRows.map((row, index) => (
//                 <TableRow hover key={row.id}>
//                   {/* SR NO */}
//                   <TableCell>
//                     {page * rowsPerPage + index + 1}
//                   </TableCell>

//                   <TableCell>{row.name}</TableCell>
//                   <TableCell align="right">{row.age}</TableCell>
//                   <TableCell align="right">{row.date}</TableCell>
//                   <TableCell align="right">{row.priority}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>

//         <TablePagination
//           rowsPerPageOptions={[5, 10, 25]}
//           component="div"
//           count={rows.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       </Paper>
//     </Box>
//   );
// }

import * as React from "react";
import { useState, useMemo } from "react";
import { useEffect } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
  Paper,
  IconButton,
  Tooltip,
  Chip,
  Divider,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
// import { visuallyHidden } from "@mui/utils";
import LeadDrawer from "./LeadDrawer";
import DropdownWithSearch from "@/whatsapp/components/DropdownWithSearch";
import UniversalButton from "@/components/common/UniversalButton";
// import DropdownWithSearch from "./DropdownWithSearch";
// import UniversalButton from "./UniversalButton";

const departmentOptions = [
  { value: "All", label: "All" },
  { value: "Cardiology", label: "Cardiology" },
  { value: "Neurology", label: "Neurology" },
  { value: "Orthopedics", label: "Orthopedics" },
  { value: "Pediatrics", label: "Pediatrics" },
];

const statusOptions = [
  { value: "All", label: "All" },
  { value: "Open", label: "Open" },
  { value: "Visited", label: "Visited" },
  { value: "Admitted", label: "Admitted" },
  { value: "Booked", label: "Booked" },
  { value: "Lost", label: "Lost" },
  { value: "Canceled", label: "Canceled" },
  { value: "Closed", label: "Closed" },
];

const statusClasses = {
  Open: "bg-green-200 text-green-700",
  Visited: "bg-blue-200 text-blue-700",
  Booked: "bg-indigo-200 text-indigo-700",
  Admitted: "bg-yellow-200 text-yellow-700",
  Closed: "bg-gray-200 text-gray-700",
  Lost: "bg-red-200 text-red-700",
  Canceled: "bg-red-200 text-red-700",
};

/* -------------------- DATA -------------------- */

// function createData(
//   id,
//   name,
//   source,
//   appointmentType,
//   leadType,
//   department,
//   doctor,
//   appointmentDate,
//   appointmentTime,
//   status,
//   priority,
//   phone,
//   email,
//   notes
// ) {
//   return {
//     id,
//     name,
//     source,
//     appointmentType,
//     leadType,
//     department,
//     doctor,
//     appointmentDate,
//     appointmentTime,
//     status,
//     priority,
//     phone,
//     email,
//     notes,
//   };
// }

// const rows = [
//   createData(
//     1,
//     "Harish Sharma",
//     "WhatsApp",
//     "In Person",
//     "New",
//     "Cardiology",
//     "Dr. Mehta",
//     "2025-09-12",
//     "10:30 AM",
//     "Open",
//     "High",
//     "9876543210",
//     "harish@gmail.com",
//     "Chest pain follow-up"
//   ),
//   createData(
//     2,
//     "Harshita Verma",
//     "Web",
//     "Virtual",
//     "Follow-up",
//     "Neurology",
//     "Dr. Rao",
//     "2025-09-13",
//     "02:00 PM",
//     "Open",
//     "Medium",
//     "9898989898",
//     "harshita@gmail.com",
//     "Migraine issue"
//   ),
//   createData(
//     3,
//     "Hitesh Singh",
//     "Phone",
//     "Telephonic",
//     "Converted",
//     "Pediatrics",
//     "Dr. Khan",
//     "2025-09-14",
//     "11:15 AM",
//     "Closed",
//     "Low",
//     "9123456789",
//     "hitesh@gmail.com",
//     "Routine checkup"
//   ),
// ];

function createRow(data) {
  return { ...data };
}

const rows = [
  createRow({
    id: 1,
    name: "Harish Sharma",
    gender: "Male",
    source: "WhatsApp",
    appointmentType: "In Person",
    leadType: "New",
    department: "Cardiology",
    doctor: "Dr. Mehta",
    appointmentDate: "2025-09-12",
    appointmentTime: "10:30 AM",
    status: "Open",
    priority: "High",
    phone: "9876543210",
    email: "harish@gmail.com",
    notes: "Chest pain follow-up",
  }),

  createRow({
    id: 2,
    name: "Harshita Verma",
    gender: "Female",
    source: "Web",
    appointmentType: "Virtual",
    leadType: "Follow-up",
    department: "Neurology",
    doctor: "Dr. Rao",
    appointmentDate: "2025-09-13",
    appointmentTime: "02:00 PM",
    status: "Visited",
    priority: "Medium",
    phone: "9898989898",
    email: "harshita@gmail.com",
    notes: "Migraine issue",
  }),

  createRow({
    id: 3,
    name: "Hitesh Singh",
    gender: "Male",
    source: "Phone",
    appointmentType: "Telephonic",
    leadType: "Converted",
    department: "Pediatrics",
    doctor: "Dr. Khan",
    appointmentDate: "2025-09-14",
    appointmentTime: "11:15 AM",
    status: "Closed",
    priority: "Low",
    phone: "9123456789",
    email: "hitesh@gmail.com",
    notes: "Routine checkup",
  }),

  createRow({
    id: 4,
    name: "Anita Deshmukh",
    gender: "Female",
    source: "Walk-in",
    appointmentType: "In Person",
    leadType: "New",
    department: "Orthopedics",
    doctor: "Dr. Patil",
    appointmentDate: "2025-09-15",
    appointmentTime: "09:45 AM",
    status: "Open",
    priority: "High",
    phone: "9001122334",
    email: "anita@gmail.com",
    notes: "Knee pain",
  }),

  createRow({
    id: 5,
    name: "Rohit Malhotra",
    gender: "Male",
    source: "Web",
    appointmentType: "Virtual",
    leadType: "Follow-up",
    department: "Dermatology",
    doctor: "Dr. Sen",
    appointmentDate: "2025-09-15",
    appointmentTime: "01:30 PM",
    status: "Booked",
    priority: "Medium",
    phone: "9812345678",
    email: "rohit@gmail.com",
    notes: "Skin allergy",
  }),

  createRow({
    id: 6,
    name: "Neha Kapoor",
    gender: "Female",
    source: "WhatsApp",
    appointmentType: "In Person",
    leadType: "New",
    department: "Gynecology",
    doctor: "Dr. Joshi",
    appointmentDate: "2025-09-16",
    appointmentTime: "12:00 PM",
    status: "Visited",
    priority: "High",
    phone: "9090909090",
    email: "neha@gmail.com",
    notes: "Regular consultation",
  }),

  createRow({
    id: 7,
    name: "Amit Kulkarni",
    gender: "Male",
    source: "Phone",
    appointmentType: "Telephonic",
    leadType: "New",
    department: "ENT",
    doctor: "Dr. Kulkarni",
    appointmentDate: "2025-09-16",
    appointmentTime: "04:15 PM",
    status: "Lost",
    priority: "Low",
    phone: "9345678123",
    email: "amit@gmail.com",
    notes: "Cold and cough",
  }),

  createRow({
    id: 8,
    name: "Pooja Nair",
    gender: "Female",
    source: "Web",
    appointmentType: "Virtual",
    leadType: "Follow-up",
    department: "Psychiatry",
    doctor: "Dr. Iyer",
    appointmentDate: "2025-09-17",
    appointmentTime: "03:00 PM",
    status: "Canceled",
    priority: "Medium",
    phone: "9988776655",
    email: "pooja@gmail.com",
    notes: "Stress management",
  }),

  createRow({
    id: 9,
    name: "Suresh Yadav",
    gender: "Male",
    source: "Walk-in",
    appointmentType: "In Person",
    leadType: "Converted",
    department: "General Medicine",
    doctor: "Dr. Verma",
    appointmentDate: "2025-09-17",
    appointmentTime: "10:00 AM",
    status: "Admitted",
    priority: "High",
    phone: "9112233445",
    email: "suresh@gmail.com",
    notes: "High fever",
  }),

  createRow({
    id: 10,
    name: "Kiran Joshi",
    gender: "Male",
    source: "WhatsApp",
    appointmentType: "In Person",
    leadType: "Follow-up",
    department: "Ophthalmology",
    doctor: "Dr. Shah",
    appointmentDate: "2025-09-18",
    appointmentTime: "11:45 AM",
    status: "Visited",
    priority: "Low",
    phone: "9871234567",
    email: "kiran@gmail.com",
    notes: "Eye checkup",
  }),

  createRow({
    id: 11,
    name: "Vikram Patel",
    gender: "Male",
    source: "Web",
    appointmentType: "Virtual",
    leadType: "New",
    department: "Urology",
    doctor: "Dr. Patel",
    appointmentDate: "2025-09-18",
    appointmentTime: "05:00 PM",
    status: "Open",
    priority: "Medium",
    phone: "9009988776",
    email: "vikram@gmail.com",
    notes: "Urinary discomfort",
  }),
];

/* -------------------- PRIORITY BADGE -------------------- */
const priorityColor = {
  High: "error",
  Medium: "warning",
  Low: "success",
};

const priorityRank = {
  High: 3,
  Medium: 2,
  Low: 1,
};

/* -------------------- SORT HELPERS -------------------- */

function descendingComparator(a, b, orderBy) {
  if (orderBy === "priority") {
    return priorityRank[b.priority] - priorityRank[a.priority];
  }

  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

/* -------------------- TABLE HEAD -------------------- */
const headCells = [
  { id: "sr", label: "Sr No.", sortable: false },
  { id: "name", label: "Patient Name", sortable: true },
  { id: "phone", label: "Phone", sortable: false },
  { id: "gender", label: "Gender", sortable: true },
  { id: "source", label: "Source", sortable: true },
  { id: "appointmentType", label: "Appointment Type", sortable: true },
  { id: "leadType", label: "Lead Type", sortable: true },
  { id: "department", label: "Department", sortable: true },
  { id: "doctor", label: "Doctor", sortable: true },
  { id: "appointmentDate", label: "Date", sortable: true },
  { id: "appointmentTime", label: "Time", sortable: false },
  { id: "status", label: "Status", sortable: true },
  { id: "priority", label: "Priority", sortable: true },
];

function EnhancedTableHead({ order, orderBy, onRequestSort }) {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            sx={{
              whiteSpace: "nowrap",
              cursor: headCell.sortable ? "pointer" : "default",
            }}
          >
            {headCell.sortable ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                <span className="font-semibold text-base ">
                  {headCell.label}
                </span>
              </TableSortLabel>
            ) : (
              <span className="font-semibold text-base ">{headCell.label}</span>

              // headCell.label
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function EnhancedTableToolbar() {
  return (
    <>
      {/* <Typography sx={{ flex: 1 }} variant="h5">
        Patient Leads
      </Typography> */}
      <div className="p-4">
        <span className="text-xl font-medium  "> Patient Leads </span>
      </div>
    </>
  );
}

/* -------------------- MAIN COMPONENT -------------------- */
export default function AllLeads() {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedPatient, setSelectedPatient] = useState(rows[0]);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    department: "All",
    status: "All",
  });

  // filter
  // const [filterOpen, setFilterOpen] = useState(false);

  const isActiveRow = (rowId) => selectedPatient?.id === rowId;

  // filter
  // const filteredRows = useMemo(() => {
  //   return rows.filter((row) => {
  //     const departmentMatch =
  //       filters.department === "All" || row.department === filters.department;

  //     const statusMatch =
  //       filters.status === "All" || row.status === filters.status;

  //     return departmentMatch && statusMatch;
  //   });
  // }, [filters]);

  /* -------------------- FILTERED ROWS -------------------- */
  const filteredRows = useMemo(() => {
    const searchLower = search.trim().toLowerCase();

    return rows.filter((row) => {
      const nameMatch =
        searchLower === ""
          ? true
          : row.name.toLowerCase().startsWith(searchLower);

      const departmentMatch =
        filters.department === "All" || row.department === filters.department;

      const statusMatch =
        filters.status === "All" || row.status === filters.status;

      return nameMatch && departmentMatch && statusMatch;
    });
  }, [rows, search, filters]);

  const visibleRows = useMemo(() => {
    return [...filteredRows]
      .sort(getComparator(order, orderBy))
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [filteredRows, order, orderBy, page, rowsPerPage]);

  useEffect(() => {
    setPage(0);
    setSelectedPatient(filteredRows[0] || null);
  }, [filters, filteredRows]);

  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);

  return (
    <>
      <Box sx={{ display: "flex", gap: 2 }}>
        <div className="flex gap-4 w-full">
          {/* ---------------- TABLE ---------------- */}
          <div className=" w-full rounded-2xl">
            <Paper
              // sx={{ flex: 7 }}
              sx={{ borderRadius: 4 }}
            >
              <EnhancedTableToolbar />

              {/* filter */}
              <div className="pb-4  px-4 border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5  items-end gap-4">
                  {/* Search */}
                  <div className="flex flex-col gap-1 ">
                    <div className="">
                      <span className="font-medium text-sm">Search</span>
                    </div>
                    <input
                      type="text"
                      placeholder="Search name..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className=" w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none  "
                    />
                  </div>

                  {/* Department */}
                  <div className="">
                    <DropdownWithSearch
                      label="Department"
                      value={filters.department}
                      options={departmentOptions}
                      onChange={(value) =>
                        setFilters((prev) => ({
                          ...prev,
                          department: value || "All",
                        }))
                      }
                      placeholder="Select department"
                    />
                  </div>

                  {/* Status */}
                  <div className="">
                    <DropdownWithSearch
                      label="Status"
                      value={filters.status}
                      options={statusOptions}
                      onChange={(value) =>
                        setFilters((prev) => ({
                          ...prev,
                          status: value || "All",
                        }))
                      }
                      placeholder="Select status"
                    />
                  </div>

                  {/* Clear */}
                  <div className="">
                    {/* <button
                      onClick={() => {
                        setSearch("");
                        setFilters({ department: "All", status: "All" });
                      }}
                      className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100 transition hover:cursor-pointer "
                    >
                      Clear Filters
                    </button> */}
                    <UniversalButton
                      label="Clear Filters"
                      onClick={() => {
                        setSearch("");
                        setFilters({ department: "All", status: "All" });
                      }}
                    // variant='danger'
                    />
                  </div>
                </div>
              </div>

              <TableContainer
                sx={{
                  // maxWidth: "100%",

                  //  tableLayout: "auto",
                  width: "100%",
                  overflowX: "auto",

                  //    display: 'block'
                }}
              >
                <Table
                  sx={{
                    // width: "max-content",
                    //  minWidth: 1200,
                    tableLayout: "auto",
                  }}
                >
                  <EnhancedTableHead
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={(e, property) => {
                      if (property === "sr") return;
                      const isAsc = orderBy === property && order === "asc";
                      setOrder(isAsc ? "desc" : "asc");
                      setOrderBy(property);
                    }}
                  />

                  <TableBody>
                    {visibleRows.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={13}
                          align="center"
                          sx={{ py: 4, fontSize: "18px" }}
                        >
                          No Leads Found
                        </TableCell>
                      </TableRow>
                    ) : (
                      visibleRows.map((row, index) => (
                        <TableRow
                          hover
                          key={row.id}
                          sx={{
                            cursor: "pointer",
                            backgroundColor: isActiveRow(row.id)
                              ? "rgba(25,118,210,0.08)"
                              : "inherit",
                          }}
                          onClick={() => {
                            setSelectedPatient(row);
                            setDrawerOpen(true);
                          }}
                        >
                          <TableCell>
                            {page * rowsPerPage + index + 1}
                          </TableCell>
                          <TableCell>{row.name}</TableCell>
                          <TableCell sx={{ whiteSpace: "nowrap" }}>
                            {row.phone}
                          </TableCell>

                          <TableCell>
                            <Chip
                              label={row.gender}
                              size="small"
                              sx={{
                                height: 22,
                                fontSize: "0.7rem",
                                fontWeight: 500,
                                bgcolor:
                                  row.gender === "Male"
                                    ? "rgba(33,150,243,0.12)"
                                    : "rgba(233,30,99,0.12)",
                                color:
                                  row.gender === "Male"
                                    ? "rgb(33,150,243)"
                                    : "rgb(233,30,99)",
                              }}
                            />
                          </TableCell>
                          <TableCell>{row.source}</TableCell>
                          <TableCell sx={{ whiteSpace: "nowrap" }}>
                            {row.appointmentType}
                          </TableCell>

                          <TableCell sx={{ whiteSpace: "nowrap" }}>
                            <Chip
                              label={row.leadType}
                              size="small"
                              variant="outlined"
                            />
                          </TableCell>

                          <TableCell sx={{ whiteSpace: "nowrap" }}>
                            {row.department}
                          </TableCell>
                          <TableCell>{row.doctor}</TableCell>
                          <TableCell sx={{ whiteSpace: "nowrap" }}>
                            {row.appointmentDate}
                          </TableCell>
                          <TableCell sx={{ whiteSpace: "nowrap" }}>
                            {row.appointmentTime}
                          </TableCell>

                          <TableCell>
                            {/* <Chip
                            label={row.status}
                            color={
                              row.status === "Open" ? "success" : "default"
                            }
                            size="small"
                          /> */}
                            <span
                              className={`px-3 py-1 text-xs font-medium rounded-full ${statusClasses[row.status] ||
                                "bg-gray-100 text-gray-700"
                                }`}
                            >
                              {row.status}
                            </span>
                          </TableCell>

                          <TableCell>
                            <Chip
                              label={row.priority}
                              color={priorityColor[row.priority]}
                              size="small"
                            />
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>

              <TablePagination
                rowsPerPageOptions={[5, 10, 15, 20]}
                component="div"
                count={filteredRows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(e, p) => setPage(p)}
                onRowsPerPageChange={(e) => {
                  setRowsPerPage(parseInt(e.target.value, 10));
                  setPage(0);
                }}
                labelDisplayedRows={() => `${page + 1} of ${totalPages}`}
              />
            </Paper>
          </div>
        </div>
      </Box>
      <LeadDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        patient={selectedPatient}
      />
    </>
  );
}
