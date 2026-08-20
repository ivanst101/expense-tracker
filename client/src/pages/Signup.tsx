import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

const FormSchema = z
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

type SignupFormValues = z.infer<typeof FormSchema>;

export default function Signup() {
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      agree: false,
    },
  });
  const {
    formState: { isSubmitting },
  } = form;

  async function onSubmit(data: SignupFormValues) {
    try {
      console.log(data);

      toast.success("Account created successfully!");
    } catch {
      toast.error("Something went wrong");
    }
  }

  return (
    <form
      className="p-2 sm:p-5 md:p-8 w-full rounded-sm gap-2 border max-w-3xl mx-auto"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <FieldGroup>
        <h1 className="mt-4 mb-1 font-extrabold text-3xl tracking-tight col-span-full">
          Create Account
        </h1>
        <p className="tracking-wide text-muted-foreground text-wrap text-sm col-span-full">
          Start managing your assets with professional precision.
        </p>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              className="gap-1 col-span-full"
            >
              <FieldLabel htmlFor="name">Your Name</FieldLabel>
              <Input
                {...field}
                id="name"
                type="text"
                aria-invalid={fieldState.invalid}
                placeholder="Enter your Name"
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              className="gap-1 col-span-full"
            >
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                {...field}
                id="email"
                type="email"
                aria-invalid={fieldState.invalid}
                placeholder="Enter your Email"
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              className="gap-1 col-span-full md:col-span-3"
            >
              <FieldContent className="gap-0.5">
                <FieldLabel htmlFor="password">Password</FieldLabel>
              </FieldContent>
              <Input
                type="password"
                {...field}
                aria-invalid={fieldState.invalid}
                id="password"
                placeholder="Password"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="confirmPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              className="gap-1 col-span-full md:col-span-3"
            >
              <FieldContent className="gap-0.5">
                <FieldLabel htmlFor="confirmPassword">
                  Confirm Password
                </FieldLabel>
              </FieldContent>
              <Input
                type="password"
                {...field}
                aria-invalid={fieldState.invalid}
                id="confirmPassword"
                placeholder="Confirm Password"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <FieldSeparator className="my-4 col-span-full">OR</FieldSeparator>
        <Button
          variant="outline"
          type="button"
          className="text-sm gap-2 px-2 h-10 grow"
        >
          <div className="place-items-center grid rounded-full bg-white size-6 p-0.5">
            <img
              src="https://cdn.brandfetch.io/id6O2oGzv-/theme/dark/symbol.svg?c=1bxid64Mup7aczewSAYMX&t=1755835725776"
              width={16}
              height={16}
            />
          </div>
          Continue with Google
        </Button>
        <Controller
          name="agree"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              className="gap-1 col-span-full"
            >
              <div className="flex items-center gap-2 mb-1">
                <Checkbox
                  id="agree"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  aria-invalid={fieldState.invalid}
                />
                <FieldLabel htmlFor="agree">
                  I agree to the terms and conditions
                </FieldLabel>
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <div className="flex justify-end items-center w-full">
        <Button disabled={isSubmitting} type="submit">
          {isSubmitting ? "Signing Up..." : "Sign up"}
        </Button>
      </div>
    </form>
  );
}
