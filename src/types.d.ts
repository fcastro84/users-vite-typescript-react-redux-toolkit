export type UserId = string
export interface User {
    name: string,
    email: string,
    github: string
}

export interface UserState extends User {
    id: UserId;
}

