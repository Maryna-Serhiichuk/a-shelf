import { FC } from "react";
import leaves from "@/images/leaves.jpg"
import Image from "next/image";
import { Container } from "@/components/Container";
import { CollapseWrap } from "@/components/CollapseWrap";

export const ProductDetails: FC<Product> = ({ composition, using, purpose }) => {

    const collapse = [
        ...(composition ? [{ label: 'Ingredients', description: composition }] : []),
        ...(using ? [{ label: 'How to Use', description: using }] : []),
        ...(purpose ? [{ label: 'Purpose', description: purpose }] : []),
    ].filter(Boolean);

    return <div className="relative grid grid-cols-1 md:grid-cols-[300px_1fr] shadow-[inset_0px_0px_20px_rgba(0,0,0,.2)]">
        <div className="absolute md:relative h-full w-full">
            <Image src={leaves} alt="" className="w-full h-full object-cover" />
        </div>
        <Container>
            <CollapseWrap items={collapse} className="max-w-[800px] py-10 sm:py-20" />
        </Container>
    </div>
}