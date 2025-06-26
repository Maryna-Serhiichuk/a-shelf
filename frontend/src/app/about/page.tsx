import { pageApi } from "@/api/page"
import { AboutUs } from "@/components/AboutUs"
import { Container } from "@/components/Container"
import { Cta } from "@/components/Cta"
import { Formula } from "@/components/Formula"
import { Hero } from "@/components/Hero"
import { OurValues } from "@/components/OurValues"
import { WhyChooseUs } from "@/components/WhyChooseUs"
import { Fragment } from "react"
import { fetchFromApi } from "@/utils/fetchFromApi"

export const dynamic = 'force-dynamic';

export default async function Page() {
    const data = await fetchFromApi<AboutPage>(pageApi.endpoints.about)

    return <Fragment>
        <Container full>
            {data?.data?.hero && <Hero {...data?.data?.hero} />}
            {data?.data?.about && <AboutUs {...data?.data?.about} />}
        </Container>
        {data?.data?.values && <OurValues {...data?.data?.values} />}
        <Container full>
            {data?.data?.formula && <Formula {...data?.data?.formula} />}
            {data?.data?.choose && <WhyChooseUs {...data?.data?.choose} />}
        </Container>
        {data?.data?.cta && <Cta {...data?.data?.cta} />}
    </Fragment>
}