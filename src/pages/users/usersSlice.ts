import type { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "../../app/createAppSlice";
import usersApi from "./api/usersAPI";
import type {UserCreateData, UserData, UserUpdateData} from './api/interfaces';

export interface UserSliceState {
  users: UserData[],
  loading: boolean,
};

const initialState: UserSliceState = {
    users: [],
    loading: false
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
    }
  }),

  selectors: {
    getAllUsersFromState: state => state.users,
    getLoadingStatus: state => state.loading
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

export const createNewUser = async (dispatch, userData: UserCreateData) => {
    const newUser = await usersApi.createUser(userData);
    dispatch(usersSlice.actions.createNewUser(newUser));
}

export const { getAllUsersFromState } = usersSlice.selectors;
