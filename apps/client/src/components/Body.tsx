import {PhMeter} from "./PhMeter.tsx";
import TdsMeter from "./TdsMeter.tsx";
import TempMeter from "./TempMeter.tsx";
import LightControl from "./LightControl.tsx";

export const Body = () => {
    return (
        <>
            <TdsMeter/>
            <PhMeter/>
            <TempMeter/>
            <LightControl/>
        </>

    )
}

export default Body;
