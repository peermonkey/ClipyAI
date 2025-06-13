"use client";

import { Button, Card } from "@xclips/ui";
import { motion } from "framer-motion";
import {
  SparklesIcon,
  VideoCameraIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/solid";

const features = [
  {
    title: "AI Highlights",
    desc: "GPT-4 finds viral-worthy moments in seconds – no manual scrubbing.",
    Icon: SparklesIcon,
  },
  {
    title: "Auto Captions & Hashtags",
    desc: "Burned-in subtitles, emojis and keyword hashtags in 98+ languages.",
    Icon: VideoCameraIcon,
  },
  {
    title: "4K Exports",
    desc: "Crystal-clear output for Shorts, Reels and TikTok (H.264 or ProRes).",
    Icon: ArrowPathIcon,
  },
];

export default function LandingPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 sm:px-8 pb-24 bg-gradient-to-b from-surface-matte to-black text-center">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-3xl mx-auto"
      >
        <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight mb-4">
          Turn long-form videos into viral clips <span className="text-primary-neon">in minutes</span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-text-muted mb-10">
          XClips.ai automatically spots the best moments, adds captions & hashtags, and
          exports ready-to-post files for every social platform.
        </p>
        <Button
          label="Get started for free"
          size="lg"
          onClick={() => (window.location.href = "/login")}
        />
      </motion.div>

      {/* Feature grid */}
      <section className="mt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-6xl px-4">
        {features.map(({ title, desc, Icon }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          >
            <Card elevation="glass" className="h-full">
              <div className="flex items-start gap-4">
                <Icon className="w-8 h-8 flex-shrink-0 text-primary-neon" />
                <div className="text-left">
                  <h3 className="text-xl font-semibold mb-1">{title}</h3>
                  <p className="text-sm text-text-muted leading-relaxed">{desc}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </section>
    </main>
  );
}
