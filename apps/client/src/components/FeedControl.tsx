import {Button, Card, CardBody, Input} from "@nextui-org/react";
import {FeedIntervalContext, sendMessage} from "../App.tsx";
import {useContext, useEffect, useState} from "react";
import {SendData} from "../type";

export const FeedControl = () => {
    const {feedInterval, setFeedInterval} = useContext(FeedIntervalContext);
    const [feedIntervalInput, setFeedIntervalInput] = useState('5');

    useEffect(() => {
        if (feedInterval !== undefined) {
            setFeedIntervalInput(feedInterval.toString());
        }
    }, [feedInterval]);

    const handleSetIntervalButton = () => {
        const _feedInterval = parseInt(feedIntervalInput);
        if (isNaN(_feedInterval)) {
            return;
        }
        setFeedInterval(_feedInterval);

        const _sendData: SendData = {
            light: undefined,
            feedInterval: _feedInterval,
        }
        sendMessage(JSON.stringify(_sendData));
    }

    return (
        <Card isBlurred>
        <CardBody>
            <Button onPress={() => sendMessage("feed")}>えさをやる</Button>
            <div className="flex mt-2 gap-2 items-center">
                <div className="flex-auto">
                    <Input
                        label="えさをやる間隔"
                        value={feedIntervalInput}
                        onValueChange={setFeedIntervalInput}
                        endContent={
                            <div className="pointer-events-none flex items-center">
                                <span className="text-default-400 text-small">時間</span>
                            </div>
                        }

                    />
                </div>
                <div className="flex-none h-full">
                    <Button
                        onPress={handleSetIntervalButton}
                    >セット</Button>
                </div>
            </div>
        </CardBody>
        </Card>
    )
}