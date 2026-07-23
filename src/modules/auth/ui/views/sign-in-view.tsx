"use client";
import { Card, CardContent } from "@/components/ui/card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Controller, useForm } from "react-hook-form";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { OctagonAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.email({ error: "Please enter a valid email" }),
  password: z.string().min(1, { message: "password is required" }),
});
export const SignInView = () => {
  const router = useRouter();
  const [pending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    setError(null);
    setIsPending(true);
    authClient.signIn.email(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: () => {
          router.push("/");
          setIsPending(false);
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
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome Back</h1>
                <p className="text-muted-foreground text-balance">
                  Login to your account
                </p>
              </div>

              {/* form starts here*/}
              <div className="grid gap-3">
                <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>Email</FieldLabel>
                      <Input
                        type="email"
                        placeholder="m@example.com"
                        {...field}
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
                      <Input
                        type="password"
                        placeholder="*********"
                        {...field}
                      />
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

              <Button type="submit" className="w-full" disabled={pending}>
                Sign In
              </Button>

              <div
                className="relative after:border-border after:inset-0 text-center text-sm after:absolute  after:top-1/2 after:z-0 after:flex
                                after:items-center after:border-t"
              >
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Or continue with
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  disabled={pending}
                >
                  Google
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  disabled={pending}
                >
                  GitHub
                </Button>
              </div>

              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/sign-up" className="underline underline-offset-4">
                  Sign up
                </Link>
              </div>
            </div>
          </form>
          <div className="bg-radial from-green-700 to-green-900 md:flex flex-col items-center justify-center gap-y-4 relative hidden">
            <img src="./logo.svg" alt="image" className="h-23 w-23" />
            <p className="text-2xl text-white font-semibold">Kulan.ai</p>
          </div>
        </CardContent>
      </Card>
      <div className="text-xs text-balance text-muted-foreground *:[a]:hover:text-primary text-center *:[a]:underline *:[a]:underline-offset-4">
        By Clicking Sign in, you agree to our <a href="#">Terms of service</a>{" "}
        and <a href="#">Privacy Policy</a>
      </div>
    </div>
  );
};
