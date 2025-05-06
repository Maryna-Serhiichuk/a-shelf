import { FC } from "react";
import { Formik, Form, ErrorMessage, FormikConfig } from 'formik';
import { Button } from "@/components/Button";
import { Entry } from "@/components/Entry";
import { AuthContainer } from "../Auth/components/AuthContainer";
import { accountApi } from "@/api/account";
import { passwordValidate } from "@/utils/passwordValidate";

export const SignUp: FC = () => {
    const { useRegisterMutation } = accountApi
    const [register, { isLoading }] = useRegisterMutation();
    
    const signup: FormikConfig<Omit<RegisterInput, 'username'> & { firstName: string, lastName: string }>['onSubmit'] = async (input, onSubmitProps) => {
        try {
            await register({
                ...input,
                username: [input.firstName, input.lastName].join(' ')
            }).unwrap()
            location.reload() // TODO: change to without reload
        } catch (err: any) {
            if(err?.data?.error?.message){
                onSubmitProps.setFieldError('firstName', err?.data?.error?.message)
            }
        }
    }

    return <AuthContainer title="Sign Up" driverTitle="Or sign up by">
        <Formik
            initialValues={{ firstName: '', lastName: '', email: '', password: '' }}
            onSubmit={signup}
            validate={passwordValidate}
        >
            {({ errors, handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-14">
                        <ErrorMessage component="div" name="firstName" className="text-red-700 flex justify-center" />
                        <div className="flex flex-col gap-5">
                            <div className="flex gap-[inherit]">
                                <div>
                                    <Entry name="firstName" placeholder="First Name" />
                                </div>
                                <div>
                                    <Entry name="lastName" placeholder="Last Name" />
                                </div>
                            </div>
                            <div>
                                <Entry type="email" name="email" placeholder="Email" />
                            </div>
                            <div>
                                <Entry type="password" name="password" placeholder="Password" />
                            </div>
                            <ErrorMessage component="div" name="password" className="text-red-700" />
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