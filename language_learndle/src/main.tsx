import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { Provider } from "react-redux";
import { store } from "./store/index.ts";

createRoot(document.getElementById('root')!).render(
    //inside App:
        // Title bar and How to play
        // Language Select
        // Hint
        // New word
    //inside Board
        // Win/Lose message
        // Board
    <StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </StrictMode>,
)
