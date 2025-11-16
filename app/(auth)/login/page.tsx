import { Metadata } from "next";

import { Suspense } from "react";
import LoginForm from "@/components/LoginForm";
import { Gradient } from "@/components/Gradient";

export const metadata: Metadata = {
  title: "Login",
};

export default async function Login() {
  return (
    <div>
      <Gradient
        heightClass="h-6 md:h-16 lg:h-24"
        additionalClass="border-b-1"
      />
      <section className="mt-4 md:mt-16 flex justify-center items-center px-2 md:px-32 lg:px-80">
        <Suspense>
          <LoginForm />
        </Suspense>
      </section>
      <section className="flex justify-center mt-2 px-2 md:px-32 lg:px-80">
        <p className="text-xs text-[var(--muted-foreground)] text-wrap">
          Please contact{" "}
          <a href="https://sayantanghosh.in" className="text-primary underline">
            Sayantan Ghosh
          </a>{" "}
          for any issues or queries.
        </p>
      </section>
    </div>
  );
}
