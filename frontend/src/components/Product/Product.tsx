import { FC, Fragment } from "react";
import { Collapse } from "@/components/Collapse";
import { ProductView } from "@/components/ProductView";

const collapse = [
    { label: 'Ingredients', description: 'Aqua (Water), Glycerin, Cetearyl Alcohol, Caprylic/Capric Triglyceride, Butyrospermum Parkii (Shea) Butter, Niacinamide, Panthenol, Tocopherol (Vitamin E), Sodium Hyaluronate, Allantoin, Aloe Barbadensis Leaf Juice, Chamomilla Recutita (Matricaria) Flower Extract, Phenoxyethanol, Ethylhexylglycerin, Parfum (Fragrance).' },
    { label: 'How to Use', description: 'Apply a small amount to clean, dry skin. Gently massage into the face and neck using upward, circular motions until fully absorbed. Use morning and evening for best results. Avoid contact with eyes.' },
    { label: 'Purpose', description: 'This moisturizing cream is designed to hydrate and nourish the skin, improve elasticity, and protect against environmental stressors. Suitable for all skin types, including sensitive skin.' },
]

export const Product: FC<Product> = (product) => {
    return <Fragment>
        <ProductView {...product} />
    </Fragment>
}