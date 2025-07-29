import { Container } from "@/components/Container"
import reception from "@/images/reception.jpg"
import { pageApi } from "@/api/page";
import { fetchFromApi } from "@/utils/fetchFromApi"
import { CollapseWrap } from "@/components/CollapseWrap";
import { BorderWrap } from "@/components/BorderWrap";

export const dynamic = 'force-dynamic';

export default async function Page() {
    const data = await fetchFromApi<Faq>(pageApi.endpoints.faq)

    const items = data?.data?.items?.map(it => ({
        label: it.key,
        description: it.value
    }))

    return <div className="relative h-full">
        <div className="absolute h-full w-full">
            <img src={reception.src} className="dark:hidden h-full w-full object-cover blur-sm opacity-70" />
        </div>
        <div className="relative z-5">
            <Container>
                <div className="flex justify-center">
                    <div className="max-w-[1200px]">
                        <BorderWrap className="font-bold text-xl sm:text-3xl md:text-4xl text-center font-heading mb-10 sm:mb-20 bg-[rgba(255,255,255,.5)]">
                            {data?.data?.title}
                        </BorderWrap>
                        {items && <CollapseWrap items={items} />}
                    </div>
                </div>
            </Container>
        </div>
    </div>
}