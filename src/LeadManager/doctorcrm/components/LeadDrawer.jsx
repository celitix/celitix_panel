// import * as React from "react";
// import {
//   Box,
//   Drawer,
//   Typography,
//   Divider,
//   Chip,
// } from "@mui/material";

// export default function LeadDrawer({ open, onClose, patient }) {
//   return (
//     <Drawer anchor="right" open={open} onClose={onClose}>
//       <Box sx={{ width: 360, p: 2 }}>
//         <Typography variant="h6" fontWeight={600}>
//           Patient Details
//         </Typography>

//         <Divider sx={{ my: 2 }} />

//         {!patient ? (
//           <Typography variant="body2">No patient selected</Typography>
//         ) : (
//           <>
//             <Typography variant="subtitle1" fontWeight={500}>
//               {patient.name}
//             </Typography>

//             <Typography variant="body2" color="text.secondary">
//               {patient.email}
//             </Typography>

//             <Divider sx={{ my: 2 }} />

//             <Typography variant="body2">
//               <strong>Phone:</strong> {patient.phone}
//             </Typography>

//             <Typography variant="body2">
//               <strong>Department:</strong> {patient.department}
//             </Typography>

//             <Typography variant="body2">
//               <strong>Doctor:</strong> {patient.doctor}
//             </Typography>

//             <Typography variant="body2">
//               <strong>Appointment:</strong>{" "}
//               {patient.appointmentDate} • {patient.appointmentTime}
//             </Typography>

//             <Divider sx={{ my: 2 }} />

//             <Box sx={{ display: "flex", gap: 1 }}>
//               <Chip label={patient.status} size="small" />
//               <Chip
//                 label={patient.priority}
//                 size="small"
//                 color={
//                   patient.priority === "High"
//                     ? "error"
//                     : patient.priority === "Medium"
//                     ? "warning"
//                     : "success"
//                 }
//               />
//             </Box>

//             <Divider sx={{ my: 2 }} />

//             <Typography variant="body2">
//               <strong>Notes:</strong>
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               {patient.notes}
//             </Typography>
//           </>
//         )}
//       </Box>
//     </Drawer>
//   );
// }

import * as React from "react";
import {
  Box,
  Drawer,
  Typography,
  Divider,
  Chip,
  Tabs,
  Tab,
  Button,
  TextField,
  MenuItem,
  Stack,
} from "@mui/material";
// import UniversalTextArea from "./UniversalTextArea";
// import UniversalButton from "./UniversalButton";
import { IoClose } from "react-icons/io5";
import UniversalTextArea from "@/whatsapp/components/UniversalTextArea";
import UniversalButton from "@/components/common/UniversalButton";
import DropdownWithSearch from "@/whatsapp/components/DropdownWithSearch";
// import DropdownWithSearch from "./DropdownWithSearch";

const STATUS_OPTIONS = [
  "Open",
  "Visited",
  "Admitted",
  "Lost",
  "Booked",
  "Canceled",
];

const PRIORITY_OPTIONS = ["High", "Medium", "Low"];

const STATUS_DROPDOWN_OPTIONS = STATUS_OPTIONS.map((s) => ({
  value: s,
  label: s,
}));

const PRIORITY_DROPDOWN_OPTIONS = PRIORITY_OPTIONS.map((p) => ({
  value: p,
  label: p,
}));


export default function LeadDrawer({ open, onClose, patient }) {
  const [tab, setTab] = React.useState(0);
  const [status, setStatus] = React.useState(patient?.status || "");
  const [priority, setPriority] = React.useState(patient?.priority || "");
  const [note, setNote] = React.useState("");

  React.useEffect(() => {
    setStatus(patient?.status || "");
    setPriority(patient?.priority || "");
    setTab(0);
  }, [patient]);

  if (!patient) return null;

  return (
    <>
      <Drawer anchor="right" open={open} onClose={onClose}>
        <Box sx={{ width: 450, p: 2 }}>
          <div className="flex justify-between ">
            <div className="flex flex-col">
              {/* HEADER */}
              <Typography variant="h6" fontWeight={600}>
                {patient.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {patient.phone} • {patient.email}
              </Typography>
            </div>
            <div className=" mt-1">
              <UniversalButton
                icon={<IoClose className="text-base" />}
                // label="close"
                variant="danger"
                style={{ padding: "0.45rem 0.5rem" }} // matching p-1 and w-full
                onClick={onClose}
              />
            </div>
          </div>
          <Divider sx={{ my: 2 }} />

          {/* TABS */}
          <Tabs value={tab} onChange={(e, v) => setTab(v)}>
            <Tab label="Overview" />
            <Tab label="History" />
            <Tab label="Notes" />
            <Tab label="Actions" />
          </Tabs>

          <Divider sx={{ my: 2 }} />

          {/* ---------------- OVERVIEW TAB ---------------- */}
          {tab === 0 && (
            <Stack spacing={1.5}>
              <Info label="Department" value={patient.department} />
              <Info label="Doctor" value={patient.doctor} />
              <Info
                label="Appointment"
                value={`${patient.appointmentDate} • ${patient.appointmentTime}`}
              />

              <Divider />

              <Stack direction="row" spacing={1}>
                <Chip label={status} />
                <Chip
                  label={priority}
                  color={
                    priority === "High"
                      ? "error"
                      : priority === "Medium"
                        ? "warning"
                        : "success"
                  }
                />
              </Stack>
            </Stack>
          )}

          {/* ---------------- HISTORY TAB ---------------- */}
          {tab === 1 && (
            <Stack spacing={1}>
              <Typography variant="body2">
                • Lead created via <strong>{patient.source}</strong>
              </Typography>
              <Typography variant="body2">
                • Appointment Type: {patient.appointmentType}
              </Typography>
              <Typography variant="body2">
                • Lead Type: {patient.leadType}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                (Mock data – backend later)
              </Typography>
            </Stack>
          )}

          {/* ---------------- NOTES TAB ---------------- */}
          {tab === 2 && (
            <Stack spacing={2}>
              <Typography variant="body2">Previous Note:</Typography>
              <Typography variant="body2" color="text.secondary">
                {patient.notes}
              </Typography>

              {/* <TextField
                  multiline
                  rows={3}
                  label="Add new note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  fullWidth
              /> */}

              <UniversalTextArea
                label="Add new note"
                id="note"
                name="note"
                row={3}
                value={note}
                onChange={setNote}
                placeholder="Add new note"
              // textareaClassName="resize-none"
              />

              <UniversalButton
                label="Save Note"
                variant="primary"
                onClick={() => {
                  alert("Note saved (mock)");
                  setNote("");
                }}
              />
            </Stack>
          )}

          {/* ---------------- ACTIONS TAB ---------------- */}
          {tab === 3 && (
            <Stack spacing={2}>
              <DropdownWithSearch
                id="status"
                name="status"
                label="Update Status"
                value={status}
                onChange={setStatus}
                options={STATUS_DROPDOWN_OPTIONS}
                placeholder="Select status"
              />

              <DropdownWithSearch
                id="priority"
                name="priority"
                label="Update Priority"
                value={priority}
                onChange={setPriority}
                options={PRIORITY_DROPDOWN_OPTIONS}
                placeholder="Select priority"
              />

              <UniversalButton
                label="Save Changes"
                variant="primary"
                onClick={() => alert("Status & Priority updated (mock)")}
              />

              <Divider />

              <Button variant="outlined">Book Follow-up Appointment</Button>
            </Stack>
          )}
        </Box>

        {/* <div className="mt-auto mb-5 px-4">
          <UniversalButton
            label="Close"
            variant="danger"
            style={{ width: "100%", padding: "0.35rem" }} // matching p-1 and w-full
            onClick={onClose}
          />
        </div> */}
      </Drawer>
    </>
  );
}

/* SMALL INFO COMPONENT */
function Info({ label, value }) {
  return (
    <Typography variant="body2">
      <strong>{label}:</strong> {value}
    </Typography>
  );
}
