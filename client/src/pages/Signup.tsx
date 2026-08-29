import { useForm, Controller } from "react-hook-form";
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
import { signupShema, type SignupFormType } from "@/types/formTypes";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";

export default function Signup() {
  const form = useForm<SignupFormType>({
    resolver: zodResolver(signupShema),
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

  const API_URL = import.meta.env.VITE_API_URL;

  const createUser = async function (data: SignupFormType) {
    const response = await fetch(`${API_URL}/users/signup`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });
    return response.json();
  };

  const { mutateAsync } = useMutation({
    mutationFn: createUser,
  });
  const navigate = useNavigate();

  async function onSubmit(data: SignupFormType) {
    try {
      await mutateAsync(data);
      toast.success("Account created successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }

  return (
    <main className="flex flex-col gap-4 min-h-screen justify-center items-center">
      <form
        className="w-full max-w-md rounded-lg bg-white p-5 shadow-md"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FieldGroup>
          <h1 className="mt-2 font-extrabold text-3xl tracking-tight col-span-full">
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

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
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

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
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
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
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
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <FieldSeparator className="col-span-full">OR</FieldSeparator>
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
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
        <div className="flex justify-center items-center">
          <Button
            disabled={isSubmitting}
            type="submit"
            className="bg-gradient-white-green text-login w-full"
          >
            {isSubmitting ? "Signing Up..." : "Sign up"}
          </Button>
        </div>
        <p className="flex justify-between items-center mt-3">
          Already have an account?
          <Button
            className="bg-gradient-white-green text-login"
            onClick={() => navigate("/login")}
          >
            Log in
          </Button>
        </p>
      </form>
    </main>
  );
}
