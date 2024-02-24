"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { ReactNode } from "react";

export function NavLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  // TODO active state based on path
  const pathname = usePathname();

  // TODO retain searchParams as state
  const searchParams = useSearchParams();

  return <Link href={`${href}?${searchParams.toString()}`}>{children}</Link>;
}
