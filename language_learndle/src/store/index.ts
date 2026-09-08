import {PayloadAction, configureStore, createSlice} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useSelector} from "react-redux";
import WORD_LIST from "./wordlist.json";
import {word_length} from '../App';

export type Game = {
  target: string;
  guesses: string[];
  input: string;
  gameOver: boolean;
};

const initialState: Game = {
    target: "0",
    guesses: [],
    input: "",
    gameOver: false,
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
           };
       },
       inputLetter(state, action: PayloadAction<string>) {
           if (state.input.length < word_length) {
               state.input += action.payload;
           }
       },
       inputBackspace(state) {
           if (state.input.length > 0) {
               state.input = state.input.substring(0, state.input.length - 1);
           }
       },
       inputEnter(state) {
           if (state.input.length !== word_length) return;
           if (!WORD_LIST.valid.includes(state.input)) return;
           state.guesses.push(state.input);
           if (state.input == state.target || state.guesses.length == 6)
               state.gameOver = true;
           state.input = "";
       },
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