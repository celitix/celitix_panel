import React, { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import toast from "react-hot-toast";
import { Delete } from "lucide-react";

// MUI MATERIAL
import { IconButton } from "@mui/material";

// ICONS
import { MdOutlineDeleteForever } from "react-icons/md";
import EditNoteIcon from "@mui/icons-material/EditNote";

// COMPONENTS
import UniversalButton from "@/whatsapp/components/UniversalButton";
import DropdownWithSearch from "@/whatsapp/components/DropdownWithSearch";
import SMPPErrorCodeTable from "./components/SMPPErrorCodeTable";
import UniversalSkeleton from "@/whatsapp/components/UniversalSkeleton";
import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import InputField from "@/whatsapp/components/InputField";
import UniversalTextArea from "@/whatsapp/components/UniversalTextArea";
import CustomTooltip from "@/components/common/CustomTooltip";
import { DataTable } from "@/components/layout/DataTable";

// API
import {
  deleteErrCode,
  getAppErrorReasons,
  getErrorMappingData,
  getMissingErrorCodeData,
  getServices,
  insertValuesSMPP,
} from "@/apis/admin/admin";

const SMPPErrorCode = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [adderror, setAdderror] = useState(false);
  const [vendorOptions, setVendorOptions] = useState([]);
  const [smpperrorcodeedit, setSMPPErrorCodeEdit] = useState(false);

  const [searchData, setSearchData] = useState({
    serviceId: "",
    error: "",
    vendorErrorCode: "",
  });
  const [addsearchData, setAddSearchData] = useState({
    serviceId: "",
    error: "",
  });
  const [rows, setRows] = useState([]);
  const [data, setData] = useState({
    service: [],
    error: [],
  });
  const [deleteData, setDeleteData] = useState({
    isOpen: false,
    id: null,
  });

  useEffect(() => {
    async function loadVendorOptions() {
      // reset when no service selected
      if (!searchData.serviceId) {
        setVendorOptions([]);
        setSearchData((p) => ({ ...p, vendorErrorCode: "" }));
        return;
      }
      try {
        const res = await getErrorMappingData(searchData.serviceId);
        if (res?.status) {
          const rows = Array.isArray(res.data) ? res.data : [];
          // unique codes
          const uniqueCodes = [
            ...new Set(rows.map((r) => String(r?.vendor_error_code ?? ""))),
          ].filter(Boolean);

          const opts = uniqueCodes.map((code) => {
            const anyRow = rows.find(
              (r) => String(r?.vendor_error_code ?? "") === code
            );
            // const desc = anyRow?.vendor_error_code_description ?? "";
            return {
              label: `${code}`,
              value: code,
            };
          });

          setVendorOptions(opts);
        }
      } catch {
        setVendorOptions([]);
      }
    }

    loadVendorOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchData.serviceId]);

  useEffect(() => {
    async function handleGetServices() {
      try {
        const res = await getServices();
        if (!res?.status) {
          return toast.error("Something went wrong");
        }
        setData((prev) => ({
          ...prev,
          service: res?.data,
        }));
      } catch (e) {
        console.log("e", e);
        return toast.error("Something went wrong");
      }
    }

    async function handleGetErrorCode() {
      try {
        const res = await getAppErrorReasons();
        if (!res?.status) {
          return toast.error("Something went wrong");
        }
        setData((prev) => ({
          ...prev,
          error: res?.data,
        }));
      } catch (e) {
        console.log("e", e);
        return toast.error("Something went wrong");
      }
    }

    handleGetServices();
    handleGetErrorCode();
  }, []);

  async function handleSearch() {
    if (!searchData?.serviceId) {
      toast.error("Please Select Service!");
      return;
    }
    try {
      setIsFetching(true);
      const res = await getErrorMappingData(searchData?.serviceId);
      if (!res?.status) return toast.error("Something went wrong");

      let filteredData = Array.isArray(res?.data) ? res.data : [];

      // (optional) App Error Code filter you already had
      if (searchData?.error) {
        filteredData = filteredData.filter(
          (row) =>
            String(row?.display_err_code ?? "") === String(searchData.error)
        );
      }

      // ✅ NEW: Vendor EC filter
      if (searchData?.vendorErrorCode) {
        filteredData = filteredData.filter(
          (row) =>
            String(row?.vendor_error_code ?? "") ===
            String(searchData.vendorErrorCode)
        );
      }

      const formattedData = filteredData.map((item, index) => ({
        id: index + 1,
        sn: index + 1,
        ...item,
      }));
      setRows(formattedData);
    } catch (e) {
      toast.error("Something went wrong");
    } finally {
      setIsFetching(false);
    }
  }

  const columns = [
    { field: "sn", headerName: "S.No", flex: 0, minWidth: 50 },
    {
      field: "vendor_error_status",
      headerName: "Vendor EC Status",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "vendor_error_code",
      headerName: "Vendor EC",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "vendor_error_code_description",
      headerName: "Vendor EC Description",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "display_reason",
      headerName: "Display EC Status",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "display_err_code",
      headerName: "Display EC",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <>
          <CustomTooltip title="Edit Routing" placement="top" arrow>
            <IconButton onClick={() => handleSMPPErrorEdit(params.row)}>
              <EditNoteIcon
                sx={{
                  fontSize: "1.2rem",
                  color: "gray",
                }}
              />
            </IconButton>
          </CustomTooltip>
          <CustomTooltip title="Delete Routing" placement="top" arrow>
            <IconButton
              className="no-xs"
              onClick={() => {
                setDeleteData({
                  isOpen: true,
                  id: params.row.sr_no,
                });
              }}
            >
              <MdOutlineDeleteForever
                className="text-red-500 cursor-pointer hover:text-red-600"
                size={20}
              />
            </IconButton>
          </CustomTooltip>
        </>
      ),
    },
  ];

  async function handleDelete() {
    try {
      if (!deleteData?.id) return;
      const res = await deleteErrCode(deleteData?.id);

      if (!res?.status) {
        return toast.error("Something went wrong");
      }
      toast.success("Deleted successfully");
      setDeleteData({ isOpen: false, id: null });
      handleSearch();
    } catch (e) {
      toast.error("Something went wrong");
    }
  }

  // insertValuesSMPP()

  const [form, setForm] = useState({
    serviceId: "",
    vendorErrorCode: "",
    vendorErrorStatus: "",
    vendorErrorDesc: "",
    displayType: "",
    error: "",
    errorReasonTextContent: "",
    // refundOnDelivery: false,
    // dndRefund: false,
  });

  const update = (patch) => setForm((prev) => ({ ...prev, ...patch }));

  const serviceOptions = (data?.service ?? []).map((s) => ({
    label: s?.servicename,
    value: String(s?.serviceid ?? ""),
  }));

  const errorOptions = (data?.error ?? []).map((e) => ({
    label: e?.error_reason,
    value: String(e?.error_code ?? ""),
    meta: e,
  }));

  const displayTypeOptions = [
    { label: "REJECTD", value: "REJECTD" },
    { label: "DELIVRD", value: "DELIVRD" },
    { label: "EXPIRED", value: "EXPIRED" },
    { label: "UNDELIV", value: "UNDELIV" },
  ];
  // const vendorOptions = [
  //   { label: "11", value: "11" },
  //   { label: "123", value: "123" },
  //   { label: "22", value: "22" },
  //   { label: "321", value: "321" },
  // ];

  const displayErrorCode = form.errorReasonTextContent || "";

  const selectedErrorMeta = errorOptions.find(
    (o) => o.value === form.error
  )?.meta;

  async function handleSave() {
    // Basic validations
    if (!form.serviceId) return toast.error("Please select a Service");
    // if (!form.error) return toast.error("Please select an Error Code");
    if (!form.vendorErrorCode) return toast.error("Enter Vendor Error Code");
    if (!form.vendorErrorStatus)
      return toast.error("Enter Vendor Error Status");

    const payload = {
      serviceId: form.serviceId,
      errorStatus: form.displayType || undefined,
      appErrorCode: form.error,
      // errorReasonTextContent: form.errorReasonTextContent || "",
      errorReasonTextContent: form?.errorReasonTextContent,
      errcode: form.vendorErrorCode,
      errstatus: form.vendorErrorStatus,
      // errdesc: form.vendorErrorDesc,
      errdesc: form.errordesc,
      errorReason: form.errorReasonTextContent,
      // sr_no: "",
      // refundOnDelivery: form.refundOnDelivery,
      // dndRefund: form.dndRefund,
      // displayType: form.displayType || undefined,
      // displayErrorCode is UI-only; include only if your API needs it:
      // displayErrorCode,
    };

    try {
      const res = await insertValuesSMPP(payload);
      if (!res?.status) {
        return toast.error(res?.msg || "Failed to save");
      }
      toast.success("Saved successfully");
      setAdderror(false);
      setForm({
        serviceId: "",
        vendorErrorCode: "",
        vendorErrorStatus: "",
        vendorErrorDesc: "",
        displayType: "",
        error: "",
        // refundOnDelivery: false,
        // dndRefund: false,
      });
      if (searchData?.serviceId) {
        handleSearch();
      }
    } catch (e) {
      console.error(e);
      toast.error("Something went wrong while saving");
    }
  }

  //  Edit

  const [updateForm, setUpdateForm] = useState({});

  const handleSMPPErrorEdit = (row) => {
    setUpdateForm(row);
    setSMPPErrorCodeEdit(true);
  };

  const handleSaveEdit = async (data) => {
    try {
      const payload = {
        serviceId: updateForm.vendor_service_id?.toString(),
        errorStatus: updateForm.type || undefined,
        appErrorCode: updateForm.error,
        errorReasonTextContent: updateForm.display_reason,
        errcode: updateForm.vendor_error_code,
        errstatus: updateForm.vendor_error_status,
        errdesc: updateForm.vendor_error_code_description,
        errorReason: updateForm.display_reason,
        Srno: updateForm.sr_no,
      };

      const res = await insertValuesSMPP(payload);
      let status = null;
      let msg = "";
      if (res?.hasOwnProperty("status")) {
        status = res?.status;
        msg = res?.msg;
      }
      if (res?.hasOwnProperty("success")) {
        status = res?.success;
        msg = res?.message;
      }
      if (!status) {
        return toast.error(msg || "Failed to save");
      }
      toast.success("Updated Successfully");
      handleSearch()
      setSMPPErrorCodeEdit(false);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong!");
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className="flex justify-center items-center font-semibold text-2xl text-gray-700">
        SMPP Error Code
      </h1>
      <div className="flex flex-wrap gap-2 items-end justify-between pb-3 w-full">
        <div className="flex flex-wrap gap-2 items-end ">
          <div className="w-full lg:w-56 ">
            <DropdownWithSearch
              label="Service"
              options={data?.service?.map((data) => ({
                label: data?.servicename,
                value: data?.serviceid,
              }))}
              placeholder="Select Service"
              id="smpperrorservice"
              name="smpperrorservice"
              value={searchData?.serviceId}
              onChange={(e) =>
                setSearchData((prev) => ({ ...prev, serviceId: e }))
              }
            />
          </div>
          <div className="w-full lg:w-56 ">
            <DropdownWithSearch
              label="Vendor EC"
              placeholder="Select Vendor EC"
              id="vendor_ec"
              name="vendor_ec"
              options={vendorOptions}
              value={searchData.vendorErrorCode}
              onChange={(val) =>
                setSearchData((prev) => ({ ...prev, vendorErrorCode: val }))
              }
              disabled={!searchData.serviceId} // optional UX
            />
          </div>

          <div className="w-max-content">
            <UniversalButton
              // label="Search"
              label={isFetching ? "Searching..." : "Search"}
              disabled={isFetching}
              id="searcherrorcode"
              name="searcherrorcode"
              onClick={handleSearch}
            />
          </div>
        </div>
        {/* <div className="w-max-content">
            <UniversalButton
              label="Delete"
              id="deleteerrorcode"
              name="deleteerrorcode"
              // onClick={handleDeleteErrorCode}
            />
          </div> */}
        <div className="w-max-content">
          <UniversalButton
            label="Add Error Code"
            id="adderrorcode"
            name="adderrorcode"
            onClick={() => setAdderror(true)}
          />
        </div>
      </div>

      {isFetching ? (
        <div className="w-full">
          <UniversalSkeleton height="35rem" width="100%" />
        </div>
      ) : (
        <div className="mt-3">
          <DataTable
            id="smpperrorcode"
            name="smpperrorcode"
            col={columns}
            rows={rows}
            getRowHeight={null}
          />
        </div>
      )}

      {/* Add SMPP Error Code start */}
      <Dialog
        header="Vendor Error Code Mapping"
        visible={adderror}
        onHide={() => setAdderror(false)}
        className="lg:w-[45rem] md:w-[30rem] w-[20rem]"
        draggable={false}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <DropdownWithSearch
              label="Service"
              options={serviceOptions}
              placeholder="Select Service"
              id="smpperrorservice"
              name="smpperrorservice"
              value={form.serviceId}
              onChange={(val) => update({ serviceId: val })}
            />
            <InputField
              label="Vendor Error Code"
              id="vendorerrorcodeadd"
              name="vendorerrorcodeadd"
              placeholder="Enter Vendor Error Code"
              value={form.vendorErrorCode}
              onChange={(e) =>
                update({ vendorErrorCode: e?.target?.value ?? e })
              }
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <InputField
              label="Vendor Error Status"
              id="vendorerrorstatusadd"
              name="vendorerrorstatusadd"
              placeholder="Vendor Error Status"
              value={form.vendorErrorStatus}
              onChange={(e) =>
                update({ vendorErrorStatus: e?.target?.value ?? e })
              }
            />
            <UniversalTextArea
              label="Vendor Error Code Description"
              id="vendorerrorcodedescriptionadd"
              name="vendorerrorcodedescriptionadd"
              placeholder="Vendor Error Code Description"
              value={form.errordesc}
              onChange={(e) => update({ errordesc: e?.target?.value })}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <DropdownWithSearch
              label="Display Type"
              options={displayTypeOptions}
              id="displaytypeadd"
              name="displaytypeadd"
              value={form.displayType}
              onChange={(val) => update({ displayType: val })}
            />
            <DropdownWithSearch
              label="Error Code"
              options={errorOptions}
              placeholder="Select Error Code"
              id="smpperrorcode"
              name="smpperrorcode"
              value={form.errorReasonTextContent}
              onChange={(val) => update({ errorReasonTextContent: val })}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <InputField
              label="Display Error Code"
              id="displayerrorcodeadd"
              name="displayerrorcodeadd"
              placeholder="Display Error Code"
              value={displayErrorCode}
              readOnly // <-- boolean (avoid "true" as string)
            />
          </div>

          {/* <div className="flex gap-6 items-center">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="refundOnDelivery"
                className="form-checkbox"
                checked={form.refundOnDelivery}
                onChange={(e) => update({ refundOnDelivery: e.target.checked })}
              />
              <span className="text-sm">Refund For On Delivery Account</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="dndRefund"
                className="form-checkbox"
                checked={form.dndRefund}
                onChange={(e) => update({ dndRefund: e.target.checked })}
              />
              <span className="text-sm">DND Refund</span>
            </label>
          </div> */}

          <div className="flex justify-center">
            <UniversalButton
              label="Save"
              id="saveadd"
              name="saveadd"
              onClick={handleSave}
            />
          </div>
        </div>
      </Dialog>
      {/* Add SMPP Error Code End */}

      {/* Delete SMPP Error Code Start */}
      <Dialog
        header="Confirm Delete"
        visible={deleteData.isOpen}
        onHide={() => {
          setDeleteData((prev) => ({ isOpen: false, id: "" }));
        }}
        className="lg:w-[40rem] md:w-[30rem] w-[20rem]"
        draggable={false}
      >
        <div>
          <div className="p-4 text-center">
            <p className="text-[1.1rem] font-semibold text-gray-600">
              Are you sure ?
            </p>
            <p>
              Do you really want to delete this? This process cannot be undo.
            </p>
            <div className="flex justify-center gap-4 mt-2">
              <UniversalButton
                label="Cancel"
                style={{
                  backgroundColor: "#090909",
                }}
                onClick={() => {
                  setDeleteData((prev) => ({ isOpen: false, id: "" }));
                }}
              />
              <UniversalButton
                label="Delete"
                variant="danger"
                style={
                  {
                    // backgroundColor: "red",
                  }
                }
                onClick={() => handleDelete()}
              />
            </div>
          </div>
        </div>
      </Dialog>
      {/* Delete SMPP Error Code End */}

      {/* Edit SMPP Error Code Start */}
      <Dialog
        header="Update Vendor Error Code Mapping"
        visible={smpperrorcodeedit}
        onHide={() => setSMPPErrorCodeEdit(false)}
        className="lg:w-[40rem] md:w-[30rem] w-[20rem]"
        draggable={false}
      >
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            <DropdownWithSearch
              label="Service"
              id="serviceedit"
              name="serviceedit"
              options={serviceOptions}
              value={updateForm?.vendor_service_id?.toString()}
              placeholder="Select Service"
              onChange={(val) => {
                if (!val) return;
                setUpdateForm((prev) => ({ ...prev, vendor_service_id: val }));
              }}
            />
            <InputField
              label="Vendor Error Code"
              id="vendorerrorcodeedit"
              name="vendorerrorcodeedit"
              placeholder="Enter Vendor Error Code"
              value={updateForm.vendor_error_code}
              onChange={(e) =>
                setUpdateForm((prev) => ({
                  ...prev,
                  vendor_error_code: e.target.value,
                }))
              }
            />
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            <InputField
              label="Vendor Error Status"
              id="vendorerrorstatusedit"
              name="vendorerrorstatusedit"
              placeholder="Vendor Error Status"
              value={updateForm.vendor_error_status}
              onChange={(e) =>
                setUpdateForm((prev) => ({
                  ...prev,
                  vendor_error_status: e.target.value,
                }))
              }
            />
            <UniversalTextArea
              label="Vendor Error Code Description"
              id="vendorerrorcodedescriptionedit"
              name="vendorerrorcodedescriptionedit"
              placeholder="Vendor Error Code Description"
              value={updateForm.vendor_error_code_description}
              onChange={(e) =>
                setUpdateForm((prev) => ({
                  ...prev,
                  vendor_error_code_description: e.target.value,
                }))
              }
            />
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            <DropdownWithSearch
              label="Display Type"
              options={displayTypeOptions}
              id="displaytypeedit"
              name="displaytypeedit"
              value={updateForm.type}
              onChange={(val) =>
                setUpdateForm((prev) => ({
                  ...prev,
                  type: val,
                  errorReasonTextContent: val,
                }))
              }
            />
            <DropdownWithSearch
              label="Display Reason"
              options={errorOptions}
              id="displayreasonedit"
              name="displayreasonedit"
              value={updateForm.display_reason}
              onChange={(val) => {
                setUpdateForm((prev) => ({
                  ...prev,
                  display_reason: val,
                }));
              }}
            />
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            <InputField
              label="Display Error Code"
              id="displayerrorcodeedit"
              name="displayerrorcodeedit"
              placeholder="Display Error Code"
              value={updateForm.display_reason}
              readOnly
            />
          </div>
          {/* <div className="">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="refundOnDelivery"
                className="form-checkbox"
              />
              <span className="text-sm">Refund For On Delivery Account</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="dndRefund"
                className="form-checkbox"
              />
              <span className="text-sm">DND Refund</span>
            </label>
          </div> */}

          <div className="flex justify-center">
            <UniversalButton
              label="Update"
              id="saveedit"
              name="saveedit"
              onClick={() => handleSaveEdit(updateForm)}
            />
          </div>
        </div>
      </Dialog>
      {/* Edit SMPP Error Code End */}
    </div>
  );
};

export default SMPPErrorCode;
