'use server'

import { productApi } from "@/api/product"
import { fetchFromApi } from "@/utils/fetchFromApi"
import { BargainSlider } from "./components/BargainSlider"

export interface BargainArgs {
  id?: string
  type?: string
}

export default async function Bargain({ id, type }: BargainArgs) {
  const data = await fetchFromApi<Array<Bargain>>(productApi.endpoints.bargains, { type, id })

  return (
    <div className="pb-10 sm:pb-0 mt-10 sm:mt-30">
      <BargainSlider items={data?.data} />
    </div>
  )
}