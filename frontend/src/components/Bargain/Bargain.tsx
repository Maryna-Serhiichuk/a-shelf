import { FC } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { productApi } from "@/api/product";
import { BargainItem } from "@/components/BargainItem";

interface BargainArgs {
    id?: string
    type?: string
}

export const Bargain: FC<BargainArgs> = ({ id, type }) => {
    const { useBargainsQuery } = productApi
    const { data, isLoading, isError } = useBargainsQuery({ type, id })

    return <div className="mt-30">
        {!isLoading &&
            <Slider arrows={false} dots speed={500} slidesToShow={1} slidesToScroll={1} autoplay fade autoplaySpeed={5000}>
                {data?.data?.map(bargain => (
                    <BargainItem key={bargain?.documentId} {...bargain} />
                ))}
            </Slider>
        }
    </div>
}