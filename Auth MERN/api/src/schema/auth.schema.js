import { z } from "zod";

export const singupSchema = z.object({
  username: z.string({
    required_error: "Username is required",
  }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Email is invalid",
    }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, { message: "Password must be at least 6 characters" }),
});

export const singinSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Email is invalid",
    }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, { message: "Password must be at least 6 characters" }),
});

export const updateSchema = z.object({
  username: z
    .string({
      required_error: "Username is required",
    })
    .min(1, { message: "Username is required" }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Email is invalid",
    }),
    password: z.string().optional().refine(val => val === undefined || val.length >= 6, {
      message: "Password must be at least 6 characters",
    })
});
