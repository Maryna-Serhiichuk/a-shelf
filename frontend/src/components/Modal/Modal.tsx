import { FC, PropsWithChildren } from "react";
import Dialog, { DialogProps } from "rc-dialog";
import 'rc-dialog/assets/index.css';

export const Modal: FC<PropsWithChildren<{ open: boolean, onClose?: DialogProps['onClose'] }>> = ({ children, open, onClose }) => {
    return <Dialog className="top-1/5" visible={open} maskAnimation="fade" animation="zoom" onClose={onClose}>
        {children}
    </Dialog>
}