import React from "react";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { loginUser } from "@/services/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(1, { message: "Password must be at least 1 characters" }),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const mutationLogin = useMutation({
    mutationFn: ({ email, password }: LoginFormInputs) =>
      loginUser(email, password),
    onSuccess: () => {
      router.push("/users");
    },
    onError: () => alert("Login failed. Please check your credentials."),
  });

  const onSubmit = (data: LoginFormInputs) => {
    mutationLogin.mutate(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold text-center mb-10">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  {...field}
                  className="mt-1"
                />
              )}
            />
            {errors.email && (
              <Label htmlFor="email" className="text-red-500">
                Invalid email address
              </Label>
            )}
          </div>

          {/* password */}
          <div>
            <Label htmlFor="password">Password</Label>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  {...field}
                  className="mt-1"
                />
              )}
            />
            {errors.password && (
              <Label htmlFor="password" className="text-red-500">
                Invalid password
              </Label>
            )}
          </div>

          <Button
            type="submit"
            disabled={mutationLogin.isLoading}
            className="w-full mt-4"
          >
            {mutationLogin.isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
