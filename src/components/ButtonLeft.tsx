/* eslint-disable */

import React from 'react';
import { Button, useTheme } from '@mui/material';
import AppStyle from './AppStyle';

// type ButtonLeftProps = {
//     type: string;
//     variant: string;
//     style;
//     onClick;
//     disabled;
//     className;
//     buttonName;
//     children: JSX.Element;
// };

function ButtonLeft({ type, variant, style, onClick, disabled, className, buttonName, children, testID }: any): JSX.Element {
    const theme = useTheme();
    const classes = AppStyle(theme);
    return (
        <Button
            variant={variant}
            color="primary"
            size="small"
            className={className ? `${classes.buttonLeft} ${className}` : classes.buttonLeft}
            onClick={onClick}
            style={style}
            disabled={disabled}
            type={type ? type : 'button'}
            data-testid={testID}
            id={testID}
        >
            {buttonName}
            {children}
        </Button>
    );
}
export default ButtonLeft;
