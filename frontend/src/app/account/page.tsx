'use client'

import { accountApi } from "@/api/account";
import { LayoutCategories } from "@/components/LayoutCategories";

export default function Page() {
    const { useMeQuery } = accountApi
    const { data } = useMeQuery(undefined)

    console.log(data)

    return (
        <LayoutCategories>
            Account
        </LayoutCategories>
    );
}