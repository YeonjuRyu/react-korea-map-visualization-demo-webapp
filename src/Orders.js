import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

// Generate Order Data
function createData(id, date, seoul, gyungi, sejong, incheon, jn, jb, gn, gb, jj, sum) {
    return { id, date, seoul, gyungi, sejong, incheon, jn, jb, gn, gb, jj, sum };
}

const rows = [
    createData(0, '2018', 100, 100, 100, 100, 100, 100, 100, 100, 100,  300),
    createData(1, '2017', 100, 100, 100, 100, 100, 100, 100, 100, 100,  300),
    createData(2, '2016', 100, 100, 100, 100, 100, 100, 100, 100, 100,  300),
    createData(3, '2015', 100, 100, 100, 100, 100, 100, 100, 100, 100,  300),
    createData(4, '2014', 100, 100, 100, 100, 100, 100, 100, 100, 100,  300),
    createData(5, '2013', 100, 100, 100, 100, 100, 100, 100, 100, 100,  300),
    createData(6, '2012', 100, 100, 100, 100, 100, 100, 100, 100, 100,  300),
];

function preventDefault(event) {
    event.preventDefault();
}

const useStyles = makeStyles(theme => ({
    seeMore: {
        marginTop: theme.spacing(3)
    }
}));

export default function Orders() {
    const classes = useStyles();
    return (
        <React.Fragment>
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <Title>실제 데이터</Title>
            <button style={{alignSelf: 'flex-end', margin:'10px 0px'}}>수정</button>
          </div>
            <Table size="small" style={{ overflow:'scroll'}}>
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>서울특별시</TableCell>
                        <TableCell>경기도</TableCell>
                        <TableCell>세종자치시</TableCell>
                        <TableCell>인천광역시</TableCell>
                        <TableCell>전라남도</TableCell>
                        <TableCell>전라북도</TableCell>
                        <TableCell>경상남도</TableCell>
                        <TableCell>경상북도</TableCell>
                        <TableCell>제주도</TableCell>

                        <TableCell align="right">총 방문객</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(row => (
                        <TableRow key={row.id}>
                            <TableCell>{row.date}</TableCell>
                            <TableCell>{row.seoul}</TableCell>
                            <TableCell>{row.gyungi}</TableCell>
                            <TableCell>{row.sejong}</TableCell>
                            <TableCell>{row.incheon}</TableCell>
                            <TableCell>{row.jn}</TableCell>
                            <TableCell>{row.jb}</TableCell>
                            <TableCell>{row.gn}</TableCell>
                            <TableCell>{row.gb}</TableCell>
                            <TableCell>{row.jj}</TableCell>
                            <TableCell align="right">{row.sum}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className={classes.seeMore}>
                <Link color="primary" href="#" onClick={preventDefault}>
                    See more data
                </Link>
            </div>
        </React.Fragment>
    );
}
