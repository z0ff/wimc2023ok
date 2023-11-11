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
    r: 0,
    g: 0,
    b: 0
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
                console.log("light color: " + data.light.color.r + ", " + data.light.color.g + ", " + data.light.color.b);
                lightColor.r = data.light.color.r;
                lightColor.g = data.light.color.g;
                lightColor.b = data.light.color.b;
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