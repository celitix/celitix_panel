// context/WabaAgentContext.js
import { createContext, useContext, useState } from "react";

const WabaAgentContext = createContext();

export const WabaAgentProvider = ({ children }) => {
  const [wabaState, setWabaState] = useState({
    waba: [],
    selectedWaba: null,
    wabaSrno: null,
  });
  const [agentData, setAgentData] = useState(null);
  const [convoDetails, setConvoDetails] = useState(null);
  const [activeConvo, setActiveConvo] = useState(null);
  const [inactiveConvo, setInactiveConvo] = useState(null);
  const [initialChatState, setInititialChatState] = useState(null);
  const [agentInfo, setAgentInfo] = useState(null);
  const [switchChat, setSwitchChat] = useState(null);
  const [activeConvAgent, setActiveConvAgent] = useState(null);
  const [inActiveConvAgent, setInActiveConvAgent] = useState(null);

  //other states
  const [chatData, setChatData] = useState(null);
  const [selectedContextWaba, setSelectedContextWaba] = useState();
  const [agentSelected, setAgentSelected] = useState(false);

  function clearAllStates() {
    // setWabaData(null)
    // setAgentData(null)
    // setConvoDetails(null);
    // setActiveConvo(null);
    // setInactiveConvo(null);
    // setInititialChatState(null);
    // setSwitchChat(null);
    // setActiveConvAgent(null);
    // setInActiveConvAgent(null);
    // setChatData(null)
    // setSelectedContextWaba(null);
    // setAgentSelected(null);
  }

  return (
    <WabaAgentContext.Provider
      value={{
        // wabaData,
        wabaState,
        // setWabaData,
        setWabaState,
        agentData,
        setAgentData,
        chatData,
        setChatData,
        selectedContextWaba,
        setSelectedContextWaba,
        agentSelected,
        setAgentSelected,
        convoDetails,
        setConvoDetails,
        activeConvo,
        setActiveConvo,
        inactiveConvo,
        setInactiveConvo,
        initialChatState,
        setInititialChatState,
        agentInfo,
        setAgentInfo,
        switchChat,
        setSwitchChat,
        activeConvAgent,
        inActiveConvAgent,
        setActiveConvAgent,
        setInActiveConvAgent,
        clearAllStates,
      }}
    >
      {children}
    </WabaAgentContext.Provider>
  );
};

export const useWabaAgentContext = () => useContext(WabaAgentContext);
