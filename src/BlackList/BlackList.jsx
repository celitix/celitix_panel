import React, { useState } from 'react'
import { Checkbox } from "primereact/checkbox";

// MUI MATERIAL
import { Box, Tab, Tabs, tabsClasses } from '@mui/material';

// ICONS
import GradingOutlinedIcon from "@mui/icons-material/GradingOutlined";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";

// COMPONENT  
import { a11yProps, CustomTabPanel } from '@/components/common/CustomTabPanel';
import BlockContent from './manageBlockContent';
import BlockNumber from '@/BlackList/manageBlockNumber';
import ManageBlockHeader from './manageBlockHeader';
import ManageBlockSeries from './manageBlockSeries';

const BlackList = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }} className="">
      <div className="flex items-end justify-between pr-2">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="Block list Tabs"
          textColor="primary"
          indicatorColor="primary"
          scrollButtons="auto"
          allowScrollButtonsMobile
          className="w-full"
          variant="scrollable"
          sx={{
            [`& .${tabsClasses.scrollButtons}`]: {
              "&.Mui-disabled": { opacity: 0.3 }, 
            },
          }}
        >
          <Tab
            label={
              <span>
                <GradingOutlinedIcon size={20} /> Block Mobile
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
                <LibraryBooksOutlinedIcon size={20} /> Block Content
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
          <Tab
            label={
              <span>
                <LibraryBooksOutlinedIcon size={20} /> Block Header
              </span>
            }
            {...a11yProps(2)}
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
                <LibraryBooksOutlinedIcon size={20} /> Block Series
              </span>
            }
            {...a11yProps(3)}
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
      </div>
      <CustomTabPanel value={value} index={0}>
        <BlockNumber />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <BlockContent />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <ManageBlockHeader />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <ManageBlockSeries />
      </CustomTabPanel>
    </Box>
  )
}

export default BlackList