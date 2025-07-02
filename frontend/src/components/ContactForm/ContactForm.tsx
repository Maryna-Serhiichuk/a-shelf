'use client'

import { FC, Fragment, useState } from "react";
import { Formik, Form, FormikConfig } from 'formik';
import debounce from 'lodash.debounce';
import { Button } from "@/components/Button";
import { Entry } from "@/components/Entry";
import { FormLabel } from "@/components/FormLabel";
import { pageApi } from "@/api/page";
import { checkRequireFields } from "@/utils/checkRequireFields";
import { Result, ResultType } from "@/components/Result";
import { NavLink } from "@/components/NavLink";

export const ContactForm: FC = () => {
    const [message, setMessage] = useState<Maybe<ResultType>>()

    const [debounceLoading, setDebounceLoading] = useState(false)
    const { useCreateContactRequestMutation } = pageApi
    const [contactRequest, { isLoading }] = useCreateContactRequestMutation()

    const onSend: FormikConfig<ContactRequestInput>['onSubmit'] = async (input, onSubmitProps) => {
        try {
            await contactRequest(input).unwrap()
            setMessage('success')
        } catch (err: any) {
            if (err?.status === 429) {
                setMessage('warning')
            }
            setMessage('error')
        } finally {
            setDebounceLoading(false)
        }
    }

    const handleDebouncedSend = (input: ContactRequestInput, onSubmitProps: any) => {
        setDebounceLoading(true)
        debouncedOnSend(input, onSubmitProps)
    }

    const debouncedOnSend = debounce(
        async (input: ContactRequestInput, onSubmitProps: any) => {
            await onSend(input, onSubmitProps)
        },
        5000
    )

    return <Fragment>
        {!!message
            ? <div className="flex flex-col gap-10 py-10">
                <Result type={message} items={{
                    success: "Thank you for reaching out! Your message has been successfully sent. We'll get back to you shortly.",
                    warning: "You are sending messages too frequently. Please wait a moment before trying again.",
                    error: "We're very sorry — something went wrong. Your message is important to us, so please try again later."
                }} />
                <div className="flex justify-center">
                    <NavLink href={'/shop'}>
                        <Button size="large" variant="link">
                            Go to Shop
                        </Button>
                    </NavLink>
                </div>
            </div>
            : <div className="flex flex-col gap-6 sm:gap-10">
                <div className="font-heading text-3xl sm:text-5xl font-bold dark:text-stone-100">
                    We're here to help
                </div>
                <Formik
                    initialValues={{ name: '', subject: '', email: '', message: '' }}
                    onSubmit={handleDebouncedSend}
                    validate={value => checkRequireFields<ContactRequestInput>(value, ['name', 'email', 'subject', 'message'])}
                >
                    {({ errors, handleSubmit }) => (
                        <Form onSubmit={handleSubmit}>
                            <div className="flex flex-col gap-8 sm:gap-14">
                                <div className="flex flex-col gap-4 sm:gap-6 lg:gap-10 dark:text-stone-100">
                                    <FormLabel label="Your Name">
                                        <Entry type="text" name="name" placeholder="Type Name" errorAlert />
                                    </FormLabel>
                                    <FormLabel label="Your Last Name" className="hidden">
                                        <Entry type="text" name="lastName" placeholder="Type Last Name" />
                                    </FormLabel>
                                    <FormLabel label="Email">
                                        <Entry type="email" name="email" placeholder="Email" errorAlert />
                                    </FormLabel>
                                    <FormLabel label="Subject">
                                        <Entry type="text" name="subject" placeholder="Subject" errorAlert />
                                    </FormLabel>
                                    <FormLabel label="Your Message">
                                        <Entry rows={3} as="textarea" name="message" placeholder="Type here..." errorAlert />
                                    </FormLabel>
                                </div>
                                <div>
                                    <Button size="large" className="w-full" type="submit" loading={isLoading || debounceLoading}>
                                        Send
                                    </Button>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        }
    </Fragment>
}