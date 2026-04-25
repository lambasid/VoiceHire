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
    <div className="relative h-screen flex flex-col items-center justify-center p-4 max-w-screen w-screen overflow-hidden bg-gray-900">
      {/* Background visualizer layer */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <FakeSpectrumVisualizer />
      </div>
      {/* Gradient overlay for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent z-1 pointer-events-none" />

      {/* Foreground content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center z-10"
      >
        {/* Microphone Icon */}
        <div className="relative w-28 h-28 mx-auto mb-2">
          <motion.div
            whileTap={{ scale: 0.9, rotate: -5 }}
            whileHover={{ scale: 1.1 }}
            onClick={toggleAssistant}
            className={`relative z-10 w-28 h-28 flex items-center justify-center rounded-full cursor-pointer transition-all duration-300 ease-in-out
              ${showAssistant
                ? "bg-red-500 text-white shadow-xl animate-pulse"
                : "bg-gray-800 text-white hover:bg-gray-700 hover:scale-[1.15] hover:shadow-[0_0_20px_rgba(59,130,246,0.6)]"
              }`}
          >
            <Mic className="w-8 h-8" />
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
              className="mt-6 inline-block bg-blue-600 text-white px-5 py-3 rounded-xl shadow-lg"
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

        <h1 className="text-4xl font-mono font-bold mt-8 text-white">
          Welcome to VoiceHire
        </h1>
        <div className="flex justify-center items-center ">
          <p className="mt-4 text-lg font-mono text-blue-200 px-4">
            Your AI-powered recruitment{" "}
          </p>
          <RotatingText
            texts={["assistant", "friend", "helper", "aide"]}
            mainClassName="px-2 sm:px-2 md:px-3 mt-4 font-bold font-mono bg-blue-500 text-white overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
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

        <div className="flex justify-center mt-10 space-x-4 relative z-20">
          <div className="relative" ref={dropdownRef}>
            <Button
              onClick={() => setOpen(!open)}
              className="bg-blue-600 font-mono text-white px-4 py-2 rounded hover:bg-blue-700 shadow-md"
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
                  className="absolute left-0 mt-0 w-48 bg-gray-900 border font-mono font-extralight border-gray-700 rounded-xl shadow-lg overflow-hidden"
                >
                  <button
                    onClick={() => {
                      setOpen(false);
                      console.log("Create Job Post");
                    }}
                    className="block w-full px-4 py-2 text-left hover:bg-gray-700 transition text-sm"
                  >
                    Create Job Post
                  </button>
                  <button
                    onClick={() => {
                      setOpen(false);
                      router.push("/create/jobs");
                    }}
                    className="block w-full px-4 py-2 text-left hover:bg-gray-700 transition  text-sm"
                  >
                    View Job Postings
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Button className="bg-blue-600 font-mono text-white px-4 py-2 rounded hover:bg-blue-700 shadow-md">
            Analyze
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
