import { FC, InputHTMLAttributes } from "react";

export interface InputArgs extends InputHTMLAttributes<HTMLInputElement> {}

export const Input: FC<InputArgs> = (props) => {
    return <input {...props} className="border-none focus:outline-none text-stone-800 dark:text-stone-100" placeholder="Search"/>
}