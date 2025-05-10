'use client'

import { AboutUs } from "@/components/AboutUs"
import { Container } from "@/components/Container"
import { Cta } from "@/components/Cta"
import { Formula } from "@/components/Formula"
import { Hero } from "@/components/Hero"
import { OurValues } from "@/components/OurValues"
import { WhyChooseUs } from "@/components/WhyChooseUs"
import { Fragment } from "react"

export default function Page() {
    return <Fragment>
        <Container full>
            <Hero />
            <AboutUs />
        </Container>
        <OurValues />
        <Container full>
            <Formula />
            <WhyChooseUs />
        </Container>
        <Cta />
    </Fragment>
}