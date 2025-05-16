import { FC } from "react";
import { Formik, Form, ErrorMessage, FormikConfig } from 'formik';
import { Button } from "@/components/Button";
import { Entry } from "@/components/Entry";
import { AuthContainer } from "@/components/Auth/components/AuthContainer";
import { accountApi } from "@/api/account";
import { passwordValidate } from "@/utils/passwordValidate";
import { checkRequireFields } from "@/utils/checkRequireFields";

export const Login: FC = () => {
    const { useLoginMutation } = accountApi
    const [login, { isLoading }] = useLoginMutation();

    const onLogin: FormikConfig<LoginInput>['onSubmit'] = async (input, onSubmitProps) => {
        try {
            await login(input).unwrap()
            location.reload() // TODO: change to without reload
        } catch (err: any) {
            if(err?.data?.error?.message === 'Invalid identifier or password'){
                onSubmitProps.setFieldError('form', 'Invalid email or password')
            }
        }
    }

    const validateForm = (values: LoginInput) => {
        const passwordChecked = passwordValidate({ password: values?.password })
        const requireChecked = checkRequireFields<LoginInput>(values, ['identifier', 'password'])
        return { ...passwordChecked, ...requireChecked }
    }

    return <AuthContainer title="Login" driverTitle="Or login with">
        <Formik
            initialValues={{ identifier: '', password: '' }}
            onSubmit={onLogin}
            validate={validateForm}
        >
            {({ errors, handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-14">
                        <div className="flex flex-col gap-5">
                            <ErrorMessage component="div" name="form">{msg => (
                                <div className="text-red-700 flex justify-center">{msg}</div>
                            )}</ErrorMessage>
                            <div>
                                <Entry type="email" name="identifier" placeholder="Email" errorAlert />
                            </div>
                            <div>
                                <Entry type="password" name="password" placeholder="Password" errorAlert />
                            </div>
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