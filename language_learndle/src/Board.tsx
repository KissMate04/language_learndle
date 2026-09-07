import type {ReactNode} from "react";
import {word_length} from './App';

export default function Board() {
    const cells: ReactNode[] = [];

    // Empty cells
    const emptyRows = 6;
    for (let i = 0; i < emptyRows * word_length; i++) {
        const cell = <div key={`empty-${i}`} className="w-[55px] h-[55px] box-border text-[#212121] text-3xl flex items-center justify-center border-2 border-[#4f4f4f] bg-[#ababab]"></div>;
        cells.push(cell);
    }

    return <div className="grid grid-cols-5 gap-[5px] w-fit mx-auto">{cells}</div>;
}