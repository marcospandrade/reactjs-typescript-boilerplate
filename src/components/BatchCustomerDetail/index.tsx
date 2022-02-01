import React, { useState } from 'react';
import { batchsCustomerTypes, getProcessingTypeText } from '../../@types/batchs';
import {
    IconButton,
    TableRow,
    TableCell,
    Collapse,
    Box,
    Tooltip,
    Button,
    Grid
} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { TerminalsTable } from './TerminalsTable';
import { LogsTable } from './LogsTable';
import { logsTypes } from '../../@types/batchs';

interface batchCustomerDetailProps {
    batchDetail: batchsCustomerTypes
}

export const BatchCustomerDetail: React.FC<batchCustomerDetailProps> = ({
    batchDetail
}) => {

    const [open, setOpen] = useState<boolean>(false);
    const [openTerminals, setOpenTerminals] = useState<boolean>(false);
    const [openLogs, setOpenLogs] = useState<boolean>(false);

    const handleChangeOpenTerminals = () => setOpenTerminals(!openTerminals);

    const handleChangeOpenLogs = () => setOpenLogs(!openLogs);

    const logs: logsTypes[] = [
        {
            id: 1,
            date_created: new Date().toISOString().toString(),
            response: 'response 1'
        },
        {
            id: 2,
            date_created: new Date().toISOString().toString(),
            response: 'response 2'
        }
    ];

    return (
        <>
            <TableRow hover onClick={() => setOpen(!open)}>
                <TableCell>
                    <IconButton color="primary" aria-label="expand row" size="small">
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell>{batchDetail.name}</TableCell>
                <TableCell>{batchDetail.cnpj}</TableCell>
                <TableCell>{new Intl.DateTimeFormat('pt-BR')
                    .format(new Date(batchDetail.date_created))}
                </TableCell>
                <TableCell>{getProcessingTypeText(batchDetail.processing_type)}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>

                            <Grid container spacing={2}>
                                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                    <TerminalsTable
                                        terminals={batchDetail.terminals}
                                        openTerminals={openTerminals}
                                        handleChangeOpenTerminals={handleChangeOpenTerminals}
                                    />
                                </Grid>
                                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                    {!batchDetail.logs?.length ?
                                        <Tooltip title="Não há logs" placement="top" arrow>
                                            <span>
                                                <Button
                                                    variant="outlined"
                                                    color="primary"
                                                    size="small"
                                                    disabled
                                                >
                                                    Logs
                                                </Button>
                                            </span>
                                        </Tooltip>
                                        :
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            size="small"
                                            onClick={handleChangeOpenLogs}
                                        >
                                            Logs
                                        </Button>
                                    }
                                    <Collapse in={openLogs} timeout="auto" unmountOnExit>
                                        <Box margin={1}>
                                            <LogsTable logs={batchDetail.logs} />
                                        </Box>
                                    </Collapse>
                                </Grid>
                            </Grid>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
};