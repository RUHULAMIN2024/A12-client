function ForumComments() {
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
                      <td className="px-4 py-4 text-sm text-gray-500  ">
                        <p className="text-wrap break-words">
                          Lorem ipsum dolor, sit amet consectetur adipisicing
                          elit. Impedit aperiam reprehenderit ex, officiis
                          neque, autem iusto iure expedita beatae possimus
                          obcaecati doloribus amet. Modi cum ratione tenetur
                          vero accusamus repellat?
                        </p>
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
      </section>
    </>
  );
}

export default ForumComments;
