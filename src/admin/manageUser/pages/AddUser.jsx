import React, { useState } from "react";
import { useEffect } from "react";
import { RadioButton } from "primereact/radiobutton";
import toast from "react-hot-toast";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { InputSwitch } from "primereact/inputswitch";
import { useLocation } from "react-router-dom";

// COMPONENTS
import InputField from "@/whatsapp/components/InputField";
import GeneratePassword from "@/whatsapp/components/GeneratePassword";
import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import UniversalDatePicker from "@/whatsapp/components/UniversalDatePicker";
import UniversalButton from "@/whatsapp/components/UniversalButton";
import UniversalLabel from "@/whatsapp/components/UniversalLabel";
import DropdownWithSearch from "@/whatsapp/components/DropdownWithSearch";

// API
import {
  addUser,
  getPincodeData,
  getSalesPersonList,
} from "@/apis/admin/admin";

const AddUser = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userid, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [userAccountManager, setUserAccountManager] = useState(null);
  const [expiryDate, setExpiryDate] = useState(new Date());
  const [userType, setUserType] = useState("3");
  const [selectedAccountManager, setSelectedAccountManager] = useState("");
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [accountUrl, setAccountUrl] = useState("");
  const [enablepostpaid, setEnablePostpaid] = useState("disable");
  const [pincodeOptions, setPincodeOptions] = useState([]);
  const [postpaidAmount, setPostpaidAmount] = useState(0);
  const [agentLimit, setAgentLimit] = useState("");
  const [creditLimit, setCreditLimit] = useState("");
  const [virtualBalance, setVirtualBalance] = useState(0);
  const [accountManager, setAccountManager] = useState([]);
  const [creatingUser, setCreatingUser] = useState(false);

  useEffect(() => {
    async function handleFetchAccountManager() {
      try {
        const res = await getSalesPersonList();

        const formattedData = Array.isArray(res?.data)
          ? res?.data?.map((item, index) => ({
            value: item?.SalesPersonId,
            label: item?.SalesPersonName,
          }))
          : [];
        setAccountManager(formattedData);
      } catch (e) {
        toast.error("Error fetching Account Manager List");
      }
    }

    handleFetchAccountManager();
  }, []);

  // Dropdown options
  const useroption = [
    { value: "1", label: "Reseller" },
    { value: "3", label: "User" },
    { value: "5", label: "Sales Person" },
    { value: "6", label: "Accountant" },
  ];

  useEffect(() => {
    setIsReadOnly(userType !== "2");
    setAccountUrl("");
  }, [userType]);
  useEffect(() => {
    const domain = window.location.hostname;
    setAccountUrl(domain);
  }, []);

  const handleChangeEnablePostpaid = (event) => {
    setEnablePostpaid(event.target.value);
  };

  async function handleAddUser() {
    // if (!userid) {
    //   toast.error("Please Enter User Id");
    //   return;
    // }
    // if (!/^[a-zA-Z0-9]+$/.test(userid)) {
    //   toast.error("User Id should be alphanumeric only");
    //   return;
    // }
    // if (!userPassword) {
    //   toast.error("Please Enter Password");
    //   return;
    // }
    // if (!userName) {
    //   toast.error("Please Enter First Name");
    //   return;
    // }
    // if (!userLastName) {
    //   toast.error("Please Enter Last Name");
    //   return;
    // }
    // if (!userPhoneNumber) {
    //   toast.error("Please Enter Mobile Number");
    //   return;
    // }
    // if (!expiryDate) {
    //   toast.error("Please Enter Expiry Date");
    //   return;
    // }
    // if (!userEmail) {
    //   toast.error("Please Enter Email Id");
    //   return;
    // }
    // if (!expiryDate) {
    //   toast.error("Please select expiry date");
    //   return;
    // }

    // if (!userPassword.length > 6 || !userPassword.length < 10) {
    //   toast.error("Password shoule be of 6 to 10 characters");
    //   return;
    // }

    // let userType1 = userType;
    // if (location?.state?.isSalesPerson) {
    //   userType1 = "5";
    // }

    let userType1 = userType;
    let applicationType = "1";
    let accountUrl1 = "";

    // check if salesperson was passed via location
    if (location?.state?.isSalesPerson) {
      userType1 = "5";
      applicationType = "1"; // salesperson
    } else {
      if (userType === "1") {
        // reseller
        userType1 = "1";
        applicationType = "2";
        accountUrl1 = accountUrl;
      } else if (userType === "3") {
        // direct user
        userType1 = "3";
        applicationType = "1";
      } else if (userType === "6") {
        userType1 = "6";
        applicationType = "1";
      } else if (userType === "5") {
        userType1 = "5";
        applicationType = "1";
      }
    }


    const data = {
      // srno: 0,
      userId: userid,
      domain: accountUrl1,
      status: 1,
      emailId: userEmail,
      mobileNo: userPhoneNumber,
      userType: userType1,
      password: userPassword,
      firstName: userName,
      lastName: userLastName,
      address: userAddress,
      companyName: companyName,
      country: country,
      state: state,
      city: city,
      pinCode: zipCode,
      virtualBalance: virtualBalance,
      // applicationType: userType == "1" ? "2" : "1",
      applicationType,
      expiryDate: moment(expiryDate).format("DD/MM/YYYY"),
      agentLimit: agentLimit,
      creditLimit: creditLimit || 0,
      salePersonId: selectedAccountManager || 0,
      accUsageTypeId: 0
    };
    setCreatingUser(true);

    try {
      const res = await addUser(data);
      if (!res?.msg.includes("successfully")) {
        toast.error(res?.msg);
        return;
      }
      toast.success("User Added Successfully");
      navigate("/manageuser");
    } catch (e) {
      toast.error("Error in Adding User");
    } finally {
      setCreatingUser(false);
    }
  }

  async function handleGetPincodeData(pincode) {
    if (!pincode || pincode?.length !== 6) return;
    try {
      const res = await getPincodeData(pincode);
      if (!res?.stateName) return;
      setCountry("India");
      setState(res.stateName);
      setCity(res.district);
    } catch (e) {
      toast.error("Error in Fetching Pincode Data");
    }
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md h-auto">
      <h1 className="mb-4 text-xl font-semibold">Login Info:</h1>
      <div className="flex items-center flex-wrap gap-4 mb-4">
        <div className="w-100">
          <InputField
            label="User ID *"
            id="userid"
            name="userid"
            placeholder="Enter your User ID"
            required
            value={userid}
            maxLength="8"
            // onChange={(e) => setUserId(e.target.value)}
            onChange={(e) => {
              const value = e.target.value;
              if (/^[a-zA-Z0-9]*$/.test(value)) {
                setUserId(value);
              }
            }}
          />
        </div>
        <div className="w-150">
          <GeneratePassword
            id="generatepassword"
            name="generatepassword"
            label="Password *"
            value={userPassword}
            onChange={(e) => setUserPassword(e)}
          />
        </div>
      </div>

      <h2 className="mt-6 mb-4 text-lg font-semibold">Personal Details:</h2>
      <div className="grid gap-4 lg:grid-cols-3 md:grid-cols-2">
        <InputField
          label="First Name *"
          id="firstname"
          name="firstname"
          placeholder="Enter your First Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <InputField
          label="Last Name *"
          id="lastname"
          name="lastname"
          placeholder="Enter your Last Name"
          value={userLastName}
          onChange={(e) => setUserLastName(e.target.value)}
          required
        />
        <InputField
          label="Email ID *"
          type="email"
          id="email"
          name="email"
          placeholder="Enter your Email ID"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          required
        />
        <InputField
          label="Mobile No. *"
          id="mobile"
          name="mobile"
          placeholder="Enter your Mobile No."
          value={userPhoneNumber}
          onChange={(e) => setUserPhoneNumber(e.target.value)}
        />
        <InputField
          label="Company Name"
          id="company"
          name="company"
          placeholder="Enter your Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <InputField
          label="Address"
          id="address"
          name="address"
          placeholder="Enter your Address"
          value={userAddress}
          onChange={(e) => setUserAddress(e.target.value)}
        />
        <InputField
          label="Pincode"
          id="pincode"
          name="pincode"
          placeholder="Enter your Pincode"
          value={zipCode}
          onChange={(e) => {
            setZipCode(e.target.value);
            handleGetPincodeData(e.target.value);
          }}
        />
        <InputField
          label="City"
          id="city"
          name="city"
          placeholder="Enter your City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          disabled={true}
        />
        <InputField
          label="State"
          id="state"
          name="state"
          placeholder="Enter your State"
          value={state}
          onChange={(e) => setState(e.target.value)}
          disabled={true}
        />
        <InputField
          label="Country"
          id="country"
          name="country"
          placeholder="Enter your Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          disabled={true}
        />
        <InputField
          label="Agent Limit"
          id="agentLimit"
          name="agentLimit"
          placeholder="Enter Agent Limit (no of agent)"
          value={agentLimit}
          onChange={(e) => setAgentLimit(e.target.value)}
        />
        {!location?.state?.isSalesPerson && userType === "1" && (
          <div className="flex items-center gap-2">
            <div className="flex flex-col gap-2 w-1/3">
              <label className="font-medium text-sm text-gray-600">
                Virtual Balance
              </label>
              <InputSwitch
                checked={virtualBalance === 1}
                // onChange={(e) => setVirtualBalance(e.value ? 1 : 0)}
                onChange={(e) => {
                  const value = e.value ? 1 : 0;
                  setVirtualBalance(value);
                  if (value === 0) {
                    setCreditLimit("");
                  }
                }}
                onLabel="Enabled"
                offLabel="Disabled"
                onIcon="pi pi-check"
                offIcon="pi pi-times"
                className="mt-1"
              />
            </div>
            {virtualBalance === 1 && (
              <div className="w-full">
                <InputField
                  label="Credit Limit"
                  id="creditLimit"
                  name="creditLimit"
                  placeholder="Enter credit Limit"
                  value={creditLimit}
                  onChange={(e) => setCreditLimit(e.target.value)}
                />
              </div>
            )}
          </div>
        )}
      </div>

      <h2 className="mt-6 mb-4 text-lg font-semibold">Account Details:</h2>
      <div className="flex items-center flex-wrap gap-4 mb-4 w-full">
        {!location?.state?.isSalesPerson && (
          <>
            <div className="md:w-56 w-full">
              <DropdownWithSearch
                label="User Type"
                id="userType"
                name="userType"
                options={useroption}
                value={userType}
                onChange={(selected) => {
                  setUserType(selected);
                }}
              />
            </div>

            {userType === "1" && (
              <div className="md:w-76 w-full">
                <InputField
                  label="Account URL"
                  id="accounturl"
                  name="accounturl"
                  placeholder="Enter URL"
                  value={accountUrl}
                  onChange={(e) => setAccountUrl(e.target.value)}
                />
              </div>
            )}

            {["1", "3", "6"].includes(userType) && (
              <div className="md:w-56 w-full">
                <DropdownWithSearch
                  label="Account Manager"
                  id="accountManager"
                  name="accountManager"
                  options={accountManager}
                  value={selectedAccountManager}
                  onChange={(selected) => {
                    setSelectedAccountManager(selected);
                  }}
                />
              </div>
            )}
          </>
        )}

        <div className="md:w-56 w-full">
          <UniversalDatePicker
            label="Expiry Date *"
            id="expiryDate"
            name="expiryDate"
            placeholder="Enter Expiry Date"
            value={expiryDate || new Date()}
            onChange={(newValue) => setExpiryDate(newValue)}
          />
        </div>
      </div>
      <div className="flex items-center justify-center">
        <UniversalButton
          disabled={creatingUser}
          label={creatingUser ? "Submiting..." : "Submit"}
          type="submit"
          id="submit"
          name="submit"
          className="mt-2"
          onClick={handleAddUser}
        />
      </div>
    </div>
  );
};

export default AddUser;
