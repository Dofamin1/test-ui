import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/ChangeCircle';
import CreateDialog from './components/CreateDialog';
import UpdateDialog from './components/UpdateDialog';
import {
    fetchAllUsers,
    setCreateDialogOpen,
    setUpdateDialogOpen,
    setUserToUpdate,
    deleteAllUsers } from './usersSlice';
import {
    getDeleteUser,
    getAllUsersFromState,
    getCreateDialogStatusState,
    getUpdateDialogStatusState,
    } from './usersSlice';
import { store } from '../../app/store';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {UserData} from "./api/interfaces";

export default function BasicTable() {
    const dispatch = useAppDispatch();
    const users = useAppSelector(() => getAllUsersFromState(store.getState()));
    const createDialogStatus = useAppSelector(() => getCreateDialogStatusState(store.getState()));
    const updateDialogStatus = useAppSelector(() => getUpdateDialogStatusState(store.getState()));

    React.useEffect(() => {
        const fetchUsers = async () => {
            await store.dispatch(fetchAllUsers);
        };
        fetchUsers();
    }, []);

    const updateSelectedUser = (user: UserData) => {
        dispatch(setUserToUpdate(user));
        dispatch(setUpdateDialogOpen(true));
    }

    return (
      <>
          <CreateDialog onClose={() => dispatch(setCreateDialogOpen(false))} open={createDialogStatus}></CreateDialog>
          <UpdateDialog onClose={() => dispatch(setUpdateDialogOpen(false))} open={updateDialogStatus}></UpdateDialog>
          <Container sx={{ my: 4 }}>
              <Stack spacing={2} direction="row" justifyContent="right" alignItems="right">
                  <Button variant="contained" onClick={() => dispatch(setCreateDialogOpen(true))}>New User</Button>
                  <Button variant="outlined">Upload .xlsx</Button>
                  <Button variant="contained" color="error" onClick={() => store.dispatch(deleteAllUsers)}>Delete All</Button>
              </Stack>
          </Container>
          <Container>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Id</TableCell>
                      <TableCell align="center">Name</TableCell>
                      <TableCell align="center">Email</TableCell>
                      <TableCell align="center">Created At</TableCell>
                      <TableCell align="center">Updated At</TableCell>
                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((row: UserData) => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell align="center" component="th" scope="row">{row.id}</TableCell>
                          <TableCell align="center" component="th" scope="row">{row.username}</TableCell>
                          <TableCell align="center">{row.email}</TableCell>
                          <TableCell align="center">{new Date(row.createdAt).toDateString()}</TableCell>
                          <TableCell align="center">{new Date(row.updatedAt).toDateString()}</TableCell>
                          <TableCell align="center">
                              <Button type="text" onClick={() => updateSelectedUser(row)}><UpdateIcon/></Button>
                              <Button color="error" onClick={() => store.dispatch(getDeleteUser(row.id))}><DeleteIcon/></Button>
                          </TableCell>
                        </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
          </Container>
      </>
    );
}