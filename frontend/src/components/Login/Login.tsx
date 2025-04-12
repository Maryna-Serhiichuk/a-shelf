import { FC } from "react";
import { Formik, Form, ErrorMessage, FormikConfig, Field } from 'formik';
import { Button } from "@/components/Button";
import { Entry } from "@/components/Entry";
import { Checkbox } from "@/components/Checkbox";
import { AuthContainer } from "../Auth/components/AuthContainer";
import { useLogin } from "@/hooks/useLogin";

export const Login: FC = () => {
    const { mutate: login, error, data } = useLogin(); // isLoading

    const onLogin: FormikConfig<LoginInput>['onSubmit'] = async (input, onSubmitProps) => {
        login(input)
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

    return <AuthContainer title="Login" driverTitle="Or login with">
        <Formik
            initialValues={{ identifier: '', password: '' }}
            onSubmit={onLogin}
        // validate={validate}
        >
            {({ errors, handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-14">
                        <div className="flex flex-col gap-5">
                            <div>
                                <Entry type="email" name="identifier" placeholder="Email" />
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
                                Login
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