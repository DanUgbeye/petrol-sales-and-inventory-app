import Navbar from "@/client/presentation/_shared/components/Navbar/Navbar";
import React, { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

export interface PrimaryLayoutProps extends PropsWithChildren {
  className?: string;
}

function PrimaryLayout(props: PrimaryLayoutProps) {
  const { children, className } = props;

  return (
    <div className={twMerge(" min-h-[100vh] h-full w-full ", className || "")}>
      <Navbar />

      {children}
    </div>
  );
}

export default PrimaryLayout;
