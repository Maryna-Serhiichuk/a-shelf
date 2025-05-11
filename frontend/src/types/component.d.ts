declare global {

    type ImageDescriptionPosition = 'left' | 'right'

    interface Button {
        label: string
        href: string
    }

    interface AboutPage {
        documentId: string
        hero?: Hero
        about?: ImageDescription
        values?: IconDescriptionComponent
        formula?: ImageShortDescription
        choose?: ImageDescription
        cta?: Banner
    }

    interface Hero {
        heading: string
        main?: Media
        button?: Button
    }

    interface ImageDescription {
        title: string
        description: string
        image: Media
        position?: ImageDescriptionPosition
    }

    interface IconDescriptionComponent {
        heading?: string
        items?: Array<IconDescription>
    }

    interface IconDescription {
        heading: string
        description: string
    }

    interface ImageShortDescription {
        title?: string
        description?: string
        left: Media
        right: Media
    }

    interface Banner {
        text?: string
        button?: Button
    }
}

export {};