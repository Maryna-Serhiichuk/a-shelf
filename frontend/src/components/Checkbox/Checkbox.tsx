import { FC, PropsWithChildren } from "react";
import { Field  } from 'formik';
import { FieldAttributes } from "formik";

export const Checkbox: FC<PropsWithChildren<FieldAttributes<HTMLInputElement>>> = ({ children, ...props }) => {
    return <label className="flex flex-row gap-2 text-xl">
        <Field {...props} type="checkbox" name="checked" className="w-6 h-6 accent-teal-700"/>
        {children}
    </label>
}