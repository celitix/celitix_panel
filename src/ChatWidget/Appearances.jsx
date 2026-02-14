import React, { useState } from "react";
import { motion } from "framer-motion";

// COMPONENTS
import General from "./components/General";
import Content from "./components/Content";
import VisibilityPosition from "./components/VisibilityPosition";
import Advanced from "./components/Advanced";
import MultiLang from "./components/MultiLang";
import useWidgetStore from "./stores/useWidgetStore";

const Appearances = () => {
  const {
    colors,
    selected,
    selectedActionColor,
    setSelected,
    setSelectedActionColor,
    previewImage,
    homeHeader,
    homeMessage,
    conversationStarters,
    minimizedValue,
    showMinimizedLabel,
    onlineStatus,
    offlineStatus,
    offlineTicket,
    privacyMsg,
    offlineTextMsg,
    preChatSurvey,
    surveyFields,
    showNewsLetter,
    emailIntroMsg,
    bgColor,
    textColor,
    buttonType,
    position,
    // visibilityOpen,
  } = useWidgetStore();

  //**************************************GENERAL*****************************************************/
  const [generalOpen, setGeneralOpen] = useState(true);
  // const [contentOpen, setContentOpen] = useState(true);

  //**************************** VISIBILITY AND POSITION ******************************************* */

  return (
    <div className="w-full p-6 relative space-y-10">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-medium">Appearance</h1>
        <p className="text-gray-500 text-sm">
          Customize your Chat Widget to catch your website visitors' attention
          or to fit the widget's appearance to your branding.
        </p>
      </div>

      {/* ***************************************GENERAL*************************************************************************** */}

      <General />

      {/* *****************************************CONTENT************************************************************************** */}

      <Content />

      {/* ***********************************************************VISIBILITY AND POSITION**************************************** */}
      <VisibilityPosition />

      {/* *************************************************MultiLanguage************************************************************** */}
      <MultiLang />

      {/* ******************************ADVANCE*************************************************************************************** */}
      <Advanced />
    </div>
  );
};

export default Appearances;
