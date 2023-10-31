import { ChangeEvent, useContext, useEffect, useRef } from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { TdsContext, PhContext, TempContext } from "../App";

export const DebugControl = () => {
  const { tds, setTds } = useContext(TdsContext);
  const { ph, setPh } = useContext(PhContext);
  const { temp, setTemp } = useContext(TempContext);
  const tdsRef = useRef(null);
  const phRef = useRef(null);
  const tempRef = useRef(null);

  useEffect(() => {
    const tdsInput: HTMLInputElement = tdsRef.current!;
    const phInput: HTMLInputElement = phRef.current!;
    const tempInput: HTMLInputElement = tempRef.current!;

    tdsInput.value = tds!.toString();
    phInput.value = ph!.toString();
    tempInput.value = temp!.toString();

    /*
    const tdsValue = Number(tdsInput.value);
    const phValue = Number(phInput.value);
    const tempValue = Number(tempInput.value);

    setTds(tdsValue);
    setPh(phValue);
    setTemp(tempValue);
    */
  });

  const handleTdsChange = (event: ChangeEvent<HTMLInputElement>) => {
    const tdsValue = Number(event.target.value!);

    setTds(tdsValue);
  }

  const handlePhChange = (event: ChangeEvent<HTMLInputElement>) => {
    const phValue = Number(event.target.value!);

    setPh(phValue);
  }

  const handleTempChange = (event: ChangeEvent<HTMLInputElement>) => {
    const tempValue = Number(event.target.value!);

    setTemp(tempValue);
  }

  return (
    <Card isBlurred>
      <CardHeader>
        <p>DebugControl</p>
      </CardHeader>
      <CardBody>
        <div className="grid grid-cols-3 gap-4">
          <label>TDS</label>
          <input type="range" name="tds" min="0" max="500" ref={tdsRef} onChange={handleTdsChange}></input>
          <label>{tds} ppm</label>
          <label>pH</label>
          <input type="range" name="ph" min="1" max="14" ref={phRef} onChange={handlePhChange}></input>
          <label>{ph}</label>
          <label>Temp</label>
          <input type="range" name="temp" min="0" max="50" ref={tempRef} onChange={handleTempChange}></input>
          <label>{temp} ℃</label>
        </div>
      </CardBody>
    </Card >
  );
};

export default DebugControl;
