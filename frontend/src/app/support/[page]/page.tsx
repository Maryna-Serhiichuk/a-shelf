import { Container } from "@/components/Container";
import { pageApi } from "@/api/page";
import { Support } from "@/components/Support";
import { SupportMenu } from "@/components/SupportMenu";
import { fetchFromApi } from "@/utils/fetchFromApi"

export const dynamic = 'force-dynamic';

export default async function Page({ params }: { params: Promise<{ page: string }> }) {
    const { page } = await params;

    const data = await fetchFromApi<SupportPage>(pageApi.endpoints.page, { slug: page })

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