import { useState, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { batchsCustomerTypes, batchsTypes } from '../../@types/batchs';
import CloseIcon from '@material-ui/icons/Close';
import {
    Divider,
    Typography,
    LinearProgress,
    IconButton,
    Dialog,
    Paper,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody
} from '@material-ui/core';
import axios from '../../utils/axios';
import { PaginationCustom } from '../Pagination';
import { BatchCustomerDetail } from '../BatchCustomerDetail';
import styles from './styles.module.scss';

interface Props {
    open: boolean;
    handleClose: () => void;
    selectedBatch: batchsTypes;
}

interface getBatchsDetailsTypes {
    count: number;
    next: string | null;
    previous: string | null;
    results: batchsCustomerTypes[];
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            minHeight: '30vh',
        },
        title: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem 1rem .5rem 1rem'
        }
    }),
);

export function ModalBatchCustomer({
    open,
    handleClose,
    selectedBatch
}: Props) {

    const classes = useStyles();

    const [page, setPage] = useState<number>(0);
    const [limit, setLimit] = useState<number>(10);
    const [totalElements, setTotalElements] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);

    const [batchsDetails, setBatchsDetails] = useState<batchsCustomerTypes[]>([]);

    useEffect(() => {
        getBatchsDetails();
    }, []);

    const getBatchsDetails = async (pageNumber: number = 1) => {
        setLoading(true);
        setPage(pageNumber);

        let offsetRequest = pageNumber > 1 ? limit * pageNumber : null;

        let params = {
            limit,
            offset: offsetRequest
        }

        await axios.get<getBatchsDetailsTypes>(`batchs/${selectedBatch.id}/merchants/`, { params })
            .then(response => {
                setBatchsDetails(response.data.results);
                setTotalPages(Math.floor(response.data.count / limit) || 1);
                setTotalElements(response.data.count);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll='paper'
                fullWidth
                maxWidth='lg'
                disableBackdropClick
            >
                <div className={classes.title}>
                    <Typography variant="h6" color="primary">Solicitações</Typography>
                    <IconButton
                        color='primary'
                        onClick={handleClose}
                    >
                        <CloseIcon />
                    </IconButton>
                </div>
                <Divider />
                <DialogContent className={classes.root}>
                    {loading ?
                        <LinearProgress />
                        :
                        <TableContainer component={Paper} elevation={4} className={styles.containerTable}>
                            <Table className={`${styles.tableContent} ${styles.table}`} aria-label="collapsible caption table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell />
                                        <TableCell>Cliente</TableCell>
                                        <TableCell>CNPJ</TableCell>
                                        <TableCell>Data</TableCell>
                                        <TableCell>Tipo</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {batchsDetails.map((batchDetail) => (
                                        <BatchCustomerDetail
                                            key={batchDetail.id}
                                            batchDetail={batchDetail}
                                        />
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    }
                </DialogContent>
                <DialogActions>
                    {totalElements > 0 &&
                        <PaginationCustom
                            count={totalPages}
                            page={page}
                            handleChangePage={getBatchsDetails}
                        />
                    }
                </DialogActions>
            </Dialog>
        </>
    );
}
