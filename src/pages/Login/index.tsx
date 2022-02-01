import React, { useState } from 'react';
import styles from './styles.module.scss';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Grid, Paper, TextField, Button } from "@material-ui/core";
import Logo from '../../assets/images/logo_propig.svg';
import axios from '../../utils/axios';
import history from '../../utils/history';

interface formProps {
    username: string;
    password: string;
}

const validationSchema = Yup.object().shape({
    username: Yup.string()
        .required('Login é obrigatório'),
    password: Yup.string()
        .required('Senha é obrigatório')
});

export const Login: React.FC = () => {

    const [loading, setLoading] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(validationSchema)
    });

    const onSubmit = (data: formProps) => {
        //console.log(data);
        login(data);
    };

    async function login(data: formProps) {
        setLoading(true);
        await axios({
            method: 'POST',
            url: 'http://localhost:8000/login/',
            data: {
                username: 'root', //data.username,
                password: 'password', //data.password,
                grant_type: 'password'
            }
        }).then(response => {
            localStorage.setItem('token', response.data.token);
            history.push('/home');
        }).finally(() => setLoading(false));
    }

    return (
        <main className={styles.main}>
            <img src={Logo} alt="Propig" className={styles.logo} />
            <Paper elevation={7} className={styles.containerLogin}>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        <h2 className={styles.msgTitle}>Bem vindo!</h2>
                    </Grid>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        <TextField
                            id="username"
                            required
                            label="Login"
                            fullWidth
                            variant="outlined"
                            size="small"
                            {...register('username')}
                            helperText={errors.username?.message}
                            error={errors.username ? true : false}
                        />
                    </Grid>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        <TextField
                            id="password"
                            required
                            label="Senha"
                            fullWidth
                            variant="outlined"
                            size="small"
                            type="password"
                            {...register('password')}
                            helperText={errors.password?.message}
                            error={errors.password ? true : false}
                        />
                    </Grid>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        <Button
                            color="secondary"
                            fullWidth
                            variant="contained"
                            onClick={handleSubmit(onSubmit)}
                            disabled={loading}
                        >
                            Entrar
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </main>
    );
};
