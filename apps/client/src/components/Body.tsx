import {PhMeter} from "./PhMeter.tsx";
import TdsMeter from "./TdsMeter.tsx";
import TempMeter from "./TempMeter.tsx";
import LightControl from "./LightControl.tsx";
import {FeedControl} from "./FeedControl.tsx";
import {Alert} from "./Alert.tsx";
import {useContext} from "react";
import {PhContext, TdsStateContext} from "../App.tsx";

export const Body = () => {
    const {tdsState} = useContext(TdsStateContext);
    const {ph} = useContext(PhContext);
    return (
        <div className="grid grid-rows-6 grid-cols-9 gap-5 h-screen">
            <div className="row-span-3 col-span-3">
                <TdsMeter />
            </div>
            <div className="row-span-3 col-span-3">
                <PhMeter />
            </div>
            <div className="row-span-3 col-span-3">
                <TempMeter />
            </div>

            {(() => {
                if (tdsState === undefined) return;
                if (ph === undefined) return;
                if (tdsState !== "Moderate" || ph < 5 || ph > 9) {
                    return (
                        <div className = "row-start-4 col-start-3 col-span-5" >
                        <Alert />
                        </div>
                    );
                }
            })()}

            <div className="row-start-5 row-span-2 col-span-2">
                <LightControl/>
            </div>
            <div className="row-start-5 row-span-2 col-span-2">
                <FeedControl />
            </div>
        </div>

    )
}

export default Body;
