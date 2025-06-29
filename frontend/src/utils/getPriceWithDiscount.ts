import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

export function getPriceWithDiscount({ price = 0, discount }: { price?: number, discount?: Discount }): number {
    if (!discount || dayjs().isAfter(dayjs(discount?.endDate, 'YYYY-MM-DD'))) return price

    return (discount?.price ? discount?.price : (price * ((100 - (discount?.interest ?? 0)) / 100)))
}