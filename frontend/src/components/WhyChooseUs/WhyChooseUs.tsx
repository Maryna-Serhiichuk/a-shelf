import { FC } from "react";
import { ImageDescription } from "@/components/ImageDescription";

export const WhyChooseUs: FC<ImageDescription> = (props) => {
    return <div className="sm:pt-10 pb-20">
        <ImageDescription {...props} />
    </div>
}