'use client'

import { productApi } from "@/api/product";
import { Bargain } from "@/components/Bargain";
import { Container } from "@/components/Container";
import { LastAttendings } from "@/components/LastAttendings";
import { Product } from "@/components/Product";
import { Fragment, use } from "react";
import { useCartlines } from "@/hooks/useCartlines";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);

    const { carlineProductIds } = useCartlines()

    const { useProductQuery } = productApi
    const { data, isLoading, isError } = useProductQuery({ id })

    return (
        <Fragment>
            {data?.data && <Product {...data?.data} isCart={carlineProductIds?.includes(id)} />}
            <Container>
                <Bargain id={id} />
            </Container>
            <LastAttendings id={id} />
        </Fragment>
    );
}
