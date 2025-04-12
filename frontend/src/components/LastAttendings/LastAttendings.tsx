import { FC } from "react";
import { Container } from "@/components/Container";
import { useLastAttendings, UseLastAttendingsArgs } from "@/hooks/useLastAttendings";
import { ProductPreview } from "../ProductPreview";
import { SectionTitle } from "../SectionTitle";

interface LastAttendingsArgs extends UseLastAttendingsArgs {}

export const LastAttendings: FC<LastAttendingsArgs> = ({ id }) => {
    const { isPending, data } = useLastAttendings({ id })

    return <Container>
        <SectionTitle>Recently Viewed Products</SectionTitle>
        <div className="grid grid-cols-4 gap-5">
            {data?.map(product => (
                <ProductPreview key={product?.documentId} {...product} className="col-span-2 lg:col-span-1" />
            ))}
        </div>
    </Container>
}