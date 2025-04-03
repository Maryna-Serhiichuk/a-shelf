import { FC } from "react";

export const Loader: FC = () => {
    return <div className="w-full h-full flex justify-center items-center space-x-2">
        <div className="w-4 h-4 bg-stone-500 rounded-full animate-bounce"></div>
        <div className="w-4 h-4 bg-stone-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
        <div className="w-4 h-4 bg-stone-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
    </div>
}