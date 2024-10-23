"use client";

import { signInSchema, SignInValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "./action";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PasswordInput } from "@/components/ui/passwordInput";
import LoadingButton from "@/components/ui/loadingButton";
import { Input } from "@/components/ui/input";

export default function SignInForm() {
  const [err, setErr] = React.useState<string>();
  const [isPending, startTransition] = useTransition();

  const form = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const onSubmit = (values: SignInValues) => {
    setErr(undefined);
    startTransition(async () => {
      const { error } = await signIn(values);
      if (error) {
        setErr(error);
      }
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        {err && <p className="text-center text-destructive">{err}</p>}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter username" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="Password" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton className="w-full" type="submit" loading={isPending}>
          Sign In Now
        </LoadingButton>
      </form>
    </Form>
  );
}
