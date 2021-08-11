import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
        padding: '20px',
        // minWidth: 550,
    },
    Table:{
        marginTop:'1%',
    }
});

const ProductTable = ({itemDescTable}) => {

    const classes = useStyles();

    return (
        <TableContainer className={classes.Table} component={Paper}>
            <Table className={classes.table} aria-label="caption table">
                <TableBody>

                    <TableRow>
                        <TableCell component="th" scope="row">Тип</TableCell>
                        <TableCell align="center">{itemDescTable.typeName}</TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell component="th" scope="row">Количество персон</TableCell>
                        <TableCell align="center">{itemDescTable.countPeople}</TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell component="th" scope="row">Особенности</TableCell>
                        <TableCell align="center">{itemDescTable.features}</TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell component="th" scope="row">Материал</TableCell>
                        <TableCell align="center">{itemDescTable.eco}</TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell component="th" scope="row">Комплектация</TableCell>
                        <TableCell align="center">{itemDescTable.equipment}</TableCell>
                    </TableRow>
                    
                    <TableRow>
                        <TableCell component="th" scope="row">Экологичность</TableCell>
                        <TableCell align="center">{itemDescTable.structure}</TableCell>
                    </TableRow>

                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default ProductTable