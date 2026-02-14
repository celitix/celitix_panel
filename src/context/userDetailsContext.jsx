import { createContext, useContext, useState, useEffect } from "react";

// APIS
import { getUserDetails } from "@/apis/user/user";

const UserDetailsContext = createContext();

export const UserDetailsProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState([]);

//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       try {
//         const response = await getUserDetails();
//         setUserDetails(response?.data)
//       } catch (error) {
//         console.log("error", error)
//       }
//     }
//     fetchUserDetails()
//   }, [])

  return (
    <UserDetailsContext.Provider
      value={{
        userDetails,
        setUserDetails
      }}
    >
      {children}
    </UserDetailsContext.Provider>
  );
};

export const useUserDetailsContext = () => useContext(UserDetailsContext);
