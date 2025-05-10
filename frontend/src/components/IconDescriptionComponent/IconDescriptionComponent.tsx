import { FC } from "react";
import { Container } from "@/components/Container";
import { IconDescription, IconDescriptionProps } from "@/components/IconDescription";

export type IconDescriptionComponentProps  = Array<IconDescriptionProps>

export const IconDescriptionComponent: FC<{ items?: IconDescriptionComponentProps }> = ({ items }) => {
    return <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-5 lg:gap-20 cursor-default">
            {items?.map(item => (
                <IconDescription key={item?.title} {...item} />
            ))}
        </div>
    </Container>
}