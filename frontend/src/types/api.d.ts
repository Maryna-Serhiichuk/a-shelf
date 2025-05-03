declare global {

    type Maybe<T> = T | null | undefined;

    interface Request<T> extends Omit<T, 'slug'> {}

    interface Response<T> {
        data: T;
        meta: Meta;
    }

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
        price: number
        type: Type
        illustration: Media
        discount: Discount
        volume: string
        ingredients: Array<Ingredient>
        isCart?: boolean
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

    interface Cartline {
        documentId: string
        quantity: number
        product: Product
        user: User
    }

    interface User {
        email: string
        username: string
        cartlines?: Array<Cartline>
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
}

export {};