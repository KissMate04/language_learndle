import type {ReactNode} from "react";

export default function Board() {
    const cells: ReactNode[] = [];

    // Empty cells
    const emptyRows = 6;
    for (let i = 0; i < emptyRows * 5; i++) {
        const cell = <div key={`empty-${i}`} className="w-[52px] h-[52px] box-border text-[#212121] text-3xl flex items-center justify-center border-2 border-[#4f4f4f] bg-[#ababab]"></div>;
        cells.push(cell);
    }

    return <div className="grid grid-cols-5 gap-1 w-fit mx-auto">{cells}</div>;
}