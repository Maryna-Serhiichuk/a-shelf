'use client'

import { Categories } from "@/components/Categories";
import { Container } from "@/components/Container";
import { Types } from "@/components/Types";
import { useQuery } from "@tanstack/react-query";
import { use } from "react";

export default function Page({ params }: { params: Promise<{ category: string }> }) {
    const { category } = use(params);

    return (
        <Container>
            <div className="grid grid-cols-[200px_1fr] gap-0 sm:gap-[5%]">
                <div className="hidden sm:block col-[1/2] justify-items-center">
                    <Categories/>
                </div>
                <div className="col-[1/3] sm:col-[2/3]">
                    <Types category={category}/>
                </div>
            </div>
        </Container>
    );
}
