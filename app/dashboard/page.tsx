"use client";

import { useState } from "react";
import Link from "next/link";

type Result = {
  verdict: "BUILD" | "WATCH" | "KILL";
  score: number;
  reason: string[];
  raw: string;
};

const FREE_LIMIT = 3;

export default function DashboardPage() {
  const [input, setInput] = useState("");
  const [latest, setLatest] = useState<Result | null>(null);
  const [history, setHistory] = useState<Result[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const isPro = false; // 🔒 Phase 1: hardcoded (Stripe will flip this later)

  function evaluateSignal(text: string): Result {
    const lower = text.toLowerCase();

    if (lower.includes("manual") || lower.includes("slow")) {
      return {
        verdict: "BUILD",
        score: 85,
        raw: text,
        reason: [
          "Manual workflow",
          "High-frequency pain",
          "Automation-ready",
