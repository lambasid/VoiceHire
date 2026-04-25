import type { ReactNode } from "react";

/**
 * Layout for /create/* routes. Nests inside the root layout; do not add <html> or <body> here.
 */
export default function CreateLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-0 min-w-0 flex-1">{children}</div>;
}
