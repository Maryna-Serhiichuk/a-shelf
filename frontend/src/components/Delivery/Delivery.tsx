import { FC, PropsWithChildren, useEffect, useState } from "react";
import { Formik, Form, ErrorMessage } from 'formik';
import { Entry } from "@/components/Entry";
import { checkRequireFields } from "@/utils/checkRequireFields";
import { deliveryLS } from "@/utils/delivery";
import { Button } from "@/components/Button";
import { useCartProviderContext } from "@/components/CartLayout/context/CartContextProvider";

export interface FormType extends Omit<DeliveryInput, 'fullName'> {
    firstName: string
    lastName: string
}

export const Delivery: FC<PropsWithChildren<{ cancelButton: PropsWithChildren['children'] }>> = ({ children, cancelButton }) => {
    const [deliveryAddress, setDeliveryAddress] = useState<Maybe<FormType>>()
    const allFields: (keyof FormType)[] = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'region', 'postCode']
    const { onCheckout } = useCartProviderContext()

    useEffect(() => {
        getInitialValue()
    }, [])

    const getInitialValue = () => {
        const deliveryAddressFromLS = deliveryLS.get()
        if (deliveryAddressFromLS) {
            setDeliveryAddress(deliveryAddressFromLS)
        } else {
            const initialValues = allFields.reduce<FormType>((obj, key) => {
                obj[key] = '';
                return obj;
            }, {} as FormType)
            setDeliveryAddress(initialValues)
        }
    }

    const validateForm = (values: FormType) => {
        const requireChecked = checkRequireFields<FormType>(values, allFields)
        return requireChecked
    }

    const setToLocalStorage = (values: FormType) => {
        deliveryLS.set(values)
    }

    const onSubmit = () => {
        onCheckout()
    }

    if (!deliveryAddress) return null

    return <Formik
        initialValues={deliveryAddress}
        onSubmit={onSubmit}
        validate={value => {
            setToLocalStorage(value)
            return validateForm(value)
        }}
    >
        {({ errors, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-8">
                    <ErrorMessage component="div" name="form" className="text-red-700 flex justify-center" />
                    <div className="flex flex-col gap-5">
                        <div className="flex gap-[inherit]">
                            <div>
                                <Entry name="firstName" placeholder="First Name" errorAlert />
                            </div>
                            <div>
                                <Entry name="lastName" placeholder="Last Name" errorAlert />
                            </div>
                        </div>
                        <div>
                            <Entry type="email" name="email" placeholder="Email" errorAlert />
                        </div>
                        <div>
                            <Entry type="phone" name="phone" placeholder="Phone" errorAlert />
                        </div>
                        <div>
                            <Entry type="address" name="address" placeholder="Address" errorAlert />
                        </div>
                        <div>
                            <Entry type="city" name="city" placeholder="City" errorAlert />
                        </div>
                        <div>
                            <Entry type="region" name="region" placeholder="Region" errorAlert />
                        </div>
                        <div>
                            <Entry type="postCode" name="postCode" placeholder="Post Code" errorAlert />
                        </div>
                    </div>
                    <div>
                        {children}
                        <div className="grid grid-cols-2 gap-2">
                            {cancelButton}
                            <Button type="submit">
                                Checkout Now
                            </Button>
                        </div>
                    </div>
                </div>
            </Form>
        )}
    </Formik>
}