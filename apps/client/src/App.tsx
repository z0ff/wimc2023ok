import './App.scss'
import BG from "./components/BG.tsx";
import Body from "./components/Body.tsx";
import {createContext, useState} from "react";

export const WaveColorContext = createContext({} as {
    waveColor: string | null
    setWaveColor: React.Dispatch<React.SetStateAction<string | null>>
});

export const App = () => {
    const [waveColor, setWaveColor] = useState<string | null>("blue");
  return (
    <>
        <WaveColorContext.Provider value={{
            waveColor,
            setWaveColor
        }}>
            <BG />
            <Body />
        </WaveColorContext.Provider>
    </>
  )
}

export default App
