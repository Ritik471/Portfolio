import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

const BackgroundLayer = () => {
  const { scrollY } = useScroll();
  const yBg1 = useTransform(scrollY, [0, 1000], [0, 300]);
  const yBg2 = useTransform(scrollY, [0, 1000], [0, -200]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const cursorX = useSpring(mouseX, { stiffness: 100, damping: 20, mass: 0.5 });
  const cursorY = useSpring(mouseY, { stiffness: 100, damping: 20, mass: 0.5 });

  return (
    <>
      <motion.div
        className="pointer-events-none fixed inset-0 z-50 w-8 h-8 rounded-full bg-blue-500/60 dark:bg-blue-500/40 blur-xl mix-blend-multiply dark:mix-blend-screen transition-colors duration-300"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        <motion.div
          style={{ y: yBg1 }}
          className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-blue-600/10 blur-[140px] rounded-full animate-pulse"
        />
        <motion.div
          style={{ y: yBg2 }}
          className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] bg-purple-600/10 blur-[140px] rounded-full"
        />
        <div className="absolute -bottom-[10%] left-[10%] w-[50%] h-[50%] bg-emerald-600/5 blur-[140px] rounded-full" />
      </div>
    </>
  );
};

export default BackgroundLayer;
