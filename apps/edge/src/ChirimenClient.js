import nodeWebsocketLib from "websocket"
import {RelayServer} from "./RelayServer.js";
import {feed} from "./FeederController.js";

//const ch = (async() => {
//    const relay = RelayServer("chirimentest", "chirimenSocket", nodeWebsocketLib);
//    const channel = await relay.subscribe("testtest2023");
//    channel.onmessage = receiveMsg;
//    return channel;
//})();

let channel;

let lightIsOn = true;
const lightColor = {
    hue: 0,
    saturation: 0,
    lightness: 0
}

export const getLightIsOn = () => lightIsOn;
export const getLightColor = () => lightColor;

export async function connectRelay() {
    const relay = RelayServer("chirimentest", "chirimenSocket", nodeWebsocketLib, "originURL");
    channel = await relay.subscribe("medaka2023");
    channel.onmessage = receiveMsg;
}

async function receiveMsg(msg) {
    console.log(msg.data);
    if (msg.data === "feed") {
        console.log("feed");
        await feed();
    } else {
        const data = JSON.parse(msg.data);
        if (data.light !== undefined) {
            if (data.light.isOn !== undefined) {
                console.log("light: " + data.light.isOn);
                lightIsOn = data.light.isOn;
            }
            if (data.light.color !== undefined) {
                console.log("light color: " + data.light.color.hue + ", " + data.light.color.saturation + ", " + data.light.color.lightness);
                lightColor.hue = data.light.color.hue;
                lightColor.saturation = data.light.color.saturation;
                lightColor.lightness = data.light.color.lightness;
            }
        }
        if (data.feedInterval !== undefined) {
            console.log("feedInterval: " + data.feedInterval);
        }
    }
}

export async function sendData(data) {
    if (channel === undefined) return;

    channel.send(JSON.stringify(data));
}