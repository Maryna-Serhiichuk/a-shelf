'use client'

import { Bargain } from "@/components/Bargain";
import { Categories } from "@/components/Categories";
import { Container } from "@/components/Container";
import { Types } from "@/components/Types";
import { useQuery } from "@tanstack/react-query";
import { use } from "react";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);

    const { isPending, error, data } = useQuery<Response<Product>>({
        queryKey: ['product', id],
        enabled: !!id,
        queryFn: () =>
            fetch(`http://127.0.0.1:1337/api/products/${id}`).then((res) =>
                res.json(),
            ),
    })

    return (
        <Container>
            sdfsdfsfd
            <Bargain id={id} />
        </Container>
    );
}
