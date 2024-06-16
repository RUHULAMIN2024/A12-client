import useAuth from "./../../hooks/useAuth";

function MyProfile() {
  const { userInfo } = useAuth();
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
      <p className="font-semibold">
        User Badge: <span className="text-primary font-bold">Bronze</span>
      </p>
      {userInfo?.badge === "gold" && (
        <p className="font-semibold">
          Rewarded Badge:{" "}
          <span className="text-primary font-bold">{userInfo?.badge}</span>
        </p>
      )}
    </div>
  );
}

export default MyProfile;
