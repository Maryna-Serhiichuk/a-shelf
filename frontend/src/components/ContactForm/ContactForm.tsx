import { FC } from "react";
import { Formik, Form, ErrorMessage, FormikConfig } from 'formik';
import { Button } from "@/components/Button";
import { Entry } from "@/components/Entry";
import { FormLabel } from "@/components/FormLabel";
import { pageApi } from "@/api/page";

export const ContactForm: FC = () => {
    const { useCreateContactRequestMutation } = pageApi
    const [contactRequest, { isLoading }] = useCreateContactRequestMutation()

    const onLogin: FormikConfig<ContactRequestInput>['onSubmit'] = async (input, onSubmitProps) => {
        try {
            await contactRequest(input).unwrap()
            // TODO: message
        } catch (err: any) {
            // TODO: error message
        }
    }

    return <Formik
        initialValues={{ name: '', subject: '', email: '', message: '' }}
        onSubmit={onLogin}
    >
        {({ errors, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-14">
                    <div className="flex flex-col gap-6 lg:gap-10">
                        <ErrorMessage component="div" name="identifier">{msg => (
                            <div className="text-red-700 flex justify-center">{msg}</div>
                        )}</ErrorMessage>
                        <FormLabel label="Your Name">
                            <Entry type="text" name="name" placeholder="Type Name" />
                        </FormLabel>
                        <FormLabel label="Email">
                            <Entry type="email" name="email" placeholder="Email" />
                        </FormLabel>

                        <FormLabel label="Subject">
                            <Entry type="text" name="subject" placeholder="Subject" />
                        </FormLabel>

                        <FormLabel label="Your Message">
                            <Entry rows={3} as="textarea" name="message" placeholder="Type here..." />
                        </FormLabel>
                        <ErrorMessage className="text-red-700" component="div" name="password" />
                    </div>
                    <div>
                        <Button size="large" className="w-full" type="submit" loading={isLoading}>
                            Send
                        </Button>
                    </div>
                </div>
            </Form>
        )}
    </Formik>
}