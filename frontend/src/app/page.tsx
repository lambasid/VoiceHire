"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Mic } from "lucide-react";
import { useRouter } from "next/navigation";
import FakeSpectrumVisualizer from "@/components/FakeSpectrumVisualizer";
import RotatingText from "@/components/RotatingText";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [showAssistant, setShowAssistant] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        event.target instanceof Node &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleAssistant = () => {
    setShowAssistant((prev) => !prev);
    console.log(!showAssistant ? "Assistant activated" : "Assistant closed");
  };

  return (
    <div className="relative flex flex-col items-center justify-center p-4 w-full flex-1 min-h-[calc(100dvh-3.5rem)] md:min-h-dvh overflow-hidden">
      {/* Colorful background layers */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(1200px_600px_at_10%_-10%,rgba(196,181,253,0.45),transparent_60%),radial-gradient(1000px_700px_at_100%_10%,rgba(125,211,252,0.4),transparent_60%),radial-gradient(900px_700px_at_30%_110%,rgba(253,164,175,0.4),transparent_60%),linear-gradient(180deg,#fefcff,#f0f9ff)] dark:bg-[radial-gradient(1200px_600px_at_10%_-10%,rgba(139,92,246,0.25),transparent_60%),radial-gradient(1000px_700px_at_100%_10%,rgba(56,189,248,0.22),transparent_60%),radial-gradient(900px_700px_at_30%_110%,rgba(244,114,182,0.18),transparent_60%),linear-gradient(180deg,#0b1020,#0a0f1c)]" />
      <div className="absolute inset-0 z-0 w-full h-full opacity-70 dark:opacity-90">
        <FakeSpectrumVisualizer />
      </div>
      {/* Soft top-to-bottom overlay for legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/30 to-transparent dark:from-slate-950/85 dark:via-slate-950/40 dark:to-transparent z-1 pointer-events-none" />

      {/* Foreground content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center z-10"
      >
        {/* Microphone Icon */}
        <div className="relative w-20 h-20 sm:w-28 sm:h-28 mx-auto mb-2">
          <motion.div
            whileTap={{ scale: 0.9, rotate: -5 }}
            whileHover={{ scale: 1.1 }}
            onClick={toggleAssistant}
            className={`relative z-10 w-20 h-20 sm:w-28 sm:h-28 flex items-center justify-center rounded-full cursor-pointer transition-all duration-300 ease-in-out shadow-lg
              ${showAssistant
                ? "bg-gradient-to-br from-rose-400 to-pink-500 text-white shadow-rose-400/50 animate-pulse"
                : "bg-gradient-to-br from-violet-500 via-sky-500 to-cyan-400 text-white hover:scale-[1.1] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)]"
              }`}
          >
            <Mic className="w-6 h-6 sm:w-8 sm:h-8" />
          </motion.div>
        </div>

        {/* Assistant Greeting Popup */}
        <AnimatePresence>
          {showAssistant && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4 }}
              className="mt-6 inline-block bg-gradient-to-r from-violet-500 to-sky-500 text-white px-5 py-3 rounded-xl shadow-lg shadow-violet-300/40"
            >
              <RotatingText
                texts={[
                  "Hi, how can I help you today?",
                  "Hola, ¿cómo puedo ayudarte hoy?",
                  "Bonjour, comment puis-je vous aider aujourd'hui ?",
                  "你好，我今天能帮你什么吗？",
                ]}
                mainClassName="px-2 sm:px-2 md:px-3 text-white font-mono font-semibold overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
                staggerFrom={"first"}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.01}
                splitLevelClassName="overflow-hidden"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={3000}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-mono font-bold mt-8 bg-gradient-to-r from-violet-600 via-sky-500 to-rose-500 bg-clip-text text-transparent">
          Welcome to VoiceHire
        </h1>
        <div className="flex justify-center items-center flex-wrap gap-1">
          <p className="mt-4 text-base sm:text-lg font-mono text-slate-700 px-4">
            Your AI-powered recruitment{" "}
          </p>
          <RotatingText
            texts={["assistant", "friend", "helper", "aide"]}
            mainClassName="px-2 sm:px-2 md:px-3 mt-4 font-bold font-mono bg-gradient-to-r from-violet-500 to-sky-500 text-white overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg shadow-md shadow-violet-300/40"
            staggerFrom={"first"}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            staggerDuration={0.025}
            splitLevelClassName="overflow-hidden"
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            rotationInterval={2000}
          />
        </div>

        <div className="flex flex-wrap justify-center mt-10 gap-3 relative z-20">
          <div className="relative" ref={dropdownRef}>
            <Button
              onClick={() => setOpen(!open)}
              className="bg-gradient-to-r from-violet-500 to-sky-500 font-mono text-white px-4 py-2 rounded hover:from-violet-600 hover:to-sky-600 shadow-md shadow-violet-300/40"
            >
              Create Screenline ▾
            </Button>

            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 mt-0 w-48 bg-white/95 backdrop-blur border font-mono font-extralight border-violet-200 rounded-xl shadow-lg shadow-violet-200/40 overflow-hidden text-slate-700"
                >
                  <button
                    onClick={() => {
                      setOpen(false);
                      console.log("Create Job Post");
                    }}
                    className="block w-full px-4 py-2 text-left hover:bg-violet-50 hover:text-violet-700 transition text-sm"
                  >
                    Create Job Post
                  </button>
                  <button
                    onClick={() => {
                      setOpen(false);
                      router.push("/create/jobs");
                    }}
                    className="block w-full px-4 py-2 text-left hover:bg-sky-50 hover:text-sky-700 transition text-sm"
                  >
                    View Job Postings
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Button className="bg-gradient-to-r from-rose-500 to-pink-500 font-mono text-white px-4 py-2 rounded hover:from-rose-600 hover:to-pink-600 shadow-md shadow-rose-300/40">
            Analyze
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
