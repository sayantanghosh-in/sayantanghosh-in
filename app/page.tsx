import { Nav } from "./components/Nav";

export default function Home() {
  return (
    <div className="px-4 md:px-12 py-4 flex flex-col md:flex-row gap-4">
      <header className="md:w-[48%] md:sticky md:top-0 md:py-24 md:max-h-screen flex flex-col justify-between">
        <div>
          <h1 className="text-4xl font-bold color-foreground">
            <a href="/">Sayantan Ghosh</a>
          </h1>
          <h2 className="mt-2 text-sm text-[var(--color-green-accent)]">
            Front End Engineer
          </h2>
          <p className="max-w-[450px] mt-2 text-sm text-foreground">
            I like digging deep into how things work. I experiment with new
            technology all the time. Reach out to me on my socials.
          </p>
          <Nav />
        </div>
        <ul className="mt-4 md:mt-16 flex gap-2 items-center">
          <li>
            <a href="https://github.com/sayantanghosh-in">Github</a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/sayantanghosh-in/">Linkedin</a>
          </li>
          <li>
            <a href="https://x.com/sayantan__ghosh">X</a>
          </li>
          <li>
            <a href="https://www.instagram.com/sayantanghosh_in/">Instagram</a>
          </li>
        </ul>
      </header>
      <main className="md:w-[52%] md:py-24 md:max-h-screen">
        <section id="about">About section</section>
        <section id="experience">Experience section</section>
        <section id="projects">Projects section</section>
      </main>
    </div>
  );
}
