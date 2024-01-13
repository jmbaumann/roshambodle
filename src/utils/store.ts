import { create } from "zustand";

export interface GameState {
  game: {
    choice: "rock" | "paper" | "scissors" | undefined;
    gameOver: boolean;
    timestamps: {
      lastCompleted: number;
      lastPlayed: number;
    };
  };
  stats: {
    gamesPlayed: number;
    wins: number;
    losses: number;
    draws: number;
    streak: string;
    isOnStreak: boolean;
    winStreak: number;
  };
  timestamp: number;
}

interface LocalStore extends GameState {
  update: (newState: GameState) => void;
  newGame: () => void;
  reload: () => void;
  reset: () => void;
  resetToday: () => void;
}

const LOCAL_STOREAGE_KEY = "rps-daily";

const defaultState = {
  game: {
    choice: undefined,
    gameOver: false,
    timestamps: {
      lastCompleted: 0,
      lastPlayed: 0,
    },
  },
  stats: {
    gamesPlayed: 0,
    wins: 0,
    losses: 0,
    draws: 0,
    streak: "",
    isOnStreak: false,
    winStreak: 0,
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
  newGame: () =>
    set((state) => {
      let newGameState = { ...state };
      newGameState = {
        ...state,
        game: {
          ...state.game,
          choice: undefined,
          gameOver: false,
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
          choice: undefined,
          gameOver: false,
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
  stats: string;
  update: (newState: { header: string; stats: string }) => void;
}

export const useTweetStore = create<TweetStore>((set) => ({
  header: "",
  stats: "",
  update: (newState: { header: string; stats: string }) => set(() => newState),
}));

function saveState(state: GameState) {
  const ls = localStorage.getItem(LOCAL_STOREAGE_KEY);
  if (ls) {
    const gs = JSON.parse(ls) as GameState;
    if (gs.stats.gamesPlayed > 0 && state.stats.gamesPlayed === 0) return;
  }

  localStorage.setItem(
    LOCAL_STOREAGE_KEY,
    JSON.stringify({ ...state, timestamp: new Date().getTime() }),
  );
}
