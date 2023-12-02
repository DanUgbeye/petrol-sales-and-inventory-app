import Link, { LinkProps } from "next/link";
import React, { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface NavLinkProps extends LinkProps, HTMLAttributes<HTMLAnchorElement> {}

export default function NavLink(props: NavLinkProps) {
  const { children, className, ...rest } = props;

  return (
    <Link
      {...rest}
      className={twMerge(
        " text-white underline-offset-4 hover:underline ",
        className
      )}
    >
      {children}
    </Link>
  );
}
