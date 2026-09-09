import "./style.css";
import type { ReactNode } from "react";
export const metadata = { title: "Your web app" };
export default function Layout({ children }: { children: ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
