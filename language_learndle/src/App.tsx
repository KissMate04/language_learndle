import Board from './Board'
import Keyboard from './Keyboard'

function App() {
  return (
      <div>
          <div id="titlebar" className="relative flex h-16 items-center justify-center border-b-4 border-gray-500 bg-[#828493]">
              <h1 className="text-2xl font-bold">Language Learndle</h1>
            <p className="absolute right-6">How to play</p>
          </div>
          <br/>
          <div>
            <Board />
          </div>
          <br/>
          <div>
              <Keyboard />
          </div>
      </div>
  );
}

export default App
