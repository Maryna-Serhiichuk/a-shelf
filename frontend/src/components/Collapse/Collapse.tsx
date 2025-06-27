import { FC, Key, useState } from "react";
import { ChevronUpIcon } from '@heroicons/react/24/outline'
import CollapseRC, { CollapsePanelProps } from "rc-collapse";
import styled from 'styled-components';
import "rc-collapse/assets/index.css"
import classNames from "classnames";

// arrow-down-left

const CollapseContainer = styled(CollapseRC)`
  border: none;
  background: transparent;

  .rc-collapse {
    border: none;
  }

  .rc-collapse-item {
    font-size: 24px;
    border-color: black;

    .rc-collapse-header, .rc-collapse-content {
      padding-inline: 0;
      background: transparent;
    }

    .rc-collapse-title {
        display: flex;
        width: 100%;
    }

    .rc-collapse-body {
        font-size: 20px;
        padding-bottom: 25px;
    }
  }
`;


const openMotion = {
    motionName: 'rc-collapse-motion',
    motionAppear: true,
    motionEnter: true,
    motionLeave: true,
    onEnterStart: () => ({
      height: 0,
    }),
    onEnterActive: (node: HTMLElement) => ({
      height: node.scrollHeight,
    }),
    onLeaveStart: (node: HTMLElement) => ({
      height: node.scrollHeight,
    }),
    onLeaveActive: () => ({
      height: 0,
    }),
};

export const Collapse: FC<{ items: Array<{ label: string, description: string }> }> = ({ items }) => {
    const [activeKey, setActiveKey] = useState<Array<Key>>(['0'])

    return <CollapseContainer
        className="bg-stone-50"
        openMotion={openMotion}
        expandIcon={(e: CollapsePanelProps) => <ChevronUpIcon height={40} fontSize={20}/>}
        activeKey={activeKey}
        onChange={e => setActiveKey(e)}
        accordion items={items?.map((it, i) => ({ 
            label: <div className="flex w-full justify-between items-center">
                <div className="font-semibold text-stone-900 dark:text-stone-200 text-2xl sm:text-3xl">{it?.label}</div>
                <div className={classNames({
                    "transform-[rotate(-180deg)] duration-300": activeKey[0] === i.toString()
                })}><ChevronUpIcon height={40} fontSize={20} className="dark:text-stone-200"/></div>
            </div>,
            children: <div className="text-sm sm:text-2xl dark:text-stone-400">{it?.description}</div>,
            headerClass: "w-full",
            showArrow: false,
        }))} 
    />
}