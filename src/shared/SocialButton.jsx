import PropTypes from "prop-types";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";
function SocialButton({ navigate }) {
  const axiosPublic = useAxiosPublic();
  const { googleLogin, githubLogin } = useAuth();
  return (
    <div className="flex justify-between">
      <button
        className="btn btn-outline"
        onClick={() =>
          googleLogin().then((result) => {
            const newUserCreate = {
              name: result.user?.displayName,
              email: result.user?.email,
              photo: result.user?.photoURL,
              badge: "bronze",
            };
            axiosPublic.post("/users", newUserCreate).then((res) => {
              if (res.data.insertedId) {
                Swal.fire({
                  icon: "success",
                  title: "User Login Success",
                  showConfirmButton: false,
                  timer: 1000,
                });
              }
            });
            navigate(navigate);
          })
        }
      >
        Google
      </button>
      <button
        className="btn btn-outline"
        onClick={() =>
          githubLogin().then((result) => {
            const user = {
              name: result.user?.displayName,
              email: result.user?.email,
              photo: result.user?.photoURL,
              badge: "bronze",
            };
            axiosPublic.post("/users", user).then(() => {
              Swal.fire({
                icon: "success",
                title: "User Login Success",
                showConfirmButton: false,
                timer: 1000,
              });
            });
            navigate(navigate);
          })
        }
      >
        Github
      </button>
    </div>
  );
}
SocialButton.propTypes = {
  navigate: PropTypes.string,
};
export default SocialButton;
