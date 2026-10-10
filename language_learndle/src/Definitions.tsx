import type {ReactNode} from "react";
import {useAppSelector, getDefinitions} from "./store";

export default function Definitions() {
    const guesses = useAppSelector((s) => s.game.guesses);
    const defContainers: ReactNode[] = [];

    for (const guess of guesses) {
        const defs = getDefinitions(guess);
        const definition = (
            <div key={guess} className="shrink-0 rounded-lg border-3 border-green-600 bg-green-100 px-2 py-1 text-xs landing-tight">
                <div className="font-bold">
                    {guess}
                </div>
                {defs.map(({pos, text}) => (
                    <div key={pos}>
                        <span className="font-semibold">{pos}: </span> {text}
                    </div>
                ))}
            </div>
        );
        defContainers.push(definition);
    }



    return <div className="flex h-full flex-col gap-1 overflow-y-auto">{defContainers}</div>
}
/*
                    <div className="font-bold">{guess}</div>
                    {getDefinitions(guess).map(({pos, text}) => (
                        <div key={pos}>
                            <span className="font-semibold">{pos}:</span> {text}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );

 */