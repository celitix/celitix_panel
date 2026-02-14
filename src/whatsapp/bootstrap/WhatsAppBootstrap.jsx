import { useEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useWabaList } from "@/whatsapp/hooks/useWabaList";
import { useWabaStore } from "@/whatsapp/store/waba.store";
import WabaSelectorModal from "@/whatsapp/components/WabaSelectorModal";
import Loader from "../components/Loader";
import WabaFloatingButton from "../components/WabaFloatingButton";
import NoWabaState from "../components/NoWabaState";
import { WHATSAPP_ROUTES } from "../config/serviceRoutes";

const WhatsAppBootstrap = () => {
  const location = useLocation();
  const isRouteMatch = (pathname, routes) => {
    return routes.some(
      (route) => pathname === route || pathname.startsWith(route + "/")
    );
  };

  const isWhatsappRoute = isRouteMatch(location.pathname, WHATSAPP_ROUTES);
  if (!isWhatsappRoute) {
    return <Outlet />;
  }

  const { data: wabaList = [], isLoading } = useWabaList();
  const { selectedWaba, selectWaba, showWabaModal, openWabaModal } =
    useWabaStore();

  // Prevent modal reopening loop
  const modalOpenedRef = useRef(false);

  useEffect(() => {
    if (!wabaList || wabaList.length === 0) return;

    // Auto-select when ONLY ONE WABA exists
    if (wabaList.length === 1 && !selectedWaba) {
      selectWaba(wabaList[0]);
      return;
    }

    // Open modal ONCE when multiple WABAs & none selected
    if (wabaList.length > 1 && !selectedWaba && !modalOpenedRef.current) {
      openWabaModal();
      modalOpenedRef.current = true;
    }
  }, [wabaList, selectedWaba, selectWaba, openWabaModal]);

  if (isLoading) return <Loader />;

  // No WABA onboarded
  if (wabaList.length === 0) {
    return <NoWabaState />;
  }

  return (
    <>
      <Outlet />

      {/* Global Modal */}
      <WabaSelectorModal wabaList={wabaList} loading={isLoading} />

      {/* Floating Switch Button */}
      <WabaFloatingButton />
    </>
  );
};

export default WhatsAppBootstrap;
