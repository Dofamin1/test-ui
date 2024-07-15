import * as React from 'react';
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {getErrorTextFromState, setErrorText} from "../usersSlice";
import {store} from "../../../app/store";

export default function ErrorAlert() {
    const SHOW_TIMEOUT = 3000;
    const dispatch = useAppDispatch();
    const errorText = useAppSelector(() => getErrorTextFromState(store.getState()));

    React.useEffect(() => {
        if (errorText) {
            const timer = setTimeout(() => {
                dispatch(setErrorText(null));
            }, SHOW_TIMEOUT);

            return () => clearTimeout(timer);
        }
    }, [errorText, dispatch]);

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