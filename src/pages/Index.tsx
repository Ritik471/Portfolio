import usePageTitle from "../hooks/usePageTitle";
import BackgroundLayer from "../components/home/BackgroundLayer";
import HeroSection from "../components/home/HeroSection";
import ServicesSection from "../components/home/ServicesSection";
import PrinciplesSection from "../components/home/PrinciplesSection";
import TechStackSection from "../components/home/TechStackSection";
import GitHubSection from "../components/home/GitHubSection";
import CtaFooter from "../components/home/CtaFooter";

const Index = () => {
  usePageTitle("Software Engineer & Frontend Architect");

  return (
    <div className="relative min-h-screen themed-bg themed-text selection:bg-blue-500 overflow-x-hidden">
      <BackgroundLayer />
      <HeroSection />
      <ServicesSection />
      <PrinciplesSection />
      <TechStackSection />
      <GitHubSection />
      <CtaFooter />
    </div>
  );
};

export default Index;
