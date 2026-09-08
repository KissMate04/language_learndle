import {useEffect} from "react";
import {gameAction, useAppSelector} from "./store";
import WORDLIST from "./store/wordlist.json";
import {useDispatch} from "react-redux";
import Board from './Board'
import Keyboard from './Keyboard'

export const word_length : number = 5;
export const language : string = "hu";

function App() {
    const dispatch = useDispatch();
    const gameOver = useAppSelector((s) => s.game.gameOver);
    const input = useAppSelector((s) => s.game.input);
    const target = useAppSelector((s) => s.game.target);

    useEffect(() => {
        dispatch(gameAction.start(Date.now()));
    }, [dispatch]);

    let statusText:string = "";
    if (gameOver) statusText = target;
    else if (input.length === 5 && !WORDLIST.valid.includes(input)) statusText = `${input} is not a valid word`;

    return (
        <div>
            <div id="titlebar" className="relative flex h-16 items-center justify-center border-b-4 border-gray-500 bg-[#828493]">
                <h1 className="text-2xl font-bold">Language Learndle</h1>
                <p className="absolute right-6">How to play</p>
            </div>
            <br/>
            <div className="relative flex items-center justify-center">
                <Board />
                ${statusText !== "" && <p className="absolute text-4xl bg-orange-400 font-bold p-2 rounded-2xl">{statusText}</p>}
            </div>
            <br/>

            <div>
                <Keyboard />
            </div>
        </div>
  );
}

export default App
