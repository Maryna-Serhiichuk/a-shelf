import { useEffect, useState } from "react";
import { productApi } from "@/api/product";

export interface UseLastAttendingsArgs {
    id?: string
}

type UseLastAttendingsResponse = {
    data: Maybe<Array<Product>>
    isPending: boolean
}

const lastAttendingsName = "lastAttendings"

export function useLastAttendings(args: UseLastAttendingsArgs): UseLastAttendingsResponse {
    const [productIds, setProductIds] = useState<Array<string>>([]);
    
    const { useLastAttendingsQuery } = productApi
    const { data, isLoading, isError } = useLastAttendingsQuery({ productIds, id: args?.id })

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
        const lastAttendingsString: Maybe<string> = localStorage.getItem(lastAttendingsName)
        return lastAttendingsString ? JSON.parse(lastAttendingsString) : []
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