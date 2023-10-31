import {Card, CardBody, CardFooter, CardHeader, Progress} from "@nextui-org/react";
import {useContext} from "react";
import {PhContext} from "../App";

export const PhMeter = () => {
    const {ph} = useContext(PhContext);

    return (
        <Card isBlurred>
            <CardHeader>
                <p>pH</p>
            </CardHeader>
            <CardBody>
                <Progress
                    value={ph}
                    maxValue={14}
                    formatOptions={{}}
                    showValueLabel={true}
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
            <CardFooter>
                <p>pHは、水溶液の酸性・アルカリ性を表す値です。</p>
                <p>適正値は5~9です．</p>
            </CardFooter>
        </Card>
    )
}

export default PhMeter;
