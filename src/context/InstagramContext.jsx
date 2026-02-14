import { createContext, useContext, useState } from "react";

const InstagramContext = createContext();

export const InstagramProvider = ({ children }) => {
  const [chatState, setChatState] = useState([]);
  const [instagramData, setInstagramData] = useState({
    selectedAccount: "",
    accounts: [],
  });
  const [coversationType, setconversationType] = useState({
    active: [],
    inactive: []
  })
  const [selectedInstaChat, setSelectedInstaChat] = useState([]);
  const [instaChatData, setInstaChatData] = useState([]);

  return (
    <InstagramContext.Provider
      value={{
        chatState,
        setChatState,
        instagramData,
        setInstagramData,
        coversationType,
        setconversationType,
        selectedInstaChat,
        setSelectedInstaChat,
        instaChatData,
        setInstaChatData
      }}
    >
      {children}
    </InstagramContext.Provider>
  );
};

export const useInstagramContext = () => useContext(InstagramContext);