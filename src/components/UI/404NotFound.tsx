"use client";
import { motion } from "framer-motion";
import { GiBrokenBone } from "react-icons/gi";

const NotFound404 = () => {
  return (
    <div className="grid place-content-center overflow-hidden px-4 py-36">
      <Ping />
    </div>
  );
};

const LOOP_DURATION = 4;

const Ping = () => {
  return (
    <div className="relative">
      <Logo />
      <Band delay={0} />
      <Band delay={LOOP_DURATION * 0.25} />
      <Band delay={LOOP_DURATION * 0.5} />
      <Band delay={LOOP_DURATION * 0.75} />
    </div>
  );
};

const Logo = () => {
  // Temp logo from https://logoipsum.com/
  return (
    <motion.div
      className="relative z-10 fill-red-100 flex justify-center items-center text-center w-16 h-16 text-6xl text-rose-300"
      initial={{
        opacity: 0,
        scale: 0.85,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        duration: 1,
        ease: "easeOut",
      }}>
      <div className="flex justify-center items-center">
        {/* <MdHeartBroken  /> */}
        <GiBrokenBone />
      </div>
    </motion.div>
  );
};

const Band = ({ delay }: { delay: number }) => {
  return (
    <motion.span
      style={{
        translateX: "-50%",
        translateY: "-50%",
      }}
      initial={{
        opacity: 0,
        scale: 0.25,
      }}
      animate={{
        opacity: [0, 1, 1, 0],
        scale: 1,
      }}
      transition={{
        repeat: Infinity,
        repeatType: "loop",
        times: [0, 0.5, 0.75, 1],
        duration: LOOP_DURATION,
        ease: "linear",
        delay,
      }}
      className="absolute left-[50%] top-[50%] z-0 h-56 w-56 rounded-full border-[1px] border-red-500 bg-gradient-to-br from-red-500/50 to-red-800/20 shadow-xl shadow-red-500/40"
    />
  );
};

export default NotFound404;
