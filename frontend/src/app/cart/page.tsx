'use client'

import { LayoutCategories } from "@/components/LayoutCategories";
import { useQuery } from "@tanstack/react-query";
import { Desire } from '@/components/Desire';

export default function Page() {

    const { isPending, error, data } = useQuery<User>({
        queryKey: ['account'],
        // enabled: !!id,
        queryFn: () =>
            fetch(`http://127.0.0.1:1337/api/users/1?populate[0]=products.illustration&populate[1]=products.discount`).then((res) =>
                res.json(),
            ),
    })

    const products = data?.products as User['products']

    return (
        <LayoutCategories>
            <div className="flex flex-col gap-5 max-w-[900px]">
                {products?.map((product, index) => (
                    <Desire key={product?.documentId + index} {...product} />
                ))}
            </div>
        </LayoutCategories>
    );
}