declare global {

    interface Meta {
        pagination: Pagination;
    }

    type IconType = 'spakles'|'star'|'eye_dropper'|'beaker'|'paint_brush'|'hand_raised';

    interface Media {
        url: string;
    }

    interface Pagination {
        page: number;
        pageCount: number;
        pageSize: number;
        total: number;
    }

    interface Category {
        documentId: string;
        slug: string;
        label: string;
        icon: IconType;
        types: Array<Type>
    }

    interface Type {
        documentId: string;
        slug: string;
        label: string;
        preview: Media;
        category: Category
        products: Array<Product>
    }

    interface Product {
        documentId: string
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

    interface Ingredient {
        label: string
        description: string
    }

    interface Discount {
        interest: number
        price: number
        endDate: string
    }

    interface Bargain {
        documentId: string
        label: string
        products: Array<Product>
        price: number
    }

    interface CartBargain {
        documentId: string
        quantity: number
        bargain: Bargain
    }

    interface Cartline {
        documentId: string
        quantity: number
        product: Product
    }

    interface CartlineInput {
        id: string
        quantity: number
    }

    interface User {
        id?: ID
        email: string
        username: string
        cartlines?: Array<Cartline>
        cart_bargains?: Array<cartBargains>
    }

    interface RegisterInput {
        username: string
        email: string
        password: string
    }

    interface RegisterResponse {
        jwt: string
        user: User
    }

    interface LoginInput {
        identifier: string
        password: string
    }

    interface LoginResponse {
        jwt: string
        user: User
    }

    interface SupportPage {
        documentId: string
        slug: string
        label?: string
        content: string
    }
}

export {};