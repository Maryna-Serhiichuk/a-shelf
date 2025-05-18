'use client'

import { productApi } from "@/api/product";
import { Bargain } from "@/components/Bargain";
import { Container } from "@/components/Container";
import { LastAttendings } from "@/components/LastAttendings";
import { Product } from "@/components/Product";
import { Fragment, use } from "react";
import { useProviderContext } from "@/components/App/ContextProvider/ContextProvider";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);

    const { localStorageCart } = useProviderContext()

    const { useProductQuery } = productApi
    const { data, isLoading, isError } = useProductQuery({ id })

    return (
        <Fragment>
            {data?.data && <Product {...data?.data} isCart={localStorageCart?.map(it => it?.id)?.includes(id)} />}
            <Container>
                <Bargain id={id} />
            </Container>
            <LastAttendings id={id} />
        </Fragment>
    );
}
