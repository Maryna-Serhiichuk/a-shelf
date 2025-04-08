import { FC } from "react";
import ReactMarkdown from 'react-markdown'

export const Markdown: FC<{data: string | undefined}> = ({ data }) => {
    
    return <ReactMarkdown components={{
        // img: ({src, alt}) => (src ? <img className={"markdown-image"} src={src} alt={alt}/> : null),
        ul: ({children}) => <ul className="mt-2 mb-4 dark:text-stone-50">{children}</ul>,
        // a: ({href, children}) => children,
        p: ({children}) => <div className="dark:text-stone-50">{children}</div>,
        // h1: ({children}) => children,
        // h2: ({children}) => children,
        // h3: ({children}) => children,
        // h4: ({children}) => children,
        h5: ({children}) => <div className="text-lg dark:text-stone-50">{children}</div>,
        li: ({children}) => <li className="dark:text-stone-50 relative pl-5 mb-2 before:content-['•'] dark:before:text-stone-300 before:text-stone-700 before:absolute before:left-0">
            {children}
        </li>,
        ol: ({children}) => <ol className="dark:text-stone-50">{children}</ol>,
        // strong: ({children}) => children
    }}>{data}</ReactMarkdown>
}