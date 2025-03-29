'use client'

import { Categories } from "@/components/Categories";
import { Container } from "@/components/Container";
import { Types } from "@/components/Types";
import { use } from "react";

export default function Page({ params }: { params: Promise<{ category: string }> }) {
    const { category } = use(params);
    console.log(category)
    return (
        <Container>
            <div className="grid grid-cols-[200px 1fr] gap-0 sm:gap-[5%]">
                <div className="hidden sm:block col-[1/2] justify-items-center">
                    <Categories/>
                </div>
                <div className="col-[2/3]">
                    <Types/>
                </div>
            </div>
        </Container>
    );
}
