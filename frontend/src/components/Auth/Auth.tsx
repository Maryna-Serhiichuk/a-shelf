import { FC, Fragment, useState } from "react";
import { UserIcon, ArrowLeftEndOnRectangleIcon } from '@heroicons/react/24/outline'
import { Modal } from "@/components/Modal";
import { Button } from "@/components/Button";
import { Login } from "@/components/Login";
import { SignUp } from "@/components/SignUp";
import { NavLink } from "@/components/NavLink";

export const Auth: FC = () => {
    const [isAuth, setAuth] = useState(false)
    const [isExist, setExist] = useState(true)
    const [open, setOpen] = useState(false)

    return <Fragment>
        {isAuth
            ? <NavLink href={'/account'}>
                <Button variant={'link'} Icon={UserIcon}>
                    <span className="hidden lg:block">Account</span>
                </Button>
            </NavLink>
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