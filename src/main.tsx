import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import "./index.css"
import React from "react"
import * as ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import { store } from "./app/store"
import UsersPage from './pages/users/Users';
import ErrorPage from './pages/error/Error';
import { Provider } from "react-redux";

const router = createBrowserRouter([
    {
        path: "/",
        element: <UsersPage/>,
        errorElement: <ErrorPage />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
    </React.StrictMode>
);
