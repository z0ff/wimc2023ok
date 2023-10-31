import {Card, CardBody, CardFooter, CardHeader, Progress} from "@nextui-org/react";
import {useContext} from "react";
import {TempContext} from "../App";

export const TempMeter = () => {
    const {temp} = useContext(TempContext);

    return (
        <Card isBlurred>
            <CardHeader>
                <p>水温(摂氏)</p>
            </CardHeader>
            <CardBody>
                <Progress
                    value={temp}
                    maxValue={50}
                    formatOptions={{}}
                    showValueLabel={true}
                />
                {(() => {
                    if (temp === undefined) {
                        return <label>水温の取得に失敗しました．</label>;
                    }
                    if (temp! < 20) {
                        return <label>水温を上げてください．</label>;
                    } else if (temp! > 28) {
                        return <label>水温を下げてください．</label>;
                    } else {
                        return <label>水温は適正です．</label>;
                    }
                })()}
            </CardBody>
            <CardFooter>
                <p>水温の適正値は20℃~28℃です．</p>
            </CardFooter>
        </Card>
    )
}

export default TempMeter;
