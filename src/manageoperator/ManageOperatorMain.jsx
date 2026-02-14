import React, { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";

// Api
import {
  getCountryList,
  getOperatorList,
  getPrefixList,
  addPrefix,
} from "@/apis/admin/admin";

// Components
import DropdownWithSearch from "@/whatsapp/components/DropdownWithSearch";
import { DataTable } from "@/components/layout/DataTable";
import UniversalButton from "@/components/common/UniversalButton";
import InputField from "@/components/layout/InputField";
import UniversalTextArea from "@/whatsapp/components/UniversalTextArea";
import Tooltip from "@mui/material/Tooltip";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ManageOperatorMain = () => {
  const [countryList, setCountryList] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [operatorList, setOperatorList] = useState([]);
  const [selectedOperator, setSelectedOperator] = useState("");
  const [prefixList, setPrefixList] = useState([]);
  const [openAddPrefixDialog, setOpenAddPrefixDialog] = useState(false);
  const [formDetails, setFormDetails] = useState({});
  const navigate = useNavigate()


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
    const srNo = selectedCountry || formDetails?.countrySrno;
    try {
      const response = await getOperatorList(srNo);
      setOperatorList(response);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (selectedCountry || formDetails?.countrySrno) {
      fetchOperatorList();
    }
  }, [selectedCountry, formDetails?.countrySrno]);

  const CountryOptions = countryList.map((country) => ({
    label: country.countryName,
    value: country.srNo,
  }));

  const operatorOptions = operatorList?.map((op) => ({
    label: op.operatorName,
    value: op.srNo,
  }));

  const fetchPrefixList = async () => {
    const data = {
      country: selectedCountry,
      operator: selectedOperator,
    };
    try {
      const res = await getPrefixList(data);
      setPrefixList(res);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (selectedCountry && selectedOperator) {
      fetchPrefixList();
    }
  }, [selectedCountry, selectedOperator]);

  const handleAddPrefix = async () => {
    const data = {
      operatorSrno: formDetails?.operatorSrno,
      circleSrno: formDetails?.circleSrno,
      countrySrno: formDetails?.countrySrno,
      prefix: [formDetails?.prefix],
    };
    try {
      const res = await addPrefix(data);
      if (res?.flag) {
        toast.success(res?.msg);
        setOpenAddPrefixDialog(false);
        setFormDetails({})
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const columns = [
    { field: "sn", headerName: "S.No", flex: 0, minWidth: 80 },
    {
      field: "prefix",
      headerName: "Prefix",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "operatorSrno",
      headerName: "Operator Srno",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "circleSrno",
      headerName: "Circle SrNo",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "countrySrno",
      headerName: "Country Srno",
      flex: 1,
      minWidth: 120,
    },
  ];

  const rows = prefixList.map((pre, i) => ({
    id: i + 1,
    sn: i + 1,
    srNo: pre?.srNo,
    prefix: pre?.prefix,
    operatorSrno: pre?.operatorSrno,
    circleSrno: pre?.circleSrno,
    countrySrno: pre?.countrySrno,
  }));

//   /createoperator - route
  return (
    <div>
      <div className="flex justify-center items-center text-2xl font-semibold text-gray-700">
        Manage Operator
      </div>
      <div className="flex gap-4">
        <div className="md:w-64 w-full">
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
        {selectedCountry && (
          <div className="md:w-64 w-full">
            <DropdownWithSearch
              label="Operator List"
              id="operatorList"
              name="operatorList"
              placeholder="Enter Operator Name"
              value={selectedOperator}
              onChange={(e) => setSelectedOperator(e)}
              options={operatorOptions}
            />
          </div>
        )}
        <div className="mt-7">
          <UniversalButton
            label="Add Prefix"
            onClick={() => setOpenAddPrefixDialog(true)}
          />
        </div>
        <div className=" mt-7 ">
          <UniversalButton
            label="Create Operator"
            onClick={() => navigate("/createoperator")}
          />
        </div>
      </div>
      <div className="w-full my-4">
        <DataTable
          id="prefixList"
          name="prefixList"
          rows={rows}
          col={columns}
          getRowHeight={null}
        />
      </div>

      <Dialog
        header="Add prefix"
        visible={openAddPrefixDialog}
        onHide={() => setOpenAddPrefixDialog(false)}
        style={{ width: "520px" }}
        modal
        draggable={false}
        resizable={false}
      >
        <div className="flex flex-col gap-3">
          <div className="">
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
          {formDetails?.countrySrno && (
            <div className="">
              <DropdownWithSearch
                label="Operator List"
                id="operatorList"
                name="operatorList"
                placeholder="Enter Operator Name"
                value={formDetails?.operatorSrno}
                onChange={(option) =>
                  setFormDetails((prev) => ({
                    ...prev,
                    operatorSrno: option,
                  }))
                }
                options={operatorOptions}
              />
            </div>
          )}
          {/* for cicle srno - tooltip - Enter the circle code for the prefix. ex: 0, 1, 2, etc */}
          <div className="w-full">
            <InputField
              id="circleSrno"
              name="circleSrno"
              label="Circle SrNo"
              placeholder="Enter circle srno"
              tooltipContent="Enter the circle code for the prefix. ex: 0, 1, 2, etc"
              value={formDetails.circleSrno}
              onChange={(e) => {
                setFormDetails((prev) => ({
                  ...prev,
                  circleSrno: e.target.value,
                }));
              }}
            />
          </div>

          {/*for prefix tooltip -  Enter each prefix with sign and new line. ex: 123, 456, 789 */}
          <div className="w-full">
            <UniversalTextArea
              id="prefix"
              name="prefix"
              label="Prefix"
              tooltipContent="Enter each prefix with sign and new line. ex: 123, 456, 789"
              placeholder="Enter Prefix"
              value={formDetails?.prefix}
              onChange={(e) =>
                setFormDetails((prev) => ({
                  ...prev,
                  prefix: e.target.value,
                }))
              }
            />
          </div>

          <div className="flex items-center justify-center">
            <UniversalButton label="Save" onClick={handleAddPrefix} />
          </div>
        </div>
      </Dialog>
    </div>
  );
};

// getCountryList - admin.js - create a dropdown and place data value is srNo and label is countryName
// getOperatorList - admin.js - create a dropdown and call this api after selecting country from country dropdown label - operatorName, value - srNo
// getPrefixList - admin.js - call this api and pass the country dropdown value and the getOperatorList and display data in the datatable

// addPrefix - admin.js
// - create a button label - add prefix || and open a dialog and
// {
//     "operatorSrno": 307, -
//     "circleSrno": 0,
//     "countrySrno": 99,
//     "prefix": [
//         "123,233"
//     ]
// }

export default ManageOperatorMain;
