'use client'

import { Categories } from "@/components/Categories";
import { Container } from "@/components/Container";
import { Products } from "@/components/Products";
import { Types } from "@/components/Types";
import { useQuery } from "@tanstack/react-query";
import { use } from "react";

export default function Page({ params }: { params: Promise<{ type: string }> }) {
    const { type } = use(params);

    console.log(type)

    return (
        <Container>
            <div className="grid gap-0 sm:gap-[5%]">
                <div className="hidden sm:block col-[1/2] justify-items-center">
                    <Categories/>
                </div>
                <div className="col-[1/3] sm:col-[2/3]">
                    <Products type={type}/>
                </div>
            </div>
        </Container>
    );
}
