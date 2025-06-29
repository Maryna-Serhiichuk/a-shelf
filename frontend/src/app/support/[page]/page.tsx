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
            <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] lg:grid-cols-4 gap-8 md:gap-14">
                <div className="lg:col-span-1">
                    <SupportMenu/>
                </div>
                <div className="lg:col-span-3">
                    <Support {...data?.data as SupportPage} />
                </div>
            </div>
        </Container>
    );
}