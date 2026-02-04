import { useContext } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Tasks from "./Tasks";

function Dashboard() {
  const { user } = useContext(AuthContext);
  const name = user?.name || "Admin";

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.06,
      },
    },
  };

  const letter = {
    hidden: { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.35,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="px-6 pt-10">
        <h1
          className="mb-10 leading-none select-none font-bold"
          style={{
            fontFamily: "FreeFat, system-ui, sans-serif",
            fontSize: "clamp(4rem, 11vw, 8rem)",
            letterSpacing: "0.02em",
          }}
        >
          WELCOME,&nbsp;
          <motion.span
            variants={container}
            initial="hidden"
            animate="visible"
            className="inline-block text-slate-800"
          >
            {name.toUpperCase().split("").map((char, i) => (
              <motion.span key={i} variants={letter} className="inline-block">
                {char}
              </motion.span>
            ))}
            !
          </motion.span>
        </h1>

        <div className="max-w-6xl">
          <Tasks />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
