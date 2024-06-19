import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import Swal from "sweetalert2";
import useAxiosSecure from "./../../hooks/useAxiosSecure";

function ManageUsers() {
  const axiosSecure = useAxiosSecure();
  const [sortedDataCount, setSortedDataCount] = useState(0);
  const [activePage, setActivePage] = useState(0);
  useEffect(() => {
    const getUsersCountFn = async () => {
      const res = await axiosSecure.get("/users-count");
      const resData = await res.data;
      setSortedDataCount(resData?.count);
    };
    getUsersCountFn();
  }, [axiosSecure]);
  const { data: allUsers = [], refetch } = useQuery({
    queryKey: ["allUsers", activePage],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?page=${activePage}`);
      const data = await res.data;
      return data;
    },
  });
  const totalPages = Math.ceil(sortedDataCount / 5);
  const pagesGenerate = [...Array(totalPages).keys()];
  const handleMakeAdmin = (email) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Admin it!",
      cancelButtonText: "No, cancel!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.put(`/users-make-admin/${email}`);
        const resData = await res.data;
        if (resData.modifiedCount > 0) {
          refetch();
          Swal.fire({
            icon: "success",
            title: "User is Admin",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "User is not Admin",
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
        <title>Connect Sphere | Dashboard | Manage Users</title>
      </Helmet>
      <section className="container px-4 mx-auto">
        <div className="flex items-center gap-x-3">
          <h2 className="text-lg font-medium text-gray-800 ">All Users</h2>

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
                        <span>User Name</span>
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 "
                      >
                        <span>User Email</span>
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 "
                      >
                        {" "}
                        <span>Make Admin</span>
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 "
                      >
                        Subscription Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 ">
                    {allUsers.length > 0 &&
                      allUsers.map((user, ind) => {
                        return (
                          <tr key={ind}>
                            <td className="px-4 py-4 text-sm font-medium text-gray-700 capitalize">
                              {user?.name}
                            </td>
                            <td className="px-12 py-4 text-sm font-medium text-gray-700 ">
                              {user?.email}
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-500  capitalize">
                              {user?.role === "admin" ? (
                                "Already In Admin"
                              ) : (
                                <button
                                  onClick={() => {
                                    handleMakeAdmin(user?.email);
                                  }}
                                  className="btn btn-accent"
                                >
                                  Make Admin
                                </button>
                              )}
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-500 capitalize">
                              {user.badge === "gold" ? "MemberShip" : "Users"}
                              <span></span>
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
      </section>
    </>
  );
}

export default ManageUsers;
