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
        documentId: number;
        slug: string;
        label: string;
        icon: IconType;
    }

    interface Type {
        documentId: number;
        slug: string;
        label: string;
        preview: Media;
    }
}

export {};