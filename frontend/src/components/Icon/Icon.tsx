'use client'

import { ComponentType, FC, SVGProps } from "react";
import { PhoneIcon, EnvelopeIcon, MapPinIcon, ClockIcon, SparklesIcon, StarIcon, EyeDropperIcon, BeakerIcon, PaintBrushIcon, HandRaisedIcon } from '@heroicons/react/24/outline'

export type IconTypeProp = IconType | 'clock' | 'map_pin' | 'envelope' | 'phone'

const icons: { [key in IconTypeProp]: ComponentType<SVGProps<SVGSVGElement>> } = {
    spakles: SparklesIcon,
    star: StarIcon,
    eye_dropper: EyeDropperIcon,
    beaker: BeakerIcon,
    paint_brush: PaintBrushIcon,
    hand_raised: HandRaisedIcon,

    clock: ClockIcon,
    map_pin: MapPinIcon,
    envelope: EnvelopeIcon,
    phone: PhoneIcon
}

interface IconArgs extends SVGProps<SVGSVGElement> {
    type: IconTypeProp
}

export const Icon: FC<IconArgs> = ({ type, ...props }) => {
    const IconElement = icons[type]

    if (!IconElement) return null

    return <IconElement {...props} />
}