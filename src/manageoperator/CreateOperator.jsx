import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Dialog } from "primereact/dialog";

// Api
import {
  getCountryList,
  getOperatorList,
  addOperator,
  editOperatorData,
  deleteOperator,
} from "@/apis/admin/admin";

// ICONS
import { MdOutlineDeleteForever } from "react-icons/md";
import EditNoteIcon from "@mui/icons-material/EditNote";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

// MUI MATERIAL
import { IconButton } from "@mui/material";

// Components
import DropdownWithSearch from "@/whatsapp/components/DropdownWithSearch";
import { DataTable } from "@/components/layout/DataTable";
import UniversalButton from "@/components/common/UniversalButton";
import InputField from "@/components/layout/InputField";
import UniversalTextArea from "@/whatsapp/components/UniversalTextArea";
import Tooltip from "@mui/material/Tooltip";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CustomTooltip from "@/components/common/CustomTooltip";

// addOperator - admin.js - add validation both fields are required

// {
//     "operatorName": "test", - input
//     "countrySrno": 99 - country dropdown
// }
// deleteOperator - admin.js

// editOperatorData - admin.js -
// payload

// {
//     "operatorName": "JIO",
//     "countrySrno": 99,
//     "srno": 66
// }
const CreateOperator = () => {
  const [countryList, setCountryList] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [operatorList, setOperatorList] = useState([]);
  const [selectedOperator, setSelectedOperator] = useState();
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [formDetails, setFormDetails] = useState({});

  useEffect(() => {
    if (openEditDialog) {
      setFormDetails(() => ({
        operatorName: selectedOperator?.operatorName,
        countrySrno: selectedCountry,
      }));
    } else {
      setFormDetails({});
    }
  }, [openEditDialog]);

  const fetchCountryList = async () => {
    try {
      const res = await getCountryList();
      setCountryList(res);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchCountryList();
  }, []);

  const fetchOperatorList = async () => {
    const srNo = selectedCountry;
    try {
      const response = await getOperatorList(srNo);
      setOperatorList(response);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (selectedCountry) {
      fetchOperatorList();
    }
  }, [selectedCountry]);

  const handleAddOperator = async () => {
    if (formDetails?.operatorName === "" || formDetails?.countrySrno === "") {
      toast.error("Fill the fields");
      return;
    }

    const addData = {
      operatorName: formDetails?.operatorName,
      countrySrno: formDetails?.countrySrno,
    };

    const editData = {
      srno: selectedOperator?.srNo,
      operatorName: formDetails?.operatorName,
      countrySrno: formDetails?.countrySrno,
    };

    try {
      let res;
      if (openEditDialog) {
        res = await editOperatorData(editData);
      } else {
        res = await addOperator(addData);
      }

      if (res?.status) {
        toast.success(res?.msg);
        setOpenAddDialog(false);
        setOpenEditDialog(false);
        fetchOperatorList();
        setFormDetails({});
      } else {
        toast.error(res?.msg);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleEditOperator = (row) => {
    setOpenEditDialog(true);
    setSelectedOperator(row);
  };

  const handleDeleteOperator = (row) => {
    setOpenDeleteDialog(true);
    setSelectedOperator(row);
  };

  const handleDelete = async () => {
    const srNo = selectedOperator?.srNo;
    try {
      const res = await deleteOperator(srNo);
      if (res?.status) {
        toast.success(res?.msg);
        setOpenDeleteDialog(false);
        fetchOperatorList();
      } else {
        toast.error(res?.error);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const CountryOptions = countryList.map((country) => ({
    label: country.countryName,
    value: country.srNo,
  }));

  const columns = [
    { field: "sn", headerName: "S.No", flex: 0, minWidth: 80 },
    { field: "srNo", headerName: "S.No", flex: 0, minWidth: 80 },
    {
      field: "countrySrno",
      headerName: "Country Srno",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "operatorName",
      headerName: "Operator Name",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => {
        return (
          <>
            <CustomTooltip title="Edit Operator" placement="top" arrow>
              <IconButton onClick={() => handleEditOperator(params.row)}>
                <EditNoteIcon
                  sx={{
                    fontSize: "1.2rem",
                    color: "gray",
                  }}
                />
              </IconButton>
            </CustomTooltip>
            <CustomTooltip title="Delete Operator" placement="top" arrow>
              <IconButton
                className="no-xs"
                onClick={() => handleDeleteOperator(params.row)}
              >
                <MdOutlineDeleteForever
                  className="text-red-500 cursor-pointer hover:text-red-600"
                  size={20}
                />
              </IconButton>
            </CustomTooltip>
          </>
        );
      },
    },
  ];

  const rows = operatorList?.map((op, i) => ({
    id: i + 1,
    sn: i + 1,
    srNo: op.srNo,
    countrySrno: op.countrySrno,
    operatorName: op.operatorName,
  }));

  return (
    <div className="">
      <div className="flex justify-center items-center text-2xl font-semibold text-gray-700">
        {" "}
        Create Operator
      </div>
      <div className="flex gap-4">
        <div className="w-full md:w-64">
          <DropdownWithSearch
            label="Country List"
            id="countryList"
            name="countryList"
            placeholder="Enter Country Name"
            value={selectedCountry}
            onChange={(option) => setSelectedCountry(option)}
            options={CountryOptions}
          />
        </div>
        <div className="mt-7">
          <UniversalButton
            label="Add Operator"
            onClick={() => setOpenAddDialog(true)}
          />
        </div>
      </div>

      <div className="w-full my-4">
        <DataTable
          id="operatorList"
          name="operatorList"
          rows={rows}
          col={columns}
          getRowHeight={null}
        />
      </div>
      <Dialog
        header="Add Operator"
        visible={openAddDialog}
        onHide={() => setOpenAddDialog(false)}
        className="lg:w-[45rem] md:w-[30rem] w-[20rem]"
        draggable={false}
      >
        <div className="my-2">
          <InputField
            id="operatorName"
            name="operatorName"
            label="Operator Name"
            placeholder="Enter Operator name"
            value={formDetails.operatorName}
            onChange={(e) => {
              setFormDetails((prev) => ({
                ...prev,
                operatorName: e.target.value,
              }));
            }}
          />
        </div>

        <div className="my-2">
          <DropdownWithSearch
            label="Country List"
            id="countryList"
            name="countryList"
            placeholder="Enter Country Name"
            value={formDetails?.countrySrno}
            onChange={(option) =>
              setFormDetails((prev) => ({
                ...prev,
                countrySrno: option,
              }))
            }
            options={CountryOptions}
          />
        </div>
        <div className="my-2 flex items-center justify-center">
          <UniversalButton label="Save" onClick={handleAddOperator} />
        </div>
      </Dialog>
      <Dialog
        header="Edit Operator"
        visible={openEditDialog}
        onHide={() => setOpenEditDialog(false)}
        className="lg:w-[45rem] md:w-[30rem] w-[20rem]"
        draggable={false}
      >
        <div className="my-2">
          <InputField
            id="operatorName"
            name="operatorName"
            label="Operator Name"
            placeholder="Enter Operator name"
            value={formDetails.operatorName}
            onChange={(e) => {
              setFormDetails((prev) => ({
                ...prev,
                operatorName: e.target.value,
              }));
            }}
          />
        </div>

        <div className="my-2 flex items-center justify-center">
          <UniversalButton label="Save" onClick={handleAddOperator} />
        </div>
      </Dialog>
      <Dialog
        header="Delete Operator"
        visible={openDeleteDialog}
        onHide={() => setOpenDeleteDialog(false)}
        className="lg:w-[35rem] md:w-[30rem] w-[20rem]"
        draggable={false}
      >
        <div className="flex flex-col items-center justify-center text-center px-4 py-3">
          <CancelOutlinedIcon sx={{ fontSize: 64, color: "#f44336", mb: 1 }} />

          <h2 className="text-[1.15rem] font-semibold text-gray-700 mb-2">
            Delete Operator
          </h2>

          <p className="text-gray-600 text-sm mb-4">
            You are about to delete the following operator:
          </p>

          <div className="bg-gray-100 text-gray-800 font-medium rounded-md px-3 py-2 mb-4 w-full text-center break-words">
            {selectedOperator?.operatorName || "Unnamed Operator"}
          </div>

          <p className="text-gray-500 text-sm">
            This action is{" "}
            <span className="font-semibold text-red-600">permanent</span> and
            cannot be undone.
          </p>

          <div className="flex justify-center gap-4 mt-5">
            <UniversalButton
              label="Cancel"
              style={{
                backgroundColor: "#4b5563",
              }}
              onClick={() => setOpenDeleteDialog(false)}
            />
            <UniversalButton
              label="Delete"
              style={{
                backgroundColor: "#dc2626",
              }}
              onClick={handleDelete}
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default CreateOperator;
