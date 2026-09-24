import type { Metadata } from "next";
import { Suspense } from "react";

import LoginForm from "@/components/LoginForm";

export const metadata: Metadata = {
  title: "Login",
  robots: { index: false, follow: false },
};

export default function Login() {
  return (
    <section className="border-b border-line">
      <div className="container-page">
        <div className="rails flex flex-col items-center px-4 py-20 sm:px-8 sm:py-28">
          <Suspense>
            <LoginForm />
          </Suspense>
          <p className="mt-6 max-w-sm text-center text-xs text-fg-3">
            Please contact{" "}
            <a
              href="https://sayantanghosh.in"
              className="text-accent-ink underline underline-offset-4"
            >
              Sayantan Ghosh
            </a>{" "}
            for any issues or queries.
          </p>
        </div>
      </div>
    </section>
  );
}
