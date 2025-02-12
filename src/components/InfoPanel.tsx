/* eslint-disable */

import React from 'react';
import { Grid, IconButton, Typography } from '@material-ui/core';
import SummarizeIcon from '@mui/icons-material/Summarize';
import RefreshIcon from '@mui/icons-material/Refresh';

export const InfoPanel = ({
    xs,
    requestStatus = '',
    jobName = '',
    JobId = '',
    setRefreshClick,
}: {
    xs: any;
    requestStatus: string;
    jobName: string;
    JobId: string;
    setRefreshClick: (str: boolean) => void;
}): JSX.Element => {
    return (
        <Grid container spacing={xs ? 1 : 2}>
            <Grid item>
                <SummarizeIcon style={{ fill: '#007bc1', marginRight: 10, fontSize: 100, background: 'white' }} />
                <br />
            </Grid>
            <Grid item xs>
                <Grid item xs direction="column">
                    <Grid item>
                        <Typography variant={xs ? 'body2' : 'h6'} color="textSecondary">
                            Order Id
                        </Typography>
                        <Typography variant={xs ? 'body2' : 'h6'} color="textSecondary">
                            Order Status
                        </Typography>
                        <Typography variant={xs ? 'body2' : 'h6'} color="textSecondary">
                            Order Name
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <IconButton color="primary" style={{ marginTop: 50, marginRight: 20 }}>
                    <RefreshIcon
                        style={{
                            fill: '#007bc1',
                            fontSize: 35,
                        }}
                        onClick={() => {
                            setRefreshClick(true);
                        }}
                    />
                </IconButton>
            </Grid>
        </Grid>
    );
};
