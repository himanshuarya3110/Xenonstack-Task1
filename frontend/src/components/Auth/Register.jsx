import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { register as signup } from '../../react-query/api/auth';
import { toast } from 'react-toastify';
const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const onSubmit = async (data) => {
    setLoading(true)
    mutation.mutate(data)
  }
  const mutation = useMutation({
    mutationFn: signup,
    onSuccess: (data, variables, context) => {
      setLoading(false)
      console.log("regitered")
      toast.success("Successfully Register")
      navigate("/login")
    },
    onError: (error, variables, context) => {
      console.log(error.response.data.message)
      toast.error(error.response.data.message)
    },
    onSettled: (data, error, variables, context) => {
    },
  });

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-purple-500 to-blue-500">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md bg-white p-10 rounded-lg shadow-lg border border-gray-200">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Sign Up</h2>

        <div className="mb-5">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            {...register("name", { required: "Name is required" })}
            className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "Invalid email address"
              }
            })}
            className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div className="mb-5">
          <label htmlFor="contact" className="block text-sm font-medium text-gray-700">Contact</label>
          <input
            type="text"
            id="contact"
            name="contact"
            {...register("contact", { required: "Contact is required" })}
            className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
          />
          {errors.contact && <p className="text-red-500 text-sm mt-1">{errors.contact.message}</p>}
        </div>

        <div className="mb-5">
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
          <input
            type="text"
            id="city"
            name="city"
            {...register("city", { required: "City is required" })}
            className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
          />
          {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
        </div>

        <div className="mb-5">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            {...register("password", { required: "Password is required" })}
            className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>

        <div className="flex flex-row gap-4">

        <button type="submit" className="w-full bg-red-500 text-white py-3 rounded hover:bg-red-600 text-lg">
          Sign Up
        </button>

        <button
          onClick={() => navigate("/login")}
          className="w-full bg-red-500 text-white py-3 rounded hover:bg-red-600 text-lg"
        >
          Back To Login
        </button>
        </div>
      </form>
    </div>

  );
};

export default Register;
