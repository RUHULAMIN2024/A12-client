import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";

function MainPost() {
  const [sortedData, setSortedData] = useState("time");
  const [sortedDataCount, setSortedDataCount] = useState(0);
  const [activePage, setActivePage] = useState(0);
  const axiosPublic = useAxiosPublic();
  useEffect(() => {
    const getForumPostsCount = async () => {
      const res = await axiosPublic.get("/forum-posts-count");
      const resData = await res.data;
      setSortedDataCount(resData?.count);
    };
    getForumPostsCount();
  }, [axiosPublic]);

  const { data: forumPostsData = [] } = useQuery({
    queryKey: ["forumPosts", sortedData, activePage],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/forum-posts?sortBy=${sortedData}&page=${activePage}`
      );
      const resData = await res.data;
      return resData;
    },
  });
  const totalPages = Math.ceil(sortedDataCount / 3);
  const pagesGenerate = [...Array(totalPages).keys()];

  return (
    <>
      <div className="container py-8 flex justify-between items-center gap-4">
        <button
          onClick={() => {
            setSortedData("time");
          }}
          className="btn btn-secondary"
        >
          Sort By Time
        </button>
        <button
          onClick={() => {
            setSortedData("popularity");
          }}
          className="btn btn-secondary"
        >
          Sort By Popularity
        </button>
      </div>
      <h2 className="text-2xl uppercase md:text-3xl mb-3 text-center font-bold">
        Forum Posts
      </h2>
      <div className="container py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {forumPostsData?.map((forumPost, ind) => {
          return (
            <Link
              title={`View ${forumPost?.postTitle}`}
              key={ind}
              to={`/post/${forumPost?._id}`}
            >
              <div className="flex  h-fit shadow-lg">
                <div className="w-full p-4 md:p-4 space-y-2">
                  <img
                    className="size-[200px] rounded-full mx-auto object-cover"
                    src={forumPost?.authorImage}
                    alt=""
                  />
                  <h1 className="text-xl font-bold text-black ">
                    {forumPost?.postTitle}
                  </h1>
                  <p className="text-gray-800">
                    {forumPost?.postDescription.slice(0, 250)}...
                  </p>
                  <div className=" flex flex-wrap  items-center gap-3 ">
                    {forumPost?.postTag.map((forumTag, ind) => {
                      return (
                        <span
                          key={ind}
                          className="px-2 py-1 text-xs font-bold text-white uppercase bg-gray-800 "
                        >
                          {forumTag}
                        </span>
                      );
                    })}
                  </div>
                  <span className="text-black">
                    {new Date(forumPost?.postTime).toLocaleDateString()}
                  </span>
                  <div className="flex flex-wrap  items-center gap-3">
                    {forumPost?.commentsCount && (
                      <span className="text-black">
                        Comments Count: {forumPost?.commentsCount}
                      </span>
                    )}

                    <span className="text-black">
                      Votes Count: {forumPost.upVotes - forumPost.downVotes}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="join container py-8 flex justify-center items-center">
        <button
          onClick={() => {
            if (activePage > 0) {
              setActivePage(activePage - 1);
            }
          }}
          title="previous"
          type="button"
          className="join-item btn"
        >
          <IoArrowBack></IoArrowBack>
        </button>
        {pagesGenerate.map((page) => {
          return (
            <button
              onClick={() => {
                setActivePage(page);
              }}
              key={page}
              className={`${activePage === page && "btn-accent"} join-item btn`}
            >
              {page + 1}
            </button>
          );
        })}
        <button
          onClick={() => {
            if (pagesGenerate.length > activePage + 1) {
              setActivePage(activePage + 1);
            }
          }}
          title="next"
          type="button"
          className="join-item btn"
        >
          <IoArrowForward></IoArrowForward>
        </button>
      </div>
    </>
  );
}

export default MainPost;
