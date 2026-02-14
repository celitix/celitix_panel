import React, { useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";

// ICONS
import { MdMenu } from "react-icons/md";
import { RiQuestionAnswerLine } from "react-icons/ri";
import { FaInstagram, FaRegCommentDots } from "react-icons/fa";
import {
  Square3Stack3DIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  ChatBubbleLeftEllipsisIcon,
} from "@heroicons/react/24/solid";

// APIS
import { instaUserList } from "@/apis/Instagram/Instagram";

// COMPONENTS
import IgMe from "./components/IgMe";
import IceBreaker from "./components/IceBreaker";
import PersistMenu from "./components/PersistMenu";
import WelcomeMsgAd from "./components/WelcomeMsgAd";
import CustomTabsMaterial from "../components/CustomTabsMaterial";
import DropdownWithSearch from "@/whatsapp/components/DropdownWithSearch";
import { useSettings } from "@/context/LiveChatSettingContext";


const InstaSettings = () => {
  const [instaUsers, setInstaUsers] = useState([]);
  // const [selectedInstaUser, setSelectedInstaUser] = useState(null);
  const { selectedInstaUser } = useSettings();
  const [selectedInstaUserDetails, setSelectedInstaUserDetails] = useState([]);

  const tabsData = [
    {
      label: "Persist Menu",
      value: "persistMenu",
      icon: MdMenu,
      content:
        <PersistMenu
          selectedInstaUser={selectedInstaUser}
          selectedInstaUserDetails={selectedInstaUserDetails}
        />,
    },
    {
      label: "Ice Breaker",
      value: "iceBreaker",
      icon: RiQuestionAnswerLine,
      content:
        <IceBreaker
          selectedInstaUser={selectedInstaUser}
          selectedInstaUserDetails={selectedInstaUserDetails}
        />,
    },
    // {
    //   label: "Instagram Referral",
    //   value: "igMe",
    //   icon: FaInstagram,
    //   content: <IgMe />,
    // },
    {
      label: "Welcome Message",
      value: "welcomeMessageAds",
      icon: FaRegCommentDots,
      content: <WelcomeMsgAd />,
    },
    // {
    //   label: "Settings",
    //   value: "settings",
    //   icon: Cog6ToothIcon,
    //   content: <SettingsComponent />,
    // },
  ];

  const fetchInstaUsers = async () => {
    try {
      const response = await instaUserList();
      if (response.statusCode === 200) {
        setInstaUsers(response.data);
      }
    } catch (error) {
      console.log("Error fetching insta users: ", error);
    }
  };

  useEffect(() => {
    fetchInstaUsers();
  }, []);

  useEffect(() => {
    if (selectedInstaUser && instaUsers.length > 0) {
      const details = instaUsers.find(
        (item) => item.instaUserId === selectedInstaUser
      );
      setSelectedInstaUserDetails(details);
    } else {
      setSelectedInstaUserDetails(null);
    }
  }, [selectedInstaUser, instaUsers]);

  const instaUserOptions = instaUsers?.map((user) => ({
    value: user.instaUserId,
    label: user.userName,
  }));

  console.log("Insta User Options: ", instaUserOptions);
  // return (
  //   <>
  //     <div className="border-2 h-[85vh] overflow-scroll">
  //       <div className="mb-5">
  //         <DropdownWithSearch
  //           id="istaUser"
  //           name="instaUser"
  //           label="Instagram User"
  //           placeholder="Select Instagram User"
  //           options={instaUserOptions}
  //           value={selectedInstaUser}
  //           onChange={(e) => setSelectedInstaUser(e)}
  //         />
  //       </div>
  //       <CustomTabsMaterial tabsData={tabsData} defaultValue="persistMenu" />
  //     </div>
  //   </>
  // );
  return (
    <div className="p-2 bg-gray-50 rounded-md h-[87vh]">
      {/* Header Section */}
      {/* <div className="mb-4 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-xl font-bold text-gray-800 mb-1">Instagram Automation</h1>
          <p className="text-gray-500 text-xs">Configure menus and automated responses for your profiles.</p>
        </div>

        <div className="w-full md:w-72">
          <DropdownWithSearch
            label="Select Profile"
            options={instaUserOptions}
            value={selectedInstaUser}
            onChange={(e) => setSelectedInstaUser(e)}
            placeholder="Choose an Instagram Account"
          />
        </div>
      </div> */}

      {/* Conditional Rendering */}
      {selectedInstaUser ? (
        <div className="animate-in fade-in duration-500 ">
          <CustomTabsMaterial tabsData={tabsData} defaultValue="persistMenu" />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full border border-gray-100 rounded-[2rem] bg-white shadow-inner relative overflow-hidden">
          {/* Subtle Background Decoration */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] opacity-70"></div>

          <div className="relative group">
            {/* Instagram Gradient Background for Icon */}
            <div className="absolute -inset-1 bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>

            <div className="relative p-6 bg-white rounded-full shadow-xl mb-6 border border-gray-50">
              <FaInstagram className="text-5xl text-[#E1306C]" /> {/* Official IG Pinkish-Red */}
            </div>
          </div>

          <div className="text-center px-6">
            <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight">
              Connect Your Profile
            </h3>
            <p className="text-gray-500 max-w-sm mx-auto mt-3 leading-relaxed">
              Select an Instagram account from the dropdown menu above to start configuring
              <span className="font-semibold text-gray-700"> Automation, Ice Breakers, </span>
              and <span className="font-semibold text-gray-700">Persistent Menus.</span>
            </p>
          </div>

          {/* Visual Cue */}
          <div className="mt-8 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#833ab4] animate-bounce">
            <div className="w-1 h-1 rounded-full bg-[#833ab4]"></div>
            Waiting for selection
            <div className="w-1 h-1 rounded-full bg-[#833ab4]"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstaSettings;
