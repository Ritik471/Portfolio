import { ReactNode } from "react";
import Dock from "./Dock";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-background">
      <Dock />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
