import { useState, ChangeEvent } from "react";
import { Grid, Button } from "@material-ui/core";
import styles from './styles.module.scss';
import { merchantsTypes } from "../../@types/merchants";
import axios from "../../utils/axios";
import { TableMerchants } from "../../components/TableMerchants";
import { InputMerchantsFile } from '../../components/InputMerchantsFile';
import { ButtonBack } from '../../components/ButtonBack';
import { toast } from "react-toastify";
import { useBackdrop } from '../../contexts/BackdropContext';

interface loadMerchantsData {
    merchants: merchantsTypes[];
}

export function BlockCustomers() {

    const { handleOpenBackdrop, handleCloseBackdrop } = useBackdrop();

    const [selectedFile, setSelectedFile] = useState<any>(null);
    const [fileReceived, setFileReceived] = useState<boolean>(false);

    const [merchants, setMerchants] = useState<merchantsTypes[]>([]);
    const [selectedsMerchants, setSelectedsMerchants] = useState<number[]>([]);

    const [sendRequest, setSendRequest] = useState<boolean>(false);

    function handleSetSelectedMerchants(items: number[]) {
        setSelectedsMerchants(items);
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        if (!e.target.files) {
            setFileReceived(false);
            setSelectedFile(null);
            return;
        };

        const file = e.target.files[0];

        setSelectedFile(file);

        setFileReceived(true);

        const formData = new FormData();

        formData.append('file', file);

        sendFile(formData);
    }

    function handleRemoveFile() {
        setSelectedFile(null);
        setFileReceived(false);
        setSelectedsMerchants([]);
        setMerchants([]);
    }

    async function sendFile(params: any) {
        handleOpenBackdrop();

        await axios.post<loadMerchantsData>('load-merchants', params)
            .then(response => {
                setMerchants(response.data.merchants);
            })
            .finally(() => handleCloseBackdrop());
    }

    async function handleBlockCustomers() {
        if (!selectedsMerchants.length) {
            toast.warn('Selecione ao menos um cliente');
            return;
        }

        setSendRequest(true);
        handleOpenBackdrop();

        let params = {
            merchants: selectedsMerchants
        };

        await axios.post('block-terminals', params)
            .then(response => {
                toast.success(response.data);
                handleRemoveFile();
            })
            .finally(() => {
                setSendRequest(false);
                handleCloseBackdrop();
            });
    }

    return (
        <section className={styles.main}>
            <h1>Bloquear Clientes</h1>
            <Grid container spacing={2}>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <ButtonBack />
                </Grid>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <InputMerchantsFile
                        fileReceived={fileReceived}
                        handleChange={handleChange}
                        handleRemoveFile={handleRemoveFile}
                        selectedFile={selectedFile}
                    />
                </Grid>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={styles.containerButton}>
                    <Button
                        variant='contained'
                        color="primary"
                        onClick={handleBlockCustomers}
                        disabled={sendRequest}
                        className={styles.button}
                    >
                        Bloquear
                    </Button>
                </Grid>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <TableMerchants
                        merchants={merchants}
                        handleSetSelectedMerchants={handleSetSelectedMerchants}
                        selectedsMerchants={selectedsMerchants}
                    />
                </Grid>
            </Grid>
        </section>
    );
}