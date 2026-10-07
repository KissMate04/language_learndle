import {type PayloadAction, configureStore, createSlice} from "@reduxjs/toolkit";
import {type TypedUseSelectorHook, useSelector} from "react-redux";
//import WORD_LIST from "./wordlist.json";
import EN_VALID from "./english_valid.json";
import EN_TARGET from "./english_target.json";

type WordEntry = {lemma: string; pos: Record<string, string[]>};
type WordData = {words: string[]; entries: Record<string, WordEntry>};

const validData = EN_VALID as WordData;
const targetData = EN_TARGET as WordData;

export type Game = {
  target: string;
  guesses: string[];
  input: string;
  gameOver: boolean;
  statusText: string;
};

const VALID_WORDS = new Set(validData.words);

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
           console.log(action.payload);
           const target = targetData.words[action.payload % targetData.words.length].toUpperCase();
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
           console.log("input word: ", state.input, " target word: ", state.target);
           if (state.input.length !== state.target.length) return;
           console.log("input: ", state.input);
           if (!VALID_WORDS.has(state.input.toLowerCase())) {
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
           state.target = targetData.words[action.payload % targetData.words.length].toUpperCase();
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