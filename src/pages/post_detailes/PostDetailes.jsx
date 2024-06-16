import { useQuery } from "@tanstack/react-query";
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
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "./../../hooks/useAuth";

function PostDetailes() {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();

  const { userInfo } = useAuth();
  console.log(userInfo);
  const { data: postDetailesData } = useQuery({
    queryKey: ["postDetailesData"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/forum-posts-detailes/${id}`);
      const resData = await res.data;
      return resData;
    },
  });

  const shareUrl = `/share-post/${postDetailesData?._id}`;

  const handleComment = (e) => {
    e.preventDefault();
    const comment = e.target.comment.value;
    console.log(comment);
  };

  const handleUpvote = async () => {
    console.log("upvote");
  };
  const handleDownvote = () => {
    console.log("downvote");
  };

  console.log(postDetailesData);
  return (
    <section className="py-8">
      <div className="container max-w-2xl mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img
              className="hidden object-cover w-16 h-16 rounded-full sm:block"
              src={postDetailesData?.author?.profile_picture}
              alt="avatar"
            />
            <span className="font-bold text-gray-700 cursor-pointer ">
              {postDetailesData?.author?.name}
            </span>
          </div>
          <span className="text-sm font-medium text-gray-800">
            {new Date(postDetailesData?.time).toLocaleDateString()}
          </span>
        </div>
        <div className="mt-2">
          <h2 className="text-xl font-bold text-gray-700 hover:text-gray-600  hover:underline">
            {postDetailesData?.title}
          </h2>
          <p className="mt-2 text-gray-600 ">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora
            expedita dicta totam aspernatur doloremque. Excepturi iste iusto eos
            enim reprehenderit nisi, accusamus delectus nihil quis facere in
            modi ratione libero!
          </p>
        </div>
        <div className="flex justify-start gap-3 pt-3">
          {postDetailesData?.tags.map((tag, ind) => {
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
        <div className="flex justify-start gap-6 pt-3">
          <p>
            Up Vote:{" "}
            <span className="text-primary">{postDetailesData?.upvotes}</span>
          </p>
          <p>
            Down Vote:{" "}
            <span className="text-primary">{postDetailesData?.downvotes}</span>
          </p>
          <p>
            Total Vote:{" "}
            <span className="text-primary">
              {postDetailesData?.upvotes - postDetailesData?.downvotes}
            </span>
          </p>
        </div>
        <div className="flex justify-start gap-3 pt-3">
          <button
            onClick={handleUpvote}
            type="button"
            className="btn btn-primary"
          >
            Up Vote <BiSolidUpvote></BiSolidUpvote>
          </button>
          <button
            onClick={handleDownvote}
            type="button"
            className="btn btn-primary"
          >
            Down Vote <BiSolidDownvote></BiSolidDownvote>
          </button>
          <p className="flex gap-2 items-center">
            Share By:
            <FacebookShareButton url={shareUrl}>
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <TwitterShareButton url={shareUrl}>
              <TwitterIcon size={32} round />
            </TwitterShareButton>
            <WhatsappShareButton url={shareUrl}>
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
  );
}

export default PostDetailes;