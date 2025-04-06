import { FC } from "react";

export const Img: FC<{src: string}> = ({ src }) => {
    return <img className="w-100 h-[90%] object-center object-contain" src={`http://127.0.0.1:1337${src}`} alt=""/>
}