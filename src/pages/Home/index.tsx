import { Grid, Button } from "@material-ui/core";
import styles from './styles.module.scss';
import { routesEnum } from "../../@types/routes";
import history from "../../utils/history";

export function Home() {

    function goToRouter(router: routesEnum) {
        history.push(router);
    }

    return (
        <section className={styles.main}>
            <h1>Controle de Clientes</h1>
            <div className={styles.containerOptions}>
                <Grid container spacing={3} className={styles.containerCards}>
                    <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                        <Button
                            onClick={() => goToRouter(routesEnum.unlock)}
                            color="primary"
                            className={`${styles.card} ${styles.open}`}>
                            Desbloquear Clientes
                        </Button>
                    </Grid>
                    <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                        <Button
                            onClick={() => goToRouter(routesEnum.block)}
                            color="primary"
                            className={`${styles.card} ${styles.close}`}>
                            Bloquear Clientes
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </section>
    );
}