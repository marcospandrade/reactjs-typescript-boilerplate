export interface batchsTypes {
    id: number;
    date_created: string;
    processing_type: processingTypeEnum;
}

export enum processingTypeEnum {
    block = 'Bloqueio',
    unblock = 'Desbloqueio',
    null = 'Não monitorado'
}

export const getProcessingTypeText: any = (type: processingTypeEnum) => type?.toString() || 'Não monitorado';

export interface logsTypes {
    id: number;
    response: string;
    date_created: string;
}
export interface terminalsTypes {
    id: number;
    logs: logsTypes[];
    terminal_id: string;
    terminal_code: string;
    serial_number: string;
    status: string;
    date_created: string;
    processing_status: string;
    merchant_gsurf: number;
}

export interface batchsCustomerTypes {
    id: number;
    name: string;
    cnpj: string;
    terminals: terminalsTypes[];
    logs: logsTypes[];
    batch: {
        id: number;
        date_created: string;
        processing_type: processingTypeEnum;
    },
    date_created: string;
    processing_type: processingTypeEnum;
}