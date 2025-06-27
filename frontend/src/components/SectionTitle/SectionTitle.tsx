import { FC, PropsWithChildren } from "react";

export const SectionTitle: FC<PropsWithChildren> = ({ children }) => {
    return <div className="font-heading text-3xl sm:text-5xl font-semibold pb-5 sm:pb-15">
        {children}
    </div>
}