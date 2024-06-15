import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Login = () => {
  const axiosPublic = useAxiosPublic();

  const [showPassword, setShowPassword] = useState(false);
  const { loginUser, googleLogin, githubLogin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const { email, password } = data;
    loginUser(email, password)
      .then((result) => {
        console.log(result);
        Swal.fire({
          title: "success",
          text: "Login Successfully ",
          icon: "success",
        });
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        Swal.fire({
          title: "Error!",
          text: `${error.message}`,
          icon: "error",
        });
      });
  };

  return (
    <div className="card-body rounded-xl shrink-0 w-full max-w-sm my-5 mx-auto bg-base-200">
      <Helmet>
        <title>Connect Sphere | Login</title>
      </Helmet>
      <h2 className="text-3xl text-center">Please Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
        <div className="form-control">
          <label className="relative label">
            <span className="label-text">Password</span>
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute text-2xl top-12 right-3"
            >
              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </span>
          </label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="input input-bordered"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <span className="text-red-500">This field is required</span>
          )}
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">
              Forgot password?
            </a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn  text-white btn-primary">Login</button>
        </div>
      </form>
      <div className="flex mt-1 justify-between">
        <p className="font-bold">New here?</p>
        <Link to="/register">Create an account </Link>
      </div>
      <div className="text-center mt-7 mb-2">
        <p>======continue with=======</p>
      </div>
      <div className="flex justify-between">
        <button
          className="btn btn-outline"
          onClick={() =>
            googleLogin().then((result) => {
              const user = {
                name: result.user?.displayName,
                email: result.user?.email,
                photo: result.user?.photoURL,
                badge: "Bronze",
              };
              axiosPublic.post("/users", user).then((res) => {
                console.log(res.data);
              });
              navigate(location?.state ? location.state : "/");
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
                badge: "Bronze",
              };
              axiosPublic.post("/users", user).then((res) => {
                console.log(res.data);
              });
              navigate(location?.state ? location.state : "/");
            })
          }
        >
          Github
        </button>
      </div>
    </div>
  );
};

export default Login;
