import { getToc } from "@/services/enki-data";
import { NavLink } from "./NavLink";
import { Suspense } from "react";

export async function SidebarNav() {
  const toc = await getToc(true);

  return (
    <ul>
      {toc.map(({ slug, title }) => (
        <li key={slug}>
          <Suspense>
            <NavLink href={slug}>{title}</NavLink>
          </Suspense>
        </li>
      ))}
    </ul>
  );
}
