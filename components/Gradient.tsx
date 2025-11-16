"use client";
import { useMemo } from "react";

interface GradientProps {
  additionalClass?: string;
  heightClass?: string;
  widthClass?: string;
}

export const Gradient = (props: GradientProps) => {
  const className = useMemo(() => {
    return `${
      typeof props?.additionalClass === "string" &&
      props?.additionalClass?.length > 0
        ? props?.additionalClass
        : ""
    } bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] [--pattern-foreground:var(--border)]/56 ${
      props?.widthClass ? props?.widthClass : "w-full"
    } ${props?.heightClass ? props?.heightClass : "h-6"}`;
  }, [props?.additionalClass, props?.heightClass, props?.widthClass]);
  return <div className={className} />;
};
