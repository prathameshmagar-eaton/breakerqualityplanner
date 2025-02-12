/* eslint-disable*/
import * as React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    useTheme,
} from '@mui/material';

type DialogProps = {
    open: boolean;
    title: string;
    message: string;
    showOk: boolean;
    imagePath: string;
    okBtnName?: string;
    cancelBtnName?: string;
    onClose: (value: boolean) => void;
};

const ResponsiveDialog: React.FC<DialogProps> = (props: DialogProps): JSX.Element => {
    const theme = useTheme();
    const handleClose = (result: boolean): void => {
        props.onClose(result);
    };

    const styles = {
        noButtonUI: { width: '20%', margin: theme.spacing(2) },
        yesButtonUI: { width: '20%' },
        DividerStyle: { justifyContent: 'center', widows: '50%' },
    };

    return (
        <Dialog
            open={props.open ?? false}
            // onClose={handleClose}
            fullWidth
        >
            <DialogTitle id="responsive-dialog-title">{props.title}</DialogTitle>
            <DialogContent dividers style={styles.DividerStyle}>
                <div
                    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}
                >
                    <DialogContentText>{props.message}</DialogContentText>
                </div>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" color="primary" style={styles.yesButtonUI} onClick={() => handleClose(true)}>
                    {props.okBtnName ? props.okBtnName : 'OK'}
                </Button>

                {props.showOk && (
                    <Button
                        variant="outlined"
                        color="primary"
                        style={styles.noButtonUI}
                        onClick={() => handleClose(false)}
                    >
                        {props.cancelBtnName ? props.cancelBtnName : 'Cancel'}
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default ResponsiveDialog;
