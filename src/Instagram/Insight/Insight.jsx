import React, { useState, useEffect } from "react";
import { MultiSelect } from "primereact/multiselect";
import moment from "moment";
import { useNavigate } from "react-router-dom";

// ICONS
import { FaInstagram } from "react-icons/fa";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

// APIS
import {
  instaUserList,
  getPostMediaInsights,
  instaAccountInsights,
  getInstaAllPost,
} from "@/apis/instagram/Instagram";

// COMPONENTS
import FollowersChart from "@/instagram/Insight/components/FollowersChart";
import AudienceSection from "@/instagram/Insight/components/Audiences";
import AgeRangeInsights from "@/instagram/Insight/components/AgeRange";
import TopCitiesInsight from "@/instagram/Insight/components/TownCities";
import ProfileActivity from "@/instagram/Insight/components/ProfileActivity";
import AnimatedDropdown from "@/whatsapp/components/AnimatedDropdown";
import DropdownWithSearch from "@/whatsapp/components/DropdownWithSearch";
import HashtagSearch from "@/instagram/Insight/components/HashtagSearch";
import UniversalButton from "@/components/common/UniversalButton";
import CustomTabsMaterial from "@/instagram/components/CustomTabsMaterial";
import UniversalDatePicker from "../../whatsapp/components/UniversalDatePicker";

const Insight = () => {
  const tabsData = [
    {
      label: "Instagram Accounts Details",
      value: "account",
      icon: FaInstagram,
      content: <InsightAccount />,
    },
    {
      label: "Instagram Post Details",
      value: "post",
      icon: FaInstagram,
      content: <InsightPost />,
    },
  ];
  return (
    <div>
      <CustomTabsMaterial tabsData={tabsData} defaultValue="account" />
    </div>
  );
};

const InsightAccount = () => {
  const [selectedTab, setSelectedTab] = useState("7days");
  const [selectedContentType, setSelectedContentType] = useState("All");
  const [accountSelection, setAccountSelection] = useState(null);
  const [selectMedia, setSelectMedia] = useState(null);
  const [reelSelection, setReelSelection] = useState(null);
  const [imageSelection, setImageSelection] = useState(null);
  const [instaUsers, setInstaUsers] = useState([]);
  const [selectedMetrics, setSelectedMetrics] = useState([]);
  const [accountInsights, setAccountInsights] = useState([]);
  const [activeRange, setActiveRange] = useState("");
  const [activePeriod, setActivePeriod] = useState("");
  const [activeMetricType, setActiveMetricType] = useState("");
  const [activeBreakdown, setActiveBreakdown] = useState("");
  const metrics = [
    { name: "reach", code: "reach" },
    { name: "follower_count", code: "follower_count" },
    { name: "website_clicks", code: "website_clicks" },
    { name: "profile_views", code: "profile_views" },
    { name: "online_followers", code: "online_followers" },
    { name: "accounts_engaged", code: "accounts_engaged" },
    { name: "total_interactions", code: "total_interactions" },
    { name: "likes", code: "likes" },
    { name: "comments", code: "comments" },
    { name: "shares", code: "shares" },
    { name: "saves", code: "saves" },
    { name: "replies", code: "replies" },
    {
      name: "engaged_audience_demographics",
      code: "engaged_audience_demographics",
    },
    {
      name: "reached_audience_demographics",
      code: "reached_audience_demographics",
    },
    { name: "follower_demographics", code: "follower_demographics" },
    { name: "follows_and_unfollows", code: "follows_and_unfollows" },
    { name: "profile_links_taps", code: "profile_links_taps" },
    { name: "views", code: "views" },
    { name: "threads_likes", code: "threads_likes" },
    { name: "threads_replies", code: "threads_replies" },
    { name: "reposts", code: "reposts" },
    { name: "quotes", code: "quotes" },
    { name: "threads_followers", code: "threads_followers" },
    {
      name: "threads_follower_demographics",
      code: "threads_follower_demographics",
    },
    { name: "content_views", code: "content_views" },
    { name: "threads_views", code: "threads_views" },
    { name: "threads_clicks", code: "threads_clicks" },
    { name: "threads_reposts", code: "threads_reposts" },
  ];

  const stats = [
    { label: "Profile Visits", value: 1200 },
    { label: "Reach", value: 980 },
    { label: "Impressions", value: 3400 },
    { label: "Website Clicks", value: 76 },
  ];

  const tabs = ["7days", "30days", "90days"];
  const ContentTypes = ["All", "Followers", "Non-Followers"];

  const ContentTypeStats = [
    { label: "Stories", percent: 95.0, followers: 15, nonFollowers: 80 },
    { label: "Reels", percent: 2.9, followers: 1, nonFollowers: 1.9 },
    { label: "Posts", percent: 2.1, followers: 0.5, nonFollowers: 1.6 },
    { label: "Videos", percent: 0.0, followers: 0, nonFollowers: 0 },
  ];

  const TopContent = [
    {
      date: "26 Jun",
      views: "39K",
      type: "image",
      src: "https://images.unsplash.com/photo-1752867494500-9ea9322f58c9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      date: "15 Jul",
      views: "541",
      type: "image",
      src: "https://images.unsplash.com/photo-1682685797857-97de838c192e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      date: "12 Jul",
      views: "260",
      type: "video",
      src: "https://cdn.pixabay.com/video/2024/02/28/202368-918049003_large.mp4",
    },
    {
      date: "18 Jul",
      views: "232",
      type: "video",
      src: "https://videos.pexels.com/video-files/33005130/14067143_2560_1440_60fps.mp4",
    },
  ];

  useEffect(() => {
    const fetchInstaUserList = async () => {
      try {
        const response = await instaUserList();
        if (response?.statusCode === 200) setInstaUsers(response?.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchInstaUserList();
  }, []);

  // const handlePostMediaInsights = async () => {
  //   const data = {
  //     instaOffDetailSrno: accountSelection,
  //     postId: "17894266086403706",
  //     metric: ["shares", "comments", "likes", "saved", "total_interactions", "reach"],
  //     // metric: [
  //     //   "impressions", "shares", "comments", "plays", "likes",
  //     //   "saved", "replies", "total_interactions", "navigation",
  //     //   "follows", "profile_visits", "profile_activity", "reach",
  //     //   "ig_reels_video_view_total_time", "ig_reels_avg_watch_time",
  //     //   "clips_replays_count", "ig_reels_aggregated_all_plays_count",
  //     //   "views"
  //     // ],
  //     period: "lifetime",
  //     // breakdown: ["age", "gender"],
  //   };
  //   try {
  //     const response = await getPostMediaInsights(data);
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // };

  const handleInstaAccountInsights = async () => {
    const data = {
      instaOffDetailSrno: accountSelection,
      // metric: [
      //   "reach",
      //   "follower_count",
      //   "website_clicks",
      //   "profile_views",
      //   "online_followers",
      //   "accounts_engaged",
      //   "total_interactions",
      //   "likes",
      //   "comments",
      //   "shares",
      //   "saves",
      //   "replies",
      //   "engaged_audience_demographics",
      //   "reached_audience_demographics",
      //   "follower_demographics",
      //   "follows_and_unfollows",
      //   "profile_links_taps",
      //   "views",
      //   "threads_likes",
      //   "threads_replies",
      //   "reposts",
      //   "quotes",
      //   "threads_followers",
      //   "threads_follower_demographics",
      //   "content_views",
      //   "threads_views",
      //   "threads_clicks",
      //   "threads_reposts",
      // ],
      metric: selectedMetrics,
      period: activePeriod, // day, week, days_28, month, lifetime, total_over_range
      timeframe: activeRange, // last_14_days,last_30_days,last_90_days,prev_month,this_month,this_week
      metricType: activeMetricType, // total_value,time_series
      breakdown: activeBreakdown, // age,city,country,gender,follower_type,media_product_type,contact_button_type,follow_type
      since: 0,
      until: 0,
    };
    // based on metrics - accounts_engaged
    //  period: "day",
    // timeframe: "", // n/a
    // metricType: "", // total_value,
    // breakdown: ""  // n/a

    // based on metrics - comments
    //  period: "day",
    // timeframe: "", // n/a
    // metricType: "", // total_value,
    // breakdown: ""  // media_product_type

    // based on metrics - engaged_audience_demographics
    //  period: "lifetime",  //
    // timeframe: "", // last_14_days,last_30_days,last_90_days,prev_month,this_month,this_week
    // metricType: "", // total_value,
    // breakdown: ""  //  age,city,country,gender

    // based on metrics - follows_and_unfollows
    //  period: "day",  //
    // timeframe: "", // n/a
    // metricType: "", // total_value,
    // breakdown: ""  //  follow_type

    // based on metrics - follower_demographics
    //  period: "lifetime",  //
    // timeframe: "", // last_14_days,last_30_days,last_90_days,prev_month,this_month,this_week
    // metricType: "", // total_value,
    // breakdown: ""  //  age,city,country,gender

    // based on metrics - impressions
    //  period: "day",  //
    // timeframe: "", // n/a
    // metricType: "", // total_value,time_series
    // breakdown: ""  //  n/a

    // based on metrics - likes
    //  period: "day",  //
    // timeframe: "", // n/a
    // metricType: "", // total_value,
    // breakdown: ""  //  media_product_type

    // based on metrics - profile_links_taps
    //  period: "day",  //
    // timeframe: "", // n/a
    // metricType: "", // total_value,
    // breakdown: ""  //  contact_button_type

    // based on metrics - reach
    //  period: "day",  //
    // timeframe: "", // n/a
    // metricType: "", // total_value,time_series
    // breakdown: ""  //  media_product_type,follow_type

    // based on metrics - replies
    //  period: "day",  //
    // timeframe: "", // n/a
    // metricType: "", // total_value
    // breakdown: ""  //  n/a

    // based on metrics - saved
    //  period: "day",  //
    // timeframe: "", // n/a
    // metricType: "", // total_value
    // breakdown: ""  //  media_product_type

    // based on metrics - shares
    //  period: "day",  //
    // timeframe: "", // n/a
    // metricType: "", // total_value
    // breakdown: ""  //  media_product_type

    // based on metrics - total_interactions
    //  period: "day",  //
    // timeframe: "", // n/a
    // metricType: "", // total_value
    // breakdown: ""  //  media_product_type

    // based on metrics - views
    //  period: "day",  //
    // timeframe: "", // n/a
    // metricType: "", // total_value
    // breakdown: ""  //  follower_type,media_product_type

    try {
      const response = await instaAccountInsights(data);
      if (response.success) {
        setAccountInsights(response?.data);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const fetchAllInstaPost = async () => {
    const data = {
      instaOffDetailSrno: accountSelection,
      fromDate: "",
      toDate: "",
    };
    try {
      const response = await getInstaAllPost(data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (accountSelection) {
      // handlePostMediaInsights();
      fetchAllInstaPost();
    }
  }, [accountSelection]);

  const MediaSelection = [
    { label: "All", value: "all" },
    { label: "Posts", value: "posts" },
  ];

  const PostSelection = [
    { label: "Reels", value: "reels" },
    { label: "Image", value: "Image" },
  ];

  const ReelStats = [
    { label: "Reels1", value: "reels1" },
    { label: "Reels2", value: "reels2" },
    { label: "Reels3", value: "reels3" },
    { label: "Reels4", value: "reels4" },
    { label: "Reels5", value: "reels5" },
    { label: "Reels6", value: "reels6" },
    { label: "Reels7", value: "reels7" },
    { label: "Reels8", value: "reels8" },
    { label: "Reels9", value: "reels9" },
    { label: "Reels10", value: "reels10" },
  ];

  const ImageStats = [
    { label: "Image1", value: "Image1" },
    { label: "Image2", value: "Image2" },
    { label: "Image3", value: "Image3" },
    { label: "Image4", value: "Image4" },
    { label: "Image5", value: "Image5" },
    { label: "Image6", value: "Image6" },
    { label: "Image7", value: "Image7" },
    { label: "Image8", value: "Image8" },
    { label: "Image9", value: "Image9" },
    { label: "Image10", value: "Image10" },
  ];

  const accessToken = "YOUR_ACCESS_TOKEN";
  const userId = "YOUR_IG_USER_ID";

  const ranges = [
    "last_14_days",
    "last_30_days",
    "last_90_days",
    "prev_month",
    "this_month",
    "this_week",
  ];

  const [period, setPeriod] = useState(["day"]);

  useEffect(() => {
    if (
      selectedMetrics?.includes("engaged_audience_demographics") ||
      selectedMetrics?.includes("follower_demographics")
    ) {
      setPeriod(["day", "lifetime"]);
    } else {
      setPeriod(["day"]);
    }
  }, [selectedMetrics]);

  const [metricTypesOptions, setMetricTypesOptions] = useState(["total_value"]);

  useEffect(() => {
    if (
      selectedMetrics?.includes("reach") ||
      selectedMetrics?.includes("impressions")
    ) {
      setMetricTypesOptions(["total_value", "time_series"]);
    } else {
      setMetricTypesOptions(["total_value"]);
    }
  }, [selectedMetrics]);

  const [breakdownOptions, setBreakdownOptions] = useState([]);

  useEffect(() => {
    if (selectedMetrics?.includes("comments")) {
      setBreakdownOptions([
        "media_product_type",
        "age",
        "city",
        "country",
        "gender",
      ]);
    } else if (
      selectedMetrics?.includes("engaged_audience_demographics") ||
      selectedMetrics?.includes("follower_demographics")
    ) {
      setBreakdownOptions(["age", "city", "country", "gender"]);
    } else if (selectedMetrics?.includes("follows_and_unfollows")) {
      setBreakdownOptions(["follow_type"]);
    } else if (selectedMetrics?.includes("impressions")) {
      setBreakdownOptions(["total_value", "time_series"]);
    } else if (selectedMetrics?.includes("likes")) {
      setBreakdownOptions(["media_product_type"]);
    } else if (selectedMetrics?.includes("profile_links_taps")) {
      setBreakdownOptions(["contact_button_type"]);
    } else if (selectedMetrics?.includes("reach")) {
      setBreakdownOptions(["media_product_type", "follow_type"]);
    } else if (
      selectedMetrics?.includes("saved") ||
      selectedMetrics?.includes("shares") ||
      selectedMetrics?.includes("total_interactions")
    ) {
      setBreakdownOptions(["media_product_type"]);
    } else if (selectedMetrics?.includes("views")) {
      setBreakdownOptions(["follower_type", "media_product_type"]);
    } else {
      setBreakdownOptions(["total_value"]);
    }
  }, [selectedMetrics]);

  return (
    <>
      <div className="bg-gray-50  px-4 py-6 flex flex-row space-x-6 ">
        <div className="w-full md:w-66 ">
          <DropdownWithSearch
            label="Instagram Account"
            value={accountSelection}
            options={instaUsers.map((user) => ({
              label: user.userName,
              value: user.instaOffDetailSrNo,
            }))}
            onChange={setAccountSelection}
          />
        </div>

        {/* {accountSelection && (
          <div className="w-full md:w-66 ">
            <AnimatedDropdown
              label="Instagram Media"
              value={selectMedia}
              options={MediaSelection}
              onChange={setSelectMedia}
              className="w-56"
            />
          </div>
        )} */}

        <div className="w-70">
          <div>
            <p>Select metric:</p>
          </div>

          <MultiSelect
            value={selectedMetrics}
            onChange={(e) => setSelectedMetrics(e.value)}
            options={metrics}
            optionLabel="name"
            optionValue="code"
            filter
            placeholder="Select Metric"
            maxSelectedLabels={3}
            className="w-full md:w-20rem custom-multiselect mt-1"
          />
        </div>

        <div className="flex justify-center items-center mt-6">
          <UniversalButton
            label="Search"
            onClick={handleInstaAccountInsights}
          />
        </div>
        {/* {selectMedia === "posts" && (
          <>
            <div className="w-full md:w-66 ">
              <AnimatedDropdown
                label="Instagram Reels"
                value={reelSelection}
                options={ReelStats}
                onChange={setReelSelection}
                className="w-56"
              />
            </div>
            <div className="w-full md:w-66 ">
              <AnimatedDropdown
                label="Instagram Image"
                value={imageSelection}
                options={ImageStats}
                onChange={setImageSelection}
                className="w-56"
              />
            </div>
          </>
        )} */}
      </div>

      <div className="w-150 my-4">
        {(selectedMetrics?.includes("engaged_audience_demographics") ||
          selectedMetrics?.includes("follower_demographics")) && (
            <div className="flex flex-col gap-1">
              <p>Time Frame:</p>
              <div className="flex bg-gray-100 justify-center items-center px-2 rounded-xl py-1">
                <div className="flex flex-wrap gap-2">
                  {ranges.map((range) => (
                    <button
                      key={range}
                      onClick={() => setActiveRange(range)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-150
            ${activeRange === range
                          ? "bg-blue-600 text-white shadow-sm"
                          : "bg-white border border-gray-300 text-gray-600 hover:bg-gray-100"
                        }`}
                    >
                      {range.replaceAll("_", " ")}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

        {selectedMetrics.length > 0 && (
          <div className="flex flex-col gap-1 my-2">
            <p>Period:</p>
            <div className="flex bg-gray-100 justify-center items-center px-2 rounded-xl py-1">
              <div className="flex flex-wrap gap-2">
                {period.map((per) => (
                  <button
                    key={per}
                    onClick={() => setActivePeriod(per)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-150
            ${activePeriod === per
                        ? "bg-blue-600 text-white shadow-sm"
                        : "bg-white border border-gray-300 text-gray-600 hover:bg-gray-100"
                      }`}
                  >
                    {per.replaceAll("_", " ")}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedMetrics.length > 0 && (
          <div className="flex flex-col gap-1 my-2">
            <p>MetricTypes:</p>
            <div className="flex bg-gray-100 justify-center items-center px-2 rounded-xl py-1">
              <div className="flex flex-wrap gap-2">
                {metricTypesOptions.map((type) => (
                  <button
                    key={type}
                    onClick={() => setActiveMetricType(type)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-150
            ${activeMetricType === type
                        ? "bg-blue-600 text-white shadow-sm"
                        : "bg-white border border-gray-300 text-gray-600 hover:bg-gray-100"
                      }`}
                  >
                    {type.replaceAll("_", " ")}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedMetrics.length > 0 && (
          <div className="flex flex-col gap-1 my-2">
            <p>Breakdown :</p>
            <div className="flex bg-gray-100 justify-center items-center px-2 rounded-xl py-1">
              <div className="flex flex-wrap gap-2">
                {breakdownOptions.map((br) => (
                  <button
                    key={br}
                    onClick={() => setActiveBreakdown(br)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-150
            ${activeBreakdown === br
                        ? "bg-blue-600 text-white shadow-sm"
                        : "bg-white border border-gray-300 text-gray-600 hover:bg-gray-100"
                      }`}
                  >
                    {br.replaceAll("_", " ")}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className=" mx-auto px-4 py-6 space-y-6 bg-gray-50">
        {/* Tabs */}
        <div className="flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`px-4 py-2 rounded-full font-medium transition-colors text-sm
              ${selectedTab === tab
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800"
                }`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {/* {stats.map(({ label, value }) => (
            <div
              key={label}
              className="bg-white rounded-2xl shadow p-4 text-center"
            >
              <h4 className="text-sm text-gray-500">{label}</h4>
              <p className="text-xl font-semibold">{value}</p>
            </div>
          ))} */}
          {accountInsights?.data?.map((acc, i) => (
            <div
              key={i}
              className="border border-gray-200 p-3 rounded-xl shadow-lg"
            >
              <p className="font-semibold mb-2">{acc?.name}</p>

              <div className="flex justify-between gap-4">
                {acc?.values?.map((val, idx) => (
                  <div key={idx} className="flex flex-col">
                    <p className="text-lg font-medium">{val?.value}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(val?.end_time).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
              <p className="font-semibold mt-4">
                Title: <span className="font-normal text-sm">{acc?.title}</span>
              </p>
              <p className="font-semibold mb-2">
                Description:{" "}
                <span className="font-normal text-sm">{acc?.description}</span>
              </p>
            </div>
          ))}
        </div>

        {/* Chart Section */}

        <div className="bg-white w-full p-6 rounded-2xl shadow">
          <h3 className="text-lg font-semibold mb-4">Follower Growth</h3>
          <div className="w-full overflow-x-auto">
            <div className="min-w-[320px] flex items-center justify-center">
              <FollowersChart
                selectedTab={selectedTab}
                width="100%"
                height={200}
              />
            </div>
          </div>
        </div>

        {/* Content Type Stats Section */}
        <div className="bg-white p-6 rounded-2xl shadow  mt-4">
          <h2 className="text-lg font-semibold mb-3">By Content Type</h2>
          <div className="flex gap-2">
            {ContentTypes.map((ContentTypes) => (
              <button
                key={ContentTypes}
                onClick={() => setSelectedContentType(ContentTypes)}
                className={`px-4 py-2 rounded-full font-medium transition-colors text-sm 
              ${selectedContentType === ContentTypes
                    ? "bg-blue-600 text-white "
                    : "bg-gray-200 text-gray-800 "
                  }`}
              >
                {ContentTypes.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="mt-6 space-y-4">
            {ContentTypeStats.map(
              ({ label, percent, followers, nonFollowers }) => (
                <div key={label}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-700 font-medium">
                      {label}
                    </span>
                    <span className="text-sm text-gray-600">{percent}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 flex overflow-hidden">
                    <div
                      className="bg-[#9431A8] h-full"
                      style={{ width: `${followers}%` }}
                    ></div>
                    <div
                      className="bg-[#8D4EDB] h-full"
                      style={{ width: `${nonFollowers}%` }}
                    ></div>
                  </div>
                </div>
              ),
            )}

            <div className="text-xs text-gray-500 flex justify-end gap-4 mt-2 pr-1">
              <div className="flex items-center gap-1">
                <span className="w-3 h-3 bg-pink-500 rounded-full inline-block" />
                Followers
              </div>
              <div className="flex items-center gap-1">
                <span className="w-3 h-3 bg-purple-600 rounded-full inline-block" />
                Non-followers
              </div>
            </div>
          </div>

          {/* Top ContentType section */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold">By Top Content</h2>
              <button className="text-sm text-blue-600 font-medium">
                See All
              </button>
            </div>

            <div className="flex gap-3 overflow-x-auto pb-2">
              {TopContent.map(({ date, views, type, src }, index) => (
                <div
                  key={index}
                  className="relative w-28 h-48 rounded-xl overflow-hidden bg-gray-200 flex-shrink-0"
                >
                  {type === "video" ? (
                    <video
                      src={src}
                      className="object-contain w-full h-full"
                      controls
                      preload="metadata"
                    />
                  ) : (
                    <img
                      src={src}
                      alt="top content"
                      className="object-contain w-full h-full"
                    />
                  )}
                  <div className="absolute bottom-0 w-full bg-black bg-opacity-50 text-white text-sm text-center py-1">
                    {views}
                  </div>
                  <div className="absolute bottom-0 left-0 text-[10px] text-white p-1">
                    {date}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AudienceSection  */}
          <div className="flex flex-wrap gap-4 mt-6">
            <h2 className="text-lg font-semibold  ">Audiences </h2>
            <div className="mt-6 w-full flex flex-row gap-4">
              <div className="card bg-white rounded-2xl shadow p-4  gap-2  w-[50%]">
                <AudienceSection />
              </div>
              <div className="card bg-white rounded-2xl shadow p-4 gap-2 w-[50%] ">
                <AgeRangeInsights />
              </div>
              <div className="card bg-white rounded-2xl shadow p-4 gap-2 w-[50%] ">
                <TopCitiesInsight />
              </div>
            </div>
          </div>

          {/* Profile active section */}
          <div>
            <ProfileActivity
              data={{
                total: 472,
                visits: 462,
                visitGrowth: 3.8,
                linkTaps: 10,
                linkGrowth: 100,
              }}
            />

            <ProfileActivity />
          </div>
        </div>
      </div>

      {/* <div className="min-h-screen bg-gray-100 p-6">
        <HashtagSearch accessToken={accessToken} userId={userId} />
      </div> */}
    </>
  );
};

const InsightPost = () => {
  const [instaUsers, setInstaUsers] = useState([]);
  const [accountSelection, setAccountSelection] = useState(null);
  const [instaAllPost, setAllInstaPost] = useState([]);
  const [postFromDate, setPostFromDate] = useState("");
  const [postToDate, setPostToDate] = useState("");
  const [postType, setPostType] = useState("ALL");
  const [mediaType, setMediaType] = useState("ALL");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInstaUserList = async () => {
      try {
        const response = await instaUserList();
        if (response?.statusCode === 200) setInstaUsers(response?.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchInstaUserList();
  }, []);

  const fetchAllInstaPost = async () => {
    const data = {
      instaOffDetailSrno: accountSelection,
      fromDate: postFromDate ? moment(postFromDate).format("YYYY-MM-DD") : "",
      toDate: postToDate ? moment(postToDate).format("YYYY-MM-DD") : "",
    };
    try {
      const response = await getInstaAllPost(data);
      setAllInstaPost(response?.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const RedirectPost = (post) => {
    navigate("/postdetailsinsights", {
      state: { postData: post, accountSelection: accountSelection },
    });
  };

  const filteredInstaData = instaAllPost.filter((post) => {
    const postTypeMatch =
      postType === "ALL" || post?.post?.postType === postType;

    const mediaTypeMatch =
      mediaType === "ALL" || post?.post?.mediaType === mediaType;

    return postTypeMatch && mediaTypeMatch;
  });

  const [carouselIndex, setCarouselIndex] = useState({});
  const nextSlide = (postId, length) => {
    setCarouselIndex((prev) => ({
      ...prev,
      [postId]:
        prev[postId] === undefined || prev[postId] === length - 1
          ? 0
          : prev[postId] + 1,
    }));
  };

  const prevSlide = (postId, length) => {
    setCarouselIndex((prev) => ({
      ...prev,
      [postId]:
        prev[postId] === undefined || prev[postId] === 0
          ? length - 1
          : prev[postId] - 1,
    }));
  };

  return (
    <div>
      <div className="bg-gray-50 px-4 py-6 flex md:flex-row flex-col space-x-6 ">
        <div className="w-full md:w-66 ">
          <DropdownWithSearch
            label="Instagram Account"
            value={accountSelection}
            options={instaUsers.map((user) => ({
              label: user.userName,
              value: user.instaOffDetailSrNo,
            }))}
            onChange={setAccountSelection}
          />
        </div>
        <div className="w-full md:w-66 ">
          <UniversalDatePicker
            id="fromDate"
            name="fromDate"
            label="From Date:"
            value={postFromDate}
            onChange={(value) => setPostFromDate(value)}
            placeholder="dd-mm-yy"
            tooltipContent="From"
            tooltipPlacement="right"
          />
        </div>
        <div className="w-full md:w-66 ">
          <UniversalDatePicker
            id="toDate"
            name="toDate"
            label="To Date:"
            value={postToDate}
            onChange={(value) => setPostToDate(value)}
            placeholder="dd-mm-yy"
            tooltipContent="From"
            tooltipPlacement="right"
          />
        </div>
        <div className="w-full md:w-66 ">
          <DropdownWithSearch
            label="Post Type"
            value={postType}
            options={["ALL", "FEED", "REEL"].map((post) => ({
              label: post,
              value: post,
            }))}
            onChange={setPostType}
          />
        </div>
        <div className="w-full md:w-66 ">
          <DropdownWithSearch
            label="Media Type"
            value={mediaType}
            options={["ALL", "IMAGE", "VIDEO", "CAROUSEL_ALBUM"].map(
              (media) => ({
                label: media,
                value: media,
              }),
            )}
            onChange={setMediaType}
          />
        </div>
        <div className="flex justify-center items-center mt-6">
          <UniversalButton label="Search" onClick={fetchAllInstaPost} />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredInstaData?.map((post, i) => (
          <div
            key={`${i}`}
            className="relative w-full h-64 overflow-hidden rounded-xl bg-gray-100 group"
          >
            {post?.post?.mediaType === "IMAGE" && (
              <img
                src={post?.media[0]?.mediaUrl}
                alt="post"
                className="w-full h-full object-contain"
              />
            )}

            {post?.post?.mediaType === "VIDEO" && (
              <video className="w-full h-full object-contain" controls muted loop>
                <source src={post?.media[0]?.mediaUrl} type="video/mp4" />
              </video>
            )}

            {post?.post?.mediaType === "CAROUSEL_ALBUM" && (
              <div className="relative w-full h-full group">
                {post?.media?.map((mediaItem, index) =>
                  index === (carouselIndex[post.post.postId] || 0) ? (
                    <div key={index} className="w-full h-full">
                      {mediaItem?.mediaType === "IMAGE" && (
                        <img
                          src={mediaItem?.mediaUrl}
                          alt="post"
                          className="w-full h-full object-contain"
                        />
                      )}

                      {mediaItem?.mediaType === "VIDEO" && (
                        <video
                          className="w-full h-full object-contain"
                          controls
                          muted
                          loop
                        >
                          <source src={mediaItem?.mediaUrl} type="video/mp4" />
                        </video>
                      )}
                    </div>
                  ) : null,
                )}

                {/* LEFT */}
                <button
                  onClick={() =>
                    prevSlide(post.post.postId, post?.media?.length)
                  }
                  className="absolute left-3 top-1/2 -translate-y-1/2 
                 bg-black/60 text-white w-10 h-10 rounded-full
                 opacity-0 group-hover:opacity-100 z-20"
                >
                  <ArrowBackIosNewIcon />
                </button>

                {/* RIGHT */}
                <button
                  onClick={() =>
                    nextSlide(post.post.postId, post?.media?.length)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 
                 bg-black/60 text-white w-10 h-10 rounded-full
                 opacity-0 group-hover:opacity-100 z-20"
                >
                  <ArrowForwardIosIcon />
                </button>
              </div>
            )}

            {/* Hover icon */}
            <span
              onClick={() => RedirectPost(post)}
              className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
            >
              <OpenInNewIcon fontSize="small" />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Insight;
