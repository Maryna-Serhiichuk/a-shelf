'use client'

import { LayoutCategories } from "@/components/LayoutCategories";
import { useQuery } from "@tanstack/react-query";

export default function Page() {

    const { isPending, error, data } = useQuery<User>({
        queryKey: ['account'],
        // enabled: !!id,
        queryFn: () =>
            fetch(`http://127.0.0.1:1337/api/users/1`).then((res) =>
                res.json(),
            ),
    })

    return (
        <LayoutCategories>
            Account
        </LayoutCategories>
    );
}