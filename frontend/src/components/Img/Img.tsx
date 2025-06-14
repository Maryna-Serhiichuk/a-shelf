import classNames from "classnames";
import { FC } from "react";
import url from '@/variables/url'

export const Img: FC<{src: string, mini?: boolean, className?: string}> = ({ src, mini, className }) => {
    return <img 
        className={classNames(`w-100 h-[90%] object-center object-contain drop-shadow-[10px_30px_20px_rgba(0,0,0,${mini ? '.2' : '.3'})]`, className)} 
        src={`${url.strapi}${src}`} alt=""
    />
}