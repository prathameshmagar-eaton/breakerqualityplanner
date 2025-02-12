/* eslint-disable */

import React, { useState } from 'react';
import {
    AppBar,
    Avatar,
    IconButton,
    Toolbar,
    Typography,
    Box,
    useMediaQuery,
    useTheme,
    Paper,
    Card,
    Grid,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from '@mui/material';
import { useDrawer } from '../../contexts/drawerContextProvider';
import Lock from '@mui/icons-material/Lock';
import { useSecurityActions } from '@brightlayer-ui/react-auth-workflow';
import { LocalStorage } from '../../store/local-storage';
import Menu from '@mui/icons-material/Menu';
import { EmptyState, Spacer, UserMenu } from '@brightlayer-ui/react-components';
import ExitToApp from '@mui/icons-material/ExitToApp';
import AppStyle from '../../components/AppStyle';
import { ESstrings, SCREEN_TITLES } from '../../constants/sampleEula';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ButtonLeft from '../../components/ButtonLeft';
import { CloudDownload } from '@mui/icons-material';

export const CheckList = (): JSX.Element => {
    const theme = useTheme();
    const { setDrawerOpen } = useDrawer();
    const sm = useMediaQuery(theme.breakpoints.down('sm'));
    const md = useMediaQuery(theme.breakpoints.up('md'));
    const securityHelper = useSecurityActions();
    const classes = AppStyle(theme);
    const xs = useMediaQuery(theme.breakpoints.down('xs'));

    const [expandedPanel, setExpandedPanel] = useState(ESstrings.PANEL1);

    const logOut = (): void => {
        LocalStorage.clearAuthCredentials();
        securityHelper.onUserNotAuthenticated();
    };

    const styles = {
        boxStyle: {
            height: 600,
            width: '100%',
        },
        boxStyle1: {
            height: 200,
            width: '100%',
        },
        paperStyle: {
            overflow: 'hidden', // for future ref
            paddingLeft: '5%',
            paddingRight: '5%',
            paddingBottom: '5%',
            paddingTop: '2%',
        },
        buttonStyles: {
            paddingBottom: theme.spacing(1.5),
        },
    };

    const handleAccordionChange =
        (panel: string) =>
        (event: React.ChangeEvent<any>, isExpanded: boolean): void => {
            setExpandedPanel(isExpanded ? panel : '');
            if (panel === ESstrings.PANEL6) {
                setExpandedPanel(isExpanded ? panel : ESstrings.PANEL5);
            }
        };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <AppBar position={'sticky'}>
                <Toolbar sx={{ px: 2 }}>
                    {md ? null : (
                        <IconButton
                            color={'inherit'}
                            onClick={(): void => {
                                setDrawerOpen(true);
                            }}
                            edge={'start'}
                            sx={{ mr: 3 }}
                            size="large"
                        >
                            <Menu />
                        </IconButton>
                    )}
                    <Typography variant={'h6'} color={'inherit'}>
                        {SCREEN_TITLES.viewCheckList}
                    </Typography>
                    <Spacer />
                    <UserMenu
                        avatar={<Avatar>UN</Avatar>}
                        menuGroups={[
                            {
                                items: [
                                    {
                                        title: 'Change Password',
                                        icon: <Lock />,
                                        onClick: securityHelper.showChangePassword,
                                    },
                                    {
                                        title: 'Log Out',
                                        icon: <ExitToApp />,
                                        onClick: logOut,
                                    },
                                ],
                            },
                        ]}
                        MenuProps={{
                            anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
                            transformOrigin: { horizontal: 'right', vertical: 'top' },
                        }}
                    />
                </Toolbar>
            </AppBar>

            <Paper style={styles.paperStyle}>
               <Box style={styles.boxStyle}>

               </Box>
            </Paper>
        </Box>
    );
};
