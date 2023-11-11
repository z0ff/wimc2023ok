import {LightContext, sendMessage} from "../App.tsx";
import {useContext, useState} from "react";
import {Card, CardBody, Switch} from "@nextui-org/react";
import {RgbColorPicker, RgbColor} from "react-colorful";
import {SendData} from "../type";

export const LightControl = () => {
    const {light, setLight} = useContext(LightContext);
    const [isOn, setIsOn] = useState(light?.isOn);
    const [color, setColor] = useState(light?.color);
    // const isOnRef = useRef(light?.isOn);
    // const colorRef = useRef(light?.color);

    const handleIsOnToggle = () => {
        setIsOn(!isOn);
        setLight({isOn: isOn!, color: color!});
        const sendData: SendData = {
            light: light,
            feedInterval: undefined
        }
        sendMessage(JSON.stringify(sendData));
    }

    const handleColorChange = (color: RgbColor) => {
        if (color === undefined) {
            return;
        }
        setColor({r: color.r, g: color.g, b: color.b});
        //colorRef.current = {hue: color.hsl.h, saturation: color.hsl.s, lightness: color.hsl.l};
        setLight({isOn: isOn!, color: {r: color.r, g: color.g, b: color.b}});
        const sendData: SendData = {
            light: light,
            feedInterval: undefined
        }
        sendMessage(JSON.stringify(sendData));
    }

    return (
        <Card isBlurred>
            <CardBody>
                <Switch isSelected={isOn} onValueChange={handleIsOnToggle}>ライト</Switch>
                <RgbColorPicker onChange={handleColorChange} />
            </CardBody>
        </Card>
    )
}

export default LightControl;