import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { login } from "../../react-query/api/auth";
import { useMutation } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";
import { Spin } from "antd";

// Import toastify css file
import "react-toastify/dist/ReactToastify.css";
import { setUserInfo } from "../../utils/localStorage";

function Login() {
  const [loading, setLoading] = React.useState(false);
  const { register, handleSubmit, watch } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    setLoading(true);
    mutation.mutate(data);
  };
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data, variables, context) => {
      setLoading(false);
      console.log(data);
      setUserInfo(data.token);

      toast.success("Successfully login");
      data.role === "Admin" ? navigate("/admin") : navigate("/");
    },
    onError: (error, variables, context) => {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    },
    onSettled: (data, error, variables, context) => {},
  });

  return (
    <div className="flex items-center justify-center h-screen w-full px-5 sm:px-0 bg-gradient-to-r from-blue-500 to-purple-500">
  <div className="flex bg-white rounded-lg shadow-lg border overflow-hidden max-w-sm lg:max-w-4xl w-full">
    <div
      className="hidden md:block lg:w-1/2 bg-cover"
      style={{
        backgroundImage: `url("https://plus.unsplash.com/premium_photo-1720192861639-1524439fc166?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,
      }}
    ></div>
    <div className="w-full p-8 lg:w-1/2">
      <p className="text-2xl font-semibold text-gray-800 text-center">Welcome Back!</p>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
        <div className="mt-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            {...register("userId")}
            className="text-gray-700 border border-gray-300 rounded-lg py-3 px-4 block w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            required
          />
        </div>
        <div className="mt-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <input
            {...register("password")}
            className="text-gray-700 border border-gray-300 rounded-lg py-3 px-4 block w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            type="password"
            required
          />
          <a
            href="#"
            className="text-xs text-gray-500 hover:text-gray-900 mt-1 block text-right"
          >
            Forgot Password?
          </a>
        </div>
        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-red-500 text-white py-3 rounded hover:bg-red-600 text-lg"
          >
            {loading ? <Spin pinning={loading} /> : "Login"}
          </button>
        </div>
      </form>

      <div className="mt-4 flex items-center justify-center">
        
      </div>

      <div className="mt-6 text-center">
        <a href="#" className="text-xs text-gray-500">
          Don't have an account? 
          <span className="text-blue-600 cursor-pointer" onClick={() => navigate("/register")}> Sign Up</span>
        </a>
      </div>
    </div>
  </div>
</div>

  );
}

export default Login;
