'use client'

import { Container } from "@/components/Container"
import { ContactForm } from "@/components/ContactForm";
import { NavLink } from "@/components/NavLink";
import map from "@/images/map.png"
import { ContactItem } from "@/components/ContactItem";
import { pageApi } from "@/api/page";
import { Img } from "@/components/Img";

export default function Page() {
    const { useContactQuery } = pageApi
    const { data } = useContactQuery(undefined)

    return <div className="relative">
        <div className="absolute h-full w-full">
            <img src={map.src} className="h-full w-full object-cover blur-xs opacity-70" />
        </div>
        <div className="relative z-5">
            <Container>
                <div className="relative z-5 grid grid-cols-9 gap-12 gap-y-20 pt-5 pb-30 items-center">
                    <div className="col-span-4 flex flex-col gap-10">
                        <div className="flex flex-col gap-4">
                            {data?.data?.title && <div className="text-5xl font-bold">{data?.data?.title}</div>}
                            {data?.data?.subtitle && <div className="text-xl">{data?.data?.subtitle}</div>}
                        </div>
                        {data?.data?.illustration?.url &&
                            <div className="col-span-1">
                                <Img src={data?.data?.illustration?.url} className="h-full w-full object-cover shadow-[0_0_30px_rgba(0,0,0,.2)]" />
                            </div>
                        }
                        {data?.data?.items && data?.data?.items?.length > 0 &&
                            <div className="flex flex-col gap-10 bg-stone-100 p-10 shadow-[0_0_30px_rgba(0,0,0,.2)]">
                                {data?.data?.items?.map(item => (
                                    <ContactItem key={item?.title} title={item?.title} icon={item?.icon}>
                                        {item?.link
                                            ? <NavLink href={item?.link}>
                                                <div className="underline">
                                                    {item?.value}
                                                </div>
                                            </NavLink>
                                            : <div>
                                                {item?.value?.split('\n')?.map(it => (
                                                    <div key={it}>{it}</div>
                                                ))}
                                            </div>
                                        }
                                    </ContactItem>
                                ))}
                            </div>
                        }
                    </div>
                    <div className="flex flex-col gap-10 col-span-5 bg-stone-100 p-10 shadow-[0_0_30px_rgba(0,0,0,.2)]">
                        <div className="text-5xl font-bold">
                            We're here to help
                        </div>
                        <div>
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    </div>
}