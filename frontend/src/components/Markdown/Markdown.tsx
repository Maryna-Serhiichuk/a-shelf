import { FC } from "react";
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export const Markdown: FC<{data: string | undefined}> = ({ data }) => {
    
    return <ReactMarkdown remarkPlugins={[remarkGfm]} components={{
        // img: ({src, alt}) => (src ? <img className={"markdown-image"} src={src} alt={alt}/> : null),
        ul: ({children}) => <ul className="mt-2 mb-4">{children}</ul>,
        a: ({href, children}) => <a href={href} className="text-cyan-700 underline">{children}</a>,
        p: ({children}) => <div className="dark:text-stone-50">{children}</div>,
        // h1: ({children}) => children,
        h2: ({children}) => <div className="text-2xl font-bold dark:text-stone-50 pb-3">{children}</div>,
        // h3: ({children}) => children,
        h4: ({children}) => <div className="font-semibold dark:text-stone-50">{children}</div>,
        h5: ({children}) => <div className="text-lg dark:text-stone-50">{children}</div>,
        li: ({children}) => <li className="text-stone-700 dark:text-stone-300 relative pl-5 mb-2 before:content-['•'] dark:before:text-stone-300 before:text-stone-700 before:absolute before:left-0">
            {children}
        </li>,
        ol: ({children}) => <ol className="dark:text-stone-700">{children}</ol>,
        // strong: ({children}) => children,
        hr: () => <hr className="text-stone-200 dark:text-stone-700 my-6" />
    }}>{data}</ReactMarkdown>
}