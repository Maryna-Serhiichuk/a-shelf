import { FC } from "react";
import { Container } from "@/components/Container";
import { Logo } from "@/components/Logo";
import { pageApi } from "@/api/page";
import { NavLink } from "@/components/NavLink";
import classNames from "classnames";

export const Footer: FC = () => {
    const { useSupportQuery } = pageApi
    const { data } = useSupportQuery(undefined)

    const cols = {
        wrap: "grid-cols-2 md:grid-cols-5 lg:grid-cols-3 xl:grid-cols-4",
        left: "col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-1",
        right: "col-span-2 sm:col-span-2 md:col-span-3 lg:col-span-2 xl:col-span-3"
    }

    const pages = [
        { label: "About our company", href: "about" },
        { label: "Contact to us", href: "contact" },
        { label: "Frequently Asked Questions", href: "faq" },
    ]

    const pagesStyle = {
        title: "w-36 xl:w-56 text-2xl",
        wrap: "w-full flex flex-wrap text-stone-300 gap-y-2 md:gap-y-3",
        container: "w-full sm:w-1/2 md:w-full flex flex-col lg:flex-row gap-4 md:gap-6 items-start"
    }

    return <div className="w-full bg-stone-900 text-stone-50 dark py-8 px-3">
        <Container>
            <div className={classNames("grid gap-8 sm:gap-16", cols.wrap)}>
                <div className={classNames(cols.left)}>
                    <Logo />
                </div>
                <div className={classNames(cols.right, "hidden md:block")}>
                    
                </div>
                <div className={classNames("flex flex-col gap-3", cols.left)}>
                    <div className="text-3xl">
                        Customers support
                    </div>
                    <div className="text-2xl">
                        +1 (555) 238-76-40
                    </div>
                    <div className="flex flex-col gap-1 text-stone-400">
                        <div>Mon - Fri: 9:00 AM - 6:00 PM</div>
                        <div>Sat - Sun: 10:00 AM - 2:00 PM</div>
                    </div>
                    <div className="text-xl underline">
                        <a href="mailto:support@ashelf.com">
                            support@ashelf.com
                        </a>
                    </div>
                </div>
                <div className={classNames("flex flex-wrap gap-y-10", cols.right)}>
                    <div className={pagesStyle.container}>
                        <div className={pagesStyle.title}>
                            Company
                        </div>
                        <div className={pagesStyle.wrap}>
                            {pages?.map(page => (
                                <div key={page?.href} className="w-1/2 sm:w-full md:w-1/2 hover:underline">
                                    <NavLink href={page?.href}>
                                        {page?.label}
                                    </NavLink>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={pagesStyle.container}>
                        <div className={pagesStyle.title}>
                            Support
                        </div>
                        <div className={pagesStyle.wrap}>
                            {data?.data?.map(page => (
                                <div key={page?.slug} className="w-1/2 sm:w-full md:w-1/2 hover:underline">
                                    <NavLink href={`/support/${page.slug}`}>
                                        {page?.label}
                                    </NavLink>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    </div>
}