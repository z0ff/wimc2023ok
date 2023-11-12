import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Input,
    Popover,
    PopoverContent,
    PopoverTrigger
} from "@nextui-org/react";
import {useContext, useState} from "react";
import {TdsContext, TdsStateContext} from "../App.tsx";
import GaugeComponent from "react-gauge-component";

export const TdsMeter = () => {
    const {tds} = useContext(TdsContext);
    const {setTdsState} = useContext(TdsStateContext);
    const [tdsBase, setTdsBase] = useState(100);

    return (
        <Card isBlurred className={"h-full"}>
            <CardHeader className="h-14">
                <div className="flex gap-2 items-center">
                <p className="flex-none">TDS増加量</p>
                <div className="flex-auto">
                <Input
                    label="基準値"
                    labelPlacement="outside-left"
                    size="sm"
                    placeholder="水替え直後のTDS値を入力してください"
                    value={tdsBase.toString()}
                    onValueChange={(v) => setTdsBase(Number(v))}
                />
                </div>
                </div>
            </CardHeader>
            <CardBody>
                <GaugeComponent
                    type="semicircle"
                    arc={{
                        width: 0.1,
                        subArcs: [
                            {
                                limit: -50,
                                color: 'blue',
                                showTick: true
                            },
                            {
                                limit: 100,
                                color: 'lime',
                                showTick: true
                            },
                            {
                                limit: 500,
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
                            formatTextValue: value => `${value > 0 ? '+' : value === 0 ? '±' : ''}` + value + 'ppm',
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
                    value={tds !== undefined ? tds - tdsBase : NaN}
                    minValue={-500}
                    maxValue={500}
                />
                {(() => {
                    if (tds === undefined) {
                        return <label>TDS値の取得に失敗しました．</label>;
                    }
                    if (tds - tdsBase < 0) {
                        setTdsState("Less");
                        return <label>ミネラルが少ない可能性があります．</label>;
                    } else if (tds - tdsBase > 200) {
                        setTdsState("Over");
                        return <label>新しい水に替えましょう．</label>;
                    } else {
                        setTdsState("Moderate");
                        return <label>TDS値は適正です．</label>;
                    }
                })()}
            </CardBody>
            <CardFooter>
                <Popover placement="bottom" showArrow={true}>
                    <PopoverTrigger>
                        <Button>TDSについてくわしく</Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <p>TDSは、水に溶けている不純物の濃度を表す値です。</p>
                    </PopoverContent>
                </Popover>
            </CardFooter>
        </Card>
    )
}

export default TdsMeter;
