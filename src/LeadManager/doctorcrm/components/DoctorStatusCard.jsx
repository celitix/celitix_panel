import * as React from "react";
import {
  Box,
  Typography,
  Avatar,
  Chip,
  Divider,
  Paper,
  Stack,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";

const doctors = [
  {
    name: "Dr. Abhishek Bhatt",
    degree: "MBBS, MD",
    status: "Available",
    color: "success",
  },
  {
    name: "Dr. Sarah Smith",
    degree: "BDS, MDS",
    status: "Absent",
    color: "warning",
  },
  {
    name: "Dr. Megha Trivedi",
    degree: "BHMS",
    status: "Available",
    color: "success",
  },
  {
    name: "Dr. John Deo",
    degree: "MBBS, MS",
    status: "Available",
    color: "success",
  },
  {
    name: "Dr. Jacob Ryan",
    degree: "MBBS, MD",
    status: "Absent",
    color: "warning",
  },
  {
    name: "Dr. Jay Soni",
    degree: "MBBS",
    status: "Available",
    color: "success",
  },
  {
    name: "Dr. Linda Carter",
    degree: "MBBS, DNB",
    status: "Available",
    color: "success",
  },
  {
    name: "Dr. Jacob Ryan",
    degree: "MBBS, MD",
    status: "Absent",
    color: "warning",
  },
  {
    name: "Dr. Jay Soni",
    degree: "MBBS",
    status: "Available",
    color: "success",
  },
  {
    name: "Dr. Linda Carter",
    degree: "MBBS, DNB",
    status: "Available",
    color: "success",
  },
];

export default function DoctorStatusCard() {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: 3,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        minHeight: 0, // ⭐ VERY IMPORTANT
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1,
        }}
      >
        <Typography fontWeight={600}>Doctor Status</Typography>
        <Link to="/doctors">
          <Button size="small">View All</Button>
        </Link>
      </Box>

      {/* Table Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          px: 1,
          py: 1,
        }}
      >
        <Typography variant="caption" fontWeight={600}>
          Doctor Name
        </Typography>
        <Typography variant="caption" fontWeight={600}>
          Status
        </Typography>
      </Box>

      <Divider />

      {/* Doctor List */}
      <div className="h-80 lg:h-full overflow-y-auto">
        <Box
          sx={{
            flex: 1,
            // overflowY: "scroll",
            mt: 1,
            minHeight: 0, // ⭐ CRITICAL
          }}
        >
          {/* <div className="  "> */}
          {doctors.map((doc, index) => (
            <React.Fragment key={index}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  p: 1,
                  borderRadius: 2,
                  "&:hover": {
                    backgroundColor: "#f5f7fb",
                  },
                }}
              >
                {/* Doctor Info */}
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <Avatar />
                  <Box>
                    <Typography fontWeight={600} color="primary">
                      {doc.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      ({doc.degree})
                    </Typography>
                  </Box>
                </Stack>

                {/* Status */}
                <Chip
                  label={doc.status}
                  color={doc.color}
                  size="small"
                  sx={{
                    fontWeight: 500,
                    borderRadius: 2,
                  }}
                />
              </Box>
              <Divider />
            </React.Fragment>
          ))}
          {/* </div> */}
        </Box>
      </div>
    </Paper>
  );
}
