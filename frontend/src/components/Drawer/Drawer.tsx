import { DialogProps } from "@headlessui/react";
import { FC, PropsWithChildren } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import classNames from "classnames";

type DrawerPosition = 'left' | 'right'

interface DrawerArgs extends DialogProps {
    position?: DrawerPosition
}

export const Drawer: FC<PropsWithChildren<DrawerArgs>> = ({ children, position = 'left', ...props }) => {
    const positionSide: {[key in DrawerPosition]: { panel: string, transition: string }} = {
        left: { panel: 'left-0 pr-10 sm:pr-16', transition: 'data-closed:-translate-x-full' },
        right: { panel: 'right-0 pl-10 sm:pl-16', transition: 'data-closed:translate-x-full' }
    }
    return <Dialog {...props} className="relative z-10">
        <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-closed:opacity-0"
        />
        <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
                <div className={classNames("pointer-events-none fixed inset-y-0 flex max-w-md", positionSide[position].panel)}>
                    <DialogPanel
                        transition
                        className={classNames("pointer-events-auto relative w-screen max-w-md transform transition duration-500 ease-in-out sm:duration-700", positionSide[position].transition)}
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