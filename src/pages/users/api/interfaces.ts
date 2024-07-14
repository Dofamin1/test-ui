export interface UserCreateData {
    email: string,
    username: string
}
export interface UserUpdateData {
    email?: string,
    username?: string
}

export interface UserData {
    id: number,
    email: string,
    username: string,
    createdAt: string,
    updatedAt: string
}