import { z } from "zod";

export const signupSchema = z.object({
  name: z
    .string()
    .min(3, "Name is required"),

  email: z
    .string()
    .email(),

  password: z
    .string()
    .min(3),

  role: z.enum([
    "candidate",
    "recruiter",
  ]),
});