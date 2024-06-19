import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import AdminProfileChart from "../../components/Chart/AdminProfileChart";
import useTags from "../../hooks/useTags";
import useAuth from "./../../hooks/useAuth";
import useAxiosSecure from "./../../hooks/useAxiosSecure";

function AdminProfile() {
  const { userInfo } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [numberOfPost, setNumberOfPost] = useState(0);
  const [numberOfComments, setNumberOfComments] = useState(0);
  const [numberOfUsers, setNumberOfUsers] = useState(0);
  const data = [
    { name: "All Users", value: numberOfUsers },
    { name: "All Posts", value: numberOfPost },
    { name: "All Comments", value: 5 },
  ];
  const { tagsRefetch } = useTags();
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
  }, [axiosSecure]);
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

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();
  const onAddTags = async (data) => {
    const tag = data?.addTags.toLowerCase();
    const res = await axiosSecure.post("/add-tags", { tag: tag });
    const resData = await res.data;
    if (resData?.message === "Tag already exists") {
      Swal.fire({
        title: "Tag already exists",
        icon: "error",
        showConfirmButton: false,
        timer: 500,
      });
      return;
    }
    if (resData.insertedId) {
      tagsRefetch();
      reset();
      Swal.fire({
        title: "Tags added successfully",
        icon: "success",
        showConfirmButton: false,
        timer: 500,
      });
    } else {
      Swal.fire({
        title: "Something went wrong",
        icon: "error",
        showConfirmButton: false,
        timer: 500,
      });
    }
  };
  return (
    <>
      <Helmet>
        <title>Connect Sphere | Dashboard | Admin Profile</title>
      </Helmet>
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
          <AdminProfileChart data={data}></AdminProfileChart>
        </div>
        <div className="py-8">
          <h2 className="text-2xl uppercase md:text-3xl mb-3 text-center font-bold">
            Add Tags
          </h2>
          <form onSubmit={handleSubmit(onAddTags)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Add Tags:</span>
              </label>
              <input
                type="text"
                placeholder="Add Tags..."
                className="input input-bordered"
                {...register("addTags", { required: true })}
              />
              {errors.addTags && (
                <span className="text-red-500 pt-2 text-sm">
                  Tags is required!
                </span>
              )}
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn  text-white btn-primary">
                Add Tags
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default AdminProfile;
