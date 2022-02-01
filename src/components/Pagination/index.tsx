import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
//import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            marginTop: theme.spacing(2),
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
    }),
);

interface Props {
    page: number;
    count: number;
    handleChangePage: (pageNumber: number) => void;
}

export function PaginationCustom({
    page,
    count,
    handleChangePage
}: Props) {

    const classes = useStyles();

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        if (value !== page) {
            handleChangePage(value);
        }
    };

    return (
        <div className={classes.root}>
            {/* <Typography>Page: {page}</Typography> */}
            <Pagination variant="outlined" shape="rounded" color="primary" count={count} page={page} onChange={handleChange} />
        </div>
    );
}