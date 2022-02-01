import React, { useState } from 'react';
import styles from './styles.module.scss';
import { MenuDrawer } from '../components/MenuDrawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import { TopBar } from '../components/TopBar';

interface MenuDrawerLayoutProps {
    children: React.ReactNode;
}

export const MenuDrawerLayout: React.FC<MenuDrawerLayoutProps> = ({
    children
}) => {

    const [openNavBarMobile, setOpenNavBarMobile] = useState<boolean>(false);

    const handleNavBarMobileOpen = () => {
        setOpenNavBarMobile(true);
    };

    const handleNavBarMobileClose = () => {
        setOpenNavBarMobile(false);
    };

    return (
        <div className={styles.main}>
            <CssBaseline />
            <TopBar handleNavBarMobileOpen={handleNavBarMobileOpen} />
            <div className={styles.container}>
                <MenuDrawer
                    onMobileClose={handleNavBarMobileClose}
                    openMobile={openNavBarMobile}
                />
                <main className={styles.content}>
                    {children}
                </main>
            </div>
        </div>
    )
}