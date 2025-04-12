import { FC, Fragment, useState } from "react";
import { Modal } from "@/components/Modal";
import { Button } from "@/components/Button";
import { Login } from "@/components/Login";
import { SignUp } from "../SignUp";

export const Auth: FC = () => {
    const [isExist, setExist] = useState(true)
    const [open, setOpen] = useState(false)

    return <Fragment>
        <Button variant={'text'} onClick={() => setOpen(true)}>
            dfd
        </Button>
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