import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdminRole = () => {
  const { userInfo } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { isPending, data: isAdminRole } = useQuery({
    queryKey: ["isAdminRole"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users-admin-role/${userInfo?.email}`);
      const data = await res.data;
      return data;
    },
  });
  return [isAdminRole, isPending];
};

export default useAdminRole;
