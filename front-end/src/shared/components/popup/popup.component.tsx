import Popover from '@material-ui/core/Popover';
import * as React from 'react';


interface PopUpProps {
    children: JSX.Element;
    Icon: JSX.Element;
}
export const PopUp: React.FC<PopUpProps> = (props) => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <>
            <div onClick={handleClick} className='c-pointer p-1'>
                {props.Icon}
            </div>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                {props.children}
            </Popover>
        </>
    );
}
