import {type PayloadAction, configureStore, createSlice} from "@reduxjs/toolkit";
import {type TypedUseSelectorHook, useSelector} from "react-redux";
import WORD_LIST from "./wordlist.json";

export type Game = {
  target: string;
  guesses: string[];
  input: string;
  gameOver: boolean;
  statusText: string;
};

const initialState: Game = {
    target: "0",
    guesses: [],
    input: "",
    gameOver: false,
    statusText: "",
};

const gameSlice = createSlice({
   name: "game",
   initialState,
   reducers: {
       start(_state, action: PayloadAction<number>) {
           const targetWords = WORD_LIST.target;
           const target = targetWords[action.payload % targetWords.length];
           return {
               target,
               guesses: [],
               input: "",
               gameOver: false,
               statusText: "",
           };
       },
       inputLetter(state, action: PayloadAction<string>) {
           if (state.input.length < state.target.length) {
               state.input += action.payload;
           }
       },
       inputBackspace(state) {
           if (state.input.length > 0) {
               state.input = state.input.substring(0, state.input.length - 1);
           }
       },
       inputEnter(state) {
           if (state.input.length !== state.target.length) return;
           if (!WORD_LIST.valid.includes(state.input)) {
               state.statusText = `${state.input} is not a valid word`;
               return;
           }
           if (state.guesses.includes(state.input)) {
               state.statusText = `You already tried ${state.input}`;
               return;
           }
           state.guesses.push(state.input);
           if (state.input == state.target || state.guesses.length > state.target.length) {
               state.gameOver = true;
               state.statusText = state.target;
           }
           state.input = "";
           return;
       },
       clearStatus(state) {
           state.statusText = "";
       },
       newGame(state, action: PayloadAction<number>) {
           const targetWords = WORD_LIST.target;
           state.target = targetWords[action.payload % targetWords.length];
           state.guesses = [];
           state.input = "";
           state.gameOver = false;
           state.statusText = "";
       }
   },
});

export const gameAction = gameSlice.actions;
export const store = configureStore({
    reducer: {
        game: gameSlice.reducer,
    },
});

export type AppState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;