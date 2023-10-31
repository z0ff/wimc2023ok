import './App.scss'
import BG from "./components/BG.tsx";
import Body from "./components/Body.tsx";
import {createContext, Dispatch, SetStateAction, useState} from "react";
import {NextUIProvider} from "@nextui-org/react";
import DebugControl from "./components/DebugControl.tsx";

type TdsState = "Moderate" | "Over" | "Less";

export const TdsContext = createContext({} as {
    tds: number | undefined
    setTds: Dispatch<SetStateAction<number | undefined>>
});

export const TdsStateContext = createContext({} as {
    tdsState: TdsState | undefined
    setTdsState: Dispatch<SetStateAction<TdsState | undefined>>
})

export const PhContext = createContext({} as {
    ph: number | undefined
    setPh: Dispatch<SetStateAction<number | undefined>>
});

export const TempContext = createContext({} as {
    temp: number | undefined
    setTemp: Dispatch<SetStateAction<number | undefined>>
});

export const App = () => {
    const [tds, setTds] = useState<number | undefined>(100);
    const [tdsState, setTdsState] = useState<TdsState | undefined>("Moderate");
    const [ph, setPh] = useState<number | undefined>(7);
    const [temp, setTemp] = useState<number | undefined>(20);
    return (
        <NextUIProvider>
            <TdsContext.Provider value={{
                tds,
                setTds
            }}>
                <TdsStateContext.Provider value={{
                    tdsState,
                    setTdsState
                }}>
                    <PhContext.Provider value={{
                        ph,
                        setPh
                    }}>
                        <TempContext.Provider value={{
                            temp,
                            setTemp
                        }}>
                            <BG/>
                            <Body/>
                            <DebugControl/>
                        </TempContext.Provider>
                    </PhContext.Provider>
                </TdsStateContext.Provider>
            </TdsContext.Provider>
        </NextUIProvider>
    )
}

export default App
