import {useEffect} from "react";
import {gameAction, useAppSelector} from "./store";
import {useDispatch} from "react-redux";
import Board from './Board'
import Keyboard from './Keyboard'

export const word_length : number = 5;
export const language : string = "hu";

function App() {
    const dispatch = useDispatch();
    const statusText = useAppSelector((s) => s.game.statusText);

    useEffect(() => {
        if (!statusText) return;

        const timer = setTimeout(() => {
            dispatch(gameAction.clearStatus());
        }, 1000);

        return () => clearTimeout(timer);
    }, [statusText, dispatch]);

    useEffect(() => {
        dispatch(gameAction.start(Date.now()));
    }, [dispatch]);

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
