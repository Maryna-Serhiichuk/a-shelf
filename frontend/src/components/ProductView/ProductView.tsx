import { FC, Fragment } from "react";
import { Container } from "@/components/Container";
import { Price } from "@/components/Price";
import { Button } from "@/components/Button";
import { Img } from "@/components/Img";
import { useAddDesire } from "@/hooks/useAddDesire";
import { ActiveIngredients } from "@/components/ActiveIngredients";
import classNames from "classnames";
import { ProductElement } from "./components/ProductElement";

export const ProductView: FC<Product> = ({ documentId, name, subname, description, ingredients, price, type, illustration, discount, volume, isCart, composition, using, purpose, isOutOfStock }) => {
    const { addDesire } = useAddDesire()

    const addToCart = () => {
        addDesire(documentId)
    }

    return <Fragment>
        <Container theme="background">
            <div className="grid grid-cols-6 gap-10 items-center">
                <div className="hidden lg:flex justify-center col-span-2">
                    <div className="flex flex-col gap-4">
                        <ProductElement.Name>
                            {name}
                        </ProductElement.Name>
                        <ProductElement.Volume>
                            {volume}
                        </ProductElement.Volume>
                        {!isOutOfStock &&
                            <Fragment>
                                <div className="text-2xl font-bold">
                                    <Price price={price} discount={discount} />
                                </div>
                                <ProductElement.Buttons onHeart={addToCart} solidIcon={isCart} className="flex flex-nowrap flex-col gap-1">
                                    {isCart
                                        ? <Button variant="outlined">
                                            Added
                                        </Button>
                                        : <Button variant="outlined" onClick={addToCart}>
                                            Add to Cart
                                        </Button>
                                    }
                                </ProductElement.Buttons>
                            </Fragment>
                        }
                    </div>
                </div>
                <div className={classNames(
                    "flex justify-center col-span-6 md:col-span-3 lg:col-span-2 h-[300px] md:h-[600px]",
                    { "contrast-50": isOutOfStock }
                )}>
                    <Img src={illustration?.url} />
                </div>
                <div className="hidden md:flex justify-center col-span-3 lg:col-span-2">
                    <div className="flex flex-col gap-4">
                        <ProductElement.Name className="block lg:hidden">
                            {name}
                        </ProductElement.Name>
                        {subname &&
                            <ProductElement.SubName>
                                {subname}
                            </ProductElement.SubName>
                        }
                        <ProductElement.Volume className="block lg:hidden">
                            {volume}
                        </ProductElement.Volume>
                        <ProductElement.Description data={description} />
                        <div className="block lg:hidden text-2xl font-bold">
                            <Price price={price} discount={discount} />
                        </div>
                        <ActiveIngredients items={ingredients} />
                        <ProductElement.Buttons onHeart={addToCart} solidIcon={isCart} className="block lg:hidden w-full" />
                    </div>
                </div>
            </div>
        </Container>
        <Container>
            <div className="flex md:hidden justify-center">
                <div className="flex flex-col gap-2 sm:gap-4">
                    <ProductElement.Name className="block lg:hidden">
                        {name}
                    </ProductElement.Name>
                    {subname &&
                        <ProductElement.SubName>
                            {subname}
                        </ProductElement.SubName>
                    }
                    <ProductElement.Volume className="block lg:hidden">
                        {volume}
                    </ProductElement.Volume>
                    <ProductElement.Description data={description} />
                    <div className="block lg:hidden text-2xl font-bold">
                        <Price price={price} discount={discount} />
                    </div>
                    <ActiveIngredients items={ingredients} />
                    <ProductElement.Buttons onHeart={addToCart} solidIcon={isCart} className="block lg:hidden w-full pt-3 sm:pt-0" />
                </div>
            </div>
        </Container>
    </Fragment>
}