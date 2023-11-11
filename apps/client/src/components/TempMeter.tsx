import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Popover,
    PopoverContent,
    PopoverTrigger
} from "@nextui-org/react";
import {useContext} from "react";
import {TempContext} from "../App";
import GaugeComponent from "react-gauge-component";

export const TempMeter = () => {
    const {temp} = useContext(TempContext);

    return (
        <Card isBlurred>
            <CardHeader className="h-14">
                <p>水温(摂氏)</p>
            </CardHeader>
            <CardBody>
                <GaugeComponent
                    type="semicircle"
                    arc={{
                        width: 0.1,
                        subArcs: [
                            {
                                limit: 20,
                                color: 'blue',
                                showTick: true
                            },
                            {
                                limit: 28,
                                color: 'lime',
                                showTick: true
                            },
                            {
                                limit: 50,
                                color: 'red',
                                showTick: true
                            }
                        ]
                    }}
                    pointer={{
                        type: "arrow"
                    }}
                    labels={{
                        valueLabel: {
                            formatTextValue: value => value + '℃',
                            style: {
                                fontSize: 20,
                                fill: '#000000',
                                textShadow: "black 0px 0px 0px"
                            }
                        },
                        tickLabels: {
                            type: "outer",
                            ticks: [
                                {value: 0}
                            ]
                        }

                    }}
                    value={temp}
                    minValue={0}
                    maxValue={50}
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
                <Popover placement="bottom" showArrow={true}>
                    <PopoverTrigger>
                        <Button>水温についてくわしく</Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <p>水温が低いと，魚が病気になりやすくなります．</p>
                        <p>水温が高いと，酸素が溶けにくくなり，魚が窒息してしまいます．</p>
                        <p>水温は，20℃から28℃が適正です．</p>
                    </PopoverContent>
                </Popover>
            </CardFooter>
        </Card>
    )
}

export default TempMeter;
