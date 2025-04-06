import { FC } from "react";
import { Img } from "@/components/Img";
import { Price } from "@/components/Price";

export const Product: FC<Product> = ({ documentId, name, price, type, illustration, discount }) => {
    return <div className="grid grid-cols-[1fr_1fr] gap-[5%]">
        <div className="col-[1/2]">
            <Img src={illustration?.url}/>
        </div>
        <div className="col-[2/3]">
            <div className="text-6xl font-light">
                {name}
            </div>
            <div className="text-4xl font-bold">
                <Price price={price} discount={discount}/>
            </div>
        </div>
    </div>
}