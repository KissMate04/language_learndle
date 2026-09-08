import {useDispatch} from "react-redux";
import {gameAction, useAppSelector} from "./store";
import {useEffect} from "react";
import {keyColor} from "./scripts.ts";
import {language} from './App';

const CHAR_ENTER = "↩";
const CHAR_BACKSPACE = "⌫";
const CHAR_CODE_A = "A".charCodeAt(0);
const CHAR_CODE_Z = "Z".charCodeAt(0);

export default function Keyboard() {
    const dispatch = useDispatch();

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            const key = e.key.toUpperCase();
            if (e.shiftKey || e.metaKey || e.ctrlKey || e.altKey) {
                return;
            } else if (
                key.length === 1 &&
                key.charCodeAt(0) >= CHAR_CODE_A &&
                key.charCodeAt(0) <= CHAR_CODE_Z
            ) {
                e.preventDefault();
                dispatch(gameAction.inputLetter(key));
            } else if (key === "ENTER") {
                e.preventDefault();
                dispatch(gameAction.inputEnter());
            } else if (key === "BACKSPACE") {
                e.preventDefault();
                dispatch(gameAction.inputBackspace());
            }
        };

        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [dispatch]);
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
    const dispatch = useDispatch();
    const target = useAppSelector((s) => s.game.target);
    const guesses = useAppSelector((s) => s.game.guesses);
    const charCode = props.char.charCodeAt(0);
    const isAlphabet = charCode >= CHAR_CODE_A && charCode <= CHAR_CODE_Z;
    let color = "";
    if (isAlphabet) {
        color = keyColor(props.char, target, guesses);
    }

    const handleClick = () => {
        if (isAlphabet) {
            dispatch(gameAction.inputLetter(props.char));
        } else if (props.char === CHAR_BACKSPACE) {
            dispatch(gameAction.inputBackspace());
        } else if (props.char === CHAR_ENTER) {
            dispatch(gameAction.inputEnter());
        }
    };
    return (
        <button onClick={handleClick} className={`
            "w-11.5 h-12.5 text-2xl flex items-center justify-center border-[none] bg-[#333333] text-white"
            ${props.wide && "w-17.5 text-4xl"}
            ${color === "B" && "bg-[#828493]"}
            ${color === "Y" && "bg-yellow-500"}
            ${color === "G" && "bg-green-700"}
        `}>
            {props.char}
        </button>
    );
}