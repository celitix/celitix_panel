import React, { useState } from 'react'
import { toast } from "react-hot-toast";
import { a11yProps, CustomTabPanel, } from "@/whatsapp/managetemplate/components/CustomTabPanel";
import GradingOutlinedIcon from "@mui/icons-material/GradingOutlined";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import { Box, Tab, Tabs } from '@mui/material';
import AddTemplate from './components/AddTemplate';
import EmailLibrary from '../emailtemplate/pages/EmailLibrary';
const EmailLibraryAdmin = () => {
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
        setColumns([]);
        setRows([]);
    };
    return (
        <div>
            <Box sx={{ width: "100%" }}>
                <div className="flex items-end justify-between pr-2">
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="Manage Library Tabs"
                        textColor="primary"
                        indicatorColor="primary"
                    >
                        <Tab
                            label={
                                <span>
                                    <GradingOutlinedIcon size={20} /> Add Template
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
                                    <LibraryBooksOutlinedIcon size={20} /> Libraries
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
                </div>
                <CustomTabPanel value={value} index={0}>
                    <AddTemplate />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <EmailLibrary />
                </CustomTabPanel>
            </Box>
        </div>
    )
}

export default EmailLibraryAdmin
