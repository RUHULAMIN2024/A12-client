import { useQuery } from "@tanstack/react-query";
import bronzeBadge from "../../assets/bronze-badge.png";
import goldBadge from "../../assets/gold-badge.png";
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
          <p className="font-semibold flex items-center gap-2">
            User Badge: <span className="text-primary font-bold">Bronze</span>
            <img className="size-8 object-cover" src={bronzeBadge} alt="" />
          </p>
          <p className="font-semibold flex items-center gap-2">
            Rewarded Badge: <span className="text-primary font-bold">Gold</span>
            <img className="size-8 object-cover" src={goldBadge} alt="" />
          </p>
        </>
      ) : (
        <p className="font-semibold flex items-center gap-2">
          User Badge: <span className="text-primary font-bold">Bronze</span>
          <img className="size-8 object-cover" src={bronzeBadge} alt="" />
        </p>
      )}
    </div>
  );
}

export default MyProfile;
