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
    }
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
    }
  );
};

// ---------------------root APIs-------------------------------

export const loadInstaChat = async (data) => {
  return await fetchWithAuth(
    `/instagram/load-insta-chat?businessInstaUserId=${data?.businessInstaUserId}&instaUserId=${data?.instaUserId}&srno=${data?.srno}&replyTime=${data?.replyTime}`,
    {
      method: "POST",
    }
  );
};

export const fetchConversations = async (data) => {
  return await fetchWithAuth(
    `/instagram/conversations?businessInstaUserId=${data?.businessInstaUserId}&fromDate=${data?.fromDate}&toDate=${data?.toDate}&pageSize=${data?.pageSize}&startIndex=${data?.startIndex}`,
    {
      method: "POST",
    }
  );
};

// export const sendInstaMessage = async (data) => {
//   return await fetchWithAuth(
//     `/instagram/send-message?businessInstaUserId=${data?.businessInstaUserId}&instaUserId=${data?.instaUserId}&type=${data?.type}`,
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//       body: JSON.stringify({
//         message: data?.message,
//       }),
//     }
//   );
// };

export const sendInstaMessage = async (data) => {
  const query = new URLSearchParams({
    type: data?.type,
    businessInstaUserId: data?.businessInstaUserId,
    instaUserId: data?.instaUserId,
  });

  const body = new URLSearchParams({
    message: JSON.stringify(data?.message),
  });

  return await fetchWithAuth(`/instagram/send-message?${query.toString()}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  });
};

export const viewUpdate = async (data) => {
  return await fetchWithAuth(
    `/instagram/view-update?businessInstaUserId=${data?.businessInstaUserId}&instaUserId=${data?.instaUserId}`,
    {
      method: "POST",
    }
  );
};

export const getInstaChatsOneUser = async (data) => {
  return await fetchWithAuth(
    `/instagram/chats-one-user?businessInstaUserId=${data?.businessInstaUserId}&instaUserId=${data?.instaUserId}&chatNo=${data.chatNo}`,
    {
      method: "GET",
    }
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

// payload for instaAccountDetails
// {
//     "businessInstaUserId": "all", //parekh.priyank52
//     "status": -1, //1 active ,0 inactive , -1 all
//     "userName": "" //
// }
export const instaAccountDetails = async (data) => {
  return await fetchWithAuth(`/instagram/account-details`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// payload for changeInstaAccStatus
// {
//     "status": 1,
//     "businessInstaUserId": "30365816929728598",
//     "instaOffDetailSrNo": 1
// }
export const changeInstaAccStatus = async (data) => {
  return await fetchWithAuth(`/instagram/change-status`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

export const instaAssignNotAssignUsers = async (SrNo) => {
  return await fetchWithAuth(
    `/instagram/assign-not-assign-users?instaOffDetailSrNo=${SrNo}`,
    {
      method: "GET",
    }
  );
};

// payload for instaAssignUsers
// {
//   "instaOffDetailSrNo": "1",
//   "instaAssignUserList": [
//     2951,
//     2929,
//     2933,
//     2962
//   ]
// }
export const instaAssignUsers = async (data) => {
  return await fetchWithAuth(`/instagram/assign-users`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};
