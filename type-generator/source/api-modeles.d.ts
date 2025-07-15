declare global {

    type ID = string | number

    interface Pagination {
        page: number;
        pageCount: number;
        pageSize: number;
        total: number;
    }

    interface Meta {
        pagination: Pagination;
    }

    interface Media {
        url: string;
    }

    type IconType = 'spakles' | 'star' | 'eye_dropper' | 'beaker' | 'paint_brush' | 'hand_raised';

    type OrderStatus = 'created' | 'processing' | 'delivering' | 'delivered' | 'void'

    interface Model {
        id: ID
        documentId: string
    }

    interface Bargain extends Model {
        label: string
        products: Array<Product>
        price: number
    }

    interface BargainInput {
        label: string
        // products:
        price: number
    }

    interface CartBargain extends Model {
        quantity: number
        bargain: Bargain
        uuid: string
    }

    interface CartBargainInput {
        quantity: number
        // bargain:
    }

    interface Cartline extends Model {
        quantity: number
        product: Product
    }

    interface CartlineInput {
        id: string
        quantity: number
    }

    interface Category extends Model {
        slug: string;
        label: string;
        icon: IconType;
        types: Array<Type>
    }

    interface Type extends Model {
        slug: string
        label: string
        preview: Media
        category: Category
        products: Array<Product>
    }

    interface Product extends Model {
        name: string
        subname?: string
        description: string
        price: number
        type: Type
        illustration: Media
        discount: Discount
        volume: string
        ingredients: Array<Ingredient>
        isCart?: boolean
        composition?: string
        using?: string
        purpose?: string
        isOutOfStock?: boolean
    }

    interface ContactRequestInput {
        name: string
        subject: string
        message: string
        email: string
    }

    interface Ingredient extends Model {
        label: string
        description: string
    }

    interface Product extends Model {
        name: string
        subname?: string
        description: string
        price: number
        type: Type
        illustration: Media
        discount: Discount
        volume: string
        ingredients: Array<Ingredient>
        isCart?: boolean
        composition?: string
        using?: string
        purpose?: string
        isOutOfStock?: boolean
    }

    interface Discount {
        interest: number
        price: number
        endDate: string
    }

    interface SupportPage extends Model {
        slug: string
        label?: string
        content: string
    }

    interface Order extends Model {
        delivery_status: OrderStatus
        delivery_address: DeliveryInput
        items: Array<OrderItem>
        uuid: string
        checkout_id: string
    }

    interface DeliveryInput {
        fullName: string
        email: string
        phone: string
        address: string
        city: string
        region: string
        postCode: string
    }

    interface OrderItem { 
        id: ID
        price: number, 
        product: Product, 
        quantity: number 
    }
}

export { };