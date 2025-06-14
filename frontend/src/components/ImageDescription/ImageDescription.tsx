import { FC } from "react";
import { Container } from "@/components/Container";
import { Markdown } from "@/components/Markdown";
import classNames from "classnames";
import { Img } from "@/components/Img";

export const ImageDescription: FC<ImageDescription> = ({ image, title, description, position }) => {
    return <section className="grid grid-cols-2 gap-5">
        <div className={classNames("col-span-2 xl:col-span-1", { "order-1 xl:order-2": position === 'right' })}>
            <Img src={image?.url} className="h-full w-full object-cover" />
        </div>
        <div className={classNames("col-span-2 xl:col-span-1 pr-12 text-lg", { "order-2 xl:order-1": position === 'right' })}>
            <Container>
                <div className="flex flex-col">
                    <div className="text-5xl font-semibold mb-8">
                        {title}
                    </div>
                    <Markdown data={description} />
                </div>
            </Container>
        </div>
    </section>
}