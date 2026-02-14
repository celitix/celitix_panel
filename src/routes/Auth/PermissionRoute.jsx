import { useMemo } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";

// PAGES
import PageNotFound from "@/NotFound/PageNotFound";

// ROUTES
import { userItems } from "./routes/user";
import { resellerItems } from "./routes/reseller";

// COMPONENTS
import Loader from "@/whatsapp/components/Loader";

// CONTEXT
import { useUser } from "@/context/auth";

// export const PermissionRoute = ({ children }) => {
//   const { user, isLoading } = useUser();
//   const location = useLocation();

//   const menuItems = user?.role === "RESELLERUSER" ? userItems : resellerItems;

//   const currentPath = location.pathname;

//   const getPrivateRoute = (menuItems, userState) => {
//     if (userState.role === "AGENT") {
//       return [
//         { name: "Home", links: "/", roles: ["ADMIN"] },
//         { name: "WhatsApp Live Chat", links: "/wlivechat" },
//         { name: "WhatsApp Live Chat", links: ["/profile"] },
//       ];
//     }
//     if (userState.role === "RESELLER") {
//       return menuItems;
//     }

//     const alwaysIncludeNames = [
//       "Home",
//       "apiDocs",
//       "CallBack",
//       "Manage Contacts",
//       "openRoutes",
//       "WorkFlow",
//     ];

//     const allowedServices = [];
//     menuItems.map((item) => {
//       if (alwaysIncludeNames.includes(item.name)) {
//         allowedServices.push(item);
//         return;
//       }

//       userState.services.forEach((service, index) => {
//         if (item.name == service.display_name) {
//           allowedServices.push(item);
//           // return item
//         }
//       });
//     });

//     return allowedServices;
//   };

//   if (!user || isLoading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <Loader />
//       </div>
//     );
//   }

//   const privateRoute = getPrivateRoute(menuItems, user);

//   if (!privateRoute.some((item) => item?.links?.includes(currentPath)))
//     return <PageNotFound />;
//   return <Outlet />;
// };

export const PermissionRoute = ({ children }) => {
  const { user, isLoading } = useUser();
  const location = useLocation();
  const currentPath = location.pathname;

  const menuItems = useMemo(() => {
    return user?.role === "RESELLERUSER" ? userItems : resellerItems;
  }, [user]);

  const privateRoutes = useMemo(() => {
    if (!user) return [];

    if (user.role === "RESELLER") {
      return menuItems;
    }

    if (user.role === "AGENT") {
      return [
        { name: "Home", links: "/", roles: ["ADMIN"] },
        // { name: "WhatsApp Live Chat", links: "/wlivechat" },
        {
        name: "chatManagement",
        links: [
          "/liveChatMain/",
          "/combineLiveChatSettings",
          "/liveChatMain/wlivechat",
          "/liveChatMain/rcslivechats",
          "/liveChatMain/instagram",
          "/liveChatMain/messengerchats",
          "/liveChatMain/instachats",
          "/combineLiveChatSettings/wlcsetting",
          "/combineLiveChatSettings/rcslcsetting",
          "/combineLiveChatSettings/instalcsetting",
          "/combineLiveChatSettings/messengerlcsetting",
        ],
        roles: ["AGENT"],
      },
        { name: "WhatsApp Live Chat", links: ["/profile"] },
      ];
    }

    const alwaysInclude = [
      "Home",
      "apiDocs",
      "CallBack",
      "Manage Contacts",
      "openRoutes",
      "WorkFlow",
      "chatManagement",
      "instagram", // - later remove this truecaller according to service id
      "converterutility", // - later remove this truecaller according to service id
      "botManagement", // - later remove this truecaller according to service id
      // "E-mail"
    ];

    return menuItems.filter(
      (item) =>
        alwaysInclude.includes(item.name) ||
        user.services.some((service) => service.display_name == item.name)
    );
  }, [user, menuItems]);

  const isPathAllowed = useMemo(() => {
    return privateRoutes.some((item) =>
      Array.isArray(item.links)
        ? item.links.includes(currentPath)
        : item.links === currentPath
    );
  }, [privateRoutes, currentPath]);

  if (isLoading || !user)
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader />
      </div>
    );

  if (!isPathAllowed) return <PageNotFound />;

  return <Outlet />;
};
