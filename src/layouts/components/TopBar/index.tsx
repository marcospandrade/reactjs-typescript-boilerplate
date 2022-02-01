import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Logo from '../../../assets/images/logo_propig.svg';

interface tabBarProps {
    handleNavBarMobileOpen: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        menuButton: {
            marginRight: theme.spacing(2),
            [theme.breakpoints.up('lg')]: {
                display: 'none',
            },
        },
        appBar: {
            position: 'relative',
            zIndex: theme.zIndex.drawer + 1,
            boxShadow: 'none'
        },
        content: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        containerLogo: {
            display: 'flex',
        },
        logo: {
            maxHeight: '10rem',
            minHeight: '3.5rem'
        }
    }),
);

export const TopBar: React.FC<tabBarProps> = ({
    handleNavBarMobileOpen
}) => {

    const classes = useStyles();

    return (
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar className={classes.content}>
                <div className={classes.containerLogo}>
                    <img src={Logo} alt="Propig" className={classes.logo} />
                </div>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleNavBarMobileOpen}
                    className={classes.menuButton}
                >
                    <MenuIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};