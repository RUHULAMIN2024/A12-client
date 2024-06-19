import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import useAxiosSecure from "./../../hooks/useAxiosSecure";

function Activities() {
  const axiosSecure = useAxiosSecure();
  const { refetch, data: repotedData = [] } = useQuery({
    queryKey: ["repotedData"],
    queryFn: async () => {
      const res = await axiosSecure.get("/repoted-data");
      const resData = await res.data;
      return resData;
    },
  });
  const handleReportDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/repoted-data/${id}`);
        const resData = await res.data;
        if (resData.deletedCount > 0) {
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "Your report has been deleted.",
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
      }
    });
  };
  return (
    <>
      <Helmet>
        <title>Connect Sphere | Dashboard | Activities</title>
      </Helmet>
      <section className="py-8">
        <div className="container">
          <h2 className="text-2xl uppercase md:text-3xl my-3 text-left font-bold">
            Forum Posts Repoted Data
          </h2>
          {repotedData?.length > 0 ? (
            <>
              <div className="py-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {repotedData.map((repotedDataItem) => {
                  return (
                    <div
                      key={repotedDataItem._id}
                      className="p-4 shadow-md flex flex-col space-y-2"
                    >
                      <span className="font-medium">
                        {repotedDataItem?.userName}
                      </span>
                      <h4 className="font-semibold text-primary">
                        {repotedDataItem?.commentEmail}
                      </h4>
                      <p>{repotedDataItem?.commentDescription}</p>
                      <button
                        onClick={() => {
                          handleReportDelete(repotedDataItem?._id);
                        }}
                        className="btn btn-sm btn-accent"
                      >
                        Delete Report
                      </button>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="flex flex-col space-y-3">
              <h2 className="text-red-500">
                No report are available for this time!
              </h2>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Activities;
