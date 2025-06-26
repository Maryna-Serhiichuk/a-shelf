import { productApi } from "@/api/product";
import { Bargain } from "@/components/Bargain";
import { Container } from "@/components/Container";
import { LastAttendings } from "@/components/LastAttendings";
import { Product } from "@/components/Product";
import { Fragment } from "react";
import { fetchFromApi } from "@/utils/fetchFromApi"

export const dynamic = 'force-dynamic';

export default async function Page({ params }: { params: { id: string } }) {
    const { id } = await params;

    const data = await fetchFromApi<Product>(productApi.endpoints.product, { id })

    return (
        <Fragment>
            {data?.data && <Product {...data?.data} />}
            <Container>
                <Bargain id={id} />
            </Container>
            <LastAttendings id={id} />
        </Fragment>
    );
}
