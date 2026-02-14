import React, { useState } from "react";
import { RadioButton } from "primereact/radiobutton";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// MUI MATERIAL
import { Switch } from "@mui/material";

// COMPONENTS
import InputField from "@/whatsapp/components/InputField";
import UniversalLabel from "@/whatsapp/components/UniversalLabel";
import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import UniversalButton from "@/whatsapp/components/UniversalButton";

// API
import { saveSMPP } from "@/apis/admin/admin";

const AddService = () => {
  const [versionaddStatus, setVersionAddStatus] = useState("disable");
  const [tpaddStatus, setTpAddStatus] = useState("disable");
  const [isFetching, setIsFetching] = useState(false);
  const navigate = useNavigate();

  const [data, setData] = useState({
    serviceName: "",
    webURL: "",
    userName: "",
    password: "",
    sendingPort: "",
    receiverPort: "",
    systemType: "SMPP",
    totalSocket: "",
    bindMode: "",
    numOfReceivers: "",
    senderPrefix: "",
    tpsValue: 0,
    orderQueueSize: 500,
    initialQueueSize: 500,
    triggerQueueSize: 300,
    windowSize: 200,
    DataCoding: "",
    Destination: "ton=0;npi=0;",
    ExpiryTime: "",
    Source: "ton=0;npi=0;",
    Version: "3.4",
    Registered: 1,
    protocol: "SMPP",
    messagePayload: "1",
  });

  // when version is 3.4 then pass messagepayload 1 and in 3.3 pass messagepayload 0

  const handleChangeVersionAddStatus = (event) => {
    setVersionAddStatus(event.target.value);
    setData({ ...data, Version: event.target.name });
  };
  const handleChangetpAddStatus = (event) => {
    setTpAddStatus(event.target.value);
    setData({ ...data, tpsValue: 0 });
  };

  const servicetypeoption = [
    { label: "Transactional", value: 1 },
    { label: "Promotional", value: 2 },
    { label: "International", value: 4 },
    { label: "Both", value: 3 },
  ];

  const handleAddService = (service) => {
    // console.log(service);
  };

  const dataencodingoption = [
    { label: "Default", value: "default" },
    { label: "SMSC Default Alphabet [0Bit]", value: "gsm7" },
    { label: "IA5 (CCITT T.50)/ASCII[1Bit]", value: "1" },
    { label: "LATIN 1 (ISO-8859-1) [3Bit]", value: "3" },
    { label: "OCTET [4BiT]", value: "4" },
    { label: "UCS2 (ISO-IEC-10646) [8Bit]", value: "8" },
    { label: "EXTENDED KANJI JIS (X 0212-1990) [13Bit]", value: "13" },
  ];

  const handleAddDataEncoding = (data) => {
    // console.log(data);
  };

  const bindmodeoption = [
    { label: "Transmitter", value: "0" },
    { label: "Receiver", value: "2" },
    { label: "Transceiver", value: "1" },
  ];

  const handleAddBindMode = (bind) => {
    // console.log(bind);
  };

  const totalsocketsaddoption = [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "5", value: "5" },
    { label: "6", value: "6" },
    { label: "7", value: "7" },
    { label: "8", value: "8" },
  ];

  const handleAddTotalSockets = (sockets) => {
    // console.log(sockets);
  };

  const sourceoption = [
    { label: "ton=0;npi=0;", value: "ton=0;npi=0;" },
    { label: "ton=0;npi=1;", value: "ton=0;npi=1;" },
    { label: "ton=0;npi=2;", value: "ton=0;npi=2;" },
    { label: "ton=0;npi=3;", value: "ton=0;npi=3;" },
    { label: "ton=0;npi=6;", value: "ton=0;npi=6;" },
    { label: "ton=0;npi=8;", value: "ton=0;npi=8;" },
    { label: "ton=0;npi=9;", value: "ton=0;npi=9;" },
    { label: "ton=0;npi=10;", value: "ton=0;npi=10;" },
    { label: "ton=0;npi=13;", value: "ton=0;npi=13;" },
    { label: "ton=0;npi=18;", value: "ton=0;npi=18;" },

    { label: "ton=1;npi=0;", value: "ton=1;npi=0;" },
    { label: "ton=1;npi=1;", value: "ton=1;npi=1;" },
    { label: "ton=1;npi=2;", value: "ton=1;npi=2;" },
    { label: "ton=1;npi=3;", value: "ton=1;npi=3;" },
    { label: "ton=1;npi=6;", value: "ton=1;npi=6;" },
    { label: "ton=1;npi=8;", value: "ton=1;npi=8;" },
    { label: "ton=1;npi=9;", value: "ton=1;npi=9;" },
    { label: "ton=1;npi=10;", value: "ton=1;npi=10;" },
    { label: "ton=1;npi=13;", value: "ton=1;npi=13;" },
    { label: "ton=1;npi=18;", value: "ton=1;npi=18;" },

    { label: "ton=2;npi=0;", value: "ton=2;npi=0;" },
    { label: "ton=2;npi=1;", value: "ton=2;npi=1;" },
    { label: "ton=2;npi=2;", value: "ton=2;npi=2;" },
    { label: "ton=2;npi=3;", value: "ton=2;npi=3;" },
    { label: "ton=2;npi=6;", value: "ton=2;npi=6;" },
    { label: "ton=2;npi=8;", value: "ton=2;npi=8;" },
    { label: "ton=2;npi=9;", value: "ton=2;npi=9;" },
    { label: "ton=2;npi=10;", value: "ton=2;npi=10;" },
    { label: "ton=2;npi=13;", value: "ton=2;npi=13;" },
    { label: "ton=2;npi=18;", value: "ton=2;npi=18;" },

    { label: "ton=3;npi=0;", value: "ton=3;npi=0;" },
    { label: "ton=3;npi=1;", value: "ton=3;npi=1;" },
    { label: "ton=3;npi=2;", value: "ton=3;npi=2;" },
    { label: "ton=3;npi=3;", value: "ton=3;npi=3;" },
    { label: "ton=3;npi=6;", value: "ton=3;npi=6;" },
    { label: "ton=3;npi=8;", value: "ton=3;npi=8;" },
    { label: "ton=3;npi=9;", value: "ton=3;npi=9;" },
    { label: "ton=3;npi=10;", value: "ton=3;npi=10;" },
    { label: "ton=3;npi=13;", value: "ton=3;npi=13;" },
    { label: "ton=3;npi=18;", value: "ton=3;npi=18;" },

    { label: "ton=4;npi=0;", value: "ton=4;npi=0;" },
    { label: "ton=4;npi=1;", value: "ton=4;npi=1;" },
    { label: "ton=4;npi=2;", value: "ton=4;npi=2;" },
    { label: "ton=4;npi=3;", value: "ton=4;npi=3;" },
    { label: "ton=4;npi=6;", value: "ton=4;npi=6;" },
    { label: "ton=4;npi=8;", value: "ton=4;npi=8;" },
    { label: "ton=4;npi=9;", value: "ton=4;npi=9;" },
    { label: "ton=4;npi=10;", value: "ton=4;npi=10;" },
    { label: "ton=4;npi=13;", value: "ton=4;npi=13;" },
    { label: "ton=4;npi=18;", value: "ton=4;npi=18;" },

    { label: "ton=5;npi=0;", value: "ton=5;npi=0;" },
    { label: "ton=5;npi=1;", value: "ton=5;npi=1;" },
    { label: "ton=5;npi=2;", value: "ton=5;npi=2;" },
    { label: "ton=5;npi=3;", value: "ton=5;npi=3;" },
    { label: "ton=5;npi=6;", value: "ton=5;npi=6;" },
    { label: "ton=5;npi=8;", value: "ton=5;npi=8;" },
    { label: "ton=5;npi=9;", value: "ton=5;npi=9;" },
    { label: "ton=5;npi=10;", value: "ton=5;npi=10;" },
    { label: "ton=5;npi=13;", value: "ton=5;npi=13;" },
    { label: "ton=5;npi=18;", value: "ton=5;npi=18;" },

    { label: "ton=6;npi=0;", value: "ton=6;npi=0;" },
    { label: "ton=6;npi=1;", value: "ton=6;npi=1;" },
    { label: "ton=6;npi=2;", value: "ton=6;npi=2;" },
    { label: "ton=6;npi=3;", value: "ton=6;npi=3;" },
    { label: "ton=6;npi=6;", value: "ton=6;npi=6;" },
    { label: "ton=6;npi=8;", value: "ton=6;npi=8;" },
    { label: "ton=6;npi=9;", value: "ton=6;npi=9;" },
    { label: "ton=6;npi=10;", value: "ton=6;npi=10;" },
    { label: "ton=6;npi=13;", value: "ton=6;npi=13;" },
    { label: "ton=6;npi=18;", value: "ton=6;npi=18;" },
  ];

  const handleAddSource = (source) => {
    // console.log(source);
  };
  const destinationoption = [
    { label: "ton=0;npi=0;", value: "ton=0;npi=0;" },
    { label: "ton=0;npi=1;", value: "ton=0;npi=1;" },
    { label: "ton=0;npi=2;", value: "ton=0;npi=2;" },
    { label: "ton=0;npi=3;", value: "ton=0;npi=3;" },
    { label: "ton=0;npi=6;", value: "ton=0;npi=6;" },
    { label: "ton=0;npi=8;", value: "ton=0;npi=8;" },
    { label: "ton=0;npi=9;", value: "ton=0;npi=9;" },
    { label: "ton=0;npi=10;", value: "ton=0;npi=10;" },
    { label: "ton=0;npi=13;", value: "ton=0;npi=13;" },
    { label: "ton=0;npi=18;", value: "ton=0;npi=18;" },

    { label: "ton=1;npi=0;", value: "ton=1;npi=0;" },
    { label: "ton=1;npi=1;", value: "ton=1;npi=1;" },
    { label: "ton=1;npi=2;", value: "ton=1;npi=2;" },
    { label: "ton=1;npi=3;", value: "ton=1;npi=3;" },
    { label: "ton=1;npi=6;", value: "ton=1;npi=6;" },
    { label: "ton=1;npi=8;", value: "ton=1;npi=8;" },
    { label: "ton=1;npi=9;", value: "ton=1;npi=9;" },
    { label: "ton=1;npi=10;", value: "ton=1;npi=10;" },
    { label: "ton=1;npi=13;", value: "ton=1;npi=13;" },
    { label: "ton=1;npi=18;", value: "ton=1;npi=18;" },

    { label: "ton=2;npi=0;", value: "ton=2;npi=0;" },
    { label: "ton=2;npi=1;", value: "ton=2;npi=1;" },
    { label: "ton=2;npi=2;", value: "ton=2;npi=2;" },
    { label: "ton=2;npi=3;", value: "ton=2;npi=3;" },
    { label: "ton=2;npi=6;", value: "ton=2;npi=6;" },
    { label: "ton=2;npi=8;", value: "ton=2;npi=8;" },
    { label: "ton=2;npi=9;", value: "ton=2;npi=9;" },
    { label: "ton=2;npi=10;", value: "ton=2;npi=10;" },
    { label: "ton=2;npi=13;", value: "ton=2;npi=13;" },
    { label: "ton=2;npi=18;", value: "ton=2;npi=18;" },

    { label: "ton=3;npi=0;", value: "ton=3;npi=0;" },
    { label: "ton=3;npi=1;", value: "ton=3;npi=1;" },
    { label: "ton=3;npi=2;", value: "ton=3;npi=2;" },
    { label: "ton=3;npi=3;", value: "ton=3;npi=3;" },
    { label: "ton=3;npi=6;", value: "ton=3;npi=6;" },
    { label: "ton=3;npi=8;", value: "ton=3;npi=8;" },
    { label: "ton=3;npi=9;", value: "ton=3;npi=9;" },
    { label: "ton=3;npi=10;", value: "ton=3;npi=10;" },
    { label: "ton=3;npi=13;", value: "ton=3;npi=13;" },
    { label: "ton=3;npi=18;", value: "ton=3;npi=18;" },

    { label: "ton=4;npi=0;", value: "ton=4;npi=0;" },
    { label: "ton=4;npi=1;", value: "ton=4;npi=1;" },
    { label: "ton=4;npi=2;", value: "ton=4;npi=2;" },
    { label: "ton=4;npi=3;", value: "ton=4;npi=3;" },
    { label: "ton=4;npi=6;", value: "ton=4;npi=6;" },
    { label: "ton=4;npi=8;", value: "ton=4;npi=8;" },
    { label: "ton=4;npi=9;", value: "ton=4;npi=9;" },
    { label: "ton=4;npi=10;", value: "ton=4;npi=10;" },
    { label: "ton=4;npi=13;", value: "ton=4;npi=13;" },
    { label: "ton=4;npi=18;", value: "ton=4;npi=18;" },

    { label: "ton=5;npi=0;", value: "ton=5;npi=0;" },
    { label: "ton=5;npi=1;", value: "ton=5;npi=1;" },
    { label: "ton=5;npi=2;", value: "ton=5;npi=2;" },
    { label: "ton=5;npi=3;", value: "ton=5;npi=3;" },
    { label: "ton=5;npi=6;", value: "ton=5;npi=6;" },
    { label: "ton=5;npi=8;", value: "ton=5;npi=8;" },
    { label: "ton=5;npi=9;", value: "ton=5;npi=9;" },
    { label: "ton=5;npi=10;", value: "ton=5;npi=10;" },
    { label: "ton=5;npi=13;", value: "ton=5;npi=13;" },
    { label: "ton=5;npi=18;", value: "ton=5;npi=18;" },

    { label: "ton=6;npi=0;", value: "ton=6;npi=0;" },
    { label: "ton=6;npi=1;", value: "ton=6;npi=1;" },
    { label: "ton=6;npi=2;", value: "ton=6;npi=2;" },
    { label: "ton=6;npi=3;", value: "ton=6;npi=3;" },
    { label: "ton=6;npi=6;", value: "ton=6;npi=6;" },
    { label: "ton=6;npi=8;", value: "ton=6;npi=8;" },
    { label: "ton=6;npi=9;", value: "ton=6;npi=9;" },
    { label: "ton=6;npi=10;", value: "ton=6;npi=10;" },
    { label: "ton=6;npi=13;", value: "ton=6;npi=13;" },
    { label: "ton=6;npi=18;", value: "ton=6;npi=18;" },
  ];

  const handleAddDestination = (destination) => {
    // console.log(destination);
  };
  const registereddeliveryoption = [
    { label: "No SMSC Delivery Receipt Requested", value: 0 },
    { label: "Delivery Success or Failure", value: 1 },
    { label: "Delivery Failure", value: 2 },
  ];

  const handleAddRegisteredDelivery = (delivery) => {
    // console.log(delivery);
  };
  const windowsizeoption = [
    { label: "10", value: 10 },
    { label: "25", value: 25 },
    { label: "50", value: 50 },
    { label: "100", value: 100 },
    { label: "150", value: 150 },
    { label: "200", value: 200 },
    { label: "250", value: 250 },
    { label: "500", value: 500 },
  ];

  const handleAddWindowSize = (windows) => {
    // console.log(windows);
  };

  async function handleSave() {
    setIsFetching(true);
    try {
      // for (const [key, value] of Object.entries(data)) {
      //   if (!value || value === "") {
      //     toast.error(`Please fill the ${key} field`);
      //     return;
      //   }
      // }
      let payload = { ...data };

      if (versionaddStatus === "enable") {
        // 3.3
        payload = { ...payload, Version: "3.3" };
        delete payload.messagePayload
      } else if (versionaddStatus === "disable") {
        // 3.4
        payload = {
          ...payload,
          Version: "3.4",
          messagePayload: data.messagePayload ? "1" : "0",
        };
      }
      const res = await saveSMPP(payload);
      if (!res?.status) {
        toast.error(res?.msg);
        return;
      }
      toast.success(res?.msg);
      navigate("/manageSMPP");
    } catch (e) {
      console.log(e);
    } finally {
      setIsFetching(false);
    }
  }

  return (
    <div className="space-y-2 bg-white p-2 rounded-2xl">
      <h2 className="text-lg font-semibold">SMPP Bind Settings :</h2>
      <div className="grid md:grid-cols-4 grid-cols-1 gap-4">
        <InputField
          label="Service Name"
          id="servicenameadd"
          name="servicenameadd"
          placeholder="Enter Service Name"
          value={data.serviceName}
          onChange={(e) => setData({ ...data, serviceName: e.target.value })}
        />

        <div className="flex items-start justify-between gap-4 mx-5">
          <div className="flex flex-col">
            <div className="">
              <UniversalLabel
                text="SMPP Version"
                id="versionadd"
                name="versionadd"
              />
            </div>
            <div className="flex gap-6 mt-3">
              {/* Option 1 */}
              <label
                htmlFor="versionaddOption1"
                className="flex items-center gap-2 text-gray-700 font-medium text-sm cursor-pointer"
              >
                <RadioButton
                  id="versionaddOption1"
                  name="3.3"
                  value="enable"
                  onChange={handleChangeVersionAddStatus}
                  checked={versionaddStatus === "enable"}
                />
                3.3
              </label>
              {/* Option 2 */}
              <label
                htmlFor="versionaddOption2"
                className="flex items-center gap-2 text-gray-700 font-medium text-sm cursor-pointer"
              >
                <RadioButton
                  id="versionaddOption2"
                  name="3.4"
                  value="disable"
                  onChange={handleChangeVersionAddStatus}
                  checked={versionaddStatus === "disable"}
                />
                3.4
              </label>
            </div>
          </div>
          {versionaddStatus === "disable" && (
            <div className="flex flex-col items-start">
              <label
                htmlFor="addMessagePayload"
                className="text-sm font-medium text-gray-700 mb-2"
              >
                Message Payload
              </label>

              <Switch
                checked={data?.messagePayload}
                onChange={(e) => {
                  setData((prev) => ({
                    ...prev,
                    messagePayload: e.target.checked,
                  }));
                }}
                sx={{
                  "& .MuiSwitch-switchBase.Mui-checked": {
                    color: "#34C759",
                  },
                  "& .css-161ms7l-MuiButtonBase-root-MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track":
                  {
                    backgroundColor: "#34C759",
                  },
                }
                }
              />
            </div>
          )}
        </div>
        {/* {versionaddStatus === "disable" && (
          <InputField
            label="Message Payload"
            id="messagePayload"
            name="messagePayload"
            placeholder="Enter message payload"
            value={data.messagePayload}
            onChange={(e) => setData({ ...data, messagePayload: e.target.value })}
            />
        )} */}

        <InputField
          label="Host URL or IP Address"
          id="hostadd"
          name="hostadd"
          placeholder="Enter Host URL or IP Address"
          value={data.webURL}
          onChange={(e) => setData({ ...data, webURL: e.target.value })}
        />
      </div>
      <div className="grid md:grid-cols-4 grid-cols-1 gap-4">
        <InputField
          label="User Name"
          id="usernameadd"
          name="usernameadd"
          placeholder="Enter User Name"
          value={data.userName}
          onChange={(e) => setData({ ...data, userName: e.target.value })}
        />
        <InputField
          label="Password"
          id="passwordadd"
          name="passwordadd"
          placeholder="Enter Password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <InputField
          label="Sending Port"
          id="sendingportadd"
          name="sendingportadd"
          placeholder="Enter Sending Port"
          value={data.sendingPort}
          onChange={(e) => setData({ ...data, sendingPort: e.target.value })}
        />
        <InputField
          label="Receiver Port"
          id="receiverportadd"
          name="receiverportadd"
          placeholder="Enter Receiver Port"
          value={data.receiverPort}
          onChange={(e) => setData({ ...data, receiverPort: e.target.value })}
        />
      </div>
      <h2 className="text-lg font-semibold">SMPP Server Settings :</h2>
      <div className="grid md:grid-cols-4 grid-cols-1 gap-4">
        <AnimatedDropdown
          label="Service Type"
          id="servicetypeadd"
          name="servicetypeadd"
          options={servicetypeoption}
          value={data.serviceType}
          onChange={(e) => setData({ ...data, serviceType: e })}
        />
        <AnimatedDropdown
          label="Data Encoding"
          id="dataencodingadd"
          name="dataencodingadd"
          options={dataencodingoption}
          value={data.DataCoding}
          onChange={(e) => setData({ ...data, DataCoding: e })}
        />
        <InputField
          label="System Type"
          id="systemtypeadd"
          name="systemtypeadd"
          placeholder="Enter System Type"
          value={data.systemType}
          onChange={(e) => setData({ ...data, systemType: e.target.value })}
        />
        <AnimatedDropdown
          label="Bind Mode"
          id="bindmodeadd"
          name="bindmodeadd"
          options={bindmodeoption}
          value={data.bindMode}
          onChange={(e) => setData({ ...data, bindMode: e })}
        />
      </div>
      <div className="grid md:grid-cols-4 grid-cols-1 gap-4">
        <AnimatedDropdown
          label="Total Sockets"
          id="totalsocketsadd"
          name="totalsocketsadd"
          placeholder="Enter Total Sockets"
          options={totalsocketsaddoption}
          value={data.totalSocket}
          onChange={(e) => {
            setData({ ...data, totalSocket: e });
          }}
        />
        <InputField
          label="Number of Receivers"
          id="receiversadd"
          name="receiversadd"
          placeholder="Enter Number of Receivers"
          value={data.numOfReceivers}
          onChange={(e) => setData({ ...data, numOfReceivers: e.target.value })}
        />
        <AnimatedDropdown
          label="Source TON-NPI"
          id="sourceadd"
          name="sourceadd"
          options={sourceoption}
          value={data.Source}
          onChange={(e) => {
            setData({ ...data, Source: e });
          }}
        />
        <AnimatedDropdown
          label="Destination TON-NPI"
          id="destinationadd"
          name="destinationadd"
          options={destinationoption}
          value={data.Destination}
          onChange={(e) => {
            setData({ ...data, Destination: e });
          }}
        />
      </div>
      <div className="grid md:grid-cols-4 grid-cols-1 gap-4">
        <AnimatedDropdown
          label="Registered Delivery"
          id="registereddeliveryadd"
          name="registereddeliveryadd"
          options={registereddeliveryoption}
          value={data.Registered}
          onChange={(e) => setData({ ...data, Registered: e })}
        />
        <InputField
          label="Sender Id Prefix"
          id="senderidprefixadd"
          name="senderidprefixadd"
          placeholder="Enter Sender Id Prefix"
          value={data.senderPrefix}
          onChange={(e) => setData({ ...data, senderPrefix: e.target.value })}
        />
        <InputField
          label="Expiry Time (in seconds)"
          id="expiryTime"
          name="expiryTime"
          placeholder="Enter Expiry Time"
          tooltipContent="1000: 1 second, 60000: 1 minute, 3600000: 1 hour"
          value={data.ExpiryTime}
          onChange={(e) => setData({ ...data, ExpiryTime: e.target.value })}
        />
        <AnimatedDropdown
          label="Window Size"
          id="windowsizeadd"
          name="windowsizeadd"
          placeholder="Enter Window Size"
          options={windowsizeoption}
          onChange={(e) => setData({ ...data, windowSize: e })}
          value={data.windowSize}
        />
        <div className="flex flex-col">
          <div className="">
            <h2 className="text-lg font-semibold">TPS:</h2>
          </div>
          <div className="flex gap-4 mt-3 w-1/3">
            {/* Option 1 */}
            <div className="flex items-center gap-2">
              <RadioButton
                inputId="tpaddOption1"
                name="tpaddredio"
                value="enable"
                onChange={handleChangetpAddStatus}
                checked={tpaddStatus === "enable"}
              />
              <label
                htmlFor="tpaddOption1"
                className="text-gray-700 font-medium text-sm cursor-pointer"
              >
                Yes
              </label>
            </div>
            {/* Option 2 */}
            <div className="flex items-center gap-2">
              <RadioButton
                inputId="tpaddOption2"
                name="tpaddredio"
                value="disable"
                onChange={handleChangetpAddStatus}
                checked={tpaddStatus === "disable"}
              />
              <label
                htmlFor="tpaddOption2"
                className="text-gray-700 font-medium text-sm cursor-pointer"
              >
                No
              </label>
            </div>
          </div>
        </div>
        {tpaddStatus === "enable" && (
          <InputField
            label="TPS "
            id="tpaddvalue"
            name="tpaddvalue"
            placeholder="Enter TPS Value"
            value={data.tpsValue}
            onChange={(e) => setData({ ...data, tpsValue: e.target.value })}
          />
        )}
      </div>

      <h2 className="text-lg font-semibold">Que Settings :</h2>
      <div className="grid md:grid-cols-4 grid-cols-1 gap-4">
        <InputField
          label="Order Size"
          id="ordersizeadd"
          name="ordersizeadd"
          placeholder="Enter Order Size"
          value={data.orderQueueSize}
          onChange={(e) => setData({ ...data, orderQueueSize: e.target.value })}
        />
        <InputField
          label="Initial Size"
          id="initialsizeadd"
          name="initialsizeadd"
          placeholder="Enter Initial Size"
          value={data.initialQueueSize}
          onChange={(e) =>
            setData({ ...data, initialQueueSize: e.target.value })
          }
        />
        <InputField
          label="Trigger Size"
          id="triggersizeadd"
          name="triggersizeadd"
          placeholder="Enter Trigger Size"
          value={data.triggerQueueSize}
          onChange={(e) =>
            setData({ ...data, triggerQueueSize: e.target.value })
          }
        />
      </div>
      <div className="flex justify-center items-center">
        <UniversalButton
          // label="Save"
          label={isFetching ? "Saving..." : "Save"}
          id="saveadd"
          name="saveadd"
          onClick={handleSave}
          disabled={isFetching}
        />
      </div>
    </div>
  );
};

export default AddService;
