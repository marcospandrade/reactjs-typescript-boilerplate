import { ChangeEvent, useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Checkbox,
    Tooltip
} from '@material-ui/core';
import { merchantsTypes } from '../../@types/merchants';
import styles from './styles.module.scss';

interface componenteProps {
    merchants: merchantsTypes[];
    handleSetSelectedMerchants: (items: number[]) => void;
    selectedsMerchants: number[];
}

export function TableMerchants({
    merchants,
    handleSetSelectedMerchants,
    selectedsMerchants
}: componenteProps) {

    const [selectAll, setSelectAll] = useState<boolean>(false);

    const handleChangeSelectMerchants = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            handleSetSelectedMerchants([...selectedsMerchants, Number(event.target.value)]);
        } else {
            handleSetSelectedMerchants(selectedsMerchants.filter(item => item !== Number(event.target.value)));
        }
    }

    const handleSelectAllMerchants = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            setSelectAll(true);
            handleSetSelectedMerchants(merchants.map(merchant => merchant.id));
        } else {
            setSelectAll(false);
            handleSetSelectedMerchants([]);
        }
    }

    useEffect(() => {
        if (!selectedsMerchants?.length) {
            setSelectAll(false);
            return;
        }

        if (selectedsMerchants?.length === merchants?.length) {
            setSelectAll(true);
            return;
        }
    }, [selectedsMerchants]);

    return (
        <TableContainer component={Paper} elevation={4} className={styles.containerTable}>
            <Table className={`${styles.tableContent} ${styles.table}`} aria-label="caption table">
                {!merchants?.length && <caption className={styles.caption}>Nenhum cliente listado</caption>}
                <TableHead>
                    <TableRow>
                        <TableCell aria-checked>
                            <Tooltip
                                arrow
                                placement="right"
                                title={selectAll ? 'Desmarcar todos' : 'Marcar todos'}
                            >
                                <Checkbox
                                    color="primary"
                                    value={selectAll}
                                    onChange={handleSelectAllMerchants}
                                    checked={selectAll}
                                />
                            </Tooltip>
                        </TableCell>
                        <TableCell align="center">Nome</TableCell>
                        <TableCell align="center">CNPJ</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {merchants.map((merchant) => (
                        <TableRow
                            key={merchant.id.toString()}
                            hover
                        >
                            <TableCell component="th" scope="row">
                                <Checkbox
                                    color="primary"
                                    value={merchant.id}
                                    onChange={handleChangeSelectMerchants}
                                    id={String(merchant.id)}
                                    checked={selectedsMerchants.includes(merchant.id)}
                                />
                            </TableCell>
                            <TableCell>{merchant.name}</TableCell>
                            <TableCell>{merchant.cnpj}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}