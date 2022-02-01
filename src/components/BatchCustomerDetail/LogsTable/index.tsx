import React from 'react';
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Typography
} from '@material-ui/core';
import { logsTypes } from '../../../@types/batchs';

interface logsTableProps {
    logs: logsTypes[];
}

export const LogsTable: React.FC<logsTableProps> = ({ logs }: logsTableProps) => {
    return (
        <>
            <Typography variant="body1">Logs</Typography>
            <Table size="small" aria-label="purchases">
                <TableHead>
                    <TableRow>
                        <TableCell>Mensagem</TableCell>
                        <TableCell>Data</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {logs.map(log => (
                        <TableRow hover key={log.id}>
                            <TableCell component="th" scope="row">
                                {log.response}
                            </TableCell>
                            <TableCell>
                                {new Intl.DateTimeFormat('pt-BR')
                                    .format(new Date(log.date_created))}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
};