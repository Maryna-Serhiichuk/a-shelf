import { Bargain } from "@/components/Bargain";
import { Categories } from "@/components/Categories";
import { Container } from "@/components/Container";
import { Products } from "@/components/Products";

export const dynamic = 'force-dynamic';

export default async function Page({params, searchParams}: { params: { type: string }, searchParams: { search?: string } }) {
    const { type } = await params;
    const awaitedSearchParams = await searchParams;
    const search = awaitedSearchParams?.search

    return (
        <Container>
            <div className="grid gap-0 sm:gap-[5%]">
                <div className="hidden sm:block col-[1/2] justify-items-center">
                    <Categories />
                </div>
                <div className="col-[1/3] sm:col-[2/3]">
                    <Products type={type} search={search}/>
                </div>
            </div>
            <Bargain type={type} />
        </Container>
    );
}