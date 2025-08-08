import Image from "next/image";

import { Nav } from "./components/Nav";
import { Gradient } from "./components/Gradient";
import { BasicDetails } from "./components/BasicDetails";
import { Experience } from "./components/Experience";

export default function Home() {
  return (
    <div>
      <header className="sticky top-0 mt-1 border-y-1 bg-background px-2 md:px-32 lg:px-96">
        <Nav />
      </header>
      <main>
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
              <h6 className="border-t-1 mt-0.25 pt-1.25 pl-2 pb-1.25 text-sm text-[var(--accent-foreground)]">
                Frontend Developer
              </h6>
            </div>
          </div>
        </section>
        <Gradient additionalClass="border-t-1" />
        <section className="border-t-1 px-2 md:px-32 lg:px-96">
          <BasicDetails />
        </section>
        <Gradient additionalClass="border-t-1" />
        <section className="border-t-1 px-2 md:px-32 lg:px-96">
          <h2 className="text-2xl font-semibold">Experience</h2>
        </section>
        <Experience />
        <Gradient additionalClass="border-t-1" />
        <section className="border-t-1 px-2 md:px-32 lg:px-96">
          projects
        </section>
        <Gradient additionalClass="border-t-1" />
        <section className="border-t-1 px-2 md:px-32 lg:px-96">blog</section>
      </main>
      <footer className="border-y-1 px-2 md:px-32 lg:px-96">
        <section>social links</section>
        <section>copyright</section>
      </footer>
    </div>
  );
}
