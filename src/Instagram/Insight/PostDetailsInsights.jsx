import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import moment from "moment";
import { MultiSelect } from "primereact/multiselect";

// ICONS
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

// APIS
import { getPostMediaInsights } from "@/apis/instagram/Instagram";

// COMPONENTS
import DropdownWithSearch from "@/whatsapp/components/DropdownWithSearch";
import UniversalButton from "@/components/common/UniversalButton";

const PostDetailsInsights = () => {
  const location = useLocation();
  const postData = location?.state?.postData;
  const accountSrno = location?.state?.accountSelection;

  const [metricData, setMetricData] = useState([]);
  const [breakdownData, setBreakdownData] = useState("");
  const [period, setPeriod] = useState("lifetime");
  const [mediaInsightData, setMediaInsightData] = useState([]);

  const metrics = [
    { name: "shares", code: "shares" },
    { name: "comments", code: "comments" },
    { name: "likes", code: "likes" },
    { name: "saved", code: "saved" },
    { name: "total_interactions", code: "total_interactions" },
  ];

  const fetchMediaInsights = async () => {
    try {
      const defaultMetrics = [
        "shares",
        "comments",
        "likes",
        "saved",
        "total_interactions",
      ];

      const data = {
        instaOffDetailSrno: accountSrno,
        postId: postData?.post?.postId,
        metric:
          metricData && metricData.length > 0 ? metricData : defaultMetrics,
        period: "lifetime",
        // breakdown: breakdownData ? breakdownData : ["age", "gender"]
      };

      const response = await getPostMediaInsights(data);
      if (response?.success) {
        setMediaInsightData(response?.data);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchMediaInsights();
  }, []);

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

  const captionText = postData?.post?.caption || "No caption";

  const formattedCaption = captionText.replace(
    /(#\w+)/g,
    '<span class="text-blue-500">$1</span>',
  );

  return (
    <div className="p-6">
      <div className="text-xl font-semibold mb-6 text-center">
        Post Insights
      </div>
      <div className="my-4 flex md:flex-row flex-col gap-4">
        <div className="w-full md:w-66">
          <div>
            <p>Select metric:</p>
          </div>

          <MultiSelect
            value={metricData}
            onChange={(e) => setMetricData(e.value)}
            options={metrics}
            optionLabel="name"
            optionValue="code"
            filter
            placeholder="Select Metric"
            maxSelectedLabels={3}
            className="w-full md:w-20rem custom-multiselect mt-1"
          />
        </div>
        <div className="w-full md:w-66 ">
          <DropdownWithSearch
            label="Period"
            value={period}
            options={["lifetime"].map((period) => ({
              label: period,
              value: period,
            }))}
            onChange={setPeriod}
          />
        </div>
        <div className="w-full md:w-66 ">
          <DropdownWithSearch
            label="Breakdown"
            value={breakdownData}
            options={["age", "gender"].map((br) => ({
              label: br,
              value: br,
            }))}
            onChange={setBreakdownData}
          />
        </div>
        <div className="flex justify-center items-center mt-5">
          <UniversalButton label="Filter Posts" onClick={fetchMediaInsights} />
        </div>
      </div>

      <div className="flex gap-6 items-start">
        {/* Media Preview */}
        {/* <div className="w-full rounded-xl overflow-hidden bg-gray-100"> */}
        <div className="relative w-full max-w-[540px] aspect-[4/5] rounded-xl overflow-hidden bg-gray-100">

          {postData?.post?.mediaType === "IMAGE" && (
            <img
              src={postData?.media?.[0]?.mediaUrl}
              alt="post"
              className="w-full h-full object-contain"
            />
          )}

          {postData?.post?.mediaType === "VIDEO" && (
            <video className="w-full h-full object-contain" controls muted loop>
              <source src={postData?.media?.[0]?.mediaUrl} type="video/mp4" />
            </video>
          )}

          {postData?.post?.mediaType === "CAROUSEL_ALBUM" && (
            <div className="relative w-full max-w-[540px] aspect-[4/5] bg-black group">

              {postData?.media?.map((mediaItem, index) =>
                index === (carouselIndex[postData.post.postId] || 0) ? (
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
                  prevSlide(postData.post.postId, postData?.media?.length)
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
                  nextSlide(postData.post.postId, postData?.media?.length)
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 
                 bg-black/60 text-white w-10 h-10 rounded-full
                 opacity-0 group-hover:opacity-100 z-20"
              >
                <ArrowForwardIosIcon />
              </button>
            </div>
          )}
        </div>

        {/* Post Info */}
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-gray-500 text-sm">Posted On</p>
            <p className="font-medium">
              {moment(postData?.post?.postDateTime).format("YYYY-MM-DD")}
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Caption</p>
            <pre
              className="font-medium whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: formattedCaption }}
            />
          </div>

          <div className="grid md:grid-cols-3 grid-col-1 gap-4">
            {mediaInsightData?.data?.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border p-4 flex flex-col gap-2 hover:shadow-md transition"
              >
                <p className="text-gray-500 text-sm">
                  <span className="text-gray-800 font-medium">Name: </span>
                  {item?.name}
                </p>
                <p className="text-gray-700 text-sm">
                  <span className="text-gray-800 font-medium">Period:</span>{" "}
                  {item?.period}
                </p>
                <p className="text-gray-400 text-sm">
                  <span className="text-gray-800 font-medium">Title:</span>{" "}
                  {item?.title}
                </p>

                <p className="text-2xl font-semibold">
                  {item?.values?.[0]?.value ?? 0}
                </p>

                <p className="text-xs text-gray-500">{item?.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetailsInsights;
