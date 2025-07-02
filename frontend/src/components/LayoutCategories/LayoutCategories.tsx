'use server'

import { Fragment, PropsWithChildren } from "react";
import { Container } from "@/components/Container";
import { Categories } from "@/components/Categories";
import { Bargain, BargainArgs } from "@/components/Bargain";
import { SidebarLayout } from "@/components/SidebarLayout";

interface LayoutCategoriesArgs extends PropsWithChildren<BargainArgs> { }

export default async function LayoutCategories({ children, id, type }: LayoutCategoriesArgs) {
    return (
        <Fragment>
            <SidebarLayout sidebar={<Categories />}>
                {children}
            </SidebarLayout>
            <Container>
                <Bargain type={type} />
            </Container>
        </Fragment>
    );
}