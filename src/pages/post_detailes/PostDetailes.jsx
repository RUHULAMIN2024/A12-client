import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { BiSolidDownvote, BiSolidUpvote } from "react-icons/bi";
import { IoMdSend } from "react-icons/io";
import { useParams } from "react-router-dom";
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "./../../hooks/useAuth";

function PostDetailes() {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();

  const { userInfo } = useAuth();
  const { data: postDetailesData } = useQuery({
    queryKey: ["postDetailesData"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/forum-posts-detailes/${id}`);
      const resData = await res.data;
      return resData;
    },
  });

  const shareUrl = window.location.href;

  const handleComment = async (e) => {
    e.preventDefault();
    const comment = e.target.comment.value;
    const res = await axiosPublic.post(`/forum-post-comment/${id}`, {
      forumMainPostId: id,
      userName: userInfo?.displayName,
      userEmail: userInfo?.email,
      comment: comment,
    });
    const resData = await res.data;
    if (resData.modifiedCount > 0) {
      Swal.fire({
        title: "Comment Posted Successfully",
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

  const handleUpvote = async () => {
    console.log("upvote");
  };
  const handleDownvote = () => {
    console.log("downvote");
  };

  console.log(postDetailesData);
  return (
    <>
      <Helmet>
        <title>Connect Sphere | Forum Post Detailes</title>
      </Helmet>
      <section className="py-8">
        <div className="container max-w-2xl mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img
                className="object-cover w-16 h-16 rounded-full sm:block"
                src={postDetailesData?.authorImage}
                alt="avatar"
              />
              <span className="font-bold text-gray-700 cursor-pointer ">
                {postDetailesData?.authorName}
              </span>
            </div>
            <span className="text-sm font-medium text-gray-800">
              {new Date(postDetailesData?.postTime).toLocaleDateString()}
            </span>
          </div>
          <div className="mt-2">
            <h2 className="text-xl font-bold text-gray-700 hover:text-gray-600 ">
              {postDetailesData?.postTitle}
            </h2>
            <p className="mt-2 text-gray-600 ">
              {postDetailesData?.postDescription}
            </p>
          </div>
          <div className="flex justify-start gap-3 pt-3">
            {postDetailesData?.postTag.map((tag, ind) => {
              return (
                <span
                  key={ind}
                  className="inline-block bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                >
                  {tag}
                </span>
              );
            })}
          </div>
          <div className="flex flex-wrap justify-start gap-6 pt-3">
            <p>
              Up Vote:{" "}
              <span className="text-primary">{postDetailesData?.upVotes}</span>
            </p>
            <p>
              Down Vote:{" "}
              <span className="text-primary">
                {postDetailesData?.downVotes}
              </span>
            </p>
            <p>
              Total Vote:{" "}
              <span className="text-primary">
                {postDetailesData?.upVotes - postDetailesData?.downVotes}
              </span>
            </p>
            <p>
              Total Comments:{" "}
              <span className="text-primary">
                {postDetailesData?.comments
                  ? postDetailesData.comments.length
                  : 0}
              </span>
            </p>
          </div>
          <div className="flex flex-wrap justify-start gap-3 pt-3">
            <button
              onClick={handleUpvote}
              type="button"
              className="btn btn-sm btn-primary"
            >
              Up Vote <BiSolidUpvote></BiSolidUpvote>
            </button>
            <button
              onClick={handleDownvote}
              type="button"
              className="btn btn-sm btn-primary"
            >
              Down Vote <BiSolidDownvote></BiSolidDownvote>
            </button>
            <p className="flex gap-2 items-center">
              Share By:
              <FacebookShareButton
                url={shareUrl}
                title={postDetailesData?.postTitle}
              >
                <FacebookIcon size={32} round />
              </FacebookShareButton>
              <TwitterShareButton
                url={shareUrl}
                title={postDetailesData?.postTitle}
              >
                <TwitterIcon size={32} round />
              </TwitterShareButton>
              <WhatsappShareButton
                url={shareUrl}
                title={postDetailesData?.postTitle}
              >
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>
            </p>
          </div>
          <form onSubmit={handleComment} className="flex flex-col space-y-3">
            <h1 className="text-2xl mb-2 font-semibold text-gray-800 mt-3">
              Comments
            </h1>
            <textarea
              rows={5}
              cols={5}
              name="comment"
              id="comment"
              placeholder="Comment..."
              className=" px-4 py-2 w-2/3 border border-slate-300 outline-none"
            ></textarea>

            <button type="submit" className="btn btn-accent mr-auto">
              Comment <IoMdSend></IoMdSend>
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

export default PostDetailes;
