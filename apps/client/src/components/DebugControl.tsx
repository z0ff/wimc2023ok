import {ChangeEvent, useEffect, useRef, useState} from "react";
import {Card, CardBody, CardHeader} from "@nextui-org/react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {RelayServer} from "../RelayServer.js";
import nodeWebSocketLib from "websocket";
import {LightData, ReceiveData} from "../type";

export const DebugControl = () => {
  const [tds, setTds] = useState<number | undefined>(100);
  const [ph, setPh] = useState<number | undefined>(7);
  const [temp, setTemp] = useState<number | undefined>(20);
  const tdsRef = useRef(null);
  const phRef = useRef(null);
  const tempRef = useRef(null);

  const light: LightData = {
    isOn: true,
    color: {
      r: 0,
      g: 0,
      b: 0,
    }
  }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let channel: any;
  let message: string;

  const handleTdsChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTds(Number(event.target.value!));
  }

  const handlePhChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPh(Number(event.target.value!));
  }

  const handleTempChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTemp(Number(event.target.value!));
  }

  useEffect(() => {
    const tdsInput: HTMLInputElement = tdsRef.current!;
    const phInput: HTMLInputElement = phRef.current!;
    const tempInput: HTMLInputElement = tempRef.current!;

    tdsInput.value = tds!.toString();
    phInput.value = ph!.toString();
    tempInput.value = temp!.toString();

    (async () => {
      const relay = RelayServer("chirimentest", "chirimenSocket", nodeWebSocketLib, "originURL");
      channel = await relay.subscribe("medaka2023");

      if (channel === undefined) {
        return;
      }

      console.log("connected (debug)");

      while (true) {
        const sendData: ReceiveData = {
            sender: "edge",
            tds: Number(tdsInput.value),
            ph: Number(phInput.value),
            temp: Number(tempInput.value),
            light: {
                isOn: light.isOn,
                color: {
                    r: light.color.r,
                    g: light.color.g,
                    b: light.color.b,
                }
            },
            feedInterval: 0,
        }
        message = JSON.stringify(sendData);
        if (message !== undefined) {
          console.log(message);
          channel.send(message);
        }
        await new Promise((resolve) => setTimeout(resolve, 5000));
      }
    })();
  }, []);

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
