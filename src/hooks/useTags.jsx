import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
function useTags() {
  const axiosPublic = useAxiosPublic();
  const { refetch: tagsRefetch, data: tags = [] } = useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const res = await axiosPublic.get("/all-tags");
      const resData = await res.data;
      return resData;
    },
  });
  return { tags, tagsRefetch };
}

export default useTags;
