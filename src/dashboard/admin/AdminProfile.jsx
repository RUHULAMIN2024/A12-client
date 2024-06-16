import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import useAuth from "./../../hooks/useAuth";
import useAxiosSecure from "./../../hooks/useAxiosSecure";

function AdminProfile() {
  const { userInfo } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [numberOfPost, setNumberOfPost] = useState(0);
  const [numberOfComments, setNumberOfComments] = useState(0);
  const [numberOfUsers, setNumberOfUsers] = useState(0);
  console.log(numberOfUsers);
  useEffect(() => {
    const numberOfPostsFn = async () => {
      const res = await axiosSecure.get("/number-of-forum-posts");
      const resData = await res.data;
      setNumberOfPost(resData?.count);
    };
    numberOfPostsFn();
    const numberOfUsersFn = async () => {
      const res = await axiosSecure.get("/number-of-users");
      const resData = await res.data;
      setNumberOfUsers(resData?.count);
    };
    numberOfUsersFn();
  });
  const { data: getAdminProfile } = useQuery({
    queryKey: ["getAdminProfile"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/users-admin-profile/${userInfo?.email}`
      );
      const data = await res.data;
      return data;
    },
  });
  return (
    <>
      <section className="py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="container p-4 flex flex-col justify-start shadow-md ">
            <img
              src={getAdminProfile?.photo}
              alt=""
              className="w-32 h-32 mx-auto rounded-full  aspect-square"
            />
            <div className="space-y-4 text-center divide-y">
              <div className="my-2 space-y-1">
                <h2 className="text-xl font-semibold sm:text-2xl">
                  {getAdminProfile?.name}
                </h2>
                <p className="px-5 text-xs sm:text-base ">
                  {getAdminProfile?.email}
                </p>
              </div>
              <div className="flex flex-col justify-center pt-2">
                <p>
                  Number of Posts:{" "}
                  <span className="text-primary font-bold">{numberOfPost}</span>
                </p>{" "}
                <p>
                  Number of Comments:{" "}
                  <span className="text-primary font-bold">
                    {numberOfComments}
                  </span>
                </p>{" "}
                <p>
                  Number of Users:{" "}
                  <span className="text-primary font-bold">
                    {numberOfUsers}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div>df</div>
        </div>
      </section>
    </>
  );
}

export default AdminProfile;
