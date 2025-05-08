'use client'

import { Container } from "@/components/Container";
import { use, useEffect, useState } from "react";
import { pageApi } from "@/api/page";
import { Support } from "@/components/Support";
import { SupportMenu } from "@/components/SupportMenu";
import { Loader } from "@/components/Loader";

export default function Page({ params }: { params: Promise<{ page: string }> }) {
    const { page } = use(params);

    const { usePageQuery } = pageApi
    const { data, isLoading } = usePageQuery({ slug: page })

    // if(isLoading) return <Loader/>

    return (
        <Container>
            <div className="grid grid-cols-4 gap-14">
                <div className="col-span-1">
                    <SupportMenu/>
                </div>
                <div className="col-span-3">
                    <Support {...data?.data as SupportPage} />
                </div>
            </div>
        </Container>
    );
}