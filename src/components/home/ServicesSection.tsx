import { motion } from "framer-motion";
import Reveal from "../Reveal";
import { services } from "../../data/home";

const ServicesSection = () => {
  return (
    <section
      className="relative z-10 max-w-[1400px] mx-auto border-t"
      style={{ borderColor: "rgba(var(--surface),0.05)" }}
    >
      <div className="flex flex-col justify-center min-h-screen px-6 max-w-7xl mx-auto py-20 md:py-32">
        <Reveal className="mb-16">
          <p className="text-blue-400 font-mono text-[10px] uppercase tracking-[0.4em] mb-6">
            // WHAT I DELIVER
          </p>
          <h1 className="text-5xl sm:text-8xl font-bold tracking-tighter leading-[1.0] mb-8 uppercase">
            Engineering <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground to-muted-foreground italic">
              Specialties.
            </span>
          </h1>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {services.map((service, i) => {
            const ServiceIcon = service.icon;
            return (
              <Reveal key={service.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="group relative h-full rounded-[2rem] cursor-pointer"
                >
                  <div
                    className={`relative h-full p-8 rounded-[2rem] backdrop-blur-xl border overflow-hidden transition-all duration-500 ${service.hoverBorder}`}
                    style={{
                      background: "rgba(var(--surface),0.03)",
                      borderColor: "rgba(var(--surface),0.1)",
                    }}
                  >
                    <div
                      className={`absolute -top-24 -right-24 w-48 h-48 blur-[80px] rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${service.glow}`}
                    />
                    <div
                      className={`mb-6 w-14 h-14 flex items-center justify-center rounded-xl border text-muted-foreground transition-all duration-300 ${service.accent} group-hover:scale-110`}
                      style={{
                        background: "rgba(var(--surface),0.05)",
                        borderColor: "rgba(var(--surface),0.1)",
                      }}
                    >
                      <ServiceIcon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold mb-3 tracking-tight text-foreground/90 transition-colors duration-300 group-hover:text-foreground uppercase">
                      {service.title}
                    </h3>
                    <div
                      className={`w-12 h-[2px] mb-4 transition-all duration-500 group-hover:w-full ${service.glow}`}
                    />
                    <p className="text-sm text-muted-foreground leading-relaxed font-light transition-colors duration-300 group-hover:text-foreground/80">
                      {service.desc}
                    </p>
                  </div>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
