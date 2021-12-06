import React from 'react';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { tCoin } from '../../types';

interface ICryptoTable {
  items: tCoin[];
}

function CryptoTable({ items }: ICryptoTable) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">#</TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="center">Fullname</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Price</TableCell>
            <TableCell align="center">Volume&nbsp;(24hour)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.length < 1
            ? 'loading..'
            : items.map((coin, index) => (
                <TableRow
                  key={coin.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell align="center">
                    <img width={18} height={18} src={coin.imgUrl} alt="Coin icon" />
                  </TableCell>
                  <TableCell align="center">{coin.fullname}</TableCell>
                  <TableCell align="center">{coin.name}</TableCell>
                  <TableCell align="center">{coin.price}$</TableCell>
                  <TableCell align="center">{coin.volume}$</TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CryptoTable;
