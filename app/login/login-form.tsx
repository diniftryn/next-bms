"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string().min(1, {
    message: "Please enter email"
  }),
  password: z.string().min(1, {
    message: "Please enter password"
  })
});

const LoginForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    const response = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false
    });

    console.log({ response });
    if (!response?.error) {
      toast("Login successful");
      router.push("/");
      router.refresh();
    } else if (response.error) {
      toast("Error with login", {
        description: "Please check your login credentials"
      });
    }

    setIsLoading(false);
  }

  return (
    <div className="grid place-items-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Login with email:test@test.com and password:test123 to test the app. </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <CardContent>
              <div className="flex flex-col space-y-1.5">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
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
                        <Input {...field} type="password" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              {/* <Button variant="outline">Forgot Password</Button> */}
              {isLoading ? (
                <Button disabled>
                  <ReloadIcon className="animate-spin" />
                </Button>
              ) : (
                <Button type="submit">Login</Button>
              )}
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default LoginForm;
