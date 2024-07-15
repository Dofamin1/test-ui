import type { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "../../app/createAppSlice";
import usersApi from "./api/usersAPI";
import type {UserCreateData, UserData, UserUpdateData} from './api/interfaces';

export interface UserSliceState {
  users: UserData[],
  createDialogOpen: boolean,
  updateDialogOpen: boolean,
  newUserData: UserCreateData,
  updatedUserData: {
      id: null | number,
      email: string,
      username: string
  },
  errorText: string | null
};

const initialState: UserSliceState = {
    users: [],
    createDialogOpen: false,
    updateDialogOpen: false,
    newUserData: {
        email: "",
        username: ""
    },
    updatedUserData: {
        id: null,
        email: "",
        username: ""
    },
    errorText: null
};

export const usersSlice = createAppSlice({
  name: "users",
  initialState,
  reducers: create => ({
    updateUser: (state: UserSliceState, action: PayloadAction<UserUpdateData>) => {
        state.users = state.users.map(user => {
            if (user.id === action.payload.id) {
                return {
                    ...user,
                    ...action.payload
                };
            }
            return user;
        });
    },
    saveUsers: (state: UserSliceState, action: PayloadAction<UserData[]>) => {
        state.users = action.payload;
    },
    createNewUser: (state: UserSliceState, action: PayloadAction<UserData>) => {
        state.users.push(action.payload);
    },
    deleteUser: (state: UserSliceState, action: PayloadAction<number>) => {
        state.users = state.users.filter(user => user.id !== action.payload);
    },
    deleteAllUsers: (state: UserSliceState) => {
        state.users = [];
    },
    setCreateDialogOpen: (state: UserSliceState, action: PayloadAction<boolean>) => {
        state.createDialogOpen = action.payload;
    },
    setUpdateDialogOpen: (state: UserSliceState, action: PayloadAction<boolean>) => {
        state.updateDialogOpen = action.payload;
    },
    setNewUserEmail: (state: UserSliceState, action: PayloadAction<string>) => {
        state.newUserData.email = action.payload;
    },
    setNewUserUsername: (state: UserSliceState, action: PayloadAction<string>) => {
        state.newUserData.username = action.payload;
    },
    setUserToUpdate: (state: UserSliceState, action: PayloadAction<UserData>) => {
        state.updatedUserData.id = action.payload.id;
        state.updatedUserData.email = action.payload.email;
        state.updatedUserData.username = action.payload.username;
    },
    setUpdatedUserName: (state: UserSliceState, action: PayloadAction<string>) => {
        state.updatedUserData.username = action.payload;
    },
    setUpdatedEmail: (state: UserSliceState, action: PayloadAction<string>) => {
        state.updatedUserData.email = action.payload;
    },
    setErrorText: (state: UserSliceState, action: PayloadAction<string>) => {
        state.errorText = action.payload;
    }
  }),

  selectors: {
    getAllUsersFromState: state => state.users,
    getCreateDialogStatusState: state => state.createDialogOpen,
    getUpdateDialogStatusState: state => state.updateDialogOpen,
    getNewUserDataState: state => state.newUserData,
    getUserToUpdateState: state => state.updatedUserData,
    getUpdatedEmail: state => state.updatedUserData.email,
    getUpdatedUsername: state => state.updatedUserData.username,
    getErrorTextFromState: state => state.errorText
  },
});

export const fetchAllUsers = async (dispatch) => {
    try {
        const users = await usersApi.getUsers();
        dispatch(usersSlice.actions.saveUsers(users));
    } catch (e) {
        dispatch(usersSlice.actions.setErrorText(e.message || 'Failed to fetch users'));
    }
};

export const deleteAllUsers = async (dispatch) => {
    try {
        await usersApi.deleteAllUsers();
        dispatch(usersSlice.actions.deleteAllUsers());
    } catch (e) {
        dispatch(usersSlice.actions.setErrorText(e.message || 'Failed to delete all users'));
    }
}

export const getDeleteUser = (userId: number) => async (dispatch) => {
    try {
        await usersApi.deleteUser(userId);
        dispatch(usersSlice.actions.deleteUser(userId));
    } catch (e) {
        dispatch(usersSlice.actions.setErrorText(e.message || 'Failed to delete user'));
    }
}

export const getCreateNewUser = (userData: UserCreateData) => async (dispatch) => {
    try {
        const newUser = await usersApi.createUser(userData);
        dispatch(usersSlice.actions.createNewUser(newUser));
    } catch (e) {
        dispatch(usersSlice.actions.setErrorText(e.message || 'Failed to create new user'));
    }
}

export const getUpdateNewUser = (userData: UserUpdateData) => async (dispatch) => {
    try {
        const updatedUser = await usersApi.updateUser(userData);
        dispatch(usersSlice.actions.updateUser(updatedUser));
    } catch (e) {
        dispatch(usersSlice.actions.setErrorText(e.message || 'Failed to update user'));
    }
}

export const getUploadData = (file: File) => async (dispatch) => {
    try {
        const users = await usersApi.uploadFile(file);
        dispatch(usersSlice.actions.saveUsers(users));
    } catch (e) {
        dispatch(usersSlice.actions.setErrorText(e.message || 'Failed to update user'));
    }
}

export const {
    getAllUsersFromState,
    getCreateDialogStatusState,
    getUpdateDialogStatusState,
    getNewUserDataState,
    getUserToUpdateState,
    getErrorTextFromState
} = usersSlice.selectors;
export const {
    setCreateDialogOpen,
    setUpdateDialogOpen,
    setNewUserEmail,
    setNewUserUsername,
    setUserToUpdate,
    setUpdatedUserName,
    setUpdatedEmail,
    setErrorText
} = usersSlice.actions;
