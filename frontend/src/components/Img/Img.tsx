import { FC } from "react";

export const Img: FC<{src: string, mini?: boolean}> = ({ src, mini }) => {
    return <img className={`w-100 h-[90%] object-center object-contain drop-shadow-[10px_30px_20px_rgba(0,0,0,${mini ? '.2' : '.3'})]`} src={`http://127.0.0.1:1337${src}`} alt=""/>
}