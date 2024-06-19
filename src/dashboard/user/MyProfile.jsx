import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
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
  const [recentPost, setRecentPost] = useState([]);
  useEffect(() => {
    const myRecentsPostFn = async () => {
      const res = await axiosSecure.get(
        `/my-recent-forum-posts/${userInfo?.email}`
      );
      const resData = await res.data;
      return setRecentPost(resData);
    };
    myRecentsPostFn();
  }, [axiosSecure, userInfo?.email]);
  return (
    <>
      <Helmet>
        <title>Connect Sphere | Dashboard | My Post</title>
      </Helmet>

      <div className="flex justify-center items-center flex-col p-4 space-y-3">
        <img
          src={userInfo?.photoURL}
          className="rounded-full object-cover size-[200px]"
          alt=""
        />
        <p className="font-semibold">
          User Name:{" "}
          <span className="text-primary font-bold">
            {userInfo?.displayName}
          </span>
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
              Rewarded Badge:{" "}
              <span className="text-primary font-bold">Gold</span>
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
      <h2 className="text-2xl uppercase md:text-3xl my-3 text-left font-bold">
        Recent Posts
      </h2>
      {recentPost.length > 0 ? (
        <div className="py-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {recentPost.map((myPost, ind) => {
            return (
              <div key={ind} className="p-4 shadow-md">
                <h2 className="text-xl text-primary font-semibold">
                  {" "}
                  {myPost?.postTitle}
                </h2>
                <p> {myPost?.postDescription}</p>
                <div className="flex flex-wrap justify-start items-center gap-4">
                  {myPost?.postTag.map((myPostTag, ind) => {
                    return (
                      <span
                        key={ind}
                        className="inline-block bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700 mr-2 my-2"
                      >
                        {myPostTag}
                      </span>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col space-y-3">
          <h2 className="text-red-500">No post you have added!</h2>
          <Link to={"/dashboard/add-post"}>
            <button className="btn mr-auto btn-primary">Added New Post</button>
          </Link>
        </div>
      )}
    </>
  );
}

export default MyProfile;
