import Image from "next/image";
import Link from "next/link";

import { Gradient } from "./components/Gradient";
import { BasicDetails } from "./components/BasicDetails";
import { Experience } from "./components/Experience";
import { About } from "./components/About";
import { Button } from "@/components/ui/button";
import { Social } from "./components/Social";

export default function Home() {
  return (
    <div>
      <section className="px-2 md:px-32 lg:px-96">
        <div className="flex items-center gap-0.25 border-x-1">
          <Image
            alt="Sayantan Ghosh Photo"
            src="/sayantan.png"
            width={90}
            height={90}
            className="w-[90px] h-[90px] md:w-[130px] md:h-[130px] lg:w-[160px] lg:h-[160px] rounded-full"
          />
          <div className="w-full flex flex-col justify-start border-l-1">
            <Gradient heightClass="h-6 md:h-16 lg:h-24" />
            <h1 className="border-t-1 pt-2 pl-2 text-3xl font-semibold">
              Sayantan Ghosh
            </h1>
            <h2 className="border-t-1 mt-0.25 pt-1.25 pl-2 pb-1.25 text-sm text-[var(--accent-foreground)]">
              Frontend Developer
            </h2>
          </div>
        </div>
      </section>
      <Gradient additionalClass="border-t-1" />
      <section className="border-t-1 px-2 md:px-32 lg:px-96">
        <BasicDetails />
      </section>
      <Gradient additionalClass="border-t-1" />
      <section className="border-t-1 px-2 md:px-32 lg:px-96">
        <About />
      </section>
      <Gradient additionalClass="border-t-1" />
      <section className="border-t-1 px-2 md:px-32 lg:px-96">
        <Social />
      </section>
      <Gradient additionalClass="border-t-1" />
      <section className="border-t-1 px-2 md:px-32 lg:px-96">
        <h2 className="text-2xl font-semibold">Experience</h2>
      </section>
      <Experience />
      <Gradient additionalClass="border-t-1" />
      <section className="border-t-1 px-2 md:px-32 lg:px-96">
        <h2 className="text-2xl font-semibold">Projects</h2>
      </section>
      <section className="border-t-1 px-2 md:px-32 lg:px-96">
        <div className="border-x-1 px-2 flex justify-center py-2">
          <Button asChild>
            <Link target="_blank" href="https://github.com/sayantanghosh-in">
              Show all Projects
            </Link>
          </Button>
        </div>
      </section>
      <Gradient additionalClass="border-t-1" />
      <section className="border-t-1 px-2 md:px-32 lg:px-96">
        <h2 className="text-2xl font-semibold">Blog</h2>
      </section>
      <section className="border-t-1 px-2 md:px-32 lg:px-96">
        <div className="border-x-1 px-2 flex justify-center py-2">
          <Button asChild>
            <Link href="/blog">Show all Posts</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
