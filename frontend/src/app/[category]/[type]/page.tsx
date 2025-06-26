import { Bargain } from "@/components/Bargain";
import { Categories } from "@/components/Categories";
import { Container } from "@/components/Container";
import { Products } from "@/components/Products";

export const dynamic = 'force-dynamic';

export default async function Page({ params }: { params: { type: string } }) {
    const { type } = await params;

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
            <Bargain type={type} />
        </Container>
    );
}
