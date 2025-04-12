'use client'

import { TrashIcon, PlusIcon, MinusIcon } from '@heroicons/react/24/outline'
import { Img } from "@/components/Img";
import { LayoutCategories } from "@/components/LayoutCategories";
import { NavLink } from "@/components/NavLink";
import { Price } from "@/components/Price";
import { useQuery } from "@tanstack/react-query";
import { Button } from '@/components/Button';

export default function Page() {

    const { isPending, error, data } = useQuery<User>({
        queryKey: ['account'],
        // enabled: !!id,
        queryFn: () =>
            fetch(`http://127.0.0.1:1337/api/users/1?populate[0]=products.illustration&populate[1]=products.discount`).then((res) =>
                res.json(),
            ),
    })

    const products = data?.products as User['products']


    return (
        <LayoutCategories>
            <div className="flex flex-col gap-5 max-w-[900px]">
                {products?.map(product => (
                    <div className="grid grid-cols-[200px_1fr] grid-rows-[200px] bg-stone-100 overflow-hidden">
                        <NavLink href={`/product/${product?.name?.replaceAll(' ', '-')}/${product?.documentId}`}>
                            <div className="flex items-center py-2 w-full h-full">
                                <Img src={product?.illustration?.url} mini />
                            </div>
                        </NavLink>
                        <div className="flex justify-between py-4 px-4">
                            <div className="flex flex-col gap-2">
                                <NavLink href={`/product/${product?.name?.replaceAll(' ', '-')}/${product?.documentId}`}>
                                    <div className="text-xl font-semibold hover:underline">
                                        {product?.name}
                                    </div>
                                </NavLink>
                                <div className="text-sm text-stone-500">
                                    {product?.volume}
                                </div>
                                <div className="text-xl font-medium text-stone-700">
                                    <Price price={product?.price} discount={product?.discount} />
                                </div>
                                <div>
                                    <div className='inline-flex gap-3 items-center py-1 px-3 border opacity-40 hover:opacity-100 duration-200'>
                                        <div className="hover:bg-stone-200 rounded-lg duration-100">
                                            <PlusIcon height={20}/>
                                        </div>
                                        <div>
                                            1
                                        </div>
                                        <div className="hover:bg-stone-200 rounded-lg duration-100">
                                            <MinusIcon height={20}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <Button variant='text'>
                                    <TrashIcon height={26}/>
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </LayoutCategories>
    );
}