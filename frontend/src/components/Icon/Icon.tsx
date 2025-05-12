'use client'

import { ComponentType, FC, SVGProps } from "react";
import { SparklesIcon, StarIcon, EyeDropperIcon, BeakerIcon, PaintBrushIcon, HandRaisedIcon } from '@heroicons/react/24/outline'

const icons: { [key in IconType]: ComponentType<SVGProps<SVGSVGElement>> } = {
    spakles: SparklesIcon,
    star: StarIcon,
    eye_dropper: EyeDropperIcon,
    beaker: BeakerIcon,
    paint_brush: PaintBrushIcon,
    hand_raised: HandRaisedIcon
}

interface IconArgs extends SVGProps<SVGSVGElement> {
    type: IconType
}

export const Icon: FC<IconArgs> = ({ type, ...props }) => {
    const IconElement = icons[type]

    if (!IconElement) return null

    return <IconElement {...props} />
}