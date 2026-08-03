import React from "react";
import { Metadata } from "next";
import CourseOverviewClient from "./CourseOverviewClient";

interface CourseOverviewPageProps {
  params: {
    courseId: string;
  };
}

export async function generateStaticParams() {
  return [
    { courseId: "course-1" },
    { courseId: "course-2" },
  ];
}

export async function generateMetadata({ params }: CourseOverviewPageProps): Promise<Metadata> {
  const courseId = params.courseId || "course-1";
  const title =
    courseId === "course-2"
      ? "Spoken Conversational Fusha | Al-Arabi Academy"
      : "Classical Arabic Grammar (Nahw & Sarf) | Al-Arabi Academy";

  return {
    title,
    description:
      "Structured curriculum track with zero transliteration, vowelled Tashkeel script, and classical capstone passages.",
    openGraph: {
      title,
      description: "Classical Arabic Grammar & Spoken Dialogue Curriculum",
    },
  };
}

export default function CourseOverviewPage({ params }: CourseOverviewPageProps) {
  const courseId = params.courseId || "course-1";
  return <CourseOverviewClient courseId={courseId} />;
}
