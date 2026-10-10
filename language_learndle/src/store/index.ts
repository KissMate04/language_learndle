import {type PayloadAction, configureStore, createSlice} from "@reduxjs/toolkit";
import {type TypedUseSelectorHook, useSelector} from "react-redux";
//import WORD_LIST from "./wordlist.json";
import EN_VALID from "./english_valid.json";
import EN_TARGET from "./english_target.json";

type Pos = "adj" | "noun" | "verb" | "adv";
type WordEntry = {pos: Partial<Record<Pos, string>>};
type WordData = Record<string, WordEntry>;
const validData: WordData = EN_VALID as WordData;


export const MAX_GUESSES = 6;

export type Definition = {pos: Pos; text: string};

export const POS_ORDER: Pos[] = ["noun", "verb", "adj", "adv"];

export type Game = {
  target: string;
  definitions: Definition[], //definitions for the guesses
  guesses: string[];
  input: string;
  gameOver: boolean;
  statusText: string;
};

const initialState: Game = {
    target: "0",
    definitions: [],
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
           return {
               target: pickTarget(action.payload),
               definitions: [],
               guesses: [],
               input: "",
               gameOver: false,
               statusText: "",
           };
       },
       inputLetter(state, action: PayloadAction<string>) {
           if (state.gameOver) return;
           if (state.input.length < state.target.length) {
               state.input += action.payload;
           }
       },
       inputBackspace(state) {
           if (state.gameOver) return;
           if (state.input.length > 0) {
               state.input = state.input.substring(0, state.input.length - 1);
           }
       },
       inputEnter(state) {
           if (state.gameOver) return;
           console.log("input word: ", state.input, " target word: ", state.target);
           if (state.input.length !== state.target.length) return;
           if (!isValidWord(state.input.toLowerCase())) {
               state.statusText = `${state.input} is not a valid word`;
               return;
           }
           if (state.guesses.includes(state.input)) {
               state.statusText = `You already tried ${state.input}`;
               return;
           }
           state.guesses.push(state.input);
           if (state.input == state.target || state.guesses.length >= MAX_GUESSES) {
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
           state.target = pickTarget(action.payload);
           state.definitions = [];
           state.guesses = [];
           state.input = "";
           state.gameOver = false;
           state.statusText = "";
       }
   },
});

export function isValidWord(word: string): boolean {
    return Object.hasOwn(validData, word);
}

export function getDefinitions(word: string): Definition[] {
    const key = word.toLowerCase();
    if (!isValidWord(key)) return [];
    const entry = validData[key];
    return POS_ORDER.flatMap((pos) => {
       const text = entry.pos[pos];
       return text === undefined ? [] : [{pos, text}];
    });
}

function pickTarget(index: number) {
    const word = EN_TARGET[index % EN_TARGET.length];
    console.log("new game target chosen: ",word, ". Called from pickTarget in index.ts");
    return word.toUpperCase();
}

export const gameAction = gameSlice.actions;
export const store = configureStore({
    reducer: {
        game: gameSlice.reducer,
    },
});

export type AppState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;