import * as React from 'react';
import  { useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditPopup from './EditPopup';
import { deleteUser } from './modules/users'
import { useDispatch } from 'react-redux';

export default function DataTable({currentUsers}) {
  const dispatch = useDispatch()

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Username</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Address</TableCell>
            <TableCell align="right">Phone</TableCell>
            <TableCell align="right">Website</TableCell>
            <TableCell align="right">Company</TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentUsers.map((currentUser) => (
            <TableRow
              key={currentUser.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {currentUser.id}
              </TableCell>
              <TableCell align="right">{currentUser.name}</TableCell>
              <TableCell align="right">{currentUser.username}</TableCell>
              <TableCell align="right">{currentUser.email}</TableCell>
              <TableCell align="right">{currentUser.address.street + ' ' +currentUser.address.suite + ' ' + currentUser.address.city + ' ' + currentUser.address.zipcode + ' ' + currentUser.address.geo.lat + ' ' + currentUser.address.geo.lng}</TableCell>
              <TableCell align="right">{currentUser.phone}</TableCell>
              <TableCell align="right">{currentUser.website}</TableCell>
              <TableCell align="right">{currentUser.company.name + ' ' + currentUser.company.catchPhrase + ' ' + currentUser.company.bs}</TableCell>
              <TableCell align="right"><EditPopup user={currentUser}/></TableCell>
              <TableCell align="right"><button className="delete-button" onClick={() => dispatch(deleteUser(currentUser.id))}>Delete</button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
