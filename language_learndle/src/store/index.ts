import {type PayloadAction, configureStore, createSlice} from "@reduxjs/toolkit";
import {type TypedUseSelectorHook, useSelector} from "react-redux";
import WORD_LIST from "./wordlist.json";
import {word_length} from '../App';

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
           if (!WORD_LIST.valid.includes(state.input)) {
               state.statusText = `${state.input} is not a valid word`;
               return;
           }
           state.guesses.push(state.input);
           if (state.input == state.target || state.guesses.length > word_length) {
               state.gameOver = true;
               state.statusText = state.target;
           }
           state.input = "";
           return;
       },
       clearStatus(state) {
           state.statusText = "";
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