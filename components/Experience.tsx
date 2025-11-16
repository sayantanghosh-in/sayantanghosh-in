import { IconCode, IconPoint } from "@tabler/icons-react";

type ExperienceSub = {
  designation: string;
  date: string;
  exp: string[];
};

type Experience = {
  company: string;
  stack: string[];
  experience: ExperienceSub[];
};

const experiences: Experience[] = [
  {
    company: "Synup",
    stack: [
      "React.js",
      "Typescript",
      "Apollo Graphql",
      "Next.js",
      "Express",
      "Postgresql",
      "HTML5",
      "CSS3",
      "Javascript",
    ],
    experience: [
      {
        designation: "Senior Software Engineer",
        date: "Oct 2022 - Present",
        exp: [
          "Led UI development for new marketing products; mentored a team of junior developers and improved onboarding efficiency by ~25%.",
          "Standardized UI components with private npm package & Storybook, reducing customer churn by 15% with better UX predictability.",
          "Integrated advanced libraries (ag-Grid, dnd-kit), promoting application functionality and UX by over 20%.",
          "Worked independently on refactoring legacy codebase, reducing build times by 15% and page response times by 10%.",
          "Engaged with design and product teams and provided constructive feedback to all stakeholders uplifting communication efficiency.",
        ],
      },
      {
        designation: "Software Engineer",
        date: "May 2021 - Oct 2022",
        exp: [
          "Built multiple applications with third-party social media/CRM integrations, increasing company revenue by 10%.",
          "Implemented Test-Driven Development (TDD), enhancing code quality by 25% and reducing post-release defects by 18%.",
        ],
      },
    ],
  },
  {
    company: "Senseforth AI",
    stack: ["React.js", "Typescript", "HTML5", "CSS3", "Javascript"],
    experience: [
      {
        designation: "Software Engineer",
        date: "Jun 2020 - May 2021",
        exp: [
          "Upgraded conversational chatbot platform for BFSI domain, streamlining customer interactions and improving response times by 15%.",
          "Standardized marketing email development with mini framework, reducing templating effort by 30%.",
        ],
      },
    ],
  },
  {
    company: "Complile Inc.",
    stack: ["Vue.js", "Django", "HTML5", "CSS3", "Javascript"],
    experience: [
      {
        designation: "Software Developer",
        date: "Apr 2020 - Jun 2020",
        exp: [
          "Architected a frontend application for data visualization in the life sciences sector, increasing data platform adoption by 20%.",
        ],
      },
    ],
  },
  {
    company: "Impact Analytics",
    stack: [
      "React.js",
      "Express.js",
      "Postgresql",
      "HTML5",
      "CSS3",
      "Javascript",
    ],
    experience: [
      {
        designation: "Software Engineer",
        date: "Jan 2019 - Mar 2020",
        exp: [
          "Engineered full-stack applications (React.js, Node.js) for Retail Allocation, enhancing data consistency and UX by 22% via Redux.",
          "Designed & implemented APIs (Node.js, Express, PostgreSQL), optimizing backend performance and reducing latency by 15%.",
          "Contributed to overall product design discussions (frontend & backend) and won an internal hackathon award for the most realistic solution.",
        ],
      },
    ],
  },
  {
    company: "Tata Consultancy Services",
    stack: ["Angular 4", "Springboot", "Java", "HTML5", "CSS3", "Javascript"],
    experience: [
      {
        designation: "Assistant Systems Enginner",
        date: "Jul 2017 - Jan 2019",
        exp: [
          "Engineered Java/Spring Boot applications, including requirements analysis, design, development, and unit testing, delivering 5+ critical modules on schedule.",
          "Gained experience with Angular 4+ for UI development and developed applications using the MEAN stack.",
          "Led a team in an internal hackathon for microservices development in AWS, winning 1st prize in the business unit.",
        ],
      },
    ],
  },
];

export const Experience = () => {
  return experiences?.map((experience) => {
    return (
      <section
        key={experience?.company}
        className="border-t-1 px-2 md:px-32 lg:px-80"
      >
        <div className="border-x-1 p-2">
          <h3 className="text-xl font-semibold mb-2">{experience?.company}</h3>
          {experience?.experience?.map((exp, expIndex) => {
            return (
              <div
                className={expIndex > 0 ? "mt-2" : ""}
                key={`experience-${experience?.company}-exp-${expIndex}`}
              >
                <div className="flex gap-2 items-start">
                  <div className="rounded-full bg-[var(--secondary)] border-1 p-2">
                    <IconCode size={14} color="var(--secondary-foreground)" />
                  </div>
                  <div className="flex flex-col pr-2">
                    <p className="text-sm font-semibold flex items-center gap-2">
                      {exp?.designation}
                    </p>
                    <p className="text-xs italic">{exp?.date}</p>
                    <ul className="-mt-1.25 -ml-6 pt-1.75 pl-4 border-l-1">
                      {exp?.exp?.map((e, ei) => {
                        return (
                          <li
                            className="text-sm mt-2 flex items-start"
                            key={`experience-${experience?.company}-exp-${expIndex}-e-${ei}`}
                          >
                            <IconPoint size={12} className="mr-1 mt-1" />
                            <p className="w-[calc(100%-12px)]">{e}</p>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
          {Array?.isArray(experience?.stack) &&
          experience?.stack?.length > 0 ? (
            <div className="pt-2 mt-2 ml-7 flex flex-wrap items-center gap-2">
              {experience?.stack?.map((stack, stackIndex) => {
                return (
                  <div
                    className="p-1.5 rounded-lg text-xs text-[var(--secondary-foreground)] bg-[var(--secondary)]"
                    key={`${experience?.company}-stack-${stackIndex}`}
                  >
                    {stack}
                  </div>
                );
              })}
            </div>
          ) : (
            <></>
          )}
        </div>
      </section>
    );
  });
};
