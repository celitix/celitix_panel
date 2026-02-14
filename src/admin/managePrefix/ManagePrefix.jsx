import React, { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// COMPONENTS
import DropdownWithSearch from "@/whatsapp/components/DropdownWithSearch";
import UniversalButton from "@/whatsapp/components/UniversalButton";
import ManagePrefixTable from "./components/ManagePrefixTable";
import UniversalTextArea from "@/whatsapp/components/UniversalTextArea";
import InputField from "@/components/layout/InputField";
import UniversalSkeleton from "../components/UniversalSkeleton";

// API
import {
  addPrefix,
  getCountryList,
  getOperatorList,
  getPrefixList,
} from "@/apis/admin/admin";

const ManagePrefix = () => {
  const navigate = useNavigate();

  const [isFetching, setIsFetching] = useState(false);
  const [prefixadd, setPrefixAdd] = useState(false);
  const [addPrefixData, setAddPrefixData] = useState({
    operatorSrno: 0,
    circleSrno: 0,
    countrySrno: 0,
    prefix: [],
  });
  const [dropdownData, setDropdownData] = useState({
    operator: [],
    country: [],
  });
  const [searchData, setSearchData] = useState({
    country: "",
    operator: "",
  });
  const [data, setData] = useState([]);

  async function handleFetchOperatorList(srno) {
    try {
      const res = await getOperatorList(srno);
      if (!res?.length) {
        toast.error("No operators found for this country");
      }
      const mappedData = res?.map((item) => ({
        label: item.operatorName,
        value: item.srNo,
      }));
      setDropdownData((prev) => ({
        ...prev,
        operator: mappedData,
      }));
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong");
    }
  }
  async function handleFetchCountryList() {
    try {
      const res = await getCountryList();
      const mappedData = res?.map((item) => ({
        label: item.countryName,
        value: item.srNo,
      }));
      setDropdownData((prev) => ({
        ...prev,
        country: mappedData,
      }));
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong");
    }
  }

  async function handleSearch() {
    // if (!searchData.country && !searchData.operator) return
    if (!searchData.country) {
      toast.error("Please select country");
      return
    }
    if (!searchData.operator) {
      toast.error("Please select operator");
      return
    }
    try {
      setIsFetching(true);
      const res = await getPrefixList(searchData);
      const countryList = await getCountryList();

      if (!res?.length) {
        setData([]);
        return;
      }

      const countryMap = new Map(
        countryList.map((country) => [country.srNo, country.countryName])
      );

      const enrichedOperators = res?.map((operator) => ({
        ...operator,
        countryName: countryMap.get(operator.countrySrno) || null,
      }));

      const sortedData = enrichedOperators
        ?.filter((item) => item.countryName != null)
        .sort((a, b) => a.countryName.localeCompare(b.countryName));

      setData(sortedData);
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong");
    }
    finally {
      setIsFetching(false);
    }
  }

  useEffect(() => {
    // handleFetchOperatorList();
    // handleSearch();
    handleFetchCountryList();
  }, []);

  const handleAddOperator = () => {
    navigate("/addoperator");
  };

  const handleAddPrefix = () => {
    setPrefixAdd(true);
  };

  async function handleSavePrefix() {
    if (!addPrefixData.countrySrno) {
      return toast.error("Please select country");
    }
    if (!addPrefixData.operatorSrno) {
      return toast.error("Please select operator");
    }
    if (!String(addPrefixData.circleSrno)) {
      return toast.error("Please enter circle");
    }
    // if (!addPrefixData.prefix) {
    //   return toast.error("Please enter prefix");
    // }
    try {
      setIsFetching(true);
      const payload = {
        ...addPrefixData,
        prefix: addPrefixData.prefix.split(),
      };
      const res = await addPrefix(payload);
      if (!res?.flag) {
        return toast.error(res?.msg);
      }
      toast.success(res?.msg);
      setPrefixAdd(false);
      setAddPrefixData({});
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong");
    }
    finally {
      setIsFetching(false);
    }
  }

  return (
    <div>
      <h1 className="text-2xl text-gray-700 font-medium text-center my-2">Manage Prefix</h1>
      <div className="flex flex-wrap gap-2 items-end justify-between pb-3 w-full">
        <div className="flex flex-wrap gap-2 items-end">
          <div className="w-full md:w-56 ">
            <DropdownWithSearch
              label="Country"
              id="country"
              name="country"
              tooltipContent="Select a country to view its prefixes and operators."
              placeholder="Select Country"
              options={dropdownData.country}
              onChange={(e) => {
                setSearchData({ ...searchData, country: e });
                handleFetchOperatorList(e);
              }}
              value={searchData.country}
            />
          </div>
          <div className="md:w-56 w-full">
            <DropdownWithSearch
              label="Operator"
              id="operator"
              name="operator"
              tooltipContent="Select an operator to view its prefixes."
              placeholder="Select Operator"
              options={dropdownData.operator}
              onChange={(e) => {
                setSearchData({ ...searchData, operator: e });
              }}
              value={searchData.operator}
            />
          </div>
          <div className="w-max-content">
            <UniversalButton
              label={isFetching ? "Searching..." : "Search"}
              disabled={isFetching}
              id="searcherrorcode"
              name="searcherrorcode"
              onClick={handleSearch}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="w-max-content">
            <UniversalButton
              label="Manage Operator"
              id="addoperator"
              name="addoperator"
              onClick={handleAddOperator}
            />
          </div>
          <div className="w-max-content">
            <UniversalButton
              label="Add Prefix"
              id="addprefix"
              name="addprefix"
              onClick={handleAddPrefix}
            />
          </div>
        </div>
      </div>

      {/* ✅ Show Loader or Table */}
      {isFetching ? (
        <div className="w-full">
          <UniversalSkeleton height="35rem" width="100%" />
        </div>
      ) : (
        <div className="w-full">
          <ManagePrefixTable
            id="managePrefixTable"
            name="managePrefixTable"
            data={data}
            handleSearch={handleSearch}
          // isFetching={isFetching}
          />
        </div>
      )}

      <Dialog
        header="Add Prefix"
        visible={prefixadd}
        onHide={() => setPrefixAdd(false)}
        className="w-full md:w-1/2 lg:w-1/3"
        draggable={false}
      >


        <div className="space-y-4 w-full">
          <DropdownWithSearch
            label="Country"
            id="country"
            name="country"
            tooltipContent="Select a country to add prefix and get its operators."
            options={dropdownData.country}
            onChange={(e) => {
              setAddPrefixData({ ...addPrefixData, countrySrno: e });
              handleFetchOperatorList(e);
            }}
            value={addPrefixData.countrySrno}
          />

          <DropdownWithSearch
            label="Operator"
            id="operator"
            name="operator"
            tooltipContent="Select an operator to add prefix."
            options={dropdownData.operator}
            onChange={(e) => {
              setAddPrefixData({ ...addPrefixData, operatorSrno: e });
            }}
            value={addPrefixData.operatorSrno}
          />

          <InputField
            id="circle"
            name="circle"
            label="Circle"
            tooltipContent="Enter the circle code for the prefix. ex: 0, 1, 2, etc."
            value={addPrefixData.circleSrno}
            onChange={(e) => {
              setAddPrefixData({ ...addPrefixData, circle: e.target.value });
            }}
            placeholder="Enter Circle Code"
          />
          <small className="font-bold mb-2">
            Enter each prefix with sign and new line. ex: 123, 456, 789
          </small>
          <UniversalTextArea
            label="Prefix"
            id="prefixaddtext"
            name="prefixaddtext"
            tooltipContent="Enter each prefix comma separated ex: 123, 456, 789"
            placeholder="Enter Prefix"
            value={addPrefixData.prefix}
            onChange={(e) => {
              setAddPrefixData({ ...addPrefixData, prefix: e.target.value });
            }}
          />
          <div className="flex justify-center">
            <UniversalButton
              label={isFetching ? "Saveing..." : "Save"}
              disabled={isFetching}
              id="saveaddprefix"
              name="saveaddprefix"
              onClick={handleSavePrefix}
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ManagePrefix;
