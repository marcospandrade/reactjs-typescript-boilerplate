import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useBackdrop } from '../../contexts/BackdropContext';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
        },
    }),
);

export const BackdropComponent: React.FC = () => {
    const classes = useStyles();

    const { openBackdrop, handleCloseBackdrop } = useBackdrop();
    
    return (
        <Backdrop className={classes.backdrop} open={openBackdrop} onClick={handleCloseBackdrop}>
            <CircularProgress color="primary" />
        </Backdrop>
    );
};
