import { FieldAttributes } from "formik";
import { FC, Fragment } from "react";
import { Field, ErrorMessage } from 'formik';

export const Entry: FC<FieldAttributes<HTMLInputElement> & { errorAlert?: boolean }> = ({ errorAlert, ...props }) => {
    return <Fragment>
        <Field {...props} className="focus:border-0 focus:shadow-none focus:outline-none focus:ring-0 w-full text-sm sm:text-xl p-2 sm:p-4 bg-stone-200 dark:bg-stone-800 dark:text-stone-200" />
        {errorAlert &&
            <ErrorMessage className="text-red-700 dark:text-red-600" component="div" name={props.name} />
        }
    </Fragment>
}