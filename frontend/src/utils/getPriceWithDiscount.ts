export function getPriceWithDiscount({ price = 0, discount }: { price?: number, discount?: Discount }): number {
    return (discount?.price ? discount?.price : (price * ((100 - (discount?.interest ?? 0)) / 100)))
}