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
import {PhContext} from "../App";
import GaugeComponent from "react-gauge-component";

export const PhMeter = () => {
    const {ph} = useContext(PhContext);

    return (
        <Card isBlurred className={"h-full"}>
            <CardHeader className="h-14">
                <p>pH</p>
            </CardHeader>
            <CardBody>
                    <GaugeComponent
                        type="semicircle"
                        arc={{
                            width: 0.1,
                            subArcs: [
                                {
                                    limit: 5,
                                    color: 'red',
                                    showTick: true
                                },
                                {
                                    limit: 9,
                                    color: 'lime',
                                    showTick: true
                                },
                                {
                                    limit: 14,
                                    color: 'purple',
                                    showTick: true
                                }
                            ]
                        }}
                        pointer={{
                            type: "arrow"
                        }}
                        labels={{
                            valueLabel: {
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
                        value={ph}
                        minValue={1}
                        maxValue={14}
                    />
                {(() => {
                    if (ph === undefined){
                        return <label>pH値の取得に失敗しました．</label>;
                    }
                    if (ph < 5) {
                        return <label>pH値が低い(酸性)です．</label>;
                    } else if (ph > 9) {
                        return <label>pH値が高い(アルカリ性)です．</label>;
                    } else {
                        return <label>pH値は適正です．</label>;
                    }
                })()}
            </CardBody>
            <CardFooter className="align-">
                <Popover placement="bottom" showArrow={true}>
                    <PopoverTrigger>
                        <Button>pHについてくわしく</Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <p>pHは、水溶液の酸性・アルカリ性を表す値です。</p>
                    </PopoverContent>
                </Popover>
            </CardFooter>
        </Card>
    )
}

export default PhMeter;
