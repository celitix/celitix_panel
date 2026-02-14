import React, { createContext, useContext, useState } from "react";

const LiveChatSettingContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [selectedInstaUser, setSelectedInstaUser] = useState(null);
  const [selectedWabaUser, setSelectedWabaUser] = useState(null);
  const [wabaUsers, setWabaUsers] = useState([]);

  return (
    <LiveChatSettingContext.Provider 
      value={{ 
        selectedInstaUser, 
        setSelectedInstaUser,
        selectedWabaUser,
        setSelectedWabaUser,
        wabaUsers,
        setWabaUsers
      }}
    >
      {children}
    </LiveChatSettingContext.Provider>
  );
};

export const useSettings = () => useContext(LiveChatSettingContext);