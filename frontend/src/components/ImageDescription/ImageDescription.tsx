import { FC } from "react";
import { Container } from "@/components/Container";
import { Markdown } from "@/components/Markdown";
import classNames from "classnames";

export interface ImageDescriptionProps {
    image?: string
    title?: string
    description?: string
    position?: 'left' | 'right'
}

export const ImageDescription: FC<ImageDescriptionProps> = ({ image, title, description, position }) => {
    return <div className="grid grid-cols-2 gap-5">
        <div className={classNames("col-span-1", { "order-2": position === 'right' })}>
            <img src={image} className="h-full w-full object-cover" />
        </div>
        <div className={classNames("col-span-1 pr-12 text-lg", { "order-1": position === 'right' })}>
            <Container>
                <div className="flex flex-col">
                    <div className="text-5xl font-semibold mb-8">
                        {title}
                    </div>
                    <Markdown data={description} />
                </div>
            </Container>
        </div>
    </div>
}