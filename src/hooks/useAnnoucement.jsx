import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

function useAnnoucement() {
  const axiosPublic = useAxiosPublic();
  const { data: annoucements = [] } = useQuery({
    queryKey: ["annoucements"],
    queryFn: async () => {
      const res = await axiosPublic.get("/annoucements");
      const resData = await res.data;
      return resData;
    },
  });
  return [annoucements];
}

export default useAnnoucement;
