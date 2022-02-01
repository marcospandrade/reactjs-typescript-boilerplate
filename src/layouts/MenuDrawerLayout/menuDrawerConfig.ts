import { menuDrawerConfigTypes } from "../../@types/menuDrawerConfig";
import HomeIcon from '@material-ui/icons/Home';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from '@material-ui/icons/Lock';
import ListIcon from '@material-ui/icons/List';

export const menuDrawerConfig: menuDrawerConfigTypes[] = [
    {
        title: 'Home',
        icon: HomeIcon,
        href: '/home'
    },
    {
        title: 'Desbloquear Clientes',
        icon: LockOpenIcon,
        href: '/customers/unlock'
    },
    {
        title: 'Bloquear Clientes',
        icon: LockIcon,
        href: '/customers/block'
    },
    {
        title: 'Solicitações',
        icon: ListIcon,
        href: '/customers/solicitations'
    }
];