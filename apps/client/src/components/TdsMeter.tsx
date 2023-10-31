import {Card, CardBody, CardFooter, CardHeader, Input, Progress} from "@nextui-org/react";
import {useContext, useState} from "react";
import {TdsContext, TdsStateContext} from "../App.tsx";

export const TdsMeter = () => {
    const {tds} = useContext(TdsContext);
    const {setTdsState} = useContext(TdsStateContext);
    const [tdsBase, setTdsBase] = useState(100);

    return (
        <Card isBlurred>
            <CardHeader>
                <p>TDS増加量</p>
            </CardHeader>
            <CardBody>
                <Input
                    label="基準値"
                    placeholder="水替え直後のTDS値を入力してください"
                    value={tdsBase.toString()}
                    onValueChange={(v) => setTdsBase(Number(v))}
                />
                <Progress
                    value={tds !== undefined ? tds - tdsBase : NaN}
                    minValue={-500}
                    maxValue={500}
                    formatOptions={{}}
                    showValueLabel={true}
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
                <p>TDSは、水に溶けている不純物の濃度を表す値です。</p>
            </CardFooter>
        </Card>
    )
}

export default TdsMeter;
