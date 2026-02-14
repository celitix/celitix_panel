import React, { useState } from "react";
import { toast } from "react-hot-toast";

// ================================================APIS===================================================================
import { assignLeadSourceServiceToUser } from "@/apis/leadmanager/leadmanager";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

// ================================================COMPONENTS=============================================================
import DropdownWithSearch from "@/admin/components/DropdownWithSearch";
import InputField from "@/admin/components/InputField";
import UniversalButton from "@/admin/components/UniversalButton";

const ApiTemplateLeadSource = ({
  userSrNo,
  leadSourceSrno,
  leadSourceName,
}) => {
  const [callBackName, setCallBackName] = useState("");
  const [urlError, setUrlError] = useState("");

  const initialFormState = {
    selectedOption: "",
    url: "",
    userId: "",
    password: "",
    autharization: "no",
    authType: "",
    token: "",
    customHeader: "no",
    headers: [{ key: "", value: "" }],
  };

  const [form, setForm] = useState(initialFormState);

  const WEBENGAGE_FIELDS = ["url", "userId", "password"];

  const WEBHOOK_FIELDS = [
    "autharization",
    "authType",
    "token",
    "customHeader",
    "headers",
  ];

  const clearFields = (prev, fields) => {
    const updated = { ...prev };

    fields.forEach((field) => {
      if (Array.isArray(prev[field])) {
        updated[field] = [{ key: "", value: "" }];
      } else {
        updated[field] = "";
      }
    });

    return updated;
  };

  const resetForm = () => {
    setForm({
      ...initialFormState,
      headers: [{ key: "", value: "" }],
    });
  };

  const allowCallBackDlr = form.selectedOption === "webhook" ? 1 : 0;

  let authorizationType = "0";

  if (form.selectedOption === "webhook" && form.autharization === "yes") {
    if (form.authType === "basicAuth") authorizationType = "1";
    if (form.authType === "bearerToken") authorizationType = "2";
  }

  const isValidHttpUrl = (value) => {
    try {
      const url = new URL(value);
      return url.protocol === "http:" || url.protocol === "https:";
    } catch {
      return false;
    }
  };

  const handleSaveApiTemplate = async () => {
    try {
      const allowCallBackDlr = form.selectedOption === "webhook" ? 1 : 0;

      let authorizationType = "0";

      if (form.selectedOption === "webhook" && form.autharization === "yes") {
        if (form.authType === "basicAuth") authorizationType = "1";
        if (form.authType === "bearerToken") authorizationType = "2";
      }

      const customHeaderObj = {};
      form.headers.forEach((h) => {
        if (h.key && h.value) customHeaderObj[h.key] = h.value;
      });

      if (form.selectedOption === "webengage") {
        if (!form.url) {
          toast.error("WebEngage URL is required");
          return;
        }

        if (!isValidHttpUrl(form.url)) {
          toast.error(
            "Please enter a valid http or https URL in WebEngage URL!",
          );
          return;
        }
      }

      const payload = {
        userSrNo: userSrNo,
        leadSourceSrno: leadSourceSrno,
        type: "api",
        apiLeadSourceConfigPojo: {
          srno: 0,
          allowCallBackDlr,
          callBackDlrUrl: "",
          authorizationType,
          password: form.authType === "basicAuth" ? form.password : "",
          userId: form.authType === "basicAuth" ? form.userId : "",
          token: form.authType === "bearerToken" ? form.token : "",
          callBackType: leadSourceName,
          callBackName: callBackName,
          url: form.url || "",
          customHeader: customHeaderObj || "",
        },
      };

      const res = await assignLeadSourceServiceToUser(payload);
      console.log("Response of API:", res);
      resetForm();
      if (res?.success) {
        toast.success("Template assigned successfully" || res?.message);
      } else {
        toast.error(res?.message || "Failed to save");
      }

      console.log("Final API Payload:", payload);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-8">
      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="CallBack Name"
          placeholder="Enter CallBackName"
          value={callBackName}
          onChange={(e) => setCallBackName(e.target.value)}
        />
        <DropdownWithSearch
          label="Select Option"
          value={form.selectedOption}
          options={[
            { label: "WebHook", value: "webhook" },
            { label: "WebEngage", value: "webengage" },
          ]}
          onChange={(value) =>
            setForm((prev) => {
              let updated = { ...prev };

              if (prev.selectedOption === "webengage" && value === "webhook") {
                updated = clearFields(updated, WEBENGAGE_FIELDS);
              }

              if (prev.selectedOption === "webhook" && value === "webengage") {
                updated = clearFields(updated, WEBHOOK_FIELDS);
              }

              return {
                ...updated,
                selectedOption: value,
              };
            })
          }
        />
      </div>
      <div>
        {form.selectedOption === "webengage" && (
          <div className="mt-6 p-5 bg-gray-50 border border-gray-200 rounded-xl space-y-4">
            <InputField
              label="WebEngage URL"
              placeholder="https://api.webengage.com"
              value={form.url}
              error={!!urlError}
              helperText={urlError}
              onChange={(e) => {
                const value = e.target.value;

                setForm((prev) => ({ ...prev, url: value }));

                if (!value) {
                  setUrlError("");
                } else if (!isValidHttpUrl(value)) {
                  setUrlError("Please enter a valid http or https URL");
                } else {
                  setUrlError("");
                }
              }}
            />

            <InputField
              label="User ID"
              placeholder="Enter WebEngage User ID"
              value={form.userId}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  userId: e.target.value,
                }))
              }
            />

            <InputField
              label="Password"
              type="password"
              placeholder="Enter WebEngage Password"
              value={form.password}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
            />
          </div>
        )}
      </div>

      <div>
        {form.selectedOption === "webhook" && (
          <div className="mt-6  space-y-4 p-5 bg-gray-50 border border-gray-200 rounded-xl">
            <div>
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                WebHook Configuration
              </h3>
            </div>

            {/* Authorization */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Authorization Required?
              </label>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="webhookAuth"
                    value="yes"
                    checked={form.autharization === "yes"}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        autharization: e.target.value,
                      }))
                    }
                    className="accent-blue-600"
                  />
                  <span className="text-sm text-gray-700">Yes</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="webhookAuth"
                    value="no"
                    checked={form.autharization === "no"}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        autharization: e.target.value,
                      }))
                    }
                    className="accent-blue-600"
                  />
                  <span className="text-sm text-gray-700">No</span>
                </label>
              </div>

              {form.autharization === "yes" && (
                <div className="mt-5">
                  <DropdownWithSearch
                    label="Select Authorization Type"
                    value={form.authType}
                    options={[
                      { label: "Bearer Token", value: "bearerToken" },
                      { label: "Basic Auth", value: "basicAuth" },
                    ]}
                    onChange={(value) =>
                      setForm((prev) => ({ ...prev, authType: value }))
                    }
                  />
                </div>
              )}

              {form.authType === "bearerToken" && (
                <div className="mt-5">
                  <InputField
                    label="Token"
                    placeholder="Enter token"
                    value={form.token}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        token: e.target.value,
                      }))
                    }
                  />
                </div>
              )}

              {form.authType === "basicAuth" && (
                <div className="flex flex-col md:flex-row gap-5 mt-5">
                  <InputField
                    label="Username"
                    placeholder="Enter username"
                    value={form.userId}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, userId: e.target.value }))
                    }
                  />

                  <InputField
                    label="Password"
                    type="password"
                    placeholder="Enter password"
                    value={form.password}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }))
                    }
                  />
                </div>
              )}
            </div>

            {/* CustomHeader */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Custom Header
              </label>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="customHeader"
                    value="yes"
                    checked={form.customHeader === "yes"}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        customHeader: e.target.value,
                      }))
                    }
                    className="accent-blue-600"
                  />
                  <span className="text-sm text-gray-700">Yes</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="customHeader"
                    value="no"
                    checked={form.customHeader === "no"}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        customHeader: e.target.value,
                      }))
                    }
                    className="accent-blue-600"
                  />
                  <span className="text-sm text-gray-700">No</span>
                </label>
              </div>

              {form.customHeader === "yes" && (
                <div className="space-y-5 ">
                  {/* Header list */}
                  <div className="max-h-60 overflow-y-auto bg-gray-50 border border-gray-200 rounded-xl p-5 space-y-4 mt-5">
                    {form.headers.map((header, index) => (
                      <div key={index} className="">
                        <div className="flex flex-col md:flex-row gap-3 mt-5">
                          <InputField
                            label={index === 0 ? "Header Key" : ""}
                            placeholder="Enter API-KEY"
                            value={header.key}
                            onChange={(e) =>
                              setForm((prev) => {
                                const updated = [...prev.headers];
                                updated[index].key = e.target.value;
                                return { ...prev, headers: updated };
                              })
                            }
                          />
                          {/* <div className="flex gap-2 w-full"> */}
                            <InputField
                              label={index === 0 ? "Header Value" : ""}
                              placeholder="Enter value"
                              value={header.value}
                              onChange={(e) =>
                                setForm((prev) => {
                                  const updated = [...prev.headers];
                                  updated[index].value = e.target.value;
                                  return { ...prev, headers: updated };
                                })
                              }
                            />
                            {/* Remove Button */}
                            <button
                              type="button"
                              onClick={() =>
                                setForm((prev) => {
                                  const updated = prev.headers.filter(
                                    (_, i) => i !== index,
                                  );
                                  return {
                                    ...prev,
                                    headers: updated.length
                                      ? updated
                                      : [{ key: "", value: "" }],
                                  };
                                })
                              }
                              className=" p-2  mt-1 md:mt-5 text-red-500 hover:bg-red-100 rounded-full transition"
                            >
                               <CancelOutlinedIcon fontSize="small" />
                            </button>
                          {/* </div> */}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add Header Button */}
                  <div className="flex justify-end">
                    <UniversalButton
                      label=" Add Header"
                      onClick={() =>
                        setForm((prev) => ({
                          ...prev,
                          headers: [...prev.headers, { key: "", value: "" }],
                        }))
                      }
                    />
                  </div>
                </div>
              )}
            </div>

            {/* </div> */}
          </div>
        )}
      </div>

      <UniversalButton label="Save" onClick={handleSaveApiTemplate} />
    </div>
  );
};

export default ApiTemplateLeadSource;
