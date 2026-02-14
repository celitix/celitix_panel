import React, { useState } from "react";
import { Calendar } from "primereact/calendar";
import { RadioButton } from "primereact/radiobutton";
import { Dialog } from "primereact/dialog";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import { Button } from "@mui/material";
import { Switch } from "@mui/material";

// COMPONENTS
import UniversalLabel from "../components/UniversalLabel";
import CustomTooltip from "../components/CustomTooltip";
import UniversalButton from "../components/UniversalButton";
import InputField from "../components/InputField";
import CallingPreview from "./components/CallingPreview";


const WhatsappCalling = () => {
  const defaultWorkingHours = {
    Monday: { enabled: false, start: null, end: null },
    Tuesday: { enabled: false, start: null, end: null },
    Wednesday: { enabled: false, start: null, end: null },
    Thursday: { enabled: false, start: null, end: null },
    Friday: { enabled: false, start: null, end: null },
    Saturday: { enabled: false, start: null, end: null },
    Sunday: { enabled: false, start: null, end: null },
  };
  const [isEnabled, setIsEnabled] = useState(false); // default: Enable
  const [isEnabledsip, setIsEnabledSip] = useState(false); // default: Enable
  const [callHours, setCallHours] = useState(false); // default: Enable
  const [callHoliday, setCallHoliday] = useState(false); // default: Enable
  const [holidayDialog, setHolidayDialog] = useState(false);
  const [selectedHolidays, setSelectedHolidays] = useState([]);
  const [savedHolidays, setSavedHolidays] = useState([]);
  const [holidayTimes, setHolidayTimes] = useState({});
  const [visibility, setVisibility] = useState("hide"); // default: show
  const [callBack, setCallBack] = useState("disable"); // default: show
  const [workingHoursDialog, setWorkingHoursDialog] = useState(false);
  const [workingHours, setWorkingHours] = useState(defaultWorkingHours);
  const handleToggle = () => {
    setVisibility((prev) => (prev === "show" ? "hide" : "show"));
  };

  const handleToggleCallBack = () => {
    setCallBack((prev) => (prev === "enable" ? "Disable" : "enable"));
  };

  const handleHolidayDialogHide = () => {
    setHolidayDialog(false);
    setCallHoliday(false); // when dialog closed by X / outside, also set to Disable
  };

  const handleHolidaySave = () => {
    const result = selectedHolidays.map((d) => {
      const key = dayjs(d).format("YYYY-MM-DD");
      const data = holidayTimes[key];

      return {
        date: key,
        enabled: data.enabled,
        start: data.start ? dayjs(data.start).format("hh:mm A") : "-",
        end: data.end ? dayjs(data.end).format("hh:mm A") : "-",
      };
    });

    setSavedHolidays(result);
    setHolidayDialog(false); // Close dialog
  };

  // For calendar change (same logic you had inline)
  const handleHolidayCalendar = (e) => {
    const value = e.value || [];
    setSelectedHolidays(value);

    const updated = { ...holidayTimes };

    value.forEach((d) => {
      const key = dayjs(d).format("YYYY-MM-DD");
      if (!updated[key]) {
        updated[key] = {
          enabled: true,
          start: null,
          end: null,
        };
      }
    });

    setHolidayTimes(updated);
  };

  // Toggle ON/OFF for a single holiday row
  const toggleHoliday = (key) => {
    setHolidayTimes((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        enabled: !prev[key].enabled,
      },
    }));
  };

  // Update start/end time for a holiday row
  const updateHoliday = (key, field, value) => {
    setHolidayTimes((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [field]: value, // field = "start" | "end"
      },
    }));
  };

  return (
    <div className="space-y-6 overflow-y-auto max-h-screen pb-45 ">
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
        <div className="p-6 space-y-4 bg-white rounded-2xl shadow-lg border border-gray-200">
          {/* STATUS SECTION */}
          <div className="space-y-2">
            <UniversalLabel text="Status" />

            <div className="flex gap-4">
              {/* Enable */}
              <div className="flex items-center gap-2 border border-gray-300 rounded-md px-3 py-2 hover:bg-gray-50 transition cursor-pointer">
                <RadioButton
                  inputId="enableStatus"
                  name="status"
                  value={true}
                  onChange={() => setIsEnabled(true)}
                  checked={isEnabled === true}
                />
                <label
                  htmlFor="enableStatus"
                  className="text-gray-700 font-medium text-sm"
                >
                  Enable
                </label>
              </div>

              {/* Disable */}
              <div className="flex items-center gap-2 border border-gray-300 rounded-md px-3 py-2 hover:bg-gray-50 transition cursor-pointer">
                <RadioButton
                  inputId="disableStatus"
                  name="status"
                  value={false}
                  onChange={() => setIsEnabled(false)}
                  checked={isEnabled === false}
                />
                <label
                  htmlFor="disableStatus"
                  className="text-gray-700 font-medium text-sm"
                >
                  Disable
                </label>
              </div>
            </div>
          </div>

          {/* CALL VISIBILITY */}
          <div className="flex items-center justify-between border px-3 py-2 rounded-lg bg-gray-50">
            <span className="text-gray-800 text-sm font-semibold">
              Call Visibility
            </span>

            <CustomTooltip
              arrow
              placement="top"
              title={visibility === "show" ? "Hide" : "Show"}
            >
              <Switch
                checked={visibility === "show"}
                onChange={handleToggle}
                sx={{
                  "& .MuiSwitch-switchBase.Mui-checked": {
                    color: "#34C759",
                  },
                  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                    backgroundColor: "#34C759",
                  },
                }}
              />
            </CustomTooltip>
          </div>

          {/* CALL HOURS */}
          <div className="space-y-2">
            <UniversalLabel text="Call Hours Setting" />

            <div className="flex flex-wrap items-center gap-4">
              {/* Enable */}
              <div className="flex items-center gap-2 border border-gray-300 rounded-md px-3 py-2 hover:bg-gray-50 cursor-pointer">
                <RadioButton
                  inputId="callHoursEnable"
                  name="callHours"
                  value={true}
                  onChange={() => setCallHours(true)}
                  checked={callHours === true}
                />
                <label
                  htmlFor="callHoursEnable"
                  className="text-gray-700 font-medium text-sm"
                >
                  Enable
                </label>
              </div>

              {/* Disable */}
              <div className="flex items-center gap-2 border border-gray-300 rounded-md px-3 py-2 hover:bg-gray-50 cursor-pointer">
                <RadioButton
                  inputId="callHoursDisable"
                  name="callHours"
                  value={false}
                  onChange={() => setCallHours(false)}
                  checked={callHours === false}
                />
                <label
                  htmlFor="callHoursDisable"
                  className="text-gray-700 font-medium text-sm"
                >
                  Disable
                </label>
              </div>

              {/* Only when enabled */}
              {/* {callHours === true && ( */}
              <Button
                variant="contained"
                size="medium"
                sx={{
                  alignSelf: "flex-start",
                  backgroundColor: "#25D366",
                  fontWeight: 600,
                  textTransform: "none",
                  px: 3,
                  ":hover": { backgroundColor: "#1ebc59" },
                }}
                onClick={() => setWorkingHoursDialog(true)}
              >
                Configure Time
              </Button>
              {/* )} */}
            </div>

            {/* Working Hours Dialog */}
            <Dialog
              header="Working Hours"
              visible={workingHoursDialog}
              onHide={() => setWorkingHoursDialog(false)}
              className="w-200"
              draggable={false}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className="space-y-3 pt-2">
                  {Object.keys(workingHours).map((day, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-gray-50 shadow-sm border rounded-lg px-3 py-2"
                    >
                      {/* Day & Switch */}
                      <div className="flex items-center gap-3">
                        <Switch
                          checked={workingHours[day].enabled}
                          onChange={() =>
                            setWorkingHours((prev) => ({
                              ...prev,
                              [day]: {
                                ...prev[day],
                                enabled: !prev[day].enabled,
                              },
                            }))
                          }
                          sx={{
                            "& .MuiSwitch-switchBase.Mui-checked": {
                              color: "#34C759",
                            },
                            "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                            {
                              backgroundColor: "#34C759",
                            },
                          }}
                        />
                        <span className="text-blue-600 font-semibold text-sm">
                          {day}
                        </span>
                      </div>

                      {/* Time Pickers */}
                      {workingHours[day].enabled ? (
                        <div className="flex gap-2">
                          <TimePicker
                            value={workingHours[day].start}
                            onChange={(newTime) =>
                              setWorkingHours((prev) => ({
                                ...prev,
                                [day]: { ...prev[day], start: newTime },
                              }))
                            }
                            ampm
                            className="w-36 text-xs"
                          />
                          <TimePicker
                            value={workingHours[day].end}
                            onChange={(newTime) =>
                              setWorkingHours((prev) => ({
                                ...prev,
                                [day]: { ...prev[day], end: newTime },
                              }))
                            }
                            ampm
                            className="w-36 text-xs"
                          />
                        </div>
                      ) : (
                        <span className="text-gray-400 text-sm font-medium pr-3">
                          Closed
                        </span>
                      )}
                    </div>
                  ))}

                  {/* Save Button */}
                  <div className="flex justify-center mt-4">
                    <UniversalButton label="Save" />
                  </div>
                </div>
              </LocalizationProvider>
            </Dialog>
          </div>

          {/* HOLIDAY SECTION */}
          <div className="space-y-2">
            <UniversalLabel text="Holiday Settings" />

            <div className="flex items-center gap-4">
              {/* Enable */}
              <div className="flex items-center gap-2 border border-gray-300 rounded-md px-3 py-2 hover:bg-gray-50 cursor-pointer">
                <RadioButton
                  inputId="holidayEnable"
                  name="holiday"
                  value={true}
                  onChange={() => setCallHoliday(true)}
                  checked={callHoliday === true}
                />
                <label
                  htmlFor="holidayEnable"
                  className="text-gray-700 font-medium text-sm"
                >
                  Enable
                </label>
              </div>

              {/* Disable */}
              <div className="flex items-center gap-2 border border-gray-300 rounded-md px-3 py-2 hover:bg-gray-50 cursor-pointer">
                <RadioButton
                  inputId="holidayDisable"
                  name="holiday"
                  value={false}
                  onChange={() => setCallHoliday(false)}
                  checked={callHoliday === false}
                />
                <label
                  htmlFor="holidayDisable"
                  className="text-gray-700 font-medium text-sm"
                >
                  Disable
                </label>
              </div>

              {/* {callHoliday === true && ( */}
              <Button
                variant="contained"
                size="medium"
                sx={{
                  backgroundColor: "#25D366",
                  fontWeight: 600,
                  textTransform: "none",
                  px: 3,
                  ":hover": { backgroundColor: "#1ebc59" },
                }}
                onClick={() => setHolidayDialog(true)}
              >
                Configure Date
              </Button>
              {/* )} */}
            </div>

            {/* SAVED HOLIDAYS TABLE */}
            {savedHolidays.length > 0 && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Saved Holiday Schedule
                </h3>

                <table className="w-full border border-gray-300 text-sm rounded-lg overflow-hidden">
                  <thead className="bg-gray-100 text-gray-800">
                    <tr>
                      <th className="border p-2">Date</th>
                      <th className="border p-2">Start</th>
                      <th className="border p-2">End</th>
                      <th className="border p-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {savedHolidays.map((item, idx) => (
                      <tr key={idx}>
                        <td className="border p-2">
                          {dayjs(item.date).format("DD MMM YYYY")}
                        </td>
                        <td className="border p-2">{item.start}</td>
                        <td className="border p-2">{item.end}</td>
                        <td className="border p-2">
                          {item.enabled ? (
                            <span className="text-green-600 font-bold">ON</span>
                          ) : (
                            <span className="text-red-600 font-bold">OFF</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* HOLIDAY DIALOG */}
            <Dialog
              header="Select Holidays"
              visible={holidayDialog}
              onHide={handleHolidayDialogHide}
              className="w-150"
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className="space-y-4">
                  <Calendar
                    value={selectedHolidays}
                    onChange={handleHolidayCalendar}
                    selectionMode="multiple"
                    inline
                    className="w-full"
                  />

                  {/* Time Setup */}
                  <div className="space-y-3">
                    {selectedHolidays.map((d, idx) => {
                      const key = dayjs(d).format("YYYY-MM-DD");
                      const data = holidayTimes[key];

                      return (
                        <div
                          key={idx}
                          className="flex items-center justify-between border p-2 bg-gray-50 rounded-lg shadow-sm"
                        >
                          <div>
                            <span className="font-medium text-blue-600">
                              {dayjs(d).format("DD MMM YYYY")}
                            </span>

                            <Switch
                              checked={data.enabled}
                              onChange={() => toggleHoliday(key)}
                              sx={{
                                "& .MuiSwitch-switchBase.Mui-checked": {
                                  color: "#34C759",
                                },
                                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                                {
                                  backgroundColor: "#34C759",
                                },
                              }}
                            />
                          </div>

                          {data.enabled ? (
                            <div className="flex gap-2">
                              <TimePicker
                                value={data.start}
                                onChange={(t) => updateHoliday(key, "start", t)}
                                className="w-40"
                              />
                              <TimePicker
                                value={data.end}
                                onChange={(t) => updateHoliday(key, "end", t)}
                                className="w-40"
                              />
                            </div>
                          ) : (
                            <span className="text-gray-400 text-sm font-medium">
                              Closed
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex justify-center">
                    <UniversalButton label="Save" onClick={handleHolidaySave} />
                  </div>
                </div>
              </LocalizationProvider>
            </Dialog>
          </div>

          {/* CALLBACK */}
          <div className="flex items-center justify-between border p-2 rounded-lg bg-gray-50">
            <span className="text-gray-700 text-sm font-semibold">
              CallBack
            </span>

            <CustomTooltip
              arrow
              placement="top"
              title={callBack === "enable" ? "Disable" : "Enable"}
            >
              <Switch
                checked={callBack === "enable"}
                onChange={handleToggleCallBack}
                sx={{
                  "& .MuiSwitch-switchBase.Mui-checked": {
                    color: "#34C759",
                  },
                  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                    backgroundColor: "#34C759",
                  },
                }}
              />
            </CustomTooltip>
          </div>

          <div className="space-y-2">
            <div>
              <UniversalLabel text="SIP" />

              <div className="flex gap-4">
                {/* Enable */}
                <div className="flex items-center gap-2 border border-gray-300 rounded-md px-3 py-2 hover:bg-gray-50 transition cursor-pointer">
                  <RadioButton
                    inputId="enableSip"
                    name="sipStatus"
                    value={true}
                    onChange={() => setIsEnabledSip(true)}
                    checked={isEnabledsip === true}
                  />
                  <label
                    htmlFor="enableSip"
                    className="text-gray-700 font-medium text-sm"
                  >
                    Enable
                  </label>
                </div>

                {/* Disable */}
                <div className="flex items-center gap-2 border border-gray-300 rounded-md px-3 py-2 hover:bg-gray-50 transition cursor-pointer">
                  <RadioButton
                    inputId="disableSip"
                    name="sipStatus"
                    value={false}
                    onChange={() => setIsEnabledSip(false)}
                    checked={isEnabledsip === false}
                  />
                  <label
                    htmlFor="disableSip"
                    className="text-gray-700 font-medium text-sm"
                  >
                    Disable
                  </label>
                </div>
              </div>
            </div>

            {/* SHOW ONLY WHEN ENABLED */}
            {isEnabledsip === true && (
              <div className="space-y-4 mt-2">
                {/* Hostname + Port */}
                <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
                  <InputField label="Hostname" placeholder="Enter hostname" />
                  <InputField label="Port" placeholder="Enter port" />
                </div>

                {/* Params Label */}
                <UniversalLabel text="Request URL User Params" />

                {/* Params Inputs */}
                <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
                  <InputField placeholder="Enter value" label="Key1" />
                  <InputField placeholder="Enter value" label="Key1" />
                </div>
              </div>
            )}
          </div>
        </div>

        <div>
          <CallingPreview visibility={visibility} />
        </div>
      </div>

      <div className="flex justify-center items-center">
        <UniversalButton label="Save" />
      </div>
    </div>
  );
};

export default WhatsappCalling;
