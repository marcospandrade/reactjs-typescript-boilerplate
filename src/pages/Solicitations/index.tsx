import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Grid,
    Button
} from '@material-ui/core';
import styles from './styles.module.scss';
import { batchsTypes, getProcessingTypeText } from '../../@types/batchs';
import axios from '../../utils/axios';
import { useBackdrop } from '../../contexts/BackdropContext';
import { PaginationCustom } from '../../components/Pagination';
import { ModalBatchCustomer } from '../../components/ModalBatchCustomer';

interface solicitationsProps {

}

interface getBatchsTypes {
    count: number;
    next: string | null;
    previous: string | null;
    results: batchsTypes[];
}

export const Solicitations: React.FC<solicitationsProps> = () => {

    const { handleOpenBackdrop, handleCloseBackdrop } = useBackdrop();

    const [batchs, setBatchs] = useState<batchsTypes[]>([]);

    const [selectedBatch, setSelectedBatch] = useState<batchsTypes | null>(null);

    const [page, setPage] = useState<number>(0);
    const [limit, setLimit] = useState<number>(10);
    const [totalElements, setTotalElements] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [openModalBatchCustomer, setOpenModalBatchCustomer] = useState<boolean>(false);

    const handleSelectedBatch = (batch: batchsTypes) => {
        setSelectedBatch(batch);
        handleOpenModalBatchCustomer();
    }

    const handleOpenModalBatchCustomer = () => {
        setOpenModalBatchCustomer(true);
    }

    const handleCloseModalBatchCustomer = () => {
        setOpenModalBatchCustomer(false);
    }

    const handleGetBatchs = () => {
        getBatchs();
    }

    const getBatchs = async (pageNumber: number = 1) => {
        setPage(pageNumber);
        setLoading(true);
        handleOpenBackdrop();

        let offsetRequest = pageNumber > 1 ? limit * pageNumber : null;

        let params = {
            limit,
            offset: offsetRequest
        }

        await axios.get<getBatchsTypes>('batchs/', { params })
            .then(response => {
                setTotalPages(Math.floor(response.data.count / limit) || 1);
                setBatchs(response.data.results);
                setTotalElements(response.data.count);
            })
            .finally(() => {
                setLoading(false);
                handleCloseBackdrop();
            });
    }

    return (
        <section className={styles.main}>
            <h1>Solicitações</h1>
            <div className={styles.containerOptions}>
                <Grid container spacing={3}>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={styles.containerSearchButton}>
                        <Button
                            variant="contained"
                            color="primary"
                            disabled={loading}
                            onClick={handleGetBatchs}
                        >
                            Buscar
                        </Button>
                    </Grid>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        <TableContainer component={Paper} elevation={4} className={styles.containerTable}>
                            <Table className={`${styles.tableContent} ${styles.table}`} aria-label="caption table">
                                {!batchs?.length && <caption className={styles.caption}>Nenhuma solicitação listada</caption>}
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">Data</TableCell>
                                        <TableCell align="center">Tipo</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {batchs.map((batch) => (
                                        <TableRow
                                            key={batch.id.toString()}
                                            hover
                                        >
                                            <TableCell align="center">
                                                {new Intl.DateTimeFormat('pt-BR')
                                                    .format(new Date(batch.date_created))}
                                            </TableCell>
                                            <TableCell align="center">
                                                {getProcessingTypeText(batch.processing_type)}
                                            </TableCell>
                                            <TableCell align="center">
                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    onClick={() => handleSelectedBatch(batch)}
                                                >
                                                    Ver lista
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        {totalElements > 0 &&
                            <PaginationCustom
                                count={totalPages}
                                page={page}
                                handleChangePage={getBatchs}
                            />
                        }
                    </Grid>
                </Grid>
            </div>
            {openModalBatchCustomer && selectedBatch &&
                <ModalBatchCustomer
                    open={openModalBatchCustomer}
                    handleClose={handleCloseModalBatchCustomer}
                    selectedBatch={selectedBatch}
                />
            }
        </section>
    );
};