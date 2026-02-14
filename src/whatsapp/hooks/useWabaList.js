import { useQuery } from "@tanstack/react-query";
import { getWabaList } from "@/apis/whatsapp/whatsapp.js";

export const useWabaList = () => {
  return useQuery({
    queryKey: ["wabaList"],
    queryFn: getWabaList,
    staleTime: 1000 * 60 * 10, // 10 min
    cacheTime: 1000 * 60 * 30,
  });
};
