import { DialogProps } from "@headlessui/react";
import { FC, PropsWithChildren } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'

interface DrawerArgs extends DialogProps { }

export const Drawer: FC<PropsWithChildren<DrawerArgs>> = ({ children, ...props }) => {
    return <Dialog {...props} className="relative z-10">
        <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-closed:opacity-0"
        />
        <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
                <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-md pr-10 sm:pr-16">
                    <DialogPanel
                        transition
                        className="pointer-events-auto relative w-screen max-w-md transform transition duration-500 ease-in-out data-closed:-translate-x-full sm:duration-700"
                    >
                        <div className="flex h-full flex-col overflow-y-auto bg-stone-50 py-2 shadow-xl">
                            {children}
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </div>
    </Dialog>
}