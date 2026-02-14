import React, { useEffect, useMemo, useRef, useState } from "react";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

// icons
import ChairOutlinedIcon from "@mui/icons-material/ChairOutlined";
import WatchOutlinedIcon from "@mui/icons-material/WatchOutlined";
import TipsAndUpdatesOutlinedIcon from "@mui/icons-material/TipsAndUpdatesOutlined";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import { GiClothes } from "react-icons/gi";

// Components
import HomeDecor from "./HomeDecor";
import Jewellery from "./Jewellery";
import Electronics from "./Electronics";
import Kids from "./Kids";
import Clothing from "./Clothing";

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

const ProductCategories = () => {
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div className=" bg-white p-4 rounded-2xl space-y-4 ">
            <div className="flex justify-center  ">
                <span className="text-2xl font-medium underline leading-snug ">
                    Product Categories
                </span>
            </div>
            <div className="flex justify-center ">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="Manage Campaigns Tabs"
                    textColor="primary"
                    indicatorColor="primary"
                    scrollButtons="auto"
                    allowScrollButtonsMobile
                    className=" "
                    variant="scrollable"
                >
                    {/* Home Decor */}
                    <Tab
                        label={
                            <span className=" flex gap-1 items-center justify-center">
                                <ChairOutlinedIcon sx={{ fontSize: 20 }} />
                                Home Decor
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

                    {/* Jewellery */}
                    <Tab
                        label={
                            <span className="flex items-center gap-1">
                                <WatchOutlinedIcon sx={{ fontSize: 20 }} />
                                Jewellery & Watches
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

                    {/* Electronics */}
                    <Tab
                        label={
                            <span className="flex items-center gap-1">
                                <TipsAndUpdatesOutlinedIcon sx={{ fontSize: 20 }} />
                                Electronics
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

                    {/* Baby & Kids */}
                    <Tab
                        label={
                            <span className="flex items-center gap-1">
                                <ChildCareIcon sx={{ fontSize: 20 }} />
                                Baby & Kids
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

                    {/* Clothing */}
                    <Tab
                        label={
                            <span className="flex items-center gap-1" >
                                <GiClothes size={20} />
                                Clothing
                            </span>
                        }
                        {...a11yProps(4)}
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
            {/* Components */}
            <div className="">
                <CustomTabPanel value={value} index={0}>
                    <HomeDecor />
                </CustomTabPanel>

                <CustomTabPanel value={value} index={1}>
                    <Jewellery />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                    <Electronics />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={3}>
                    <Kids />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={4}>
                    <Clothing />
                </CustomTabPanel>
            </div>
        </div>
    );
};

export default ProductCategories;
