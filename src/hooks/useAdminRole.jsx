import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useAdminRole = () => {
  const { userInfo } = useAuth();
  const axiosPublic = useAxiosPublic();
  const { isPending, data: isAdminRole } = useQuery({
    queryKey: ["isAdminRole"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/users-admin-role/${userInfo?.email}`);
      const data = await res.data;
      console.log(data);
      return data;
    },
  });
  return [isAdminRole, isPending];
};

export default useAdminRole;
