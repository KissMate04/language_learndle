import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

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
      <App />
    </StrictMode>,
)
