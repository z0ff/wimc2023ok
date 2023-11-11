import nodeWebsocketLib from "websocket"
import {RelayServer} from "./RelayServer";

//const ch = (async() => {
//    const relay = RelayServer("chirimentest", "chirimenSocket", nodeWebsocketLib);
//    const channel = await relay.subscribe("testtest2023");
//    channel.onmessage = receiveMsg;
//    return channel;
//})();

let channel;

export async function connect() {
    const relay = RelayServer("chirimentest", "chirimenSocket", nodeWebsocketLib);
    channel = await relay.subscribe("medaka2023");
    channel.onmessage = receiveMsg;
}

function receiveMsg(msg) {
    console.log(msg.data);
    if (msg.data === "feed") {
        console.log("feed");
    } else {
        const data = JSON.parse(msg.data);
        if (data.light !== undefined) {
            if (data.light.isOn !== undefined) {
                console.log("light: " + data.light.isOn);
            }
            if (data.light.color !== undefined) {
                console.log("light color: " + data.light.color.hue + ", " + data.light.color.saturation + ", " + data.light.color.lightness);
            }
        }
        if (data.feedInterval !== undefined) {
            console.log("feedInterval: " + data.feedInterval);
        }
    }
    // switch(msg.data) {
    //     case "feed":
    //         console.log("feed");
    //         break;
    //     default:
    //         const data = JSON.parse(msg.data);
    //         if (data.light !== undefined) {
    //             if (data.light.isOn !== undefined) {
    //                 console.log("light: " + data.light.isOn);
    //             }
    //             if (data.light.color !== undefined) {
    //                 console.log("light color: " + data.light.color.hue + ", " + data.light.color.saturation + ", " + data.light.color.lightness);
    //             }
    //         }
    //         if (data.feedInterval !== undefined) {
    //             console.log("feedInterval: " + data.feedInterval);
    //         }
    //         break;
    // }
}

export async function sendData() {
    if (channel === undefined) return;
    const data = {
        tds: 0,
        ph: 1,
        temp: 0,
        light: {
            isOn: true,
            color: {
                hue: 0,
                saturaton: 0,
                lightness: 0
            }
        },
        feedInterval: 1
    }

    while (true) {
        channel.send(JSON.stringify(data));
        // 5秒待つ
        await new Promise(resolve => setTimeout(resolve, 5000));
    }
}