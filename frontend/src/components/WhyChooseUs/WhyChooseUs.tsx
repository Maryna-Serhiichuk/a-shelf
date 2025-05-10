import { FC } from "react";
import { ImageDescription } from "@/components/ImageDescription";
import delivery from "@/images/packing.jpg"

const text = `
At the heart of our brand is a simple belief: skincare should be gentle, effective, and rooted in nature. We are not about covering up, but about caring — providing your skin with what it truly needs to feel healthy, nourished, and balanced.

Our journey began with a personal search for skincare that respects the skin’s natural rhythms. Frustrated by harsh formulas and empty promises, we created a line of products that combine safe ingredients, modern science, and a touch of nature’s wisdom. Every product is crafted with care, designed to support your skin in its natural glow — no shortcuts, no irritants, just honest care.

We are a small, passionate team, and we believe that real beauty comes from feeling comfortable in your own skin. That’s why our commitment goes beyond products — it’s about education, support, and empowering you to make thoughtful choices in your skincare routine.
`

export const WhyChooseUs: FC = () => {
    return <div className="pt-10 pb-20">
        <ImageDescription image={delivery.src} description={text} title="Why Choose Us" position="right" />
    </div>
}