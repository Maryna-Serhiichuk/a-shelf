declare global {

    type ID = string | number

    type Maybe<T> = T | null | undefined;

    interface Request<T> extends Omit<T, 'slug'> {}

    interface Response<T> {
        data: T;
        meta: Meta;
    }
}

export {};