import { useUser } from "@/context/auth";
import { useLocation, Outlet } from "react-router-dom";
import PageNotFound from "@/NotFound/PageNotFound";
import { resellerItems } from "./routes/reseller";
import { useMemo } from "react";
import Loader from "@/admin/components/Loader";

export const PermissionRoute = () => {
  const { user, isLoading } = useUser();
  const location = useLocation();
  const currentPath = location.pathname;

  const privateRoute = useMemo(() => {
    if (!user) return [];

    const allowedServices = resellerItems.map((item) => {
      if (item.name === "Reports") {
        const allowedLinks = item.links
          .filter((link) =>
            user.services.some((service) => link.id == service.service_type_id)
          )
          .flatMap((link) => link.links);

        return { ...item, links: allowedLinks };
      }
      return item;
    });

    return allowedServices;
  }, [user]);

  if (isLoading || !user)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );

  if (!privateRoute.some((item) => item?.links?.includes(currentPath)))
    return <PageNotFound />;

  return <Outlet />;
};