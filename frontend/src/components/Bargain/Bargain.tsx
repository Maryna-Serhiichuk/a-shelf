'use server'

import { productApi } from "@/api/product"
import { fetchFromApi } from "@/utils/fetchFromApi"
import { BargainSlider } from "./components/BargainSlider"

interface BargainArgs {
  id?: string
  type?: string
}

export default async function Bargain({ id, type }: BargainArgs) {
  const data = await fetchFromApi<Array<Bargain>>(productApi.endpoints.bargains, { type, id })

  return (
    <div className="mt-30">
      <BargainSlider items={data?.data} />
    </div>
  )
}