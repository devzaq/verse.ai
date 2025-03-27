"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { signinSchema } from "@/types/schemaTypes";
import { signIn } from 'next-auth/react';
import { useRouter } from "next/navigation";

type SignInFormValues = z.infer<typeof signinSchema>;

export default function SignInPage() {
    const router = useRouter();

    const form = useForm<SignInFormValues>({
        resolver: zodResolver(signinSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: SignInFormValues) => {
        console.log("Form Submitted:", data);
        // Add your API call here
        const signInData = await signIn('credentials', {
            email: data.email,
            password: data.password,
            redirect: false,
        });
        if (signInData?.status === 401 || signInData?.error) {
            console.log(signInData?.error, signInData?.status);
        } else {
            router.push('/dashboard');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Sign In</CardTitle>
                </CardHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="">
                        <CardContent className="space-y-4">
                            {/* Email Field */}
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Password Field */}
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Enter your password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant={'link'} onClick={() => router.push('/sign-up')} className="" >Create an account</Button>
                            <Button type="submit">Sign In</Button>
                        </CardFooter>
                    </form>
                </Form>
            </Card>
        </div>
    );
}
