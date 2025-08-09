import Link from "next/link";
import {
  IconBriefcase,
  IconMail,
  IconMapPin,
  IconPhone,
  IconWorld,
} from "@tabler/icons-react";

export const BasicDetails = () => {
  return (
    <div className="flex flex-col gap-2 border-x-1 p-2">
      <p className="text-balance text-sm text-[var(--accent-foreground)] flex gap-1.25 items-center">
        <IconBriefcase
          size={16}
          color="var(--accent-foreground)"
          stroke={1.5}
        />{" "}
        Senior Software Engineer at <span className="font-semibold">Synup</span>
      </p>
      <p className="text-sm text-[var(--accent-foreground)] flex gap-1.25 items-center">
        <IconMapPin size={16} color="var(--accent-foreground)" stroke={1.5} />{" "}
        Bengaluru, India
      </p>
      <Link
        href="https://sayantanghosh.in"
        className="text-sm text-[var(--accent-foreground)] flex gap-1.25 items-center"
      >
        <IconWorld size={16} color="var(--accent-foreground)" stroke={1.5} />{" "}
        https://sayantanghosh.in
      </Link>
      <Link
        href="tel:+917697505444"
        className="text-sm text-[var(--accent-foreground)] flex gap-1.25 items-center"
      >
        <IconPhone size={16} color="var(--accent-foreground)" stroke={1.5} />{" "}
        +91-7697505444
      </Link>
      <Link
        href="mailto:sayantan.ghosh03@gmail.com"
        className="text-sm text-[var(--accent-foreground)] flex gap-1.25 items-center"
      >
        <IconMail size={16} color="var(--accent-foreground)" stroke={1.5} />{" "}
        sayantan.ghosh03@gmail.com
      </Link>
    </div>
  );
};
