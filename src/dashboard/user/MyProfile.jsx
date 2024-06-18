import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "./../../hooks/useAuth";

function MyProfile() {
  const { userInfo } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: isMember } = useQuery({
    queryKey: ["isMember"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/check-user-badge/${userInfo?.email}`);
      const resData = await res.data;
      return resData?.isMember;
    },
  });
  return (
    <div className="flex justify-center items-center flex-col p-4 space-y-3">
      <img
        src={userInfo?.photoURL}
        className="rounded-full object-cover size-[200px]"
        alt=""
      />
      <p className="font-semibold">
        User Name:{" "}
        <span className="text-primary font-bold">{userInfo?.displayName}</span>
      </p>{" "}
      <p className="font-semibold">
        User Email:{" "}
        <span className="text-primary font-bold">{userInfo?.email}</span>
      </p>{" "}
      {isMember ? (
        <>
          <p className="font-semibold">
            User Badge: <span className="text-primary font-bold">Bronze</span>
          </p>
          <p className="font-semibold">
            Rewarded Badge: <span className="text-primary font-bold">Gold</span>
          </p>
        </>
      ) : (
        <p className="font-semibold">
          User Badge: <span className="text-primary font-bold">Bronze</span>
        </p>
      )}
    </div>
  );
}

export default MyProfile;
