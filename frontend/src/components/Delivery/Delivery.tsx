import { FC, useEffect, useState } from "react";
import { Formik, Form, ErrorMessage } from 'formik';
import { Entry } from "@/components/Entry";
import { checkRequireFields } from "@/utils/checkRequireFields";
import { deliveryLS } from "@/utils/delivery";

export const Delivery: FC = () => {
    const [deliveryAddress, setDeliveryAddress] = useState<Maybe<DeliveryInput>>()
    const allFields: (keyof DeliveryInput)[] = ['firstName', 'lastName', 'email', 'phone', 'street', 'house', 'city', 'region', 'postCode']

    useEffect(() => {
        getInitialValue()
    }, [])

    const getInitialValue = () => {
        const deliveryAddressFromLS = deliveryLS.get()
        if (deliveryAddressFromLS) {
            setDeliveryAddress(deliveryAddressFromLS)
        } else {
            const initialValues = allFields.reduce<DeliveryInput>((obj, key) => {
                obj[key] = '';
                return obj;
            }, {} as DeliveryInput)
            setDeliveryAddress(initialValues)
        }
    }

    const validateForm = (values: DeliveryInput) => {
        const requireChecked = checkRequireFields<DeliveryInput>(values, allFields)
        return requireChecked
    }

    const setToLocalStorage = (values: DeliveryInput) => {
        deliveryLS.set(values)
    }

    if (!deliveryAddress) return null

    return <Formik
        initialValues={deliveryAddress}
        onSubmit={() => console.log('')}
        validate={value => {
            setToLocalStorage(value)
            return validateForm(value)
        }}
    >
        {({ errors, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-14">
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
                            <Entry type="street" name="street" placeholder="Street" errorAlert />
                        </div>
                        <div>
                            <Entry type="appartment" name="appartment" placeholder="House/Appartment" errorAlert />
                        </div>
                        <div>
                            <Entry type="region" name="region" placeholder="Region" errorAlert />
                        </div>
                        <div>
                            <Entry type="postCode" name="postCode" placeholder="Post Code" errorAlert />
                        </div>
                    </div>
                </div>
            </Form>
        )}
    </Formik>
}