import {useEffect, useState} from "react";
import {gameAction, useAppSelector} from "./store";
import {useDispatch} from "react-redux";
import Board from './Board'
import Keyboard from './Keyboard'

function App() {
    const [lanCode, setLanCode] = useState("hu");
    let language: string = "Magyar";

    const dispatch = useDispatch();
    const statusText = useAppSelector((s) => s.game.statusText);
    const target = useAppSelector((s) => s.game.target);

    useEffect(() => {
        if (!statusText) return;

        const timer = setTimeout(() => {
            dispatch(gameAction.clearStatus());
        }, 1350);

        return () => clearTimeout(timer);
    }, [statusText, dispatch]);

    useEffect(() => {
        dispatch(gameAction.start(Date.now()));
    }, [dispatch]);

    return (
        <div className="relative">
            <div id="titlebar" className="flex h-16 items-center justify-center border-b-4 border-gray-500 bg-[#828493]">
                <div className="absolute left-6 border hover:[&>p]:block">
                    {language}
                    <p className="hidden hover:bg-blue-900" onClick={() => changeLanguage("English", "en")}>English</p>
                    <p className="hidden hover:bg-blue-900" onClick={() => changeLanguage("Magyar", "hu")}>Magyar</p>
                    <p className="hidden hover:bg-blue-900" onClick={() => changeLanguage("Italiano", "it")}>Italiano</p>
                </div>
                <h1 className="text-2xl font-bold">Language Learndle</h1>
                <p className="absolute right-6">{target}</p>
            </div>
            <div className="w-fit mx-auto items-center justify-center">
                <div className="grid grid-cols-2 ">
                    <button className="text-left ">hint</button>
                    <button className="text-right" onClick={() => dispatch(gameAction.newGame(Date.now()))}>new word</button>
                </div>
                <Board />
                {statusText !== "" && <p className="absolute left-1/2 translate-x-[-50%] top-1/3 text-2xl bg-orange-400 font-bold p-2 rounded-2xl">{statusText}</p>}
            </div>
            <br/>

            <div>
                <Keyboard lanCode={lanCode} />
            </div>
        </div>
  );

    function changeLanguage(lan: string, code: string) {
        language = lan;
        setLanCode(code);
    }

}



export default App