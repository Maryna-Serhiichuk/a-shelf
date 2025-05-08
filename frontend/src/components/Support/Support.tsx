import { FC } from "react";
import { Markdown } from "@/components/Markdown";

export const Support: FC<SupportPage> = ({ documentId, label, content }) => {
    return <div className="pb-12">
        <div className="text-4xl flex justify-center mb-10 font-semibold dark:text-stone-50">{label}</div>
        <Markdown data={content} />
    </div>
}