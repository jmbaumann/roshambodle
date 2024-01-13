import { useEffect, useState } from "react";
import Link from "next/link";
import { HelpCircle, Lock } from "lucide-react";
import SEO from "@/components/SEO";
import TopBar from "@/components/TopBar";
import { Button } from "@/components/ui/button";
import { getRandomChoice, determineWinner } from "@/utils";
import { cn } from "@/lib/utils";

type Choice = "rock" | "paper" | "scissors";

export default function Home() {
  const [opponentChoice, setOpponentChoice] = useState<Choice>();
  const [playerChoice, setPlayerChoice] = useState<Choice>();
  const [gameResult, setGameResult] = useState<"win" | "lose" | "draw">();
  const [playerLocked, setPlayerLocked] = useState(false);
  const [countdown, setCountdown] = useState<number>();
  const directions = ["ROCK!", "PAPER!", "SCISSORS!", "SHOOT!"];

  const [openSettings, setOpenSettings] = useState(false);
  const [openStatistics, setOpenStatistics] = useState(false);

  useEffect(() => {
    if (playerLocked && (countdown ? countdown < 4 : true)) {
      const timeoutId = setTimeout(() => {
        setCountdown((prevIndex) => (prevIndex ?? -1) + 1);
      }, 950);
      return () => clearTimeout(timeoutId);
    } else if (playerLocked && playerChoice && countdown === 4) {
      const opp = getRandomChoice(new Date());
      setOpponentChoice(opp);
      setTimeout(() => {
        setGameResult(determineWinner(playerChoice, opp));
      }, 300);
      setTimeout(() => {
        setOpenStatistics(true);
      }, 1800);
    }
  }, [playerLocked, countdown, playerChoice]);

  return (
    <>
      <SEO />

      <main className="flex h-screen max-h-screen flex-col items-center bg-gradient-to-b from-[#2d2d2d] to-[#222222]">
        <TopBar
          openSettings={openSettings}
          setOpenSettings={setOpenSettings}
          openStatistics={openStatistics}
          setOpenStatistics={setOpenStatistics}
        />
        <div className="w-full items-center text-center">
          {!opponentChoice ? (
            <div
              className={cn("mb-4 mt-6", !playerLocked ? "animate-rotate" : "")}
            >
              <HelpCircle size={96} color="white" className="mx-auto" />
            </div>
          ) : (
            <div className="mt-6 text-8xl">
              {opponentChoice === "rock" && <span>🪨</span>}
              {opponentChoice === "paper" && <span>📄</span>}
              {opponentChoice === "scissors" && <span>✂️</span>}
            </div>
          )}

          <div className="my-8 h-10 text-4xl">
            {countdown !== undefined && (
              <div className="animate-explode text-white">
                {directions[countdown]}
              </div>
            )}
            {countdown === 4 && (
              <div className="text-white">
                {gameResult === "win"
                  ? "YOU WIN!"
                  : gameResult === "lose"
                    ? "YOU LOSE :("
                    : gameResult === "draw"
                      ? "DRAW!"
                      : ""}
              </div>
            )}
          </div>

          {playerLocked && (
            <div className="text-8xl">
              {playerChoice === "rock" && <span>🪨</span>}
              {playerChoice === "paper" && <span>📄</span>}
              {playerChoice === "scissors" && <span>✂️</span>}
            </div>
          )}

          {!playerLocked && (
            <div className="absolute bottom-10 flex w-full flex-col">
              {playerChoice !== undefined && (
                <Button
                  className="mx-auto mb-10 bg-green-400 text-2xl text-white"
                  onClick={() => setPlayerLocked(true)}
                >
                  <Lock size={24} className="mr-2 h-4 w-4" /> Lock In
                </Button>
              )}
              <div className="flex justify-around text-6xl">
                <div
                  className={cn(
                    "rounded-lg border-4 border-white p-4",
                    playerChoice === "rock" ? "border-green-400" : "",
                    `transition-transform ${playerChoice === "rock" ? "translate-y-[-20px]" : ""}`,
                  )}
                  onClick={() => setPlayerChoice("rock")}
                >
                  🪨
                </div>
                <div
                  className={cn(
                    "rounded-lg border-4 border-white p-4",
                    playerChoice === "paper" ? "border-green-400" : "",
                    `transition-transform ${playerChoice === "paper" ? "translate-y-[-20px]" : ""}`,
                  )}
                  onClick={() => setPlayerChoice("paper")}
                >
                  📄
                </div>
                <div
                  className={cn(
                    "rounded-lg border-4 border-white p-4",
                    playerChoice === "scissors" ? "border-green-400" : "",
                    `transition-transform ${playerChoice === "scissors" ? "translate-y-[-20px]" : ""}`,
                  )}
                  onClick={() => setPlayerChoice("scissors")}
                >
                  ✂️
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
