import { FC, Fragment, useEffect, useState } from "react";
import { accountApi } from "@/api/account";
import { ArrowLeftEndOnRectangleIcon, ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/outline'
import { Modal } from "@/components/Modal";
import { Button } from "@/components/Button";
import { Login } from "@/components/Login";
import { SignUp } from "@/components/SignUp";
import { jwt } from "@/utils/jwt";

export const Auth: FC = () => {
    const { useMeQuery } = accountApi
    const { data } = useMeQuery(undefined)

    const [isAuth, setAuth] = useState(false)
    const [isExist, setExist] = useState(true)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        if(data?.id) {
            setAuth(true)
        }
    }, [data])

    const logout = () => {
        jwt.remove()
        location.reload() // TODO: without reload
    }

    return <Fragment>
        {isAuth
            ? <Button variant={'text'} Icon={ArrowLeftStartOnRectangleIcon} onClick={logout}>
                Log Out
            </Button>
            : <Button variant={'text'} Icon={ArrowLeftEndOnRectangleIcon} onClick={() => setOpen(true)}>
                Log In
            </Button>
        }
        <Modal open={open} onClose={() => setOpen(false)}>
            { isExist ? <Login/> : <SignUp/> }
            <div className="flex items-center justify-center text-lg text-stone-400 pt-14">
                <div>
                    {isExist ? 'Not a member?' : 'Have you account?'}
                </div> 
                <Button variant="link" className="underline" onClick={() => setExist(!isExist)}>
                    {isExist ? 'Sign Up now' : 'Log In'}
                </Button>
            </div>
        </Modal>
    </Fragment>
}