declare global {

    interface User extends Model {
        email: string
        username: string
        cartlines?: Array<Cartline>
        cart_bargains?: Array<CartBargain>
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

export { };