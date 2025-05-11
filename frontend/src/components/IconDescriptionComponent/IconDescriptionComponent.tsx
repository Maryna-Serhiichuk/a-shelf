import { FC } from "react";
import { Container } from "@/components/Container";
import { IconDescription } from "@/components/IconDescription";

export const IconDescriptionComponent: FC<{ items?: IconDescriptionComponent['items'] }> = ({ items }) => {
    return <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-5 lg:gap-20 cursor-default">
            {items?.map(item => (
                <IconDescription key={item?.heading} {...item} />
            ))}
        </div>
    </Container>
}