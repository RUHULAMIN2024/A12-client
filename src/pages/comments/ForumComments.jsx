import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import Modal from "react-modal";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "./../../hooks/useAuth";
import useAxiosPublic from "./../../hooks/useAxiosPublic";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    textAlign: "center",
  },
};
function ForumComments() {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const { userInfo } = useAuth();
  const [commentWithModal, setCommentWithModal] = useState("");
  const [feedbackComment, setFeedBackComment] = useState({});
  const { data: forumPostComments = [] } = useQuery({
    queryKey: ["forumComments"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/forum-posts-comments/${id}`);
      const resData = await res.data;
      return resData;
    },
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleReadMore = (modalData) => {
    setIsModalOpen(true);
    setCommentWithModal(modalData);
  };
  const handleFeedbackChange = (commentEmail, value) => {
    setFeedBackComment((prevState) => ({
      ...prevState,
      [commentEmail]: { ...prevState[commentEmail], feedback: value },
    }));
  };
  const handleReportClick = async (commentEmail, commentData) => {
    setFeedBackComment((prevState) => ({
      ...prevState,
      [commentEmail]: { ...prevState[commentEmail], reported: true },
    }));
    const repotedData = {
      forumMainPostId: id,
      userName: userInfo?.displayName,
      commentEmail: commentEmail,
      commentDescription: commentData,
    };
    const res = await axiosPublic.post(`/forum-post-report`, repotedData);
    const resData = await res.data;
    if (resData.insertedId) {
      Swal.fire({
        title: "Reported Successfully",
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
      <section className="py-8">
        <div className="flex items-center gap-x-3">
          <h2 className="text-lg font-medium text-gray-800 ">Post Comment</h2>

          <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full  ">
            {forumPostComments?.length}
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
                        className="px-6 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 "
                      >
                        <span>Email</span>
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 "
                      >
                        {" "}
                        <span>Comment</span>
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 "
                      >
                        Feedback
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
                    {forumPostComments?.map((commentData, ind) => {
                      return (
                        <tr key={ind}>
                          <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                            {commentData?.userEmail}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500  text-wrap break-words flex items-center flex-wrap  space-x-2">
                            {commentData?.comment.length > 20 ? (
                              <>
                                {commentData?.comment.slice(0, 20)}...{" "}
                                <button
                                  className="btn btn-accent btn-sm"
                                  onClick={() =>
                                    handleReadMore(commentData?.comment)
                                  }
                                >
                                  <FaArrowRight></FaArrowRight>
                                </button>
                              </>
                            ) : (
                              <p>{commentData?.comment}</p>
                            )}
                          </td>
                          <td>
                            <select
                              onChange={(e) => {
                                handleFeedbackChange(
                                  commentData?.userEmail,
                                  e.target.value
                                );
                              }}
                              className="border border-slate-200 outline-none px-2 py-1"
                            >
                              <option value="" disabled>
                                Select Feedback
                              </option>
                              <option value="Inappropriate">
                                Inappropriate
                              </option>
                              <option value="Spam">Spam</option>
                              <option value="Offensive">Offensive</option>
                            </select>
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                            <button
                              onClick={() => {
                                handleReportClick(
                                  commentData?.userEmail,
                                  commentData?.comment
                                );
                              }}
                              disabled={
                                !feedbackComment[commentData?.userEmail]
                                  ?.feedback ||
                                feedbackComment[commentData?.userEmail]
                                  ?.reported
                              }
                              className="btn btn-warning"
                            >
                              {feedbackComment[commentData?.userEmail]?.reported
                                ? "Reported"
                                : "Report"}
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
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => {
            setIsModalOpen(false);
          }}
          style={customStyles}
        >
          <button
            className="btn btn-sm btn-accent"
            onClick={() => {
              setIsModalOpen(false);
            }}
          >
            close
          </button>
          <div>{commentWithModal}</div>
        </Modal>
      </section>
    </>
  );
}

export default ForumComments;
