'use client'

import { Container } from "@/components/Container"
import { FC, PropsWithChildren } from "react"
import { ContactForm } from "@/components/ContactForm";
import { NavLink } from "@/components/NavLink";
import { Icon, IconTypeProp } from "@/components/Icon";
import map from "@/images/map.png"
import place from "@/images/place.jpg"
import { ContactItem } from "@/components/ContactItem";

export default function Page() {

    return <div className="relative">
        <div className="absolute h-full w-full">
            <img src={map.src} className="h-full w-full object-cover blur-sm opacity-70" />
        </div>
        <div className="relative z-5">
            <Container>
                <div className="relative z-5 grid grid-cols-9 gap-12 gap-y-20 pt-5 pb-30 items-center">
                    <div className="col-span-4 flex flex-col gap-10">
                        <div className="flex flex-col gap-4">
                            <div className="text-5xl font-bold">Get in Touch</div>
                            <div className="text-xl">Whether you're looking for product advice, need support with an order, or just want to say hello — we’re here to help. Find our contact details below or send us a message directly.</div>
                        </div>
                        <div className="col-span-1">
                            <img src={place.src} className="h-full w-full object-cover shadow-[0_0_30px_rgba(0,0,0,.2)]" />
                        </div>
                        <div className="flex flex-col gap-10 bg-stone-100 p-10 shadow-[0_0_30px_rgba(0,0,0,.2)]">
                            <ContactItem title="Avalible" icon="clock">
                                <div>
                                    <div>Mon - Fri: 9:00 AM - 6:00 PM</div>
                                    <div>Sat - Sun: 10:00 AM - 2:00 PM</div>
                                </div>
                            </ContactItem>
                            <ContactItem title="Address" icon="map_pin">
                                <div>
                                    <div>1752 Mockingbird Lane, Apt 5B</div>
                                    <div>Springfield, IL 62704</div>
                                    <div>USA</div>
                                </div>
                            </ContactItem>
                            <ContactItem title="Email" icon="envelope">
                                <NavLink href={'mailto:support@ashelf.com'}>
                                    <div className="underline">
                                        support@ashelf.com
                                    </div>
                                </NavLink>
                            </ContactItem>
                            <ContactItem title="Phone" icon="phone">
                                <NavLink href={'tel:+1 (555) 238-76-40'}>
                                    <div className="underline">
                                        +1 (555) 238-76-40
                                    </div>
                                </NavLink>
                            </ContactItem>
                        </div>
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