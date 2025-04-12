import { FC } from "react";
import leaves from "@/images/leaves.jpg"
import Image from "next/image";
import { Collapse } from "@/components/Collapse";
import { Container } from "@/components/Container";

const collapse = [
    { label: 'Ingredients', description: 'Aqua (Water), Glycerin, Cetearyl Alcohol, Caprylic/Capric Triglyceride, Butyrospermum Parkii (Shea) Butter, Niacinamide, Panthenol, Tocopherol (Vitamin E), Sodium Hyaluronate, Allantoin, Aloe Barbadensis Leaf Juice, Chamomilla Recutita (Matricaria) Flower Extract, Phenoxyethanol, Ethylhexylglycerin, Parfum (Fragrance).' },
    { label: 'How to Use', description: 'Apply a small amount to clean, dry skin. Gently massage into the face and neck using upward, circular motions until fully absorbed. Use morning and evening for best results. Avoid contact with eyes.' },
    { label: 'Purpose', description: 'This moisturizing cream is designed to hydrate and nourish the skin, improve elasticity, and protect against environmental stressors. Suitable for all skin types, including sensitive skin.' },
]

export const ProductDetails: FC<Product> = () => {
    return <div className="relative grid grid-cols-1 md:grid-cols-[300px_1fr] shadow-[inset_0px_0px_20px_rgba(0,0,0,.2))]">
        <div className="absolute md:relative h-full w-full">
            <Image src={leaves} alt="" className="w-full h-full object-cover" />
        </div>
        <Container>
            <div className="flex justify-center py-20">
                <div className="max-w-[800px] w-full py-4 px-8 border-3 border-stone-900 shadow-lg  bg-[rgba(255,255,255,.9)] md:bg-stone-50">
                    <Collapse items={collapse} />
                </div>
            </div>
        </Container>
    </div>
}