import { ReactNode } from "react";
import Dock from "./Dock";
import useGoogleAnalytics from "../hooks/useGoogleAnalytics";

const Layout = ({ children }: { children: ReactNode }) => {
  useGoogleAnalytics("G-T8Y5800CFZ");
  return (
    <div className="min-h-screen bg-background">
      <Dock />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
