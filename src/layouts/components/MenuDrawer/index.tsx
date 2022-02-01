import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { menuDrawerConfig } from '../../MenuDrawerLayout/menuDrawerConfig';
import history from '../../../utils/history';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { Typography } from '@material-ui/core';
import Logo from '../../../assets/images/logo_propig.svg';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            overflow: 'hidden',
            height: '100%',
            width: 240,
            minWidth: 240,
            [theme.breakpoints.down('md')]: {
                width: 0,
                minWidth: 0
            },
        },
        toolbar: theme.mixins.toolbar,
        drawerPaper: {
            width: drawerWidth,
            backgroundColor: '#035885',
        },
        listItem: {
            color: '#e6e8eb',
            '&.Mui-selected': {
                backgroundColor: '#023e5e'
            }
        },
        icon: {
            color: '#e6e8eb'
        },
        title: {
            fontSize: 14
        },
        divider: {
            backgroundColor: '#afb2b1'
        },
        logo: {
            maxHeight: '3.5rem'
        },
        containerLogo: {
            display: 'flex',
            alignItems: 'center',
            paddingLeft: theme.spacing(2)
        }
    }),
);

interface Props {
    onMobileClose: () => void;
    openMobile: boolean;
}

interface menuItemProps {
    title: string;
    icon: any;
    href: string;
}

export function MenuDrawer({ onMobileClose, openMobile }: Props) {

    const classes = useStyles();

    const handleListItemClick = (
        href: string
    ) => {
        history.push(href);
    };

    const drawer = (
        <List>
            {menuDrawerConfig.map(({ href, icon: Icon, title }: menuItemProps, index) => (
                <ListItem
                    key={title}
                    button
                    selected={href === window.location.pathname}
                    onClick={() => handleListItemClick(href)}
                    className={classes.listItem}
                    divider
                >
                    <ListItemIcon>
                        <Icon fontSize="medium" className={classes.icon} />
                    </ListItemIcon>
                    <Typography className={classes.title}>
                        {title}
                    </Typography>
                </ListItem>
            ))}
        </List>
    );

    return (
        <div className={classes.root}>
            <CssBaseline />
            <nav aria-label="mailbox folders">
                <Hidden lgUp implementation="css">
                    <Drawer
                        variant="temporary"
                        anchor="left"
                        open={openMobile}
                        onClose={onMobileClose}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true,
                        }}
                    >

                        <div className={`${classes.toolbar} ${classes.containerLogo}`}>
                            <img src={Logo} alt="Propig" className={classes.logo} />
                        </div>
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden mdDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper
                        }}
                        variant="permanent"
                        open
                    >
                        <div className={classes.toolbar} />
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
        </div>
    );
}