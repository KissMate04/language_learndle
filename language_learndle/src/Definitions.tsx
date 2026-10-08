import type {ReactNode} from "react";
import { useAppSelector, Pos} from "./store";

export default function Definitions() {
    const guesses = useAppSelector((s) => s.game.guesses);
    const defContainers: ReactNode[] = [];
    for (const guess of guesses) {
        const definition = (
            <div>
                {guess}{Pos}
            </div>
        );
        defContainers.push(definition);
    }



    return <div>{defContainers}</div>
}