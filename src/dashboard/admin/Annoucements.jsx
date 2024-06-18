import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAnnoucement from "../../hooks/useAnnoucement";
import useAnnoucementCount from "./../../hooks/useAnnoucementCount";
import useAuth from "./../../hooks/useAuth";
import useAxiosSecure from "./../../hooks/useAxiosSecure";

function Annoucements() {
  const { userInfo } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { annoucementRefetch } = useAnnoucement();
  const { annoucementsCountRefetch } = useAnnoucementCount();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onAnnoucement = async (data) => {
    const {
      authorName,
      authorImage,
      announcementTitle,
      announcementDescription,
    } = data;
    const annoucementsData = {
      authorImage,
      authorName,
      announcementDescription,
      announcementTitle,
    };
    const res = await axiosSecure.post("/announcements-post", annoucementsData);
    const resData = await res.data;
    if (resData.insertedId) {
      reset();
      annoucementsCountRefetch();
      annoucementRefetch();
      Swal.fire({
        title: "Annoucement Posted Successfully",
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
        <div className="container">
          <form onSubmit={handleSubmit(onAnnoucement)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Author Name:</span>
              </label>
              <input
                defaultValue={userInfo?.displayName}
                readOnly
                type="text"
                placeholder="Author Name..."
                className="input input-bordered"
                {...register("authorName")}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Author Image:</span>
              </label>
              <input
                defaultValue={userInfo?.photoURL}
                readOnly
                type="text"
                placeholder="Author Image..."
                className="input input-bordered"
                {...register("authorImage")}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Annoucement Title:</span>
              </label>
              <input
                type="text"
                placeholder="Annoucement Title..."
                className="input input-bordered"
                {...register("announcementTitle", { required: true })}
              />
              {errors.announcementTitle && (
                <span className="text-red-500 pt-2 text-sm">
                  Annoucement Title is required
                </span>
              )}
            </div>{" "}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Annoucement Description:</span>
              </label>
              <textarea
                rows={5}
                placeholder="Annoucement Description..."
                className="input input-bordered h-auto"
                {...register("announcementDescription", { required: true })}
              />
              {errors.announcementDescription && (
                <span className="text-red-500 pt-2 text-sm">
                  Annoucement Description is required
                </span>
              )}
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn  text-white btn-primary">
                Send Annoucement
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default Annoucements;
