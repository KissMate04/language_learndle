import {language} from './App';

const CHAR_ENTER = "↩";
const CHAR_BACKSPACE = "⌫";


export default function Keyboard() {
    return (
        <div className="flex flex-col gap-1 font-bold">
            <div className="flex gap-1 justify-center">
                <Key char="Q" />
                <Key char="W" />
                <Key char="E" />
                <Key char="R" />
                <Key char="T" />
                {language=="en" && <Key char="Y" />}
                {language=="hu" && <Key char="Z" />}
                <Key char="U" />
                <Key char="I" />
                <Key char="O" />
                <Key char="P" />
            </div>
            <div className="flex gap-1 justify-center">
                <Key char="A" />
                <Key char="S" />
                <Key char="D" />
                <Key char="F" />
                <Key char="G" />
                <Key char="H" />
                <Key char="J" />
                <Key char="K" />
                <Key char="L" />
                {language=="hu" && <Key char="É" />}
            </div>
            <div className="flex gap-1 justify-center">
                {language=="hu" && <Key char="Í" />}
                {language=="en" && <Key char={CHAR_ENTER} wide />}
                {language=="en" && <Key char="Z" />}
                {language=="hu" && <Key char="Y" />}
                <Key char="X" />
                <Key char="C" />
                <Key char="V" />
                <Key char="B" />
                <Key char="N" />
                <Key char="M" />
                {language=="hu" && <Key char="Á" />}
                {language=="en" && <Key char={CHAR_BACKSPACE} wide />}
            </div>
            {language=="hu" && <div className="flex gap-1 justify-center">
                <Key char={CHAR_BACKSPACE} wide />
                <Key char="Ó" />
                <Key char="Ö" />
                <Key char="Ő" />
                <Key char="Ú" />
                <Key char="Ü" />
                <Key char="Ű" />
                <Key char={CHAR_ENTER} wide />
            </div>}
        </div>
    );
}

type KeyProps = {
    char: string;
    wide?: boolean;
};

function Key(props: KeyProps) {
    if (props.wide) return (
        <button className="w-17.5 h-12.5 text-4xl flex items-center justify-center border-[none] bg-[#333333] text-white">
            {props.char}
        </button>
    );
    else return (
        <button className="w-11.5 h-12.5 text-2xl flex items-center justify-center border-[none] bg-[#333333] text-white">
            {props.char}
        </button>
    )
}