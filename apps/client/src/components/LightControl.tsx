import {LightContext, sendMessage} from "../App.tsx";
import {useContext, useState} from "react";
import {Card, CardBody, Switch} from "@nextui-org/react";
import {HslColorPicker, HslColor} from "react-colorful";

export const LightControl = () => {
    const {light, setLight} = useContext(LightContext);
    const [isOn, setIsOn] = useState(light?.isOn);
    const [color, setColor] = useState(light?.color);
    // const isOnRef = useRef(light?.isOn);
    // const colorRef = useRef(light?.color);

    const handleIsOnToggle = () => {
        setIsOn(!isOn);
        setLight({isOn: isOn!, color: color!});
        sendMessage(JSON.stringify(light));
    }

    const handleColorChange = (color: HslColor) => {
        if (color === undefined) {
            return;
        }
        setColor({hue: color.h, saturation: color.s, lightness: color.l});
        //colorRef.current = {hue: color.hsl.h, saturation: color.hsl.s, lightness: color.hsl.l};
        setLight({isOn: isOn!, color: {hue: color.h, saturation: color.s, lightness: color.l}});
        sendMessage(JSON.stringify(light));
    }

    return (
        <Card isBlurred>
            <CardBody>
                <Switch isSelected={isOn} onValueChange={handleIsOnToggle}>ライト</Switch>
                <HslColorPicker onChange={handleColorChange} />
            </CardBody>
        </Card>
    )
}

export default LightControl;