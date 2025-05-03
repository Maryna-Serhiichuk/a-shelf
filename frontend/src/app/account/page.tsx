'use client'

import { accountApi } from "@/api/account";
import { LayoutCategories } from "@/components/LayoutCategories";

export default function Page() {
    const { useMeQuery } = accountApi
    const { data } = useMeQuery(undefined)

    return (
        <LayoutCategories>
            Account
        </LayoutCategories>
    );
}