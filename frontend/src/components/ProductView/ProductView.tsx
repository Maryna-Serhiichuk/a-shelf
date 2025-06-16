import { FC, Fragment } from "react";
import { HeartIcon } from "@heroicons/react/24/outline";
import { Container } from "@/components/Container";
import { Price } from "@/components/Price";
import { Button } from "@/components/Button";
import { Img } from "@/components/Img";
import { Markdown } from "@/components/Markdown";
import { useAddDesire } from "@/hooks/useAddDesire";
import { ActiveIngredients } from "@/components/ActiveIngredients";
import classNames from "classnames";

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
                        <div className="text-4xl lg:text-5xl font-light dark:text-stone-100">
                            {name}
                        </div>
                        <div className="text-xl font-extralight dark:text-stone-400">
                            {volume}
                        </div>
                        {!isOutOfStock &&
                            <Fragment>
                                <div className="text-2xl font-bold">
                                    <Price price={price} discount={discount} />
                                </div>
                                <div className="flex flex-nowrap flex-col gap-1">
                                    <Button size="large">
                                        Buy Now
                                    </Button>
                                    {isCart
                                        ? <Button variant="outlined">
                                            Added
                                        </Button>
                                        : <Button variant="outlined" onClick={addToCart}>
                                            Add to Cart
                                        </Button>
                                    }

                                </div>
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
                        <div className="block lg:hidden text-4xl lg:text-5xl font-light dark:text-stone-100">
                            {name}
                        </div>
                        {subname &&
                            <div className="dark:text-stone-100 text-lg lg:text-3xl">
                                {subname}
                            </div>
                        }
                        <div className="block lg:hidden text-xl font-extralight dark:text-stone-400">
                            {volume}
                        </div>
                        <div>
                            <Markdown data={description} />
                        </div>
                        <div className="block lg:hidden text-2xl font-bold">
                            <Price price={price} discount={discount} />
                        </div>
                        <ActiveIngredients items={ingredients} />
                        <div className="block lg:hidden w-full">
                            <Button className="w-full" size="large">
                                Buy Now
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
        <Container>
            <div className="flex md:hidden justify-center">
                <div className="flex flex-col gap-4">
                    <div className="block lg:hidden text-4xl lg:text-5xl font-light dark:text-stone-100">
                        {name}
                    </div>
                    {subname &&
                        <div className="dark:text-stone-100 text-lg lg:text-3xl">
                            {subname}
                        </div>
                    }
                    <div className="block lg:hidden text-xl font-extralight dark:text-stone-400">
                        {volume}
                    </div>
                    <div>
                        <Markdown data={description?.slice(0, 350)} />
                    </div>
                    <div className="block lg:hidden text-2xl font-bold">
                        <Price price={price} discount={discount} />
                    </div>
                    <ActiveIngredients items={ingredients} />
                    <div className="block lg:hidden w-full">
                        <Button className="w-full" size="large">
                            Buy Now
                        </Button>
                    </div>
                </div>
            </div>
        </Container>
    </Fragment>
}