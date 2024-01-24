'use client';

import { useState} from 'react';
import Link from 'next/link';
import { signIn } from "next-auth/react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import { ReloadIcon } from "@radix-ui/react-icons";

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
 
const formSchema = z.object({
    email: z.string().min(1, {
      message: "Please enter an email"
    }),
    password: z.string().min(1, {
      message: "Please enter a password"
    })
  });

const SignUpForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const backendPort = process.env.NEXT_PUBLIC_BACKEND_PORT;

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          email: "",
          password: ""
        }
      });
    
      async function createUser(email: string, password:string) {
        const response = await fetch('', {
            method: 'POST',
            body: JSON.stringify({email, password}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        const data = await response.json();
        if (!response.ok){
            throw new Error(data.message || 'Something went wrong');
        }
        return data;
    }

      async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)
        const response = await createUser(values.email, values.password)
        const logInResult = await signIn('credentials', {
            email: values.email, 
            password: values.password,
            redirect:false
        })
    };

  return (
    <div className='h-screen flex items-center justify-center'>
    <Card className="w-[350px]">
        <CardHeader>
            <CardTitle>Create an Account</CardTitle>
            <CardDescription>An account is needed to use this app</CardDescription>
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
            <CardFooter>
                {isLoading ? (
                    <Button disabled>
                        <ReloadIcon className="animate-spin" />
                        </Button>
                    ) : (
                        <div>
                        <Button type="submit">Login</Button><br/>
                        <Link href='/login' className='text-sm underline'>Have an existing account? Log in instead</Link>
                        </div>
                    )}
            </CardFooter>
            </form>
        </Form>


    </Card>
    </div>
  );
}

export default SignUpForm;
