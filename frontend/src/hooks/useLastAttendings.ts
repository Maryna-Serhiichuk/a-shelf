import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

export interface UseLastAttendingsArgs {
    id?: string
}

type UseLastAttendingsResponse = {
    data: Maybe<Array<Product>>
    isPending: boolean
}

const lastAttendingsName = "lastAttendings"

export function useLastAttendings(args: UseLastAttendingsArgs): UseLastAttendingsResponse {
    const [productIds, setProductIds] = useState<Maybe<Array<string>>>(null);

    const { isPending, error, data } = useQuery<Response<Array<Product>>>({
        queryKey: ['lastAttendings', productIds],
        enabled: !!productIds && productIds.length > 0,
        queryFn: async () => {
            if(productIds && productIds.length > 0) {
                const actualIds = args.id ? productIds.slice(1,5) : productIds.slice(0,4)
                const queryString = actualIds.map(idn => `filters[documentId][$in]=${idn}`).join('&');

                const res = await fetch(`http://127.0.0.1:1337/api/products?${queryString}&populate=illustration`)
                const json = await res.json();

                const sortedProducts: Array<Product> = json?.data.sort((a: Product, b: Product) => productIds.indexOf(a.documentId) - productIds.indexOf(b.documentId))
                return Promise.resolve({ ...json, data: sortedProducts })
            }
            return Promise.resolve({ data: [] });
        }
    })

    useEffect(() => {
        if(args.id) {
            setLastAttendings(args.id)
        }
        setIds()
    }, [args.id])

    const setIds = () => {
        const ids = getLastAttendings()
        setProductIds(ids)
    }

    const getLastAttendings = (): Maybe<Array<string>> => {
        const lastAttendingsString: Maybe<string> = localStorage.getItem(lastAttendingsName)
        return lastAttendingsString ? JSON.parse(lastAttendingsString) : null
    }

    const setLastAttendings = (id: string) => {
        const parsedLastAttendings: Maybe<Array<string>> = getLastAttendings()

        if(!parsedLastAttendings) {
            saveLastAttendings([id])
            return
        }

        const withNewLastAttendinds: Maybe<Array<string>> = [id, ...parsedLastAttendings?.filter(ident => ident !== id)]
        const slicedLastAttendings: Array<string> = withNewLastAttendinds.slice(0, 5)

        saveLastAttendings(slicedLastAttendings)
    }

    const saveLastAttendings = (items: Array<string>) => {
        const withNewLastAttendingsString = JSON.stringify(items)
        localStorage.setItem(lastAttendingsName, withNewLastAttendingsString);
    }
    
    return {
        data: data?.data,
        isPending
    }
}