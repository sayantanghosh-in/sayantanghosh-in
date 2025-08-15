"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AlertCircleIcon } from "lucide-react";
import * as z from "zod";

// Import shadcn UI components
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Define the validation schema for the form using Zod
// This ensures that the email and password meet the required criteria
const formSchema = z.object({
  email: z.email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(1, {
    message: "Password must not be empty.",
  }),
});

export default function LoginForm() {
  const searchParams = useSearchParams();

  // Initialize a state to handle any login errors
  const [isError, setIsError] = useState<boolean>(false);

  // initialize a state to track if the form is still submitting
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Initialize react-hook-form with the Zod resolver
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // This function is called when the form is submitted and passes validation
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsError(false); // Clear any previous errors
    setIsSubmitting(true); // Set the submitting state of the form

    try {
      // Construct the payload for the API call
      const payload: { [key: string]: string } = {
        email: values.email,
        password: values.password,
      };

      // Get the optional redirect URL from the query string
      const redirect_url = searchParams.get("redirect_url");
      if (redirect_url) {
        payload.redirect_url = redirect_url;
      }

      // Make the POST request to the login API endpoint
      // NOTE: This fetch call will fail in this isolated environment.
      // In a real Next.js app, this would be a valid API route.
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        // If the login was not successful, throw an error
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed. Please try again.");
      }

      // If login is successful, get the response data
      const data = await response.json();

      // Redirect the user.
      // The API response might contain a redirect_url, or we can use the one from the query string.
      const finalRedirectUrl = data.redirect_url || redirect_url || "/";

      window.location.href = finalRedirectUrl;
    } catch {
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-lg border-1">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Login
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Email Input Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Email</FormLabel>
                <FormControl>
                  <Input placeholder="you@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Password Input Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full cursor-pointer rounded-lg py-2 transition-transform duration-200 transform hover:scale-101"
          >
            Log in
          </Button>
        </form>
      </Form>
      {isError && (
        <Alert variant="destructive" className="mt-2">
          <AlertCircleIcon />
          <AlertTitle>Unable to login.</AlertTitle>
          <AlertDescription>
            <p>Please verify your login credentials and try again.</p>
            <ul className="list-inside list-disc text-sm">
              <li>Check your email id</li>
              <li>Check your password</li>
            </ul>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
