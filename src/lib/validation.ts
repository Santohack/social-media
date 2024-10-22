import { z } from "zod";
const requiredString = z.string().trim().min(1, "Required");
export const signUpSchema = z.object({
  email: requiredString.email("Invalid email"),
  username: requiredString.regex(
    /^[a-zA-Z0-9_-]+$/,
    "only letters, numbers, - and _ are allowed",
  ),
  password: requiredString.min(8, "Password must be at least 8 characters"),
});

export type SignUpValues = z.infer<typeof signUpSchema>;


export const signInSchema = z.object({
  username: requiredString,
  password: requiredString
});

export type SignInValues = z.infer<typeof signInSchema>;