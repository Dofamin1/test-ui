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
    updateUser: async (state: UserSliceState[]) => {

    },
    saveUsers: (state: UserSliceState, action: PayloadAction<UserData[]>) => {
        state.users = action.payload;
    },
    deleteUser: async (state: UserSliceState[]) => {

    },
    deleteAllUsers: async (state: UserSliceState[]) => {

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

export const { getAllUsersFromState } = usersSlice.selectors;
