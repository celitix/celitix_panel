import React from "react";

// ICONS 
import { FaInstagram } from "react-icons/fa";
import { MdHistory } from "react-icons/md";
import { BsCameraReels } from "react-icons/bs";

// COMPONENTS
import CustomTabsMaterial from "../components/CustomTabsMaterial";
import InstaCreatePost from "./InstaCreatePost";
import InstaPostReel from "./InstaPostReel"
import CreateInstaStory from "./CreateInstaStory"

const PostContainer = () => {
  const tabsData = [
    {
      label: "POST",
      value: "post",
      icon: FaInstagram,
      content:
        <InstaCreatePost />,
    },
    {
      label: "STORY",
      value: "story",
      icon: MdHistory,
      content: <CreateInstaStory />

    },
    {
      label: "REEL",
      value: "reel",
      icon: BsCameraReels,
      content: <InstaPostReel />
    },
  ];
  return (
    <div>
      <CustomTabsMaterial tabsData={tabsData} defaultValue="post" />
    </div>
  );
};

export default PostContainer;
