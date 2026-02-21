import { useState } from "react";
import { X, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "../components/Reveal";

const certificates = [
  { title: "AWS Solutions Architect", issuer: "Amazon Web Services", date: "2024", description: "Professional-level certification validating expertise in designing distributed systems on AWS, including compute, storage, networking, and security best practices." },
  { title: "Google Cloud Professional", issuer: "Google", date: "2023", description: "Demonstrates ability to design, develop, and manage robust cloud architectures using Google Cloud Platform services." },
  { title: "Kubernetes Administrator", issuer: "CNCF", date: "2023", description: "Certified Kubernetes Administrator credential proving skills in cluster management, networking, storage, and security for production workloads." },
  { title: "Meta Frontend Developer", issuer: "Meta / Coursera", date: "2022", description: "Professional certificate covering React, JavaScript, UI/UX principles, and frontend testing methodologies." },
  { title: "HashiCorp Terraform", issuer: "HashiCorp", date: "2022", description: "Infrastructure as Code certification demonstrating proficiency in provisioning and managing cloud resources with Terraform." },
  { title: "MongoDB Developer", issuer: "MongoDB University", date: "2021", description: "Validates knowledge of MongoDB data modeling, CRUD operations, aggregation framework, and performance optimization." },
];

const Certificates = () => {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="min-h-screen pb-28">
      <section className="px-6 pt-16 pb-16">
        <Reveal className="max-w-6xl mx-auto">
          <p className="font-mono text-sm text-muted-foreground tracking-widest uppercase mb-4">
            Certificates
          </p>
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-6">
            Credentials.
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Industry-recognized certifications that validate my expertise across cloud platforms,
            container orchestration, frontend development, and infrastructure automation.
          </p>
        </Reveal>
      </section>

      <div className="w-full h-px bg-border" />

      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {certificates.map((cert, i) => (
            <Reveal key={cert.title} delay={i * 0.08}>
              <button
                onClick={() => setSelected(i)}
                className="w-full text-left glass rounded-2xl p-6 group hover:border-foreground/20 transition-all hover:scale-[1.02] duration-300 h-full flex flex-col"
              >
                <div className="w-full aspect-[4/3] rounded-xl bg-accent mb-4 flex items-center justify-center">
                  <span className="font-mono text-xs text-muted-foreground">Certificate</span>
                </div>
                <h3 className="font-semibold mb-1">{cert.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{cert.issuer}</p>
                <p className="text-xs text-muted-foreground leading-relaxed flex-1">{cert.description}</p>
                <p className="font-mono text-xs text-muted-foreground mt-3">{cert.date}</p>
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-background/90 backdrop-blur-xl"
            onClick={() => setSelected(null)}
          >
            <button onClick={() => setSelected(null)} className="absolute top-6 right-6 p-2 glass rounded-xl">
              <X className="w-5 h-5" />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass rounded-2xl p-8 max-w-lg w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full aspect-[4/3] rounded-xl bg-accent mb-6 flex items-center justify-center">
                <span className="font-mono text-sm text-muted-foreground">Certificate Image</span>
              </div>
              <h2 className="text-2xl font-bold mb-2">{certificates[selected].title}</h2>
              <p className="text-muted-foreground mb-3">{certificates[selected].issuer}</p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{certificates[selected].description}</p>
              <div className="flex items-center justify-between">
                <p className="font-mono text-xs text-muted-foreground">{certificates[selected].date}</p>
                <a href="#" className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
                  <ExternalLink className="w-3.5 h-3.5" /> Verify
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Certificates;
