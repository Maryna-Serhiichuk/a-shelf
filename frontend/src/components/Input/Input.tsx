import { FC, InputHTMLAttributes } from "react";

export interface InputArgs extends InputHTMLAttributes<HTMLInputElement> {}

export const Input: FC<InputArgs> = (props) => {
    return <input {...props} className="border-none focus:outline-none" placeholder="Search"/>
}