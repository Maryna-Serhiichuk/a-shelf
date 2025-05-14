import { FC, useState } from "react";
import { Formik, Form, FormikConfig } from 'formik';
import debounce from 'lodash.debounce';
import { Button } from "@/components/Button";
import { Entry } from "@/components/Entry";
import { FormLabel } from "@/components/FormLabel";
import { pageApi } from "@/api/page";
import { contactRequireFields } from "@/utils/contactRequireFields";

export const ContactForm: FC = () => {
    const [debounceLoading, setDebounceLoading] = useState(false)
    const { useCreateContactRequestMutation } = pageApi
    const [contactRequest, { isLoading }] = useCreateContactRequestMutation()

    const onSend: FormikConfig<ContactRequestInput>['onSubmit'] = async (input, onSubmitProps) => {
        try {
            await contactRequest(input).unwrap()
            // TODO: success message
        } catch (err: any) {
            if(err?.status === 429) {
                // lots of requests
            }
            console.log(err)
            // TODO: error message
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

    return <Formik
        initialValues={{ name: '', subject: '', email: '', message: '' }}
        onSubmit={handleDebouncedSend}
        validate={contactRequireFields}
    >
        {({ errors, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-14">
                    <div className="flex flex-col gap-6 lg:gap-10">
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
}