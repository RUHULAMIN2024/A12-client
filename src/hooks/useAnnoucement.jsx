import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

function useAnnoucement() {
  const axiosPublic = useAxiosPublic();
  const { refetch: annoucementRefetch, data: annoucements = [] } = useQuery({
    queryKey: ["annoucements"],
    queryFn: async () => {
      const res = await axiosPublic.get("/annoucements");
      const resData = await res.data;
      return resData;
    },
  });
  return { annoucements, annoucementRefetch };
}

export default useAnnoucement;
