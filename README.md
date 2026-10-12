# Language Learndle

Language Learndle is a Wordle-style word guessing game built with React + TypeScript.

## Work In Progress
As of now the game only supports English words and definitions. The UI and extra features are also rudimentary

### Current working version deployed at: [https://KissMate04.github.io/language_learndle](https://KissMate04.github.io/language_learndle)

## Features

- Wordle-style board with per-letter feedback:
  - **Green** = correct letter, correct position
  - **Yellow** = correct letter, wrong position
  - **Gray** = letter not in target
- Variable word-length
- the input word's definition is shown after each guess
- On-screen keyboard + physical keyboard input
- “New word” reset flow

## Tech Stack

- Python (creating the wordlists)
- React
- TypeScript
- Redux Toolkit
- Tailwind CSS
- Vite

You can read about how I created the wordlists here: [data_processing/rawdata/README.md](https://github.com/KissMate04/language_learndle/blob/main/data_processing/rawdata/README.md)
