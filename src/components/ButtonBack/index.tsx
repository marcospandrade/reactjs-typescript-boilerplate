import { IconButton } from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import history from '../../utils/history';
import styles from './styles.module.scss';

export const ButtonBack = () => {
    return (
        <IconButton
            className={styles.buttonBack}
            color="primary"
            onClick={() => history.goBack()}
        >
            <ArrowBackIcon />
        </IconButton>
    );
};