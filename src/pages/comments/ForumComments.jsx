import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import Modal from "react-modal";
const comment =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita cumque placeat itaque deleniti quidem et sed dolores molestias aliquam hic, quasi sit accusamus soluta nisi rerum, debitis nulla, consectetur vitae.";

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleReadMore = () => {
    setIsModalOpen(true);
  };
  return (
    <>
      <section className="py-8">
        <div className="flex items-center gap-x-3">
          <h2 className="text-lg font-medium text-gray-800 ">Post Comment</h2>

          <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full  ">
            4
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
                    <tr>
                      <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                        ruhul@amin.com
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500  text-wrap break-words flex items-center flex-wrap  space-x-2">
                        {comment.length > 20 ? (
                          <>
                            {comment.slice(0, 20)}...{" "}
                            <button
                              className="btn btn-accent btn-sm"
                              onClick={handleReadMore}
                            >
                              <FaArrowRight></FaArrowRight>
                            </button>
                          </>
                        ) : (
                          { comment }
                        )}
                      </td>
                      <td>
                        <select
                          //   value={selectedFeedback[comment._id] || ""}
                          //   onChange={(e) =>
                          //     handleFeedbackChange(comment._id, e.target.value)
                          //   }
                          //   disabled={comment.reported}
                          className="border border-slate-200 outline-none px-2 py-1"
                        >
                          <option value="" disabled>
                            Select Feedback
                          </option>
                          <option value="Inappropriate">Inappropriate</option>
                          <option value="Spam">Spam</option>
                          <option value="Offensive">Offensive</option>
                        </select>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                        <button className="btn btn-warning">Report</button>
                      </td>
                    </tr>
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
          <div>{comment}</div>
        </Modal>
      </section>
    </>
  );
}

export default ForumComments;
