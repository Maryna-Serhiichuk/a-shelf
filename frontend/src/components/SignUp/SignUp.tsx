import { FC } from "react";
import { Formik, Form, ErrorMessage, FormikConfig } from 'formik';
import { Button } from "@/components/Button";
import { Entry } from "@/components/Entry";
import { AuthContainer } from "@/components/Auth/components/AuthContainer";
import { accountApi } from "@/api/account";
import { passwordValidate } from "@/utils/passwordValidate";
import { checkRequireFields } from "@/utils/checkRequireFields";

type SignUpFormProps = Omit<RegisterInput, 'username'> & { firstName: string, lastName: string }

export const SignUp: FC = () => {
    const { useRegisterMutation } = accountApi
    const [register, { isLoading }] = useRegisterMutation();

    const signup: FormikConfig<SignUpFormProps>['onSubmit'] = async (input, onSubmitProps) => {
        try {
            await register({
                ...input,
                username: [input.firstName, input.lastName].join(' ')
            }).unwrap()
            location.reload() // TODO: change to without reload
        } catch (err: any) {
            if (err?.data?.error?.message) {
                onSubmitProps.setFieldError('form', err?.data?.error?.message)
            }
        }
    }

    const validateForm = (values: SignUpFormProps) => {
        const passwordChecked = passwordValidate({ password: values?.password })
        const requireChecked = checkRequireFields<SignUpFormProps>(values, ['firstName', 'lastName', 'email', 'password'])
        return { ...passwordChecked, ...requireChecked }
    }

    return <AuthContainer title="Sign Up" driverTitle="Or sign up by">
        <Formik
            initialValues={{ firstName: '', lastName: '', email: '', password: '' }}
            onSubmit={signup}
            validate={validateForm}
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
                                <Entry type="password" name="password" placeholder="Password" errorAlert />
                            </div>
                        </div>
                        <div>
                            <Button loading={isLoading} size="large" className="w-full" type="submit">
                                Sign Up
                            </Button>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    </AuthContainer>
}