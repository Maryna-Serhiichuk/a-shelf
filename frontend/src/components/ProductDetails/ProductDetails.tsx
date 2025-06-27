import { FC } from "react";
import leaves from "@/images/leaves.jpg"
import Image from "next/image";
import { Collapse } from "@/components/Collapse";
import { Container } from "@/components/Container";

export const ProductDetails: FC<Product> = ({ composition, using, purpose }) => {

    const collapse = [
        ...(composition ? [{ label: 'Ingredients', description: composition }] : []),
        ...(using ? [{ label: 'How to Use', description: using }] : []),
        ...(purpose ? [{ label: 'Purpose', description: purpose }] : []),
    ].filter(Boolean);

    return <div className="relative grid grid-cols-1 md:grid-cols-[300px_1fr] shadow-[inset_0px_0px_20px_rgba(0,0,0,.2))]">
        <div className="absolute md:relative h-full w-full">
            <Image src={leaves} alt="" className="w-full h-full object-cover" />
        </div>
        <Container>
            <div className="flex justify-center py-10 sm:py-20">
                <div className="max-w-[800px] w-full py-4 px-8 border-3 border-stone-900 dark:border-stone-700 shadow-lg bg-[rgba(255,255,255,.9)] md:bg-stone-50 dark:bg-stone-800">
                    <Collapse items={collapse} />
                </div>
            </div>
        </Container>
    </div>
}