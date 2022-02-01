export interface merchantsTypes {
    id: number;
    name: string;
    cnpj: string;
    terminals: any[];
    logs: any[];
    batch: {
        id: number;
        date_created: string;
    },
    date_created: string;
}