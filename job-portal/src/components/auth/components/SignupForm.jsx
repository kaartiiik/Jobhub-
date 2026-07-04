"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { signupSchema } from "@/schemas/signupSchema";

import useSignup from "../hooks/useSignup";

export default function SignupForm() {
  const { handleSignup } =
    useSignup();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver:
      zodResolver(signupSchema),
  });

  const onSubmit = (data) => {
    handleSignup(data);
  };

  return (
    <form
      onSubmit={handleSubmit(
        onSubmit
      )}
      className="space-y-4"
    >
      <input
        placeholder="Name"
        {...register("name")}
        className="border p-2 w-full"
      />

      <input
        placeholder="Email"
        {...register("email")}
        className="border p-2 w-full"
      />

      <input
        type="password"
        placeholder="Password"
        {...register("password")}
        className="border p-2 w-full"
      />

      <select
        {...register("role")}
        className="border p-2 w-full"
      >
        <option value="">
          Select Role
        </option>

        <option value="candidate">
          Candidate
        </option>

        <option value="recruiter">
          Recruiter
        </option>
      </select>

      <button
        className="bg-blue-400 text-black px-4 py-2 rounded"
      >
        Signup
      </button>
    </form>
  );
}