import { fetchAllTemplates, fetchTemplateDetails } from "@/apis/rcs/rcs";
import UniversalButton from "@/components/common/UniversalButton";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { HandleCampaignDetails } from "./temp-component/CampaignInputDetails";
import { VariableManager } from "./temp-component/VariableManager";
import { Preview } from "./temp-component/Preview";

export const TemplateNode = ({
  id,
  nodesInputData,
  setNodesInputData,
  details,
  setIsVisible,
  allVariables,
}: {
  id: number;
  nodesInputData: any;
  details: any;
  setNodesInputData: React.Dispatch<React.SetStateAction<{}>>;
  setIsVisible: React.Dispatch<React.SetStateAction<{}>>;
  allVariables: any[];
}) => {
  const [allTemplates, setAllTemplates] = useState([]);
  const [campaignDetails, setCampaignDetails] = useState({
    campaignName: "",
    templateSrno: "",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [templateDetails, setTemplateDetails] = useState([]);

  const [varLength, setVarLength] = useState(0);
  const [varList, setVarList] = useState([]);
  const [inputVariables, setInputVariables] = useState([]);

  const [btnvarLength, setBtnVarLength] = useState(0);
  const [btnvarList, setBtnVarList] = useState([]);
  const [btninputVariables, setBtnInputVariables] = useState([]);

  const [carVar, setCarVar] = useState({
    length: 0,
    data: {},
  });

  useEffect(() => {
    async function handleFetchAllTemplates() {
      const agentId = details?.selected;
      if (!agentId) return;
      try {
        // const res = await fetchAllTemplates(campaignDetails?.agent, 1);
        const res = await fetchAllTemplates(agentId, "1", "approved");
        const data = res?.Data?.find(
          (temp) => temp.templateName == nodesInputData?.[id]?.templateName
        );
        console.log(data, "data");
        console.log(details, "details");
        console.log(nodesInputData, "nodesinputdata");

        setCampaignDetails((prev) => ({
          ...prev,
          templateSrno: data?.srno,
        }));
        setAllTemplates(res?.Data);
      } catch (e) {
        console.log(e);
        toast.error("Something went wrong.");
      }
    }

    handleFetchAllTemplates();
  }, [details]);

  useEffect(() => {
    async function handleFetchTemplateDetails() {
      if (!campaignDetails?.templateSrno) return;
      try {
        const res = await fetchTemplateDetails(campaignDetails?.templateSrno);

        if (res.length !== 1) {
          setTemplateDetails([]);
          setBtnVarLength(0);
          setVarList([]);
          setVarLength(0);
          setBtnVarList([]);
          toast.error("Template not found.");
          return;
        }
        extractVariable(res);
        setTemplateDetails(res);
      } catch (e) {
        toast.error("Something went wrong.");
      }
    }
    handleFetchTemplateDetails();
  }, [campaignDetails]);

  function extractVariable(data) {
    if (!data || !Array.isArray(data)) return;

    if (data.length === 1) {
      let matchLength = 0;
      let matchBtnList = [];
      const content = data[0]?.content || "";
      console.log("data", data[0].suggestions);
      const suggestionVar = data[0]?.suggestions?.map((item) => {
        if (item?.type === "website") {
          const match = item?.suggestionValue.match(/{#(.+?)#}/g) || [];
          // setBtnVarLength(match.length);
          // setBtnVarList(match);
          matchLength += match.length;
          matchBtnList = [...matchBtnList, ...match];
        }
      });

      setBtnVarLength(matchLength);
      setBtnVarList(matchBtnList);
      const matches = content.match(/{#(.+?)#}/g) || [];

      setVarLength(matches.length);
      setVarList(matches);
    }

    if (data.length > 1) {
      const result = data.reduce(
        (acc, item, index) => {
          const content = item?.content || "";
          const matches = content.match(/{#(.+?)#}/g) || [];

          acc.totalLength += matches.length;
          acc.data[index] = matches;

          return acc;
        },
        { totalLength: 0, data: {} }
      );

      setCarVar({ length: result.totalLength, data: result.data });
    }
  }

  function mapVars(btn: string[], input: string[]) {
    let result: Record<string, string> = {};

    btn.forEach((v, i) => {
      // remove {# #} wrapper
      const key = v.replace(/[{#}]/g, "");
      result[key] = input[i] || "";
    });

    return result;
  }

  async function handleSave() {
    try {
      const tempName = allTemplates?.find(
        (temp) => temp.srno == campaignDetails?.templateSrno
      )?.templateName;

      const customBtnParams = mapVars(btnvarList, btninputVariables);

      const customInputParams = mapVars(varList, inputVariables);

      const customParams = { ...customBtnParams, ...customInputParams };

      setNodesInputData((prev) => ({
        ...prev,
        [id]: {
          ...prev[id],
          customParams: JSON.stringify(customParams),
          templateName: tempName,
        },
      }));
    } catch (e) {
      toast.error("Something went wrong.");
    } finally {
      setIsVisible(false);
    }
  }
  return (
    <>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 mt-5">
        <div className=" p-3 bg-gray-100 rounded-lg shadow-md lg:flex-1">
          <HandleCampaignDetails
            setCampaignDetails={setCampaignDetails}
            campaignDetails={campaignDetails}
            // allAgents={allAgents}
            allTemplates={allTemplates}
            setTemplateDetails={setTemplateDetails}
            setVarList={setVarList}
            setInputVariables={setInputVariables}
            setVarLength={setVarLength}
            setCarVar={setCarVar}
          />
          <VariableManager
            templateDetails={templateDetails}
            varLength={varLength}
            setVarList={setVarList}
            varList={varList}
            setInputVariables={setInputVariables}
            inputVariables={inputVariables}
            carVar={carVar}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            // carVarInput={carVarInput}
            // setCarVarInput={setCarVarInput}
            // headers={headers}
            // setHeaders={setHeaders}
            // selectedOption={selectedOption}
            btnvarLength={btnvarLength}
            setBtnVarList={setBtnVarList}
            btnvarList={btnvarList}
            setBtnInputVariables={setBtnInputVariables}
            btninputVariables={btninputVariables}
          />
        </div>

        <div className=" p-3 bg-gray-100 rounded-lg shadow-md lg:flex-1">
          <Preview
            templateDetails={templateDetails}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            inputVariables={inputVariables}
          />
        </div>
      </div>

      <div className="flex justify-center items-center mt-5">
        <UniversalButton
          id="handleSave"
          name="handleSave"
          label={"Save"}
          onClick={handleSave}
          style={{ width: "200px" }}
        />
      </div>
    </>
  );
};
