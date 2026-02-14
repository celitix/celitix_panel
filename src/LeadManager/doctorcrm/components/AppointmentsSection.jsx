// import React, { useState, useMemo } from "react";
// import {
//   Box,
//   Typography,
//   IconButton,
//   Divider,
//   Avatar,
// } from "@mui/material";
// import { ChevronLeft, ChevronRight } from "@mui/icons-material";

// /* -------------------- MOCK DATA -------------------- */

// const dates = [
//   { day: "Fri", date: "2025-12-19" },
//   { day: "Sat", date: "2025-12-20" },
//   { day: "Sun", date: "2025-12-21" },
//   { day: "Mon", date: "2025-12-22" },
//   { day: "Tue", date: "2025-12-23" },
// ];

// const appointmentsData = [
//   {
//     id: 1,
//     name: "John Doe",
//     type: "Task",
//     doctor: "Dr. Verma",
//     time: "10:00 AM",
//     date: "2025-12-21",
//     color: "#00bcd4",
//   },
//   {
//     id: 2,
//     name: "Bob Johnson",
//     type: "Consultation",
//     doctor: "Dr. Patel",
//     time: "11:00 AM",
//     date: "2025-12-21",
//     color: "#00bcd4",
//   },
//   {
//     id: 3,
//     name: "Tom White",
//     type: "Task",
//     doctor: "Dr. Mehta",
//     time: "12:00 PM",
//     date: "2025-12-21",
//     color: "#4caf50",
//   },
//   {
//     id: 4,
//     name: "Alex Smith",
//     type: "Consultation",
//     doctor: "Dr. Rao",
//     time: "01:30 PM",
//     date: "2025-12-22",
//     color: "#ff9800",
//   },
// ];

// /* -------------------- COMPONENT -------------------- */

// export default function AppointmentsSection() {
//   const [selectedDate, setSelectedDate] = useState("2025-12-21");

//   const filteredAppointments = useMemo(
//     () =>
//       appointmentsData.filter(
//         (item) => item.date === selectedDate
//       ),
//     [selectedDate]
//   );

//   return (
//     <Box
//       sx={{
//         width: 360,
//         bgcolor: "#fff",
//         p: 2,
//         borderRadius: 4,
//       }}
//     >
//       {/* -------- HEADER -------- */}
//       <Box
//         display="flex"
//         justifyContent="space-between"
//         alignItems="center"
//         mb={2}
//       >
//         <Typography fontWeight={600}>Appointments</Typography>
//         <Typography fontSize={14} color="text.secondary">
//           December 2025
//         </Typography>
//       </Box>

//       {/* -------- DATE SELECTOR -------- */}
//       <Box display="flex" alignItems="center" gap={1} mb={2}>
//         <IconButton size="small">
//           <ChevronLeft />
//         </IconButton>

//         {dates.map((d) => {
//           const isActive = d.date === selectedDate;
//           return (
//             <Box
//               key={d.date}
//               onClick={() => setSelectedDate(d.date)}
//               sx={{
//                 textAlign: "center",
//                 px: 1.2,
//                 py: 0.8,
//                 borderRadius: 2,
//                 cursor: "pointer",
//                 bgcolor: isActive ? "#e7edff" : "transparent",
//                 transition: "0.3s",
//               }}
//             >
//               <Typography
//                 fontSize={12}
//                 color={isActive ? "primary" : "text.secondary"}
//               >
//                 {d.day}
//               </Typography>
//               <Typography fontWeight={600}>
//                 {d.date.split("-")[2]}
//               </Typography>
//             </Box>
//           );
//         })}

//         <IconButton size="small">
//           <ChevronRight />
//         </IconButton>
//       </Box>

//       {/* -------- COUNT -------- */}
//       <Typography
//         fontSize={13}
//         color="orange"
//         mb={1}
//       >
//         {filteredAppointments.length} appointments today
//       </Typography>

//       <Divider sx={{ mb: 2 }} />

//       {/* -------- APPOINTMENT LIST -------- */}
//       <Box
//         sx={{
//           maxHeight: 300,
//           overflowY: "auto",
//           pr: 1,
//         }}
//       >
//         {filteredAppointments.map((item) => (
//           <Box
//             key={item.id}
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               bgcolor: "#fff",
//               borderRadius: 3,
//               mb: 1.5,
//               p: 1.5,
//               position: "relative",
//               boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
//             }}
//           >
//             {/* COLOR STRIP */}
//             <Box
//               sx={{
//                 width: 4,
//                 height: "100%",
//                 bgcolor: item.color,
//                 borderRadius: 2,
//                 position: "absolute",
//                 left: 0,
//                 top: 0,
//               }}
//             />

//             {/* CONTENT */}
//             <Box flex={1} ml={1.5}>
//               <Typography fontWeight={600}>
//                 {item.name}
//               </Typography>
//               <Typography
//                 fontSize={13}
//                 color="primary"
//               >
//                 {item.type}
//               </Typography>
//               <Box display="flex" alignItems="center" gap={0.5}>
//                 <Avatar sx={{ width: 18, height: 18, fontSize: 10 }}>
//                   👨‍⚕️
//                 </Avatar>
//                 <Typography fontSize={12} color="text.secondary">
//                   {item.doctor}
//                 </Typography>
//               </Box>
//             </Box>

//             {/* TIME */}
//             <Typography fontSize={13} color="text.secondary">
//               {item.time}
//             </Typography>
//           </Box>
//         ))}

//         {filteredAppointments.length === 0 && (
//           <Typography
//             textAlign="center"
//             fontSize={13}
//             color="text.secondary"
//           >
//             No appointments
//           </Typography>
//         )}
//       </Box>
//     </Box>
//   );
// }

// scrolable dates without data and date is cutout

// import React, { useState, useMemo } from "react";
// import {
//   Box,
//   Typography,
//   IconButton,
//   Divider,
// } from "@mui/material";
// import { ChevronLeft, ChevronRight } from "@mui/icons-material";

// /* ---------- UTILS ---------- */

// const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// const generateMonthDates = (year, month) => {
//   const totalDays = new Date(year, month + 1, 0).getDate();

//   return Array.from({ length: totalDays }, (_, i) => {
//     const date = new Date(year, month, i + 1);
//     return {
//       label: i + 1,
//       day: DAYS[date.getDay()],
//       value: date.toISOString().split("T")[0],
//     };
//   });
// };

// /* ---------- COMPONENT ---------- */

// export default function AppointmentsSection() {
//   const year = 2025;
//   const month = 11; // December (0-based)

//   const allDates = useMemo(
//     () => generateMonthDates(year, month),
//     []
//   );

//   // selected index (date)
//   const [selectedIndex, setSelectedIndex] = useState(9); // 10th date

//   // number of visible dates
//   const VISIBLE_COUNT = 5;

//   // calculate sliding window
//   const startIndex = Math.max(
//     0,
//     Math.min(
//       selectedIndex - Math.floor(VISIBLE_COUNT / 2),
//       allDates.length - VISIBLE_COUNT
//     )
//   );

//   const visibleDates = allDates.slice(
//     startIndex,
//     startIndex + VISIBLE_COUNT
//   );

//   /* ---------- HANDLERS ---------- */

//   const handlePrev = () => {
//     setSelectedIndex((prev) => Math.max(prev - 1, 0));
//   };

//   const handleNext = () => {
//     setSelectedIndex((prev) =>
//       Math.min(prev + 1, allDates.length - 1)
//     );
//   };

//   const handleDateClick = (index) => {
//     setSelectedIndex(index);
//   };

//   /* ---------- RENDER ---------- */

//   return (
//     <Box
//       sx={{
//         width: 360,
//         bgcolor: "#f5f7fc",
//         p: 2,
//         borderRadius: 4,
//       }}
//     >
//       {/* HEADER */}
//       <Box
//         display="flex"
//         justifyContent="space-between"
//         alignItems="center"
//         mb={2}
//       >
//         <Typography fontWeight={600}>
//           Appointments
//         </Typography>
//         <Typography fontSize={14} color="text.secondary">
//           December 2025
//         </Typography>
//       </Box>

//       {/* DATE SLIDER */}
//       <Box
//         display="flex"
//         alignItems="center"
//         gap={1}
//         mb={2}
//       >
//         <IconButton size="small" onClick={handlePrev}>
//           <ChevronLeft />
//         </IconButton>

//         <Box
//           sx={{
//             display: "flex",
//             gap: 1,
//             overflow: "hidden",
//             width: "100%",
//             justifyContent: "center",
//           }}
//         >
//           {visibleDates.map((item, i) => {
//             const actualIndex = startIndex + i;
//             const isActive = actualIndex === selectedIndex;

//             return (
//               <Box
//                 key={item.value}
//                 onClick={() => handleDateClick(actualIndex)}
//                 sx={{
//                   minWidth: 52,
//                   textAlign: "center",
//                   px: 1,
//                   py: 0.8,
//                   borderRadius: 2,
//                   cursor: "pointer",
//                   bgcolor: isActive ? "#e7edff" : "transparent",
//                   transform: isActive
//                     ? "scale(1.05)"
//                     : "scale(1)",
//                   transition: "all 0.3s ease",
//                 }}
//               >
//                 <Typography
//                   fontSize={12}
//                   color={
//                     isActive ? "primary" : "text.secondary"
//                   }
//                 >
//                   {item.day}
//                 </Typography>
//                 <Typography fontWeight={600}>
//                   {item.label}
//                 </Typography>
//               </Box>
//             );
//           })}
//         </Box>

//         <IconButton size="small" onClick={handleNext}>
//           <ChevronRight />
//         </IconButton>
//       </Box>

//       <Divider />
//     </Box>
//   );
// }

// Scrolable dates with Data

// import React, { useMemo, useState } from "react";
// import {
//   Box,
//   Typography,
//   IconButton,
//   Divider,
// } from "@mui/material";
// import { ChevronLeft, ChevronRight } from "@mui/icons-material";

// /* ---------------- UTILS ---------------- */

// const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// const generateDates = (year, month) => {
//   const total = new Date(year, month + 1, 0).getDate();
//   return Array.from({ length: total }, (_, i) => {
//     const d = new Date(year, month, i + 1);
//     return {
//       day: DAYS[d.getDay()],
//       date: i + 1,
//       value: d.toISOString().split("T")[0],
//     };
//   });
// };

// /* ---------------- MOCK APPOINTMENTS ---------------- */

// const APPOINTMENTS = [
//   {
//     id: 1,
//     name: "John Doe",
//     doctor: "Dr. Verma",
//     time: "10:00 AM",
//     type: "Task",
//     date: "2025-12-03",
//   },
//   {
//     id: 2,
//     name: "Bob Johnson",
//     doctor: "Dr. Patel",
//     time: "11:00 AM",
//     type: "Consultation",
//     date: "2025-12-03",
//   },
//   {
//     id: 3,
//     name: "Tom White",
//     doctor: "Dr. Mehta",
//     time: "01:00 PM",
//     type: "Task",
//     date: "2025-12-04",
//   },
//   {
//     id: 4,
//     name: "Alex Smith",
//     doctor: "Dr. Rao",
//     time: "03:30 PM",
//     type: "Consultation",
//     date: "2025-12-05",
//   },
// ];

// /* ---------------- COMPONENT ---------------- */

// export default function AppointmentsSection() {
//   const year = 2025;
//   const month = 11; // December

//   const dates = useMemo(
//     () => generateDates(year, month),
//     []
//   );

//   const [selectedIndex, setSelectedIndex] = useState(2); // 3rd date

//   const VISIBLE = 5;
//   const CENTER = Math.floor(VISIBLE / 2);

//   /* --- sliding window --- */
//   const startIndex = Math.max(
//     0,
//     Math.min(
//       selectedIndex - CENTER,
//       dates.length - VISIBLE
//     )
//   );

//   const visibleDates = dates.slice(
//     startIndex,
//     startIndex + VISIBLE
//   );

//   /* --- appointments by date --- */
//   const selectedDateValue = dates[selectedIndex].value;

//   const appointmentsForDay = APPOINTMENTS.filter(
//     (a) => a.date === selectedDateValue
//   );

//   /* --- handlers --- */
//   const prev = () =>
//     setSelectedIndex((i) => Math.max(i - 1, 0));

//   const next = () =>
//     setSelectedIndex((i) =>
//       Math.min(i + 1, dates.length - 1)
//     );

//   return (
//     <Box
//       sx={{
//         width: 360,
//         bgcolor: "#fff",
//         p: 2,
//         borderRadius: 4,
//         boxShadow: 1
//       }}
//     >
//       {/* HEADER */}
//       <Box
//         display="flex"
//         justifyContent="space-between"
//         mb={2}
//       >
//         <Typography fontWeight={600}>
//           Appointments
//         </Typography>
//         <Typography fontSize={14} color="text.secondary">
//           December 2025
//         </Typography>
//       </Box>

//       {/* DATE SLIDER */}
//       <Box
//         display="flex"
//         alignItems="center"
//         gap={1}
//       >
//         <IconButton size="small" onClick={prev}>
//           <ChevronLeft />
//         </IconButton>

//         <Box
//           sx={{
//             width: 260, // 🔴 FIXED WIDTH (no cut)
//             display: "flex",
//             justifyContent: "space-between",
//           }}
//         >
//           {visibleDates.map((d, i) => {
//             const index = startIndex + i;
//             const active = index === selectedIndex;

//             return (
//               <Box
//                 key={d.value}
//                 onClick={() => setSelectedIndex(index)}
//                 sx={{
//                   width: 48,
//                   textAlign: "center",
//                   py: 1,
//                   borderRadius: 2,
//                   cursor: "pointer",
//                   bgcolor: active ? "#e7edff" : "transparent",
//                   transition: "0.3s",
//                 }}
//               >
//                 <Typography
//                   fontSize={12}
//                   color={active ? "primary" : "text.secondary"}
//                 >
//                   {d.day}
//                 </Typography>
//                 <Typography fontWeight={600}>
//                   {d.date}
//                 </Typography>
//               </Box>
//             );
//           })}
//         </Box>

//         <IconButton size="small" onClick={next}>
//           <ChevronRight />
//         </IconButton>
//       </Box>

//       <Divider sx={{ my: 2 }} />

//       {/* APPOINTMENTS */}
//       {appointmentsForDay.length === 0 ? (
//         <Typography
//           fontSize={13}
//           color="text.secondary"
//           textAlign="center"
//         >
//           No appointments
//         </Typography>
//       ) : (
//         appointmentsForDay.map((a) => (
//           <Box
//             key={a.id}
//             sx={{
//               bgcolor: "#fff",
//               p: 1.5,
//               borderRadius: 3,
//               mb: 1,
//               display: "flex",
//               justifyContent: "space-between",
//               boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
//             }}
//           >
//             <Box>
//               <Typography fontWeight={600}>
//                 {a.name}
//               </Typography>
//               <Typography
//                 fontSize={12}
//                 color="primary"
//               >
//                 {a.type}
//               </Typography>
//               <Typography
//                 fontSize={12}
//                 color="text.secondary"
//               >
//                 👨‍⚕️ {a.doctor}
//               </Typography>
//             </Box>
//             <Typography fontSize={13}>
//               {a.time}
//             </Typography>
//           </Box>
//         ))
//       )}
//     </Box>
//   );
// }

import React, { useMemo, useState } from "react";
import { Box, Typography, IconButton, Divider, Popover } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { PickersActionBar } from "@mui/x-date-pickers/PickersActionBar";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import { useTheme, useMediaQuery } from "@mui/material";

import dayjs from "dayjs";

/* ---------------- MOCK APPOINTMENTS ---------------- */

const APPOINTMENTS = [
  {
    id: 1,
    name: "John Doe",
    doctor: "Dr. Verma",
    time: "10:00 AM",
    type: "Task",
    color: "#00bcd4",
    date: "2025-12-19",
  },
  {
    id: 3,
    name: "Tom White",
    doctor: "Dr. Mehta",
    time: "01:00 PM",
    type: "Task",
    color: "#4caf50",
    date: "2025-12-18",
  },
  {
    id: 2,
    name: "Bob Johnson",
    doctor: "Dr. Patel",
    time: "11:00 AM",
    type: "Consultation",
    color: "#2196f3",
    date: "2025-12-20",
  },
  {
    id: 4,
    name: "Alex Smith",
    doctor: "Dr. Rao",
    time: "03:30 PM",
    type: "Consultation",
    color: "#ff9800",
    date: "2025-12-18",
  },
  {
    id: 5,
    name: "Bob Johnson",
    doctor: "Dr. Patel",
    time: "11:00 AM",
    type: "Consultation",
    color: "#2196f3",
    date: "2025-12-19",
  },
  {
    id: 6,
    name: "Alex Smith",
    doctor: "Dr. Rao",
    time: "03:30 PM",
    type: "Consultation",
    color: "#ff9800",
    date: "2025-12-19",
  },
  {
    id: 7,
    name: "John Doe",
    doctor: "Dr. Verma",
    time: "10:00 AM",
    type: "Task",
    color: "#00bcd4",
    date: "2025-12-20",
  },
  {
    id: 8,
    name: "Tom White",
    doctor: "Dr. Mehta",
    time: "01:00 PM",
    type: "Task",
    color: "#4caf50",
    date: "2025-12-21",
  },
  {
    id: 9,
    name: "Bob Johnson",
    doctor: "Dr. Patel",
    time: "11:00 AM",
    type: "Consultation",
    color: "#2196f3",
    date: "2025-12-21",
  },
  {
    id: 10,
    name: "Alex Smith",
    doctor: "Dr. Rao",
    time: "03:30 PM",
    type: "Consultation",
    color: "#ff9800",
    date: "2025-12-21",
  },
  {
    id: 11,
    name: "Bob Johnson",
    doctor: "Dr. Patel",
    time: "11:00 AM",
    type: "Consultation",
    color: "#2196f3",
    date: "2025-12-20",
  },
  {
    id: 12,
    name: "Alex Smith",
    doctor: "Dr. Rao",
    time: "03:30 PM",
    type: "Consultation",
    color: "#ff9800",
    date: "2025-12-21",
  },
];

/* ---------------- COMPONENT ---------------- */

export default function AppointmentsSection() {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [tempDate, setTempDate] = useState(dayjs());

  const [anchorEl, setAnchorEl] = useState(null);

  const theme = useTheme();

  // mobile < md
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  // tablet and up
  // const isTabletUp = useMediaQuery(theme.breakpoints.up("md"));

  const VISIBLE = isMobile ? 3 : 9;
  const CENTER = Math.floor(VISIBLE / 2);

  // const VISIBLE = 7;
  // const CENTER = Math.floor(VISIBLE / 2);

  /* ---------- generate real month dates ---------- */
  const dates = useMemo(() => {
    const year = selectedDate.year();
    const month = selectedDate.month();
    const totalDays = new Date(year, month + 1, 0).getDate();

    return Array.from({ length: totalDays }, (_, i) => {
      const d = dayjs(new Date(year, month, i + 1));
      return {
        day: d.format("ddd"),
        label: i + 1,
        value: d.format("YYYY-MM-DD"),
      };
    });
  }, [selectedDate]);

  /* ---------- selected index ---------- */
  const selectedIndex = dates.findIndex(
    (d) => d.value === selectedDate.format("YYYY-MM-DD")
  );

  /* ---------- sliding window ---------- */
  const startIndex = Math.max(
    0,
    Math.min(selectedIndex - CENTER, dates.length - VISIBLE)
  );

  const visibleDates = dates.slice(startIndex, startIndex + VISIBLE);

  /* ---------- handlers ---------- */
  const prevDay = () => {
    if (selectedIndex > 0) {
      setSelectedDate(selectedDate.subtract(1, "day"));
    }
  };

  const nextDay = () => {
    if (selectedIndex < dates.length - 1) {
      setSelectedDate(selectedDate.add(1, "day"));
    }
  };

  const openPicker = (e) => {
    setTempDate(selectedDate);
    setAnchorEl(e.currentTarget);
  };
  const closePicker = () => setAnchorEl(null);

  /* ---------- appointments ---------- */
  const dayAppointments = APPOINTMENTS.filter(
    (a) => a.date === selectedDate.format("YYYY-MM-DD")
  );

  /* ---------------- UI ---------------- */

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        overflow: "auto",
        bgcolor: "#fff",
        p: 2,
        borderRadius: 4,
        display: "flex",
        flexDirection: "column",
        minHeight: 0,
        // maxHeight: "80vh",
      }}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <Typography fontWeight={600}>Appointments</Typography>

        <div
          onClick={openPicker}
          className=" flex flex-col md:flex-row items-center gap-2 px-3 py-1.5 rounded-2xl bg-indigo-50 cursor-pointer transition hover:bg-indigo-100"
        >
          <Typography fontSize={14} fontWeight={500}>
            {selectedDate.format("MMMM YYYY")}
          </Typography>

          <CalendarMonthIcon fontSize="small" className="ms-auto text-indigo-600" />
        </div>
      </div>

      {/* MONTH / YEAR PICKER */}
      {/* <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={closePicker}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            views={["year", "month"]}
            value={selectedDate}
            onChange={(newValue) => {
              setSelectedDate(newValue.startOf("month"));
              closePicker();
            }}
          />
        </LocalizationProvider>
      </Popover> */}
      <div className="abc">
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={closePicker}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          slotProps={{
            paper: {
              sx: {
                borderRadius: 3,
                boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
                p: 1,

                //         maxHeight: 200,          // 👈 adjust as needed
                // overflowY: "auto",
              },
            },
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            {/* <StaticDatePicker
            displayStaticWrapperAs="desktop"
            views={["year", "month"]}
            openTo="month"
            value={selectedDate}
            onChange={(newValue) => {
              // Only update date here
              setSelectedDate(newValue.startOf("month"));
            }}
            onViewChange={(view) => {
              // Close ONLY when month selection is done
              if (view === "day" || view === "month") {
                closePicker();
              }
            }}
            sx={{
              width: 280,
              "& .MuiPickersCalendarHeader-root": {
                px: 1,
              },
              "& .MuiPickersYear-yearButton": {
                borderRadius: 2,
              },
              "& .MuiPickersMonth-monthButton": {
                borderRadius: 2,
              },
            }}
          /> */}

            <StaticDatePicker
              displayStaticWrapperAs="desktop"
              views={["year", "month"]}
              openTo="month"
              value={tempDate}
              closeOnSelect={false}
              onChange={(newValue) => {
                setTempDate(newValue);
              }}
              onAccept={(value) => {
                setSelectedDate(value.startOf("month"));
                closePicker();
              }}
              onClose={() => {
                setTempDate(selectedDate);
                closePicker();
              }}
              slots={{
                actionBar: PickersActionBar,
              }}
              slotProps={{
                actionBar: {
                  actions: ["cancel", "accept"],
                },
              }}
              sx={{
                width: 280,
                "& .MuiPickersMonth-monthButton": {
                  borderRadius: 2,
                },
                "& .MuiPickersYear-yearButton": {
                  borderRadius: 2,
                },
              }}
            />
          </LocalizationProvider>
        </Popover>
      </div>

      {/* DATE SLIDER */}
      <Box display="flex" alignItems="center">
        <IconButton size="small" onClick={prevDay}>
          <ChevronLeft />
        </IconButton>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {visibleDates.map((d) => {
            const active = d.value === selectedDate.format("YYYY-MM-DD");

            return (
              <Box
                key={d.value}
                onClick={() => setSelectedDate(dayjs(d.value))}
                sx={{
                  width: 48,
                  textAlign: "center",
                  py: 1,
                  borderRadius: 2,
                  cursor: "pointer",
                  bgcolor: active ? "#e7edff" : "transparent",
                  transition: "0.3s",
                }}
              >
                <Typography
                  fontSize={12}
                  color={active ? "primary" : "text.secondary"}
                >
                  {d.day}
                </Typography>
                <Typography fontWeight={600}>{d.label}</Typography>
              </Box>
            );
          })}
        </Box>

        <IconButton size="small" onClick={nextDay}>
          <ChevronRight />
        </IconButton>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* APPOINTMENTS */}
      <div className="h-80 lg:h-full overflow-y-auto">
        <Box
          sx={{
            flex: 1, // ⭐ TAKES REMAINING SPACE
            overflowY: "auto",
            minHeight: 0,
            pr: 1,
          }}
        >
          {dayAppointments.length === 0 ? (
            <Typography fontSize={13} color="text.secondary" textAlign="center">
              No appointments
            </Typography>
          ) : (
            dayAppointments.map((a) => (
              <Box
                key={a.id}
                sx={{
                  bgcolor: "#fff",
                  p: 1.5,
                  borderRadius: 3,
                  mb: 1,
                  display: "flex",
                  alignItems: "center",
                  position: "relative",
                  boxShadow: "0 30px 100px rgba(0,0,0,0.05)",
                }}
              >
                {/* STATUS STRIP */}
                <Box
                  sx={{
                    width: 4,
                    height: "100%",
                    bgcolor: a.color,
                    position: "absolute",
                    left: 0,
                    top: 0,
                    borderRadius: 2,
                  }}
                />

                <Box ml={1.5} flex={1}>
                  <Typography fontWeight={600}>{a.name}</Typography>
                  <Typography fontSize={12} color="primary">
                    {a.type}
                  </Typography>

                  <Typography fontSize={12} color="text.secondary">
                    {/* 👨‍⚕️ {a.doctor} */}
                    <MedicalServicesIcon sx={{ fontSize: 14, mr: 0.5 }} />
                    {a.doctor}
                  </Typography>
                </Box>

                <Typography fontSize={13}>{a.time}</Typography>
              </Box>
            ))
          )}
        </Box>
      </div>
    </Box>
  );
}
