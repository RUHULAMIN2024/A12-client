import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

function useAnnoucementCount() {
  const axiosPublic = useAxiosPublic();
  const { refetch: annoucementsCountRefetch, data: annoucementsCount = 0 } =
    useQuery({
      queryKey: ["annoucementsCount"],
      queryFn: async () => {
        const res = await axiosPublic.get("/annoucements-count");
        const resData = await res.data;
        return resData?.count;
      },
    });
  return { annoucementsCount, annoucementsCountRefetch };
}

export default useAnnoucementCount;
