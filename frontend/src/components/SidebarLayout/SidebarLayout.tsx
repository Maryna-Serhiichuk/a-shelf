'use server'

import { PropsWithChildren } from "react";
import { Container } from "@/components/Container";

interface SidebarLayoutArgs extends PropsWithChildren {
    sidebar: PropsWithChildren['children']
}

export default async function SidebarLayout({ children, sidebar }: SidebarLayoutArgs) {
    return <Container>
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 md:gap-[5%]">
            <div className="col-1 md:col-[1/2]">
                {sidebar}
            </div>
            <div className="col-1 md:col-[2/3] relative z-2">
                {children}
            </div>
        </div>
    </Container>
}