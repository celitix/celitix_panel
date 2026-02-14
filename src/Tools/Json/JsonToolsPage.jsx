import React from 'react'
import { useState, useEffect } from "react";

// MUI MATERIAL
import { Box, Tab, Tabs } from "@mui/material";

// ICONS
import { FiUpload, FiMessageSquare, FiLayers } from "react-icons/fi";
import GradingOutlinedIcon from "@mui/icons-material/GradingOutlined";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";

// COMPONENTS
import { a11yProps, CustomTabPanel } from '@/components/common/CustomTabPanel';
import CustomTabsMaterial from '../components/CustomTabsMaterial'
import JsonDiffTool from './JsonDiffTool';
import JsonPrettify from './JsonPrettify';

const JsonToolsPage = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="Manage Campaigns Tabs"
        textColor="primary"
        indicatorColor="primary"
      >
        <Tab
          label={
            <span>
              <GradingOutlinedIcon size={20} /> JSON Prettify
            </span>
          }
          {...a11yProps(0)}
          sx={{
            textTransform: "none",
            fontWeight: "bold",
            color: "text.secondary",
            "&:hover": {
              color: "primary.main",
              backgroundColor: "#f0f4ff",
              borderRadius: "8px",
            },
          }}
        />
        <Tab
          label={
            <span>
              <LibraryBooksOutlinedIcon size={20} /> JSON Diffs
            </span>
          }
          {...a11yProps(1)}
          sx={{
            textTransform: "none",
            fontWeight: "bold",
            color: "text.secondary",
            "&:hover": {
              color: "primary.main",
              backgroundColor: "#f0f4ff",
              borderRadius: "8px",
            },
          }}
        />
      </Tabs>
      <CustomTabPanel value={value} index={0}>
        <JsonPrettify />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <JsonDiffTool />
      </CustomTabPanel>
    </div>
  )
}

export default JsonToolsPage