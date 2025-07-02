import { FC } from "react";
import { CheckCircleIcon, ExclamationCircleIcon, XCircleIcon } from '@heroicons/react/24/solid'

export type ResultType = 'success' | 'warning' | 'error'

type ResultArgs = {
    items: Partial<{ [key in ResultType]: string }>
    type: ResultType
}

export const Result: FC<ResultArgs> = ({ items, type }) => {

    const results: { [key in ResultType]: { icon: SVGType, message: string, color: string } } = {
        success: { icon: CheckCircleIcon, message: items?.success ?? '', color: 'var(--color-emerald-700)' },
        warning: { icon: ExclamationCircleIcon, message: items?.warning ?? '', color: 'var(--color-amber-400)' },
        error: { icon: XCircleIcon, message: items?.error ?? '', color: 'var(--color-red-600)' },
    }

    const Icon = results?.[type]?.icon


    return <div className="flex flex-col items-center gap-10">
        <div className="size-20">
            <Icon fill={results?.[type]?.color} />
        </div>
        <div className="text-3xl/10 text-center font-medium tracking-wide font-heading">
            {results?.[type]?.message}
        </div>
    </div>
}