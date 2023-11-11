import {Button} from "@nextui-org/react";
import {sendMessage} from "../App.tsx";

export const FeedButton = () => {

    return (
        <div>
            <Button onClick={() => sendMessage("feed")}>Feed</Button>
        </div>
    )
}