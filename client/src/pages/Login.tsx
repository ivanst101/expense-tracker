import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { loginSchema, type LoginType } from "@/types/formTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useNavigate } from "react-router";

import { useLogin } from "@/hooks/useLogin";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Login() {
  const navigate = useNavigate();
  const login = useLogin();

  const form = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<LoginType> = async (data) => {
    try {
      await login.mutateAsync(data);

      toast.success("Login successful!");

      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong",
      );
    }
  };

  return (
    <main className="flex flex-col gap-4 min-h-screen justify-center items-center">
      <div className="flex gap-2 items-center">
        <img src="/logo.png" alt="FinFlow" className="size-8 shrink-0" />
        <span className="text-lg font-semibold text-heading-one">FinFlow</span>
      </div>

      <form
        className="w-full max-w-md rounded-lg bg-white p-5 shadow-md"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Welcome back</FieldLegend>

            <FieldDescription>
              Enter your credentials to access your account.
            </FieldDescription>
          </FieldSet>

          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="email">Email address</FieldLabel>

                <Input
                  {...field}
                  id="email"
                  type="email"
                  placeholder="name@email.com"
                  aria-invalid={fieldState.invalid}
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
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>

                <Input
                  {...field}
                  id="password"
                  type="password"
                  aria-invalid={fieldState.invalid}
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <div className="flex justify-center w-full">
            <Button
              disabled={isSubmitting || login.isPending}
              type="submit"
              className="bg-gradient-white-green text-login"
            >
              {isSubmitting || login.isPending ? "Logging in..." : "Log in"}
            </Button>
          </div>
          <p className="flex justify-between items-center">
            Don't have an account?
            <Button
              className="bg-gradient-white-green text-login"
              onClick={() => navigate("/signup")}
            >
              Sign up
            </Button>
          </p>
        </FieldGroup>
      </form>
    </main>
  );
}
