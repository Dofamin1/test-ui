import type { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "../../app/createAppSlice";
import usersApi from "./api/usersAPI";
import type {UserCreateData, UserData, UserUpdateData} from './api/interfaces';

export interface UserSliceState {
  users: UserData[],
  loading: boolean,
  createDialogOpen: boolean,
  updateDialogOpen: boolean,
  newUserData: UserCreateData,
};

const initialState: UserSliceState = {
    users: [],
    loading: false,
    createDialogOpen: false,
    updateDialogOpen: false,
    newUserData: {
        email: "",
        username: ""
    }
};

export const usersSlice = createAppSlice({
  name: "users",
  initialState,
  reducers: create => ({
    // updateUser: async (state: UserSliceState, action: PayloadAction<>) => {
    //     const user = state.users.find
    // },
    saveUsers: (state: UserSliceState, action: PayloadAction<UserData[]>) => {
        state.users = action.payload;
    },
    createNewUser: (state: UserSliceState, action: PayloadAction<UserCreateData>) => {
        state.users.push(action.payload);
    },
    deleteUser: (state: UserSliceState, action: PayloadAction<number>) => {
        state.users = state.users.filter(user => user.id !== action.payload);
    },
    deleteAllUsers: (state: UserSliceState) => {
        state.users = [];
    },
    setLoading: (state: UserSliceState, action: PayloadAction<boolean>) => {
        state.loading = action.payload;
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
  }),

  selectors: {
    getAllUsersFromState: state => state.users,
    getLoadingStatusState: state => state.loading,
    getCreateDialogStatusState: state => state.createDialogOpen,
    getUpdateDialogStatusState: state => state.updateDialogOpen,
    getNewUserDataState: state => state.newUserData,
  },
});

export const fetchAllUsers = async (dispatch) => {
    const users = await usersApi.getUsers();
    dispatch(usersSlice.actions.saveUsers(users));
};

export const deleteAllUsers = async (dispatch) => {
    await usersApi.deleteAllUsers();
    dispatch(usersSlice.actions.deleteAllUsers());
}

export const getDeleteUser = (userId: number) => async (dispatch) => {
    await usersApi.deleteUser(userId);
    dispatch(usersSlice.actions.deleteUser(userId));
}

export const getCreateNewUser = (userData: UserCreateData) => async (dispatch) => {
    const newUser = await usersApi.createUser(userData);
    dispatch(usersSlice.actions.createNewUser(newUser));
}

export const {
    getAllUsersFromState,
    getCreateDialogStatusState,
    getUpdateDialogStatusState,
    getNewUserDataState
} = usersSlice.selectors;
export const { setCreateDialogOpen, setUpdateDialogOpen, setNewUserEmail, setNewUserUsername } = usersSlice.actions;
