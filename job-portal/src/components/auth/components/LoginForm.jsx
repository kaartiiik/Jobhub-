"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema } from "@/schemas/loginSchema";

import useLogin from "../hooks/useLogin";

export default function LoginForm() {
  const { handleLogin } =
    useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver:
      zodResolver(loginSchema),
  });

  const onSubmit = (data) => {
    handleLogin(data);
  };

  return (
    <form
      onSubmit={handleSubmit(
        onSubmit
      )}
      className="space-y-4"
    >
      <input
        type="email"
        placeholder="Email"
        {...register("email")}
        className="border p-2 w-full"
      />

      {errors.email && (
        <p className="text-red-500">
          {errors.email.message}
        </p>
      )}

      <input
        type="password"
        placeholder="Password"
        {...register("password")}
        className="border p-2 w-full"
      />

      {errors.password && (
        <p className="text-red-500">
          {errors.password.message}
        </p>
      )}

      <button
        className="bg-green-500 text-black px-4 py-2 rounded"
      >
        Login
      </button>
    </form>
  );
}