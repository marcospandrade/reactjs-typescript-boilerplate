interface codesTypes {
    code: string;
}

export const getStatusName = ({ code = '0' }: codesTypes) => {
    switch (code) {
        case '0':
            return 'desbloqueado';
            break;

        case '2':
            return 'bloqueado';
            break;

        default:
            return 'outro'
            break;
    }
}

export const getProcessingStatusName = ({ code = '0' }: codesTypes) => {
    switch (code) {
        case '0':
            return 'não processado';
            break;

        case '1':
            return 'sucesso';
            break;

        case '2':
            return 'falho';
            break;
    }
}