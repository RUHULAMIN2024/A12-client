import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";

function SocialButton() {
  const axiosPublic = useAxiosPublic();
  const { googleLogin, githubLogin } = useAuth();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

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
                toast.success("User Created Success");
              }
            });
            navigate(from);
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
              toast.success("User Created Success");
            });
            navigate(from);
          })
        }
      >
        Github
      </button>
    </div>
  );
}

export default SocialButton;
