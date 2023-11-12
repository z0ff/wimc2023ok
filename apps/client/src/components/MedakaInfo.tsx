import {Card, CardHeader, Image} from "@nextui-org/react";

export const MedakaInfo = () => {
    return (
        <Card isBlurred={true} className={"h-full"}>
            <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                <h1>メダカについて</h1>
                <p>流れの穏やかな小川や水路、池などに生息し、雑食性でミジンコなどの動物プランクトンを食べる。蚊の幼虫ボウフラを好んで食するため、ボウフラを退治する益虫としても知られている。通常、春から夏にかけて成長し、次の年に産卵する。一回の産卵で約十個の卵を産む。一般にメダカの寿命は一年と数か月ほどといわれていて、人工的な飼育下ではその限りではなく、長いものでは3－5年程度生きる。環境省のレッドリストの絶滅危惧種Ⅱ類に指定されている。</p>
            </CardHeader>
            <Image
                removeWrapper
                alt={"card background"}
                src={"/medaka.webp"}
                className={"z-0 w-full h-fit object-cover"}
            />
        </Card>
    )
}

export default MedakaInfo;