import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { store } from "../../../app/store";
import { setUpdatedUserName, setUpdatedEmail } from "../usersSlice";
import { getUpdateNewUser, getUserToUpdateState } from "../usersSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";

export interface Props {
    open: boolean;
    onClose: (value: string) => void;
}

export default function UpdateUserDialog(props: Props) {
    const { onClose, open } = props;

    const dispatch = useAppDispatch();
    const userToUpdateData = useAppSelector(() => getUserToUpdateState(store.getState()));

    const submitUpdate = () => {
        store.dispatch(getUpdateNewUser(userToUpdateData));
        onClose();
    }

    return (
        <Dialog onClose={onClose} open={open} fullWidth maxWidth="sm">
            <Container sx={{ py: 3 }}>
                <DialogTitle sx={{ fontSize: '1.5rem', textAlign: 'center', mb: 2 }}>Update selected user</DialogTitle>
                <Stack spacing={3}>
                    <TextField id="name" label="Name" value={userToUpdateData.username} variant="filled" onChange={(ev) => dispatch(setUpdatedUserName(ev.target.value))} fullWidth />
                    <TextField id="email" label="Email" value={userToUpdateData.email} variant="filled" onChange={(ev) => dispatch(setUpdatedEmail(ev.target.value))} fullWidth />
                    <Button
                        type="text"
                        variant="contained"
                        color="primary"
                        onClick={submitUpdate}
                        sx={{ alignSelf: 'center', py: 1, px: 4 }}
                    >
                        Update
                    </Button>
                </Stack>
            </Container>
        </Dialog>
    );
}