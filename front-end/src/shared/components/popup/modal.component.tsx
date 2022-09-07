import AppBar from "@material-ui/core/AppBar";
import Dialog from "@material-ui/core/Dialog";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Slide from "@material-ui/core/Slide";
import Toolbar from "@material-ui/core/Toolbar";
import { TransitionProps } from "@material-ui/core/transitions";
import Typography from "@material-ui/core/Typography";
import * as React from "react";

interface ModalProps {
    children: JSX.Element;
    Icon: JSX.Element;
    title: JSX.Element;
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const ModalComponent: React.FC<ModalProps> = (props) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <div onClick={handleClickOpen} className='c-pointer p-1'>
                {props.Icon}
            </div>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
            >
                <AppBar position="relative">
                    <Toolbar>
                        <div style={{ flex: 1 }}>
                            {props.title}
                        </div>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Divider />
                {props.children}
            </Dialog>
        </>
    );
}
