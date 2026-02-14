// exchange the code for token
// export const exchangeCodeForToken = async (data) => {
//   console.log("Exchanging code for token with data:", data);
//   // const params = new URLSearchParams(data);
//   return await fetch("https://api.instagram.com/oauth/access_token", {
//     method: "POST",
//     body: JSON.stringify(data),
//   });
// };

import { fetchWithAuth } from "../apiClient.js";

export const exchangeCodeForToken = async (data) => {
  console.log("Exchanging code for token with data:", data);

  // Convert data object into URL-encoded format
  const params = new URLSearchParams(data);

  return await fetch("https://api.instagram.com/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded", // Required for Instagram
    },
    body: params.toString(), // URL-encoded form data
  });
};

// get a long lived token
export const getLongLivedToken = async (data) => {
  console.log("Exchanging code for token with data:", data);
  return await fetch(
    `https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=${data.client_secret}&access_token=${data.access_token}`,
    {
      method: "GET",
    },
  );
};

// get a Instagram profile
export const getInstagramProfile = async (accessToken) => {
  return await fetch(
    "https://graph.instagram.com/v23.0/me?fields=user_id,username,name,account_type,profile_picture_url,followers_count,follows_count,media_count",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
};

// ---------------------root APIs rest.celitix.com-------------------------------

export const loadInstaChat = async (data) => {
  return await fetchWithAuth(
    `/instagram/load-insta-chat?businessInstaUserId=${data?.businessInstaUserId}&instaUserId=${data?.instaUserId}&srno=${data?.srno}&replyTime=${data?.replyTime}`,
    {
      method: "POST",
    },
  );
};

export const fetchConversations = async (data) => {
  return await fetchWithAuth(
    `/instagram/conversations?businessInstaUserId=${data?.businessInstaUserId}&fromDate=${data?.fromDate}&toDate=${data?.toDate}&pageSize=${data?.pageSize}&startIndex=${data?.startIndex}&userActive=${data?.userActive}`,
    {
      method: "POST",
    },
  );
};

// for userActive params - 1 for active and 0 for closed blank than all

export const sendInstaMessage = async (data) => {
  const formData = new FormData();

  formData.append("type", data?.type);
  formData.append("businessInstaUserId", String(data?.businessInstaUserId));
  formData.append("instaUserId", String(data?.instaUserId));

  // formData.append("message", data?.message);

  if (typeof data?.message === "object") {
    formData.append("message", JSON.stringify(data.message));
  } else {
    formData.append("message", data?.message || "");
  }

  try {
    const response = await fetchWithAuth("/instagram/send-message", {
      method: "POST",
      body: formData,
    });

    return response;
  } catch (error) {
    console.error("Error sending Instagram message:", error);
    throw error;
  }
};

export const viewUpdate = async (data) => {
  return await fetchWithAuth(
    `/instagram/view-update?businessInstaUserId=${data?.businessInstaUserId}&instaUserId=${data?.instaUserId}`,
    {
      method: "POST",
    },
  );
};

export const getInstaChatsOneUser = async (data) => {
  return await fetchWithAuth(
    `/instagram/chats-one-user?businessInstaUserId=${data?.businessInstaUserId}&instaUserId=${data?.instaUserId}&chatNo=${data.chatNo}`,
    {
      method: "GET",
    },
  );
};

export const onboarduser = async (code) => {
  return await fetchWithAuth(`/instagram/onboard?code=${code}`, {
    method: "GET",
  });
};

//
export const instaUserList = async () => {
  return await fetchWithAuth(`/instagram/insta-user-list`, {
    method: "GET",
  });
};

export const instaAccountDetails = async (data) => {
  return await fetchWithAuth(`/instagram/account-details`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// /instagram/other-user-profile - POST - getInstaOtherProfile
export const getInstaOtherProfile = async (data) => {
  return await fetchWithAuth(`/instagram/other-user-profile`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// /instagram/template/createTemplate - POST - createInstaTemplate
export const createInstaTemplate = async (data) => {
  return await fetchWithAuth(`/instagram/template/createTemplate`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// {
//     "type": "GENERIC", // BUTTON - radio buttons
//     "text": "test body {#variableone#} end", - only visible type button
//     "url": null,
//     "mediaId": null,
//     "targetMessageId": "697836469",
//     "reaction": "like",
//     "businessUserId": "17841404630029041", - dropdown
//     "templateName": "shubhtestnewwwwww", - input
//     "quickReplyList": [  //3 limit
//         "test",
//         "adasd",
//         "asdasd"
//     ],
//     "variablesList": [
//         "variableone"
//     ],
//     "title": "test", - input
//     "subtitle": "hello", - input
//     "imageUrl": "https://m.cltx.in/upload/image/e15a8455-c17f-4669-aa89-4589409f1631.jpg", - upload
//     "buttons": [
//         {
//             "text": "Click to connect!", - input
//             "type": "postback", - radio buttons (postback, web_url)
//             "value": "https://postback.com" - input
//         },
//         {
//             "text": "click to visit!", - input
//             "type": "web_url", - radio buttons (postback, web_url)
//             "value": "https://example.com" - input
//         },
//     ]
// }

// get insta template list all
export const getInstaTemplateList = async (data) => {
  return await fetchWithAuth(
    `/instagram/template/templateList?templateType=${data.templateType}&templateName=${data.templateName}&instaBusinessUserId=${data.instaBusinessUserId}&status=${data.status}&isHide=${data.isHide}`,
    {
      method: "POST",
    },
  );
};

// update template visiblity status
export const instaUpdateTempStatus = async (data) => {
  return await fetchWithAuth(
    `/instagram/template/toggleVisibility?srno=${data.srno}&isHide=${data.isHide}`,
    {
      method: "POST",
    },
  );
};

// get insta approved temp list
export const instaApprovedTempList = async ({ data, params }) => {
  return await fetchWithAuth(
    `/instagram/template/approvedTemplateList?templateType=${params.templateType}&templateName=${params.templateName}&instaBusinessUserId=${params.instaBusinessUserId}`,
    {
      method: "POST",
      body: JSON.stringify(data),
    },
  );
};

// Get insta template particular Json
export const instaGetTempJson = async (srno) => {
  return await fetchWithAuth(`/instagram/template/getTempJson?srno=${srno}`, {
    method: "POST",
  });
};

// change insta account status 
export const changeInstaAccStatus = async (data) => {
  return await fetchWithAuth(`/instagram/change-status`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

// create persist menu list according to insta account
export const createPersistentMenu = async (data, instaUserId) => {
  return await fetchWithAuth(
    `/instagram/persistent-menu?instaUserId=${instaUserId}`,
    {
      method: "POST",
      body: JSON.stringify(data),
    },
  );
};

// get persist menu list according to insta account
export const getPersistentMenu = async (instaUserId) => {
  return await fetchWithAuth(
    `/instagram/persistent-menu?instaUserId=${instaUserId}`,
    {
      method: "GET",
    },
  );
};

// createIcebreaker according to insta account
export const createIceBreaker = async (data, instaUserId) => {
  return await fetchWithAuth(
    `/instagram/ice-breaker?instaUserId=${instaUserId}`,
    {
      method: "POST",
      body: JSON.stringify(data),
    },
  );
};

// getIcebreaker according to insta account
export const getIceBreaker = async (instaUserId) => {
  return await fetchWithAuth(
    `/instagram/ice-breaker?instaUserId=${instaUserId}`,
    {
      method: "GET",
    },
  );
};

// deleteIcebreaker
export const deleteIceBreaker = async (instaUserId) => {
  return await fetchWithAuth(
    `/instagram/ice-breaker?instaUserId=${instaUserId}`,
    {
      method: "DELETE",
    },
  );
};

// Sync Instagram Comment - of particualr account
export const syncInstaComment = async (data) => {
  return await fetchWithAuth(`/instagram/comment/sync`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// Get Instagram Comment - of particualr account
export const getInstaComment = async (data) => {
  return await fetchWithAuth(`/instagram/comment/all`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// Send Instagram Comment - - of particualr account
export const sendInstaComment = async (data) => {
  return await fetchWithAuth(`/instagram/comment/`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// hideInstaComment - of particualr account
export const hideInstaComment = async (data) => {
  return await fetchWithAuth(`/instagram/comment/hide`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// deleteInstaComment - of particualr account
export const deleteInstaComment = async (data) => {
  return await fetchWithAuth(`/instagram/comment/delete`, {
    method: "DELETE",
    body: JSON.stringify(data),
  });
};

// getPostChildMedia - of particualr account
export const getPostChildMedia = async (postId) => {
  return await fetchWithAuth(`/instagram/post/child-media?postId=${postId}`, {
    method: "GET",
  });
};

// /instagram/post/media-comment?postId=17894266086403706&instaOffDetailSrno=1 -GET - instaGetMediaComment
//Get Insta media comment
export const instaGetMediaComment = async ({ postId, srno }) => {
  return await fetchWithAuth(
    `/instagram/post/media-comment?postId=${postId}&instaOffDetailSrno=${srno}`,
    {
      method: "GET",
    },
  );
};
// /instagram/post/comment-on-media?postId=17894266086403706&instaOffDetailSrno=1&message=testingbyapi - sendMediaCommentInsta
// Send Media Insta Comment
export const sendMediaCommentInsta = async (data) => {
  return await fetchWithAuth(
    `/instagram/post/comment-on-media?postId=${data.postId}&instaOffDetailSrno=${data.instaOffDetailSrno}&message=${data.message}`,
    {
      method: "POST",
    },
  );
};

// /instagram/post/container-status?creationId=17868949761508359 - GET - getContainerStatus
export const getContainerStatus = async (creationId) => {
  return await fetchWithAuth(
    `/instagram/post/container-status?creationId=${creationId}`,
    {
      method: "GET",
    },
  );
};

// /instagram/post/publishing-limit - GET - getInstaPostPublishingLimit
export const getInstaPostPublishingLimit = async () => {
  return await fetchWithAuth(`/instagram/post/publishing-limit`, {
    method: "GET",
  });
};

// Create Instagram Post Container
export const createInstaPostContainer = async (data) => {
  return await fetchWithAuth(`/instagram/post/container-creation`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// Create Instagram Story Container
export const createInstaStoryContainer = async (data) => {
  return await fetchWithAuth(`/instagram/story/story-container-creation`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// Publish Instagram Post Container
export const publishInstaPostContainer = async (creationId) => {
  return await fetchWithAuth(
    `/instagram/post/publish?creationId=${creationId}`,
    {
      method: "POST",
    },
  );
};

// Get Instagram All Post
export const getInstaAllPost = async (data) => {
  return await fetchWithAuth(`/instagram/post/all`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// /instagram/post/?instaOffDetailSrno=1&postId=17894266086403706 - GET - getInstaSinglePost
//Get single Insta Post
export const getInstaSinglePost = async ({ srno, postId }) => {
  return await fetchWithAuth(
    `/instagram/post/?instaOffDetailSrno=${srno}&postId=${postId}`,
    {
      method: "GET",
    },
  );
};

//  Sync Instagram Post
export const syncInstaPost = async (data) => {
  return await fetchWithAuth(`/instagram/post/sync`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// Set Instagram Post Auto Reply
export const setInstaPostAutoReply = async (data) => {
  return await fetchWithAuth(`/instagram/post/auto-reply`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// Get Auto Reply
export const getPostAutoReply = async (srno) => {
  return await fetchWithAuth(`/instagram/post/getAutoReply?postSrno=${srno}`, {
    method: "GET",
  });
};

// /instagram/account/insights - POST - instaAccountInsights
// payload for instaAccountInsights
// {
//     "instaOffDetailSrno": 1,
//     "metric": [
//         "reach",
//         "follower_count",
//         "website_clicks",
//         "profile_views",
//         "online_followers",
//         "accounts_engaged",
//         "total_interactions",
//         "likes",
//         "comments",
//         "shares",
//         "saves",
//         "replies",
//         "engaged_audience_demographics",
//         "reached_audience_demographics",
//         "follower_demographics",
//         "follows_and_unfollows",
//         "profile_links_taps",
//         "views",
//         "threads_likes",
//         "threads_replies",
//         "reposts",
//         "quotes",
//         "threads_followers",
//         "threads_follower_demographics",
//         "content_views",
//         "threads_views",
//         "threads_clicks",
//         "threads_reposts"
//     ],
//     "period": "day",
//     "timeframe": "",
//     "metricType": "",
//     "breakdown": "",
//     "since": 0,
//     "until": 0
// }

//Insta account insights
export const instaAccountInsights = async (data) => {
  return await fetchWithAuth(`/instagram/account/insights`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// /instagram/post/media-insights - POST - getPostMediaInsights
// payload for getPostMediaInsights
// {
//     "instaOffDetailSrno": 1,
//     "postId": "17894266086403706",
//     "metric": [
//         "shares",
//         "comments",
//         "likes",
//         "saved",
//         "total_interactions"
//     ]
//      ,
//      "period": "lifetime"
//      //,
//     // "breakdown": [
//     //     "age",
//     //     "gender"
//     // ]
// }

//post media insights
export const getPostMediaInsights = async (data) => {
  return await fetchWithAuth(`/instagram/post/media-insights`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// /instagram/account/collection-live-video?instaOffDetailSrno=1 - GET - instaLiveVideoCollection
//Get insta live video collection
export const instaLiveVideoCollection = async (srno) => {
  return await fetchWithAuth(
    `/instagram/account/collection-live-video?instaOffDetailSrno=${srno}`,
    {
      method: "GET",
    },
  );
};
//Get insta live story collection
// /instagram/account/collection-stories?instaOffDetailSrno=1 - GET - instaLiveStoryCollection
export const instaLiveStoryCollection = async (srno) => {
  return await fetchWithAuth(
    `/instagram/account/collection-stories?instaOffDetailSrno=${srno}`,
    {
      method: "GET",
    },
  );
};
