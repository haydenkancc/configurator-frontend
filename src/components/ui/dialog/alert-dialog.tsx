import s from './alert-dialog.module.scss';
import {Dialog, DialogProps, Modal, ModalOverlay} from 'react-aria-components';
import {Button} from '@/components/ui/button';
import {Warning} from '@phosphor-icons/react/dist/ssr';

interface MyDialogProps extends DialogProps {
    title: string;
    confirmLabel: string;
    children: React.ReactNode;
    action: () => Promise<void>;
}

export default function AlertDialog({className, title, confirmLabel, children, action, ...props } : MyDialogProps) {
    return (
        <ModalOverlay className={s.overlay} isDismissable>
            <Modal className={s.modal} >

                <Dialog className={`${s.dialog} ${className}`} {...props}>
                    {({close}) => (
                        <>
                            <h2 className={s.title}>
                                <Warning weight="fill" className={s.titleIcon}/>{title}
                            </h2>
                            <p className={s.body}>
                                {children}
                            </p>
                            <div className={s.buttons}>
                                <Button variant="plain" onPress={close}>Cancel</Button>
                                <Button variant="danger" onPress={async () => {await action().then(() => close())}}>Delete</Button>
                            </div>
                        </>
                    )}
                </Dialog>
            </Modal>
        </ModalOverlay>
    )
}