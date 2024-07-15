import * as React from 'react';
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {getErrorTextFromState, setErrorText} from "../usersSlice";
import {store} from "../../../app/store";

export default function ErrorAlert() {
    const SHOW_TIMEOUT = 5000;
    const dispatch = useAppDispatch();
    const errorText = useAppSelector(() => getErrorTextFromState(store.getState()));
    setTimeout(() => { dispatch(setErrorText(null)); }, SHOW_TIMEOUT);

    return (
        <>
            {errorText && (
                <Alert icon={<CheckIcon fontSize="inherit" />} severity="error">
                    {errorText}
                </Alert>
            )}
        </>
    );
}