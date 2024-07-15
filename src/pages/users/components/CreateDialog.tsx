import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Container from '@mui/material/Container';
import {
    setNewUserEmail,
    setNewUserUsername,
} from '../usersSlice'
import {
    getCreateNewUser,
    getNewUserDataState
} from '../usersSlice';
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { store } from "../../../app/store";

export interface Props {
    open: boolean;
    onClose: (value: string) => void;
}

export default function CreateUserDialog(props: Props) {
    const { onClose, open } = props;
    const dispatch = useAppDispatch();
    const userData = useAppSelector(() => getNewUserDataState(store.getState()));
    const isButtonDisabled = !userData.username || !userData.email;

    const submitNewUser = () => {
        store.dispatch(getCreateNewUser(userData));
        onClose();
    }

    return (
        <Dialog onClose={onClose} open={open} fullWidth maxWidth="sm">
            <Container sx={{ py: 3 }}>
                <DialogTitle sx={{ fontSize: '1.5rem', textAlign: 'center', mb: 2 }}>Create New User</DialogTitle>
                <Stack spacing={3}>
                    <TextField id="name" label="Name" variant="filled" onChange={(ev) => dispatch(setNewUserUsername(ev.target.value))} fullWidth />
                    <TextField id="email" label="Email" variant="filled" onChange={(ev) => dispatch(setNewUserEmail(ev.target.value))} fullWidth />
                    <Button
                        type="text"
                        variant="contained"
                        color="primary"
                        onClick={submitNewUser}
                        sx={{ alignSelf: 'center', py: 1, px: 4 }}
                        disabled={isButtonDisabled}
                    >
                        Create
                    </Button>
                </Stack>
            </Container>
        </Dialog>
    );
}