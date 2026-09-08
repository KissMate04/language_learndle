import type {ReactNode} from "react";
import {word_length} from './App';
import { useAppSelector} from "./store";
import {ReactNode} from "react";
import { wordColor} from "./funcs";

export default function Board() {
    const input = useAppSelector((s) => s.game.input);
    const target = useAppSelector((s) => s.game.target);
    const guesses = useAppSelector((s) => s.game.guesses);
    const gameOver = useAppSelector((s) => s.game.gameOver);

    const cells: ReactNode[] = [];

    // Guessed letters
    for (let i = 0; i < guesses.length; i++) {
        const guess = guesses[i];
        const colors = wordColor(target, guess);

        for (let j = 0; j < guess.length; j++) {
            const cell = (
                <div key={`cell-${i}-${j}`} className={`
                    ${colors[j] === "B" && "bg-[#828493]"}
                    ${colors[j] === "Y" && "bg-yellow-500"}
                    ${colors[j] === "G" && "bg-green-700"}
                    "w-[55px] h-[55px] text-[#212121] text-3xl flex items-center justify-center bg-[#ababab]"
                `}>
                    {guess[j]}
                </div>
            );
            cells.push(cell);
        }
    }

    // Input letters
    const showInput = !gameOver;
    if (showInput) {
        for (let i = 0; i < word_length; i++) {
            const cell = (
                <div key={`input-${i}`} className="w-[55px] h-[55px] box-border text-[#212121] text-3xl flex items-center justify-center border-2 border-[#4f4f4f] bg-[#ababab]">
                    {input[i] ?? ""}
                </div>
            );
            cells.push(cell);
        }
    }


    // Empty cells
    const emptyRows = 6 - (showInput ? 1 : 0) - guesses.length;
    for (let i = 0; i < emptyRows * word_length; i++) {
        const cell = <div key={`empty-${i}`} className="w-[55px] h-[55px] box-border text-[#212121] text-3xl flex items-center justify-center border-2 border-[#4f4f4f] bg-[#ababab]"></div>;
        cells.push(cell);
    }

    return <div className="grid grid-cols-5 gap-[5px] w-fit mx-auto">{cells}</div>;
}