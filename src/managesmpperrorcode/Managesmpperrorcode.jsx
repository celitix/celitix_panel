import React, { useState, useEffect, useMemo } from "react";
import { Dialog } from "primereact/dialog";
import toast from "react-hot-toast";

// ============================================================ICONS===================================================
import EditIcon from "@mui/icons-material/Edit";
import { Trash2, Search } from "lucide-react";

// ======================================================APIS=======================================================
import {
  getSMPPServices,
  getSMPPMappingData,
  getSMPPErrorCodeReason,
  createSMPPErrorCode,
  deleteSMPPErrCode,
} from "@/apis/managerouting/managerouting";

// ================================================================COMPONENTS===========================================
import DropdownWithSearch from "@/admin/components/DropdownWithSearch";
import { DataTable } from "@/components/layout/DataTable";
import UniversalButton from "@/admin/components/UniversalButton";
import InputField from "@/admin/components/InputField";
import UniversalTextArea from "@/admin/components/UniversalTextArea";

const Managesmpperrorcode = () => {
  const [selectedSMPPService, setSelectedSMPPService] = useState(null);
  const [smppOptions, setSmppOptions] = useState([]);

  const [mappingOption, setMappingOption] = useState([]);
  const [selectedVendorCode, setSelectedVendorCode] = useState(null);
  const [mappingData, setMappingData] = useState([]);

  const [openAddDialog, setOpenDialog] = useState(false);
  const [selectedSMPPServiceAdd, setSelectedSMPPServiceAdd] = useState(null);
  const [errorStatus, setErrorStatus] = useState("");

  const [selectedReasonContent, setSelectedReasonContent] = useState(null);
  const [reasonOptions, setReasonOptions] = useState([]);

  const [errorCode, setErrorCode] = useState("");
  const [errorDesc, setErrorDesc] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingSrNo, setEditingSrNo] = useState(null);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedSrNo, setSelectedSrNo] = useState(null);

  useEffect(() => {
    const fetchSMPPService = async () => {
      try {
        const res = await getSMPPServices();

        if (res?.status === true && Array.isArray(res.data)) {
          const options = res.data.map((opt) => ({
            label: opt.servicename,
            value: opt.serviceid,
          }));

          setSmppOptions(options);
        }

        console.log("SMPP SERVICE RESPONSE:", res);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSMPPService();
  }, []);

  useEffect(() => {
    if (!selectedSMPPService) return;

    const fetchSMPPMappingData = async () => {
      try {
        const res = await getSMPPMappingData(selectedSMPPService);

        if (res?.status && Array.isArray(res.data)) {
          setMappingData(res.data);

          const options = res.data.map((opt) => ({
            label: opt.vendor_error_code,
            value: opt.vendor_error_code,
          }));

          setMappingOption(options);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchSMPPMappingData();
  }, [selectedSMPPService]);

  const filteredMappingData = useMemo(() => {
    if (!selectedVendorCode || !Array.isArray(mappingData)) return [];

    return mappingData.filter(
      (item) => item.vendor_error_code === selectedVendorCode,
    );
  }, [selectedVendorCode, mappingData]);

  const resetForm = () => {
    setSelectedSMPPServiceAdd(null);
    setErrorStatus("");
    setSelectedReasonContent(null);
    setErrorCode("");
    setErrorDesc("");
    setEditingSrNo(null);
  };

  const mappingColumn = [
    {
      field: "vendor_error_code",
      headerName: "Vendor Error Code",
      width: 150,
    },
    {
      field: "vendor_error_code_description",
      headerName: "Description",
      width: 220,
    },

    {
      field: "vendor_error_status",
      headerName: "Status",
      width: 130,
    },
    {
      field: "display_reason",
      headerName: "Display Reason",
      width: 150,
    },
    {
      field: "display_err_code",
      headerName: "Display Error Code",
      width: 150,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      sortable: false,
      renderCell: (params) => {
        return (
          <div className="flex items-center gap-3">
            <button onClick={() => handleEdit(params.row)}>
              <EditIcon size={6} />
            </button>

            <button
              onClick={() => openDeleteDialogHandler(params.row.sr_no)}
              className="text-red-400 hover:text-red-700"
            >
              <Trash2 size={15} />
            </button>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    const fetchCodeReason = async () => {
      try {
        const res = await getSMPPErrorCodeReason();

        if (res?.status === true && Array.isArray(res.data)) {
          const options = res.data.map((opt) => ({
            label: opt.error_reason,
            value: opt.error_code,
          }));

          setReasonOptions(options);
        }
        console.log("Reason res:", res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCodeReason();
  }, []);

  // const handleSave = async () => {
  //   try {
  //     const payload = {
  //       serviceId: String(selectedSMPPServiceAdd),
  //       errorStatus: errorStatus,
  //       appErrorCode: "",
  //       errorReasonTextContent: selectedReasonContent,
  //       errcode: errorCode,
  //       errstatus: "ok",
  //       errorReason: selectedReasonContent,
  //       errdesc: errorDesc,
  //     };
  //     const res = await createSMPPErrorCode(payload);
  //     console.log("Saving Response:", res);

  //     if (res.success || res.status) {
  //       toast.success(res.msg || "Plan Create successfully!");
  //       setOpenDialog(false);
  //     } else {
  //       toast.error(res.msg || "Failed to create plan!");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleSave = async () => {
    try {
      const payload = {
        serviceId: String(selectedSMPPServiceAdd),
        errorStatus: errorStatus,
        appErrorCode: "",
        errorReasonTextContent: selectedReasonContent,
        errcode: errorCode,
        errstatus: "ok",
        errorReason: selectedReasonContent,
        errdesc: errorDesc,
      };

      let res;

      if (isEditMode) {
        res = await updateSMPPErrorCode(editingSrNo, payload); 
      } else {
        res = await createSMPPErrorCode(payload);
      }

      if (res.success || res.status) {
        toast.success(
          isEditMode ? "Updated successfully!" : "Created successfully!",
        );
        setOpenDialog(false);
        setIsEditMode(false);
        setEditingSrNo(null);
          getSMPPMappingData(selectedSMPPService)
      } else {
        toast.error(res.message || "Operation failed!");
      }
    } catch (error) {
      console.log(error);
    }
  };

//   const handleSave = async () => {
//   try {
//     const payload = {
//       srno: editingSrNo,   
//       serviceId: String(selectedSMPPServiceAdd),
//       errorStatus: errorStatus,
//       appErrorCode: "",
//       errorReasonTextContent: selectedReasonContent,
//       errcode: errorCode,
//       errstatus: "ok",
//       errorReason: selectedReasonContent,
//       errdesc: errorDesc,
//     };

//     let res;

//     if (isEditMode) {
//       res = await createSMPPErrorCode(payload);  
//     } else {
//       res = await createSMPPErrorCode(payload);
//     }

//     if (res.success || res.status) {
//       toast.success(
//         isEditMode ? "Updated successfully!" : "Created successfully!"
//       );

//       setOpenDialog(false);
//       setIsEditMode(false);
//       setEditingSrNo(null);

//       getSMPPMappingData(selectedSMPPService)
//     } else {
//       toast.error(res.message || "Operation failed!");
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };


  const handleEdit = (row) => {
    setIsEditMode(true);
    setEditingSrNo(row.sr_no);

    setSelectedSMPPServiceAdd(row.vendor_service_id);
    setErrorStatus(row.vendor_error_status);
    setSelectedReasonContent(row.display_reason);
    setErrorCode(row.vendor_error_code);
    setErrorDesc(row.vendor_error_code_description);

    setOpenDialog(true);
  };

  const handleAddClick = () => {
    setIsEditMode(false);
    setEditingSrNo(null);
    resetForm();
    setOpenDialog(true);
  };

  const openDeleteDialogHandler = (sr_no) => {
    setSelectedSrNo(sr_no);
    setOpenDeleteDialog(true);
  };
  const handleDelete = async () => {
    try {
      const res = await deleteSMPPErrCode(selectedSrNo);

      if (res.success || res.status) {
        toast.success("Deleted successfully!");
        setOpenDeleteDialog(false);
        setSelectedSrNo(null);

        getSMPPMappingData(selectedSMPPService)

      } else {
        toast.error(res.message || "Failed to delete");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200">
      <div className="flex items-center justify-between ">
        <h2 className="text-2xl font-semibold text-gray-800 tracking-tight">
          Manage SMPP Error Mapping
        </h2>
      </div>

      <div className=" mt-5">
        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6">
          {/* Filters Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full xl:w-auto">
            <DropdownWithSearch
              label="Select SMPP Service"
              value={selectedSMPPService}
              options={smppOptions}
              onChange={(value) => setSelectedSMPPService(value)}
            />

            <DropdownWithSearch
              label="Select Vendor Error Code"
              value={selectedVendorCode}
              options={mappingOption}
              onChange={(value) => setSelectedVendorCode(value)}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 w-full xl:w-auto">
            <UniversalButton label="Search" className="w-full sm:w-auto" />

            <UniversalButton label="Add Error Code" onClick={handleAddClick} />
          </div>
        </div>
      </div>

      {selectedVendorCode && (
        <div className="mt-6 bg-white p-4 rounded-2xl shadow-sm border border-gray-200">
          <DataTable
            rows={(filteredMappingData || []).map((row, index) => ({
              ...row,
              id: row.sr_no ?? index + 1,
            }))}
            col={mappingColumn}
            getRowHeight={() => 52}
          />
        </div>
      )}

      {/* ADD Dialog */}
      <Dialog
        header={isEditMode ? "Edit Error Code" : "Add Error Code"}
        visible={openAddDialog}
        onHide={() => setOpenDialog(false)}
        style={{ width: "820px" }}
        className="rounded-2xl"
      >
        <div className="space-y-6 pt-2">
          {/* Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DropdownWithSearch
              label="Select SMPP Service"
              value={selectedSMPPServiceAdd}
              options={smppOptions}
              onChange={(value) => setSelectedSMPPServiceAdd(value)}
            />

            <InputField
              label="Error Status"
              placeholder="Enter Error Status"
              value={errorStatus}
              onChange={(e) => setErrorStatus(e.target.value)}
            />

            <DropdownWithSearch
              label="Reason Text Content"
              value={selectedReasonContent}
              options={reasonOptions}
              onChange={(value) => setSelectedReasonContent(value)}
            />

            <InputField
              label="Error Code"
              placeholder="Enter Error Code"
              value={errorCode}
              onChange={(e) => setErrorCode(e.target.value)}
            />

            {/* Full Width TextArea */}
            <div className="md:col-span-2">
              <UniversalTextArea
                label="Error Description"
                placeholder="Enter detailed error description..."
                value={errorDesc}
                onChange={(e) => setErrorDesc(e.target.value)}
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex justify-end gap-4 pt-4 border-t">
            <UniversalButton label="Save Error Code" onClick={handleSave} />
          </div>
        </div>
      </Dialog>

      {/* DELETE DIALOG */}
      <Dialog
        header="Confirm Delete"
        visible={openDeleteDialog}
        onHide={() => setOpenDeleteDialog(false)}
        style={{ width: "420px" }}
        className="rounded-2xl"
      >
        <div className="space-y-6">
          <div>
            <p className="text-base font-semibold text-gray-800">
              Delete Error Code
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Are you sure you want to delete this error code? This action
              cannot be undone.
            </p>
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t">
            <button
              onClick={() => setOpenDeleteDialog(false)}
              className="px-5 py-2 text-sm font-medium rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 text-sm font-semibold rounded-lg"
            >
              Delete
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

// getServices - getSMPPServices call this api and place data in a dropdown
// getErrorMappingData - getSMPPMappingData - pass the serviceId which get from getServices after selecting the value from dropdown and map the data in anohter dropdown
// Table - header - Vendor EC Status, Vendor EC, vendor EC Description, Display EC Status, Display EC, action - edit and delete icon
// createSMPPErrorCode -
// {
//     "serviceId": "202", - dropdown - create the serviceID dropdown
//     "errorStatus": "error status", - input
//     "appErrorCode": "", jsut pass blank no need to take input values from use
//     "errorReasonTextContent": "333", - dropdown  getSMPPErrorCodeReason
//     "errcode": "1000", Input - label add tooltip - values must be - REJECTD,DELIVRD,EXPIRED,UNDELIV
//     "errstatus": "UNDELIVRD", - input
//     "errdesc": "error code description", - textarea
//     "errorReason": "333" - just display the code
//     "Srno": 54 // pass this at time of edit
// }

// getSMPPErrorCodeReason - use this api function
export default Managesmpperrorcode;

// {
//   "serviceId": "202",
//     "errorStatus": "REJECTD",
//       "appErrorCode": "",
//         "errorReasonTextContent": "333",
//           "errcode": "1000",
//             "errstatus": "ok",
//               "errdesc": "description",
//                 "errorReason": "333"
// }
