import {RelayServer} from "./RelayServer";

let channel;
let message = "";

async function connect() {
    const relay = RelayServer("chirimentest", "chirimenSocket");
    channel = await relay.subscribe("medaka2023");
    channel.onmessage = receiveMsg;
}

function receiveMsg(msg) {
    console.log(msg.data);
    message = msg.data;
}