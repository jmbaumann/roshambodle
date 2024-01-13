import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import SEO from "@/components/SEO";
import TopBar from "@/components/TopBar";

type Choice = "rock" | "paper" | "scissors";

export default function Home() {
  const opponentChoice = useState<Choice>();
  const playerChoice = useState<Choice>();

  const [openSettings, setOpenSettings] = useState(false);
  const [openStatistics, setOpenStatistics] = useState(false);

  return (
    <>
      <SEO />

      <main className="flex h-screen flex-col items-center bg-gradient-to-b from-[#2d2d2d] to-[#222222]">
        <TopBar
          openSettings={openSettings}
          setOpenSettings={setOpenSettings}
          openStatistics={openStatistics}
          setOpenStatistics={setOpenStatistics}
        />
        RPS
      </main>
    </>
  );
}
