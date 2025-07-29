'use client'

import { FC } from "react";
import { CollapseProps, Collapse } from "@/components/Collapse/Collapse";
import { BorderWrap } from "@/components/BorderWrap";

interface CollapseWrapProps extends CollapseProps {
    className?: string
}

export const CollapseWrap: FC<CollapseWrapProps> = ({ className, ...props }) => {
    return <div className="flex justify-center">
        <div className={className}>
            <BorderWrap>
                <Collapse {...props} />
            </BorderWrap>
        </div>
    </div>
}