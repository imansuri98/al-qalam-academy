import React from "react";
import { Metadata } from "next";
import ContactUsClient from "./ContactUsClient";

export const metadata: Metadata = {
  title: "Contact Us & Academic Support | Al-Arabi Academy",
  description:
    "Have questions about Classical Grammar (Nahw & Sarf) or Spoken Fusha? Contact our academic desk.",
  openGraph: {
    title: "Contact Us & Academic Support | Al-Arabi Academy",
    description: "Get in touch with Al-Arabi Academy support.",
  },
};

export default function ContactUsPage() {
  return <ContactUsClient />;
}
