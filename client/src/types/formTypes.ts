import * as z from "zod";

export const loginSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export const signupShema = z
  .object({
    name: z.string().min(3, "Name must have at least 3 characters"),
    email: z.email({
      message: "Email is required.",
    }),
    password: z.string().min(5, "Password must have at least 5 characters"),
    confirmPassword: z.string(),
    agree: z.boolean().refine((value) => value === true),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const expenseSchema = z.object({
  title: z.string().min(1, "Please enter a title"),
  amount: z
    .string()
    .min(1, "Amount is required")
    .refine((value) => Number(value) > 0, "Amount must be greater than 0"),
  category: z.string().min(1, "Please select a category"),
  date: z.string().min(1, "Date is required"),
  note: z.string().optional(),
});

export type ExpenseFormValues = z.infer<typeof expenseSchema>;
export type LoginType = z.infer<typeof loginSchema>;
export type SignupFormType = z.infer<typeof signupShema>;
