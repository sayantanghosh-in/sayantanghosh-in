import {
  IconBrandYoutube,
  IconBrandInstagram,
  IconBrandFacebook,
  IconQuestionMark,
  IconExternalLink,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { contentCreation } from "@/lib/constants";

export const ContentCreation = () => {
  const getContentIcon = (id: string): React.ReactNode => {
    switch (id) {
      case "facebook":
        return <IconBrandFacebook size={14} />;
      case "instagram":
        return <IconBrandInstagram size={14} />;
      case "youtube":
        return <IconBrandYoutube size={14} />;
      default:
        return <IconQuestionMark size={14} />;
    }
  };
  return (
    <section className="border-t-1 px-2 md:px-32 lg:px-80">
      <div className="border-x-1 p-2">
        <div className="flex items-start gap-2 pb-2 mb-2 border-b">
          <Image
            src="/the-dev-guide-logo.png"
            alt="the-dev-guide-logo"
            width={48}
            height={48}
          />
          <div>
            <h2 className="text-blue-800">TheDevGuide</h2>
            <p className="text-xs">
              Master the core. Build for the future. This is the space where I
              am creating content based on all the knowledge that I have
              acquired working in the industry. I will also post short videos
              and content regarding other languages and frameworks outside my
              experience.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-0.5">
          {contentCreation?.map((content) => {
            return (
              <Link
                href={content?.url}
                target="_blank"
                key={`content-creation-platform-${content?.id}`}
                className="flex items-center gap-1 w-fit hover:underline hover:text-blue-800 hover:scale-105"
              >
                {getContentIcon(content?.id)}
                <span className="font-light text-xs italic hover:font-semibold">
                  {content?.label}
                </span>
                <IconExternalLink size={9} />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
