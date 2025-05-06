import { FC } from "react";
import { Formik, Form, ErrorMessage, FormikConfig } from 'formik';
import { Button } from "@/components/Button";
import { Entry } from "@/components/Entry";
import { AuthContainer } from "../Auth/components/AuthContainer";
import { accountApi } from "@/api/account";
import { passwordValidate } from "@/utils/passwordValidate";

export const Login: FC = () => {
    const { useLoginMutation } = accountApi
    const [login, { isLoading }] = useLoginMutation();

    const onLogin: FormikConfig<LoginInput>['onSubmit'] = async (input, onSubmitProps) => {
        try {
            await login(input).unwrap()
            location.reload() // TODO: change to without reload
        } catch (err: any) {
            if(err?.data?.error?.message === 'Invalid identifier or password'){
                onSubmitProps.setFieldError('identifier', 'Invalid email or password')
            }
        }
    }

    return <AuthContainer title="Login" driverTitle="Or login with">
        <Formik
            initialValues={{ identifier: '', password: '' }}
            onSubmit={onLogin}
            validate={passwordValidate}
        >
            {({ errors, handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-14">
                        <div className="flex flex-col gap-5">
                            <ErrorMessage component="div" name="identifier">{msg => (
                                <div className="text-red-700 flex justify-center">{msg}</div>
                            )}</ErrorMessage>
                            <div>
                                <Entry type="email" name="identifier" placeholder="Email" />
                            </div>
                            <div>
                                <Entry type="password" name="password" placeholder="Password" />
                            </div>
                            <ErrorMessage className="text-red-700" component="div" name="password"/>
                        </div>
                        <div>
                            <Button size="large" className="w-full" type="submit" loading={isLoading}>
                                Login
                            </Button>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    </AuthContainer>
}