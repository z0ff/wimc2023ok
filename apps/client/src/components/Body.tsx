import {PhMeter} from "./PhMeter.tsx";
import TdsMeter from "./TdsMeter.tsx";
import TempMeter from "./TempMeter.tsx";
import LightControl from "./LightControl.tsx";
import {FeedButton} from "./FeedButton.tsx";

export const Body = () => {
    return (
        <>
            <TdsMeter/>
            <PhMeter/>
            <TempMeter/>
            <LightControl/>
            <FeedButton />
        </>

    )
}

export default Body;
