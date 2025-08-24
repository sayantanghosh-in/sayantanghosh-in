import { IconBrandGithub, IconPoint, IconWriting } from "@tabler/icons-react";
import Link from "next/link";
import { projects } from "@/lib/constants";
import Image from "next/image";

export const Projects = () => {
  return projects?.map((project) => {
    return (
      <section key={project?.id} className="border-t-1 px-2 md:px-32 lg:px-96">
        <div className="border-x-1 p-2">
          <div className="flex items-start gap-2">
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold mb-0.5 underline max-w-[150px] text-wrap break-all">
                <Link href={project?.urls?.landingPage}>{project?.title}</Link>
              </h3>
              <p className="text-xs text-muted-foreground mb-1">
                {project?.timeline}
              </p>
              <div className="flex gap-2 items-center mb-2">
                <Link
                  aria-label="GotoDash github"
                  target="_blank"
                  href={project?.urls?.github}
                >
                  <IconBrandGithub
                    size={16}
                    stroke={1.5}
                    color="var(--accent-foreground)"
                  />
                </Link>
                <Link
                  aria-label="GotoDash blog post"
                  href={project?.urls?.blogPost}
                >
                  <IconWriting
                    size={16}
                    stroke={1.5}
                    color="var(--accent-foreground)"
                  />
                </Link>
              </div>
            </div>
            <Image
              alt="project gif"
              src={project?.urls?.thumbnail}
              width={150}
              height={50}
            />
          </div>
          <p className="text-md mb-2">{project?.description}</p>
          <div className="flex flex-col gap-1">
            {project?.highlights?.map((highlight, highlightIndex) => {
              return (
                <div
                  key={`project-${project?.id}-highlight-${highlightIndex}`}
                  className="text-sm flex items-center gap-1"
                >
                  <IconPoint size={12} />
                  <p className="w-[calc(100%-12px)]">{highlight}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  });
};
