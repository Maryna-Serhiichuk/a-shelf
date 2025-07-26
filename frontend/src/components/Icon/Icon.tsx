'use client'

import { ComponentType, FC, SVGProps } from "react";
import { PhoneIcon, EnvelopeIcon, MapPinIcon, ClockIcon, SparklesIcon, StarIcon, EyeDropperIcon, BeakerIcon, PaintBrushIcon, HandRaisedIcon, HeartIcon, ShoppingBagIcon, BuildingStorefrontIcon } from '@heroicons/react/24/outline'

export type IconTypeProp = IconType | 'clock' | 'map_pin' | 'envelope' | 'phone' | 'heart' | 'shopping_bag' | 'building_storefront'

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
    phone: PhoneIcon,

    heart: HeartIcon,
    shopping_bag: ShoppingBagIcon,
    building_storefront: BuildingStorefrontIcon
}

interface IconArgs extends SVGProps<SVGSVGElement> {
    type: IconTypeProp
}

export const Icon: FC<IconArgs> = ({ type, ...props }) => {
    const IconElement = icons[type]

    if (!IconElement) return null

    return <IconElement {...props} />
}