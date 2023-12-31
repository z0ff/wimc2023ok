import './App.scss'
import BG from "./components/BG.tsx";
import Body from "./components/Body.tsx";
import {createContext, Dispatch, SetStateAction, useEffect, useState} from "react";
import {NextUIProvider} from "@nextui-org/react";
//import DebugControl from "./components/DebugControl.tsx";
import nodeWebSocketLib from "websocket";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {RelayServer} from "./RelayServer.js";
import {RGBColorData, LightData, ReceiveData} from "./type";

type TdsState = "Moderate" | "Over" | "Less";

export const FeedIntervalContext = createContext({} as {
    feedInterval: number | undefined
    setFeedInterval: Dispatch<SetStateAction<number | undefined>>
});

export const LightContext = createContext({} as {
    light: LightData | undefined
    setLight: Dispatch<SetStateAction<LightData | undefined>>
});

// HSLColorData型の値を共有するためのContextを作成
export const ColorContext = createContext({} as {
    color: RGBColorData | undefined
    setColor: Dispatch<SetStateAction<RGBColorData | undefined>>
});

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let channel: any;

// メッセージを送信
export const sendMessage = (message: string) => {
    if (channel === undefined) {
        return;
    }
    channel.send(message);
}

export const App = () => {
    const [tds, setTds] = useState<number | undefined>(100);
    const [tdsState, setTdsState] = useState<TdsState | undefined>("Moderate");
    const [ph, setPh] = useState<number | undefined>(7);
    const [temp, setTemp] = useState<number | undefined>(20);
    const [light, setLight] = useState<LightData | undefined>({isOn: true, color: {r: 0, g: 0, b: 0}});
    const [feedInterval, setFeedInterval] = useState<number | undefined>(5);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //let channel: any;
    let message: string | undefined;
    let receivedData: ReceiveData | undefined;

    useEffect(() => {
        (async () => {
            const relay = RelayServer("chirimentest", "chirimenSocket", nodeWebSocketLib, "originURL");
            channel = await relay.subscribe("medaka2023");

            if (channel === undefined) {
                return;
            }

            console.log("connected");

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            channel.onmessage = (msg) => {
                message = msg.data;
                if (message === undefined || message === "feed") {
                    return;
                }
                receivedData = JSON.parse(message);
                //console.log(message);
                if (receivedData === undefined) {
                    return;
                }
                if (receivedData.sender !== "edge") {
                    return;
                }
                setTds(receivedData.tds);
                setPh(receivedData.ph);
                setTemp(receivedData.temp);
                setLight(receivedData.light);
                setFeedInterval(receivedData.feedInterval);
            }
        })();
    }, []);
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
                            <LightContext.Provider value={{
                                light,
                                setLight
                            }}>
                                <FeedIntervalContext.Provider value={{
                                    feedInterval,
                                    setFeedInterval
                                }}>
                                    <BG/>
                                    <Body/>
                                </FeedIntervalContext.Provider>
                            </LightContext.Provider>
                            {/*
                            <DebugControl/>
                            */}
                        </TempContext.Provider>
                    </PhContext.Provider>
                </TdsStateContext.Provider>
            </TdsContext.Provider>
        </NextUIProvider>
    )
}

export default App
