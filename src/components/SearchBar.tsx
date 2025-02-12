/* eslint-disable*/

import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { useTheme } from '@mui/material';
import Back from '@material-ui/icons/ChevronLeft';
import { IconButton, Typography } from '@mui/material';

type Props = {
    title: string;
    onSearch: (searchText: string) => void;
    onBack: () => void;
};

export const SearchAppBar = (props: Props): JSX.Element => {
    const theme = useTheme();
    return (
        <AppBar position={'sticky'}>
            <Toolbar style={{ background: theme.palette.primary.dark }}>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="backMenu"
                    onClick={(): void => {
                        props.onBack();
                    }}
                    sx={{ mr: 2 }}
                >
                    <Back />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {props.title}
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

SearchAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
} as any;

export default SearchAppBar;
