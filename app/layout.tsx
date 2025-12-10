import "./globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://signal.nextwaveaisuite.com"),

  title: {
    default: "SignalForge — Decide What to Build Before You Waste Months",
    template: "%s | SignalForge",
  },

  description:
    "SignalForge evaluates real pain signals and tells you whether to BUILD, WATCH, or KILL an idea — with clear reasoning backed by demand, urgency, and automation fit.",

  keywords: [
    "startup validation",
    "idea validation tool",
    "saas ideas",
    "build or kill idea",
    "founder tools",
    "startup decision making",
    "ai startup validation",
    "nextwave ai",
    "signalforge",
  ],

  authors: [{ name: "NextWave AI Suite" }],
  creator: "NextWave AI Suite",
  publisher: "NextWave AI Suite",

  openGraph: {
    type: "website",
    url: "https://signal.nextwaveaisuite.com",
    title: "SignalForge — Decide What to Build",
    description:
      "Stop building ideas that feel good but solve weak pain. SignalForge tells you what to BUILD, WATCH, or KILL — before you waste months.",
    siteName: "SignalForge",
    images: [
      {
        url: "https://signal.nextwaveaisuite.com/og.png",
        width: 1200,
        height: 630,
        alt: "SignalForge — Startup Signal Validation",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "SignalForge — Decide What to Build",
    description:
      "SignalForge evaluates real pain signals and tells you whether to BUILD, WATCH, or KILL an idea.",
    images: ["https://signal.nextwaveaisuite.com/og.png"],
  },

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "https://signal.nextwaveaisuite.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
