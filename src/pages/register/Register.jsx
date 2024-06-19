import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Register = () => {
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const { userInfo, createUser, userUpdate } = useAuth();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setError("");
    const { name, photo, email, password } = data;

    if (password.length < 6) {
      setError("password should be at least 6 characters");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setError("password should have at least 1 upper case");
      return;
    } else if (!/[a-z]/.test(password)) {
      setError("password should have at least 1 lower case");
      return;
    }
    createUser(email, password)
      .then(() => {
        userUpdate(name, photo)
          .then(() => {
            const newUserCreate = {
              name: name,
              email: email,
              photo: photo,
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
              navigate(from);
            });
          })
          .catch(() => {
            Swal.fire({
              icon: "error",
              title: "an error occurred",
              showConfirmButton: false,
              timer: 1000,
            });
          });
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "an error occurred",
          showConfirmButton: false,
          timer: 1000,
        });
      });
  };

  if (userInfo) {
    return <Navigate to={from}></Navigate>;
  }

  return (
    <div className="card-body rounded-xl shrink-0 w-full max-w-sm my-5 mx-auto bg-base-200">
      <Helmet>
        <title>Connect Sphere | Register</title>
      </Helmet>
      <h2 className="text-3xl text-center">Please Register</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            placeholder="Name"
            className="input input-bordered"
            {...register("name", { required: true })}
          />
          {errors.name && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
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
          <label className="label">
            <span className="label-text">PhotoURL</span>
          </label>
          <input
            type="text"
            placeholder="PhotoURL"
            className="input input-bordered"
            {...register("photo", { required: true })}
          />
          {errors.photo && (
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
            placeholder="password"
            className="input input-bordered"
            {...register("password", { required: true })}
          />

          {(errors.password && (
            <span className="text-red-500">This field is required</span>
          )) ||
            (error && <span className="text-red-500">{error}</span>)}
        </div>
        <div className="form-control mt-6">
          <button className="btn text-white btn-primary">Register</button>
        </div>
      </form>
      <div className="flex justify-between">
        <p className="font-bold">Have an account?</p>
        <Link to="/Login" className="underline text-blue-500">
          Please Login
        </Link>
      </div>
    </div>
  );
};

export default Register;
