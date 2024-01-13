import { useEffect, useState } from "react";
import Link from "next/link";
import { HelpCircle, Lock } from "lucide-react";
import { differenceInCalendarDays, format } from "date-fns";
import SEO from "@/components/SEO";
import TopBar from "@/components/TopBar";
import Countdown from "@/components/Countdown";
import { Button } from "@/components/ui/button";
import { getRandomChoice, determineWinner } from "@/utils";
import { useLocalStore, useTweetStore } from "@/utils/store";
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

  const store = useLocalStore();
  const updateStore = useLocalStore((state) => state.update);
  const setTweet = useTweetStore((state) => state.update);

  useEffect(() => {
    if (!store.game) store.newGame();
    else if (
      format(new Date(store.game.timestamps.lastCompleted), "yyyy-MM-dd") !==
      format(new Date(), "yyyy-MM-dd")
    ) {
      store.newGame();
      setOpponentChoice(undefined);
      setPlayerChoice(undefined);
      setPlayerLocked(false);
      setCountdown(undefined);
    } else {
      setOpponentChoice(getRandomChoice(new Date()));
      setPlayerChoice(store.game.choice);
      setPlayerLocked(true);
      setCountdown(4);
    }
  }, []);

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

  useEffect(() => {
    if (
      gameResult !== undefined &&
      format(new Date(store.game.timestamps.lastPlayed), "yyyy-MM-dd") !==
        format(new Date(), "yyyy-MM-dd")
    ) {
      const oldStreakRes = store.stats.streak.substring(0, 1);
      const oldStreakNum = Number(store.stats.streak.substring(1));
      const newStreakNum =
        (oldStreakRes === "W" && gameResult === "win") ||
        (oldStreakRes === "L" && gameResult === "lose") ||
        (oldStreakRes === "D" && gameResult === "draw")
          ? oldStreakNum + 1
          : 1;
      const streak =
        (gameResult === "win" ? "W" : gameResult === "lose" ? "L" : "D") +
        String(newStreakNum);
      const isOnStreak = gameResult === "win";

      updateStore({
        ...store,
        game: {
          choice: playerChoice,
          gameOver: true,
          timestamps: {
            lastCompleted: new Date().getTime(),
            lastPlayed: new Date().getTime(),
          },
        },
        stats: {
          gamesPlayed: store.stats.gamesPlayed + 1,
          wins: gameResult === "win" ? store.stats.wins + 1 : store.stats.wins,
          losses:
            gameResult === "lose" ? store.stats.losses + 1 : store.stats.losses,
          draws:
            gameResult === "draw" ? store.stats.draws + 1 : store.stats.draws,
          streak,
          isOnStreak,
          winStreak:
            gameResult === "win" && newStreakNum > store.stats.winStreak
              ? newStreakNum
              : store.stats.winStreak,
        },
      });

      // setTweet({
      //   header: `pricel #${game.dayOffset + 1} ${
      //     over ? (!won && guesses.length === 6 ? "X" : guesses.length) : "?"
      //   }/6`,
      //   answers: getTwitterSquares(correct),
      // });
    }
  }, [gameResult]);

  return (
    <>
      <SEO />

      <main className="font-tektur flex h-screen max-h-screen flex-col items-center bg-gradient-to-b from-[#2d2d2d] to-[#222222]">
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

          {gameResult !== undefined && <Countdown />}

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
