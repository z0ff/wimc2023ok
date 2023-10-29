import {Card, CardBody, CardFooter, CardHeader, Progress} from "@nextui-org/react";

export const PhMeter = () => {
    const ph = 7;
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
            </CardBody>
            <CardFooter>
                <p>pHは、水溶液の酸性・アルカリ性を表す値です。</p>
            </CardFooter>
        </Card>
    )
}

export default PhMeter;