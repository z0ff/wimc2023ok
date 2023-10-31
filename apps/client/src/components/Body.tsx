import {PhMeter} from "./PhMeter.tsx";
import TdsMeter from "./TdsMeter.tsx";
import TempMeter from "./TempMeter.tsx";

export const Body = () => {
    return (
        <>
            <TdsMeter/>
            <PhMeter/>
            <TempMeter/>
        </>

    )
}

export default Body;
