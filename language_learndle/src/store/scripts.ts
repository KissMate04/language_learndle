export function wordColor(target: string, guess: string): string {
    const colors: string[] = ["B", "B", "B", "B", "B"];

    // Find green letters
    const unmatched = new Map<string, number>();
    for (let i = 0; i < 5; i++) {
        if (guess[i] === target[i]) {
            colors[i] = "G";
        } else {
            const count = unmatched.get(target[i]) ?? 0;
            unmatched.set(target[i], count + 1);
        }
    }

    // Find yellow letters
    for (let i = 0; i < 5; i++) {
        if (colors[i] === "G") {
            continue;
        }
        const count = unmatched.get(guess[i]);
        if (count !== undefined && count > 0) {
            colors[i] = "Y";
            unmatched.set(guess[i], count - 1);
        }
    }
    return colors.join("");
}

const COLOR_MAP = new Map([
    ["", 0],
    ["B", 1],
    ["Y", 2],
    ["G", 3],
]);

// Returns the color of a keyboard key given the current list of guesses
export function keyColor(
    key: string,
    target: string,
    guesses: string[],
): string {
    let bestColor = "";

    const colors = guesses.map((guess) => wordColor(target, guess));
    for (let i = 0; i < guesses.length; i++) {
        for (let j = 0; j < 5; j++) {
            if (guesses[i][j] === key) {
                const color = colors[i][j];
                if (COLOR_MAP.get(color)! > COLOR_MAP.get(bestColor)!) {
                    bestColor = color;
                }
            }
        }
    }

    return bestColor;
}