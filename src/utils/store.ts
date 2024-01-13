import { create } from "zustand";
import { differenceInCalendarDays } from "date-fns";

export interface GameState {
  game: {
    guesses: string[];
    gameOver: boolean;
    status: "IN_PROGRESS" | "COMPLETE";
    dayOffset: number;
    timestamps: {
      lastCompleted: number;
      lastPlayed: number;
    };
  };
  stats: {
    currentStreak: number;
    gamesPlayed: number;
    gamesWon: number;
    isOnStreak: boolean;
    maxStreak: number;
    guesses: {
      1: number;
      2: number;
      3: number;
      4: number;
      5: number;
      6: number;
      fail: number;
    };
  };
  settings: {
    showArrow: boolean;
  };
  timestamp: number;
}

interface LocalStore extends GameState {
  update: (newState: GameState) => void;
  addGuess: (guess: string) => void;
  newGame: () => void;
  reload: () => void;
  reset: () => void;
  resetToday: () => void;
}

const LOCAL_STOREAGE_KEY = "pricel";

const defaultState = {
  game: {
    guesses: [],
    gameOver: false,
    status: "IN_PROGRESS",
    dayOffset: 0,
    timestamps: {
      lastCompleted: 0,
      lastPlayed: 0,
    },
  },
  stats: {
    currentStreak: 0,
    gamesPlayed: 0,
    gamesWon: 0,
    isOnStreak: false,
    maxStreak: 0,
    guesses: {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      fail: 0,
    },
  },
  settings: {
    showArrow: true,
  },
  timestamp: new Date().getTime(),
} as GameState;

const getInitialState = () => {
  let gs = { ...defaultState };
  if (typeof window !== "undefined") {
    const ls = localStorage.getItem(LOCAL_STOREAGE_KEY);
    if (ls) gs = JSON.parse(ls) as GameState;
  }
  return gs;
};

export const useLocalStore = create<LocalStore>((set) => ({
  ...getInitialState(),
  update: (newState: GameState) =>
    set(() => {
      saveState(newState);
      return newState;
    }),
  addGuess: (guess: string) =>
    set((state) => {
      let newState = { ...state };
      if (!state.game.guesses.includes(guess))
        newState = {
          ...state,
          game: {
            ...state.game,
            guesses: [...state.game.guesses, guess],
            timestamps: {
              ...state.game.timestamps,
              lastPlayed: new Date().getTime(),
            },
          },
        };
      saveState(newState);
      return newState;
    }),
  newGame: () =>
    set((state) => {
      let newGameState = { ...state };
      newGameState = {
        ...state,
        game: {
          ...state.game,
          guesses: [],
          higher: "NONE",
          gameOver: false,
          status: "IN_PROGRESS",
          dayOffset: differenceInCalendarDays(
            new Date(),
            new Date("2023-10-12T00:00:00"),
          ),
        },
      };
      saveState(newGameState);
      return newGameState;
    }),
  reload: () =>
    set(() => {
      const s = getInitialState();
      return s;
    }),
  reset: () =>
    set(() => {
      saveState(defaultState);
      return defaultState;
    }),
  resetToday: () =>
    set((state) => {
      const yesterdayTS = new Date().getTime() - 86400000;
      let newGameState = { ...state };
      newGameState = {
        ...state,
        game: {
          ...state.game,
          guesses: [],
          status: "COMPLETE",
          dayOffset: 0,
          timestamps: {
            lastCompleted: yesterdayTS,
            lastPlayed: yesterdayTS,
          },
        },
      };
      saveState(newGameState);
      return newGameState;
    }),
}));

export interface TweetStore {
  header: string;
  answers: string;
  update: (newState: { header: string; answers: string }) => void;
}

export const useTweetStore = create<TweetStore>((set) => ({
  header: "",
  answers: "$⬜⬜⬜.⬜⬜",
  update: (newState: { header: string; answers: string }) =>
    set(() => newState),
}));

function saveState(state: GameState) {
  localStorage.setItem(
    LOCAL_STOREAGE_KEY,
    JSON.stringify({ ...state, timestamp: new Date().getTime() }),
  );
}
