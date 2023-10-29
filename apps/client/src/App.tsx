import './App.scss'
import BG from "./components/BG.tsx";
import Body from "./components/Body.tsx";
import {createContext, Dispatch, SetStateAction, useState} from "react";
import {NextUIProvider} from "@nextui-org/react";
import DebugControl from "./components/DebugControl.tsx";

export type WaterData = {
    tds: number;
    ph: number;
    temp: number;
};

export const TdsContext = createContext({} as {
    tds: number | undefined
    setTds: Dispatch<SetStateAction<number | undefined>>
});

export const WaterDataContext = createContext({} as {
    waterData: WaterData | undefined
    setWaterData: Dispatch<SetStateAction<WaterData | undefined>>
});

export const App = () => {
    const [tds, setTds] = useState<number | undefined>(100);
    const [waterData, setWaterData] = useState<WaterData | undefined>({
        tds: 100,
        ph: 7,
        temp: 20
    });
  return (
    <NextUIProvider>
        <TdsContext.Provider value={{
            tds,
            setTds
        }}>
            <BG />
            <WaterDataContext.Provider value={{
                waterData,
                setWaterData
            }}>
                <Body />
                <DebugControl />
            </WaterDataContext.Provider>
        </TdsContext.Provider>
    </NextUIProvider>
  )
}

export default App
