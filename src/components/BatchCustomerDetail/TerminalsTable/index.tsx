import React, { useState } from 'react';
import { logsTypes, terminalsTypes } from '../../../@types/batchs';
import {
    Typography,
    Collapse,
    Box,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Button,
    Tooltip
} from '@material-ui/core';
import { getProcessingStatusName, getStatusName } from '../../../utils/terminals';
import { LogsTable } from '../LogsTable';

interface terminalsTableProps {
    terminals: terminalsTypes[];
    openTerminals: boolean;
    handleChangeOpenTerminals: () => void;
}

export const TerminalsTable: React.FC<terminalsTableProps> = ({
    terminals,
    openTerminals,
    handleChangeOpenTerminals
}) => {

    const [openLogs, setOpenLogs] = useState<boolean>(false);

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
            <Button
                variant="outlined"
                size="small"
                color={openTerminals ? 'secondary' : 'primary'}
                onClick={handleChangeOpenTerminals}
            >
                {openTerminals ? 'Ocultar Terminais' : 'Exibir Terminais'}
            </Button>
            <Collapse in={openTerminals} timeout="auto" unmountOnExit>
                <Table size="small" aria-label="purchases">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>Código</TableCell>
                            <TableCell>Serial</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Data</TableCell>
                            <TableCell>Processamento</TableCell>
                            <TableCell>Gsurf</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {terminals.map((terminal) => (
                            <>
                                <TableRow hover key={terminal.id}>
                                    <TableCell style={{ width: 100 }} component="th" scope="row">
                                        {!terminal.logs.length ?
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
                                    </TableCell>
                                    <TableCell>
                                        {terminal.terminal_code}
                                    </TableCell>
                                    <TableCell>{terminal.serial_number}</TableCell>
                                    <TableCell>{getStatusName({ code: terminal.status })}</TableCell>
                                    <TableCell>
                                        {new Intl.DateTimeFormat('pt-BR')
                                            .format(new Date(terminal.date_created))}
                                    </TableCell>
                                    <TableCell>{getProcessingStatusName({ code: terminal.processing_status })}</TableCell>
                                    <TableCell>{terminal.merchant_gsurf}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
                                        <Collapse in={openLogs} timeout="auto" unmountOnExit>
                                            <Box margin={1}>
                                                {!terminal.logs?.length ?
                                                    <Typography variant="body2">Não há logs...</Typography>
                                                    : <LogsTable logs={terminal.logs} />
                                                }
                                            </Box>
                                        </Collapse>
                                    </TableCell>
                                </TableRow>
                            </>
                        ))}
                    </TableBody>
                </Table>
            </Collapse>
        </>
    );
};