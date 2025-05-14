import { ComponentType, FC, SVGProps } from "react";
import { Pslab, Leaf, Pet, Water, Face, Diamond, Clock, Glass } from "@/components/Icons"

const icons: { [key in IllustrationType]: ComponentType<SVGProps<SVGSVGElement>> } = {
    flask: Pslab,
    leaf: Leaf,
    pet: Pet,
    drop: Water,
    face: Face,
    diamond: Diamond,
    clock: Clock,
    glass: Glass
}

interface IllustrationArgs extends SVGProps<SVGSVGElement> {
    type: IllustrationType
}


export const Illustration: FC<IllustrationArgs> = ({ type, ...props }) => {
    const IconElement = icons[type]

    if (!IconElement) return null

    return <IconElement {...props} />
}