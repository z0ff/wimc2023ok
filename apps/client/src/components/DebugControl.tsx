import {ChangeEvent, useContext, useEffect, useRef} from "react";
import {Card, CardBody} from "@nextui-org/react";
import {WaterDataContext, TdsContext} from "../App.tsx";
//import {WaveColorContext} from "../App.tsx"

export const DebugControl = () => {
    const {setWaterData} = useContext(WaterDataContext);
    const {setTds} = useContext(TdsContext);
    const tdsRef = useRef(null);

    useEffect(() => {
        const tdsInput: HTMLInputElement = tdsRef.current!;
        const tdsValue = Number(tdsInput.value);

        setTds(tdsValue);
        setWaterData({
            tds: tdsValue,
            ph: 7,
            temp: 20
        });
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const tdsValue = Number(event.target.value!);

        setTds(tdsValue);
        setWaterData({
            tds: tdsValue,
            ph: 7,
            temp: 20
        });
    }

    return (
        <Card isBlurred>
            <CardBody>
                <div>
                    <label>TDS</label>
                    <input type="range" name="tds" min="0" max="300" ref={tdsRef} onChange={handleChange}></input>
                </div>
                <div>
                    <label>pH</label>
                    <input type="range" name="ph" min="1" max="14"></input>
                </div>
                <div>
                    <label>Temp</label>
                    <input type="range" name="ph" min="0" max="40"></input>
                </div>
            </CardBody>
        </Card>
    );
};

export default DebugControl;