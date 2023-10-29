import {Card, CardBody, CardFooter, CardHeader, Progress} from "@nextui-org/react";
import {useContext} from "react";
import {TdsContext} from "../App.tsx";

export const TdsMeter = () => {
    const {tds} = useContext(TdsContext);
    //const tdsRef = useRef(tds);

    return (
        <Card isBlurred>
            <CardHeader>
                <p>TDS {tds}</p>
            </CardHeader>
            <CardBody>
                <Progress
                    value={tds}
                    maxValue={300}
                    formatOptions={{}}
                    showValueLabel={true}
                />
            </CardBody>
            <CardFooter>
                <p>TDSは、水に溶けている不純物の濃度を表す値です。</p>
            </CardFooter>
        </Card>
    )
}

export default TdsMeter;