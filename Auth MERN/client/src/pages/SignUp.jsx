import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { signupReuqest } from "../api/auth";
import OAuth from "../components/OAuth";
import DeleteErrors from "../components/DeleteErrors";
import { useDispatch, useSelector } from "react-redux";
import {
  loadingStar,
  requestSuccess,
  requestFailure,
} from "../context/userSlice";

function SignUp() {
  const { loading } = useSelector((state) => state.user);
  const Dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSUbmit = handleSubmit(async (user) => {
    try {
      Dispatch(loadingStar());
      const response = await signupReuqest(user);
      Dispatch(requestSuccess(response.data));
    } catch (error) {
      Dispatch(requestFailure(error.response.data));
    }
  });

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <DeleteErrors />
      <form onSubmit={onSUbmit} className="flex flex-col gap-4">
        <div className="flex flex-col">
          <input
            type="text"
            placeholder="Username..."
            {...register("username", { required: true })}
            className="bg-slate-100 p-3 rounded-lg"
          />
          {errors.username && (
            <p className="text-[10px] mt-2 text-red-500">
              Username is required
            </p>
          )}
        </div>
        <div className="flex flex-col">
          <input
            type="email"
            placeholder="Email..."
            {...register("email", { required: true })}
            className="bg-slate-100 p-3 rounded-lg"
          />
          {errors.email && (
            <p className="text-[10px] mt-2 text-red-500">Email is required</p>
          )}
        </div>
        <div className="flex flex-col">
          <input
            type="password"
            placeholder="Password..."
            {...register("password", { required: true })}
            className="bg-slate-100 p-3 rounded-lg"
          />
          {errors.password && (
            <p className="text-[10px] mt-2 text-red-500">
              Password is required
            </p>
          )}
        </div>
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg hover:opacity-95"
        >
          {loading ? "LOADING..." : "SIGN UP"}
        </button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-3 justify-center">
        <p>Have an account?</p>
        <Link to={"/Signin"}>
          <span className="text-blue-500">Sign In</span>
        </Link>
      </div>
    </div>
  );
}

export default SignUp;
