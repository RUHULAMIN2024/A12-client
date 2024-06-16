import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "./../../hooks/useAxiosSecure";

function AddPost() {
  const { userInfo } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [forumPostCountUser, setForumPostCountUser] = useState(0);
  const [isMember, setIsMember] = useState(null);
  console.log(isMember);
  const options = [
    { value: "Environment", label: "Environment" },
    { value: "Healthcare", label: "Healthcare" },
    { value: "Technology", label: "Technology" },
    { value: "Health", label: "Health" },
    { value: "Science", label: "Science" },
    { value: "Food", label: "Food" },
    { value: "Travel", label: "Travel" },
    { value: "Programming", label: "Programming" },
    { value: "Social Media", label: "Social Media" },
  ];
  useEffect(() => {
    const forumPostCountUserFn = async () => {
      const res = await axiosSecure.get(
        `/forum-post-data-count/${userInfo?.email}`
      );
      const resData = await res.data;
      setForumPostCountUser(resData?.count);
    };
    const checkUserIsBadge = async () => {
      const res = await axiosSecure.get(`/check-user-badge/${userInfo?.email}`);
      const resData = await res.data;
      setIsMember(resData?.isMember);
    };
    forumPostCountUserFn();
    checkUserIsBadge();
  });
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      postTag: [],
    },
  });

  const handleBecomeMember = () => {
    navigate("/membership");
  };
  const onAddPost = async (data) => {
    const userPostData = {
      authorName: data.authorName,
      authorEmail: data.authorEmail,
      authorImage: data.authorImage,
      postTitle: data.postTitle,
      postDescription: data.postDescription,
      postTag: data.postTag,
      upVotes: data.upVote,
      downVotes: data.downVote,
      postTime: new Date().toLocaleDateString(),
    };

    const res = await axiosSecure.post("/forum-post-data", userPostData);
    const resData = await res.data;

    if (resData.insertedId) {
      reset();
      Swal.fire({
        title: "Post Added Successfully",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        title: "Something went wrong",
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <>
      {forumPostCountUser >= 5 && !isMember ? (
        <div className="space-y-3">
          <p className="text-blue-500">
            You have reached the maximum number of posts. To add more posts,
            please become a member.
          </p>
          <button className="btn btn-accent " onClick={handleBecomeMember}>
            Become a Member
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onAddPost)}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Author Name:</span>
            </label>
            <input
              readOnly
              defaultValue={userInfo?.displayName}
              className="input input-bordered"
              {...register("authorName")}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Author Email:</span>
            </label>
            <input
              readOnly
              defaultValue={userInfo?.email}
              className="input input-bordered"
              {...register("authorEmail")}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Author Image:</span>
            </label>
            <input
              readOnly
              defaultValue={userInfo?.photoURL}
              className="input input-bordered"
              {...register("authorImage")}
            />
          </div>{" "}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Post Title:</span>
            </label>
            <input
              type="text"
              placeholder="Post Title..."
              className="input input-bordered"
              {...register("postTitle", { required: true })}
            />
            {errors.postTitle && (
              <span className="text-red-500 pt-2 text-sm">
                post title is required
              </span>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Post Description:</span>
            </label>
            <textarea
              rows={5}
              placeholder="Post Description..."
              className="input input-bordered h-auto"
              {...register("postDescription", { required: true })}
            />
            {errors.postDescription && (
              <span className="text-red-500 pt-2 text-sm">
                post description is required
              </span>
            )}
          </div>{" "}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Post Tags:</span>
            </label>
            <Controller
              name="postTag"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  isMulti
                  isSearchable
                  {...field}
                  options={options}
                  value={options.filter((option) =>
                    field.value.includes(option.value)
                  )}
                  onChange={(selectedOptions) =>
                    field.onChange(
                      selectedOptions.map((option) => option.value)
                    )
                  }
                />
              )}
            />
            {errors.postTag && (
              <span className="text-red-500 pt-2 text-sm">
                post tag is required
              </span>
            )}
          </div>
          <div className="form-control grid grid-cols-2 gap-4">
            <div>
              <label className="label">
                <span className="label-text">Up Vote:</span>
              </label>
              <input
                readOnly
                type="number"
                placeholder="Up Vote..."
                className="border border-slate-200 outline-none px-[1rem] h-[3rem] rounded-lg"
                {...register("upVote", { value: 0 })}
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text">Down Vote:</span>
              </label>
              <input
                readOnly
                type="number"
                placeholder="Down Vote..."
                className="border border-slate-200 outline-none px-[1rem] h-[3rem] rounded-lg"
                {...register("downVote", { value: 0 })}
              />
            </div>
          </div>
          <div className="form-control mt-6">
            <button type="submit" className="btn  text-white btn-primary">
              Post
            </button>
          </div>
        </form>
      )}
    </>
  );
}

export default AddPost;
