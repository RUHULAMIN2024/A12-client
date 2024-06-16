import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
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
      <div className="container py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {forumPostsData?.slice(0, 4)?.map((forumPost, ind) => {
          return (
            <div
              key={ind}
              className="flex max-w-md overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800"
            >
              <div className="p-4 md:p-4 space-y-2">
                <img
                  className="w-full h-[200px] object-cover"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT080IAhqwzehB3ujK1Z90fc65UhljRGnwn7DVFJjvgcM1ClLYw0x2VrrubYUQko3Fvde4&usqp=CAU"
                  alt=""
                />
                <h1 className="text-xl font-bold text-gray-800 dark:text-white">
                  Backpack
                </h1>

                <div className="flex flex-wrap  items-center gap-3 space-y-3">
                  {forumPost?.tags.map((forumTag, ind) => {
                    return (
                      <span
                        key={ind}
                        className="px-2 py-1 text-xs font-bold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:bg-gray-700 dark:focus:bg-gray-600"
                      >
                        {forumTag}
                      </span>
                    );
                  })}
                </div>
                <span className="text-white">
                  {new Date(forumPost?.time).toLocaleDateString()}
                </span>
                <div className="flex flex-wrap  items-center gap-3">
                  <span className="text-white">
                    Comments Count: {forumPost?.comments_count}
                  </span>
                  <span className="text-white">
                    Votes Count: {forumPost.upvotes - forumPost.downvotes}
                  </span>
                </div>
              </div>
            </div>
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
