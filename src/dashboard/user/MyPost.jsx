import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "./../../hooks/useAuth";
import useAxiosSecure from "./../../hooks/useAxiosSecure";

function MyPost() {
  const { userInfo } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [sortedDataCount, setSortedDataCount] = useState(0);
  const [activePage, setActivePage] = useState(0);
  useEffect(() => {
    const getForumPostsCount = async () => {
      const res = await axiosSecure.get(
        `/my-forum-posts-count/${userInfo?.email}`
      );
      const resData = await res.data;
      setSortedDataCount(resData?.count);
    };
    getForumPostsCount();
  }, [axiosSecure, userInfo?.email]);

  const { data: myForumPost = [], refetch } = useQuery({
    queryKey: ["myForumPost", activePage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/my-forum-posts/${userInfo?.email}?page=${activePage}`
      );
      const resData = await res.data;
      return resData;
    },
  });
  const totalPages = Math.ceil(sortedDataCount / 5);
  const pagesGenerate = [...Array(totalPages).keys()];
  const handleForumPostComment = (id) => {
    navigate(`/dashboard/comments/${id}`);
  };
  const handleForumPostDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/forum-posts/${id}`);
        const resData = await res.data;
        if (resData.deletedCount > 0) {
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "Your post has been deleted.",
            icon: "success",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "OK",
          });
        } else {
          Swal.fire({
            title: "Oops!",
            text: "Something went wrong!",
            icon: "error",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "OK",
          });
        }
      }
    });
  };
  return (
    <>
      <Helmet>
        <title>Connect Sphere | Dashboard | My Post</title>
      </Helmet>
      <section className="container px-4 mx-auto">
        <div className="flex items-center gap-x-3">
          <h2 className="text-lg font-medium text-gray-800 ">My posts</h2>

          <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full  ">
            {sortedDataCount}
          </span>
        </div>

        <div className="flex flex-col mt-6">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200  md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 ">
                  <thead className="bg-gray-50 ">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 "
                      >
                        <span>Post Title</span>
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 "
                      >
                        <span>Number of Vote</span>
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 "
                      >
                        {" "}
                        <span>Comment Button</span>
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 "
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 ">
                    {myForumPost.length > 0 &&
                      myForumPost.map((forumPostDetails, ind) => {
                        return (
                          <tr key={ind}>
                            <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                              {forumPostDetails?.postTitle}
                            </td>
                            <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                              {forumPostDetails?.upVotes -
                                forumPostDetails?.downVotes}
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                              <button
                                onClick={() => {
                                  handleForumPostComment(forumPostDetails?._id);
                                }}
                                className="btn btn-accent"
                              >
                                Comment
                              </button>
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                              <button
                                onClick={() => {
                                  handleForumPostDelete(forumPostDetails?._id);
                                }}
                                className="btn btn-warning"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {myForumPost.length > 5 && (
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
                  className={`${
                    activePage === page && "btn-accent"
                  } join-item btn`}
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
        )}
      </section>
    </>
  );
}

export default MyPost;
