'use client'

import { Bargain } from "@/components/Bargain";
import { Container } from "@/components/Container";
import { Product } from "@/components/Product";
import { useQuery } from "@tanstack/react-query";
import { use } from "react";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);

    const { isPending, error, data } = useQuery<Response<Product>>({
        queryKey: ['product', id],
        enabled: !!id,
        queryFn: () =>
            fetch(`http://127.0.0.1:1337/api/products/${id}?populate[0]=illustration&populate[1]=discount`).then((res) =>
                res.json(),
            ),
    })

    console.log(data?.data)

    return (
        <Container>
            {data?.data && <Product {...data?.data} />}
            <Bargain id={id} />
        </Container>
    );
}
