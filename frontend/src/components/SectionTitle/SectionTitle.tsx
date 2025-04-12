import { FC, PropsWithChildren } from "react";

export const SectionTitle: FC<PropsWithChildren> = ({ children }) => {
    return <div className="text-5xl font-semibold pb-15">
        {children}
    </div>
}