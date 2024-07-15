import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import {store} from "../../../app/store";
import {getDeleteUser} from "../usersSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

export interface SimpleDialogProps {
    open: boolean;
    selectedValue: string;
    onClose: (value: string) => void;
}

export default function SimpleDialog(props: SimpleDialogProps) {
    const { onClose, onSubmit, open, username, email } = props;

    return (
        <Dialog onClose={onClose} open={open} fullWidth maxWidth="sm">
            <Container sx={{ py: 3 }}>
                <DialogTitle sx={{ fontSize: '1.5rem', textAlign: 'center', mb: 2 }}>Update selected user</DialogTitle>
                <Stack spacing={3}>
                    <TextField id="name" label="Name" variant="filled" fullWidth />
                    <TextField id="email" label="Email" variant="filled" fullWidth />
                    <Button
                        type="text"
                        variant="contained"
                        color="primary"
                        onClick={() => onSubmit(username)}
                        sx={{ alignSelf: 'center', py: 1, px: 4 }}
                    >
                        Create
                    </Button>
                </Stack>
            </Container>
        </Dialog>
    );
}