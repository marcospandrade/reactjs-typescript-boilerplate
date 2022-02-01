import { ChangeEvent } from 'react';
import {
    Button,
    Grid,
    Paper
} from '@material-ui/core';
import styles from './styles.module.scss';

interface InputMerchantsFileProps {
    fileReceived: boolean;
    handleRemoveFile: () => void;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    selectedFile: any;
}

export const InputMerchantsFile = ({
    fileReceived,
    handleRemoveFile,
    handleChange,
    selectedFile
}: InputMerchantsFileProps) => {
    return (
        <div className={styles.containerInputUpload}>
            <Paper elevation={4} className={styles.contentInputUpload}>
                <Grid container spacing={2} className="container-grid-paper">
                    <Grid item xl={9} lg={8} md={8} sm={8} xs={12}>
                        <p className={styles.paragrath1}>Anexe o arquivo excel aqui</p>
                    </Grid>
                    <Grid item xl={3} lg={4} md={4} sm={4} xs={12} className={styles.paperRight}>
                        {fileReceived ?
                            <Button
                                variant="contained"
                                color="secondary"
                                fullWidth
                                onClick={handleRemoveFile}
                            >
                                Remover arquivo
                            </Button>
                            :
                            <>
                                <input
                                    id="button-upload-file"
                                    className={styles.inputUploadFile}
                                    type="file"
                                    name="customers"
                                    onChange={handleChange}
                                />
                                <label htmlFor="button-upload-file" style={{ width: '100%' }}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        component="span"
                                        fullWidth
                                    >
                                        Anexar arquivo
                                    </Button>
                                </label>
                            </>
                        }
                    </Grid>
                    {fileReceived && selectedFile &&
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            <p className={styles.pargrathDetailFile}>Arquivo: <span>{selectedFile?.name}</span></p>
                        </Grid>
                    }
                </Grid>
            </Paper>
        </div>
    );
};