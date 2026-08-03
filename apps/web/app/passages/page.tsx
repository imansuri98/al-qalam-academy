import React from "react";
import { Metadata } from "next";
import LearnerPassagesClient from "./LearnerPassagesClient";

export const metadata: Metadata = {
  title: "Classical Passages Studio | Al-Arabi Academy",
  description:
    "Immerse yourself in authentic Classical Arabic Quran, Hadith, and Literature capstone passages with vowelled Tashkeel and I'rab parsing drills.",
  openGraph: {
    title: "Classical Passages Studio | Al-Arabi Academy",
    description:
      "Interactive Quranic & Literature Capstone Passages with I'rab Parsing Drills.",
  },
};

export default function LearnerPassagesPage() {
  return <LearnerPassagesClient />;
}
