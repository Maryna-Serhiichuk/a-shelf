import { useEffect, useState } from "react";
import { productApi } from "@/api/product";
import { getAttendings, lastAttendingsName } from "@/utils/getAttendings";

export interface UseLastAttendingsArgs {
    id?: string
}

type UseLastAttendingsResponse = {
    data: Maybe<Array<Product>>
    isPending: boolean
}

export function useLastAttendings(args: UseLastAttendingsArgs): UseLastAttendingsResponse {
    const [productIds, setProductIds] = useState<Array<string>>([]);
    
    const { useLastAttendingsQuery } = productApi
    const { data, isLoading, isError } = useLastAttendingsQuery(
        { productIds, id: args?.id },
        { skip: !productIds?.length }
    )

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

    const getLastAttendings = (): Array<string> => {
        return getAttendings()
    }

    const setLastAttendings = (id: string) => {
        const parsedLastAttendings: Array<string> = getLastAttendings()

        if(!parsedLastAttendings) {
            saveLastAttendings([id])
            return
        }

        const withNewLastAttendinds: Array<string> = [id, ...parsedLastAttendings?.filter(ident => ident !== id)]
        const slicedLastAttendings: Array<string> = withNewLastAttendinds.slice(0, 5)

        saveLastAttendings(slicedLastAttendings)
    }

    const saveLastAttendings = (items: Array<string>) => {
        const withNewLastAttendingsString = JSON.stringify(items)
        localStorage.setItem(lastAttendingsName, withNewLastAttendingsString);
    }
    
    return {
        data: data?.data,
        isPending: isLoading
    }
}