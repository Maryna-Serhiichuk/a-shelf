import { FieldAttributes } from "formik";
import { FC } from "react";
import { Field  } from 'formik';

export const Entry: FC<FieldAttributes<HTMLInputElement>> = (props) => {
    return <Field {...props} className="focus:border-0 focus:shadow-none focus:outline-none focus:ring-0 w-full text-xl p-4 bg-stone-200" />
}