"use client";

import { Alert, AlertTitle } from "@/components/ui/alert";
//TODO: Write the onsubmit logic with the disabled buttons as well

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { OctagonAlert } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

const formSchema = z
  .object({
    name: z.string().min(3, { message: "Name must be at least 3 characters" }),
    email: z.email({ error: "Please provide a valid email" }),
    password: z.string().min(1, { error: "Password is required" }),
    confirmPassword: z.string().min(1, { error: "Password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const SignUpView = () => {
  const router = useRouter();
  const [error, setError] = useState<null | string>("");
  const [isPending, setIsPending] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    setError(null);
    setIsPending(true);

    authClient.signUp.email(
      {
        name: data.name,
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: () => {
          setIsPending(false);
          router.push("/");
        },
        onError: ({ error }) => {
          setError(error.message);
          setIsPending(false);
        },
      },
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden p-0">
        <CardContent className="grid md:grid-cols-2 p-0">
          <form className="p-6 md:p-8" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center">
                <h1 className="text-2xl font-bold">
                  Let&apos;s get you started
                </h1>
                <p className="text-balance text-muted-foreground">
                  Fill the form below to sign up
                </p>
              </div>

              {/* form starts here */}
              <div className="grid gap-3">
                <Controller
                  name="name"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>Name</FieldLabel>
                      <Input type="text" {...field} placeholder="John Doe" />
                      <FieldError errors={[fieldState.error]} />
                    </Field>
                  )}
                />
              </div>

              <div className="grid gap-3">
                <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>email</FieldLabel>
                      <Input
                        type="email"
                        {...field}
                        placeholder="johndoe@example.com"
                      />
                      <FieldError errors={[fieldState.error]} />
                    </Field>
                  )}
                />
              </div>

              <div className="grid gap-3">
                <Controller
                  name="password"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>Password</FieldLabel>
                      <Input type="password" {...field} placeholder="******" />
                      <FieldError errors={[fieldState.error]} />
                    </Field>
                  )}
                />
              </div>

              <div className="grid gap-3">
                <Controller
                  name="confirmPassword"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>confirm Password</FieldLabel>
                      <Input type="password" {...field} placeholder="******" />
                      <FieldError errors={[fieldState.error]} />
                    </Field>
                  )}
                />
              </div>
              {!!error && (
                <Alert className="bg-destructive/10 border-none">
                  <OctagonAlert className="h-4 w-4 text-destructive!" />
                  <AlertTitle>{error}</AlertTitle>
                </Alert>
              )}

              <Button type="submit" className="w-full" disabled={isPending}>
                Sign up
              </Button>

              <div
                className="relative after:border-border after:inset-0 text-center text-sm after:absolute after:top-1/2 after:z-0 after:flex
                                after:items-center after:border-t "
              >
                <span className="bg-card text-muted-foreground z-10 px-2 relative">
                  Or continue with
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button
                  className="w-full"
                  type="button"
                  variant="outline"
                  disabled={isPending}
                >
                  Google
                </Button>

                <Button
                  className="w-full"
                  type="button"
                  variant="outline"
                  disabled={isPending}
                >
                  Github
                </Button>
              </div>

              <div className="text-center text-sm">
                Have an account?{" "}
                <Link href="/sign-in" className="underline underline-offset-4">
                  Sign in
                </Link>
              </div>
            </div>
          </form>

          <div className="bg-radial from-green-700 to-green-900 hidden md:flex flex-col items-center justify-center">
            <img src="./logo.svg" alt="Logo" className="h-23 w-23" />
            <p className="text-2xl font-semibold text-white">Kulan.ai</p>
          </div>
        </CardContent>
      </Card>

      <div className="text-xs text-center text-muted-foreground text-balance *:[a]:underline *:[a]:hover:text-primary *:[a]:underline-offset-4">
        By Signing up, you agree to our <a href="#">Terms</a> and{" "}
        <a href="#">Privacy policy</a>
      </div>
    </div>
  );
};
