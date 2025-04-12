import { FC } from "react";
import { Formik, Form, ErrorMessage, FormikConfig } from 'formik';
import { Button } from "@/components/Button";
import { Entry } from "@/components/Entry";
import { Checkbox } from "@/components/Checkbox";
import { AuthContainer } from "../Auth/components/AuthContainer";
import { useRegister } from "@/hooks/useRegister";

export const SignUp: FC = () => {
    const { mutate: register } = useRegister()
    
    const signup: FormikConfig<Omit<RegisterInput, 'username'> & { firstName: string, lastName: string }>['onSubmit'] = async (input, onSubmitProps) => {
        const res = register({
            ...input,
            username: [input.firstName, input.lastName].join(' ')
        });

        // try {
        //     const data = await login({ variables: { input } })
        //     if(data?.data?.login?.jwt) {
        //         localStorage.setItem('jwt', data?.data?.login?.jwt) 
        //         window.location.reload()
        //     }
        // } catch (err: any) {
        //     const error = err as ResolverError
        //     if(error?.message === 'Invalid identifier or password'){
        //         onSubmitProps.setFieldError('password', 'Invalid email or password')
        //     }
        // }
    }

    return <AuthContainer title="Sign Up" driverTitle="Or sign up by">
        <Formik
            initialValues={{ firstName: '', lastName: '', email: '', password: '' }}
            onSubmit={signup}
        // validate={validate}
        >
            {({ errors, handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-14">
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
                            <div>
                                <Checkbox>Remeber me</Checkbox>
                            </div>
                        </div>
                        <div>
                            <Button size="large" className="w-full" type="submit">
                                Sign Up
                            </Button>
                        </div>
                        <ErrorMessage component="div" name="password">{msg => (
                            <div>{msg}</div>
                        )}</ErrorMessage>
                    </div>
                </Form>
            )}
        </Formik>
    </AuthContainer>
}