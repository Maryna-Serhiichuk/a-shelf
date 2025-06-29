'use server'

import { PropsWithChildren } from "react";
import { Container } from "@/components/Container";
import { Categories } from "@/components/Categories";
import { Bargain, BargainArgs } from "@/components/Bargain";

interface LayoutCategoriesArgs extends PropsWithChildren<BargainArgs> {}

export default async function LayoutCategories ({ children, id, type }: LayoutCategoriesArgs) {
    return (
        <Container>
            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 md:gap-[5%]">
                <div className="col-1 md:col-[1/2] justify-items-center">
                    <Categories />
                </div>
                <div className="col-1 md:col-[2/3]">
                    {children}
                </div>
            </div>
            <Bargain type={type} />
        </Container>
    );
}