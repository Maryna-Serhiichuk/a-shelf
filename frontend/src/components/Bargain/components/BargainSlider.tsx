'use client'

import { FC } from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { BargainItem } from "@/components/BargainItem"

export const BargainSlider: FC<{ items: Maybe<Array<Bargain>> }> = ({ items }) => {
    return <Slider arrows={false} dots speed={500} slidesToShow={1} slidesToScroll={1} autoplay fade autoplaySpeed={5000}>
        {items?.map(bargain => (
            <BargainItem key={bargain?.documentId} {...bargain} />
        ))}
    </Slider>
}