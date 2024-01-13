import seedrandom from "seedrandom";
import { format } from "date-fns";

type Choice = "rock" | "paper" | "scissors";

export function getRandomChoice(date?: Date) {
  let r;
  if (date) {
    const seed = seedrandom(format(new Date(), "yyyy-MM-dd"));
    r = Math.floor(seed() * 3);
  } else r = Math.floor(Math.random() * 3);

  if (r === 0) return "rock";
  else if (r === 1) return "paper";
  else return "scissors";
}

export function determineWinner(playerChoice: Choice, opponentChoice: Choice) {
  if (playerChoice === opponentChoice) return "draw";
  else if (playerChoice === "rock")
    return opponentChoice === "paper" ? "lose" : "win";
  else if (playerChoice === "paper")
    return opponentChoice === "scissors" ? "lose" : "win";
  else return opponentChoice === "rock" ? "lose" : "win";
}
