'use server'

import { Markdown } from "@/components/Markdown";

export default async function Support ({ documentId, label, content }: SupportPage) {
    return <div className="pb-12">
        <div className="text-4xl flex justify-center mb-10 font-semibold dark:text-stone-50 font-heading">
            {label}
        </div>
        <Markdown data={content} />
    </div>
}