import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User, UserId, UserState } from "../../types.d";


const DefaultUsers: UserState[] = [
    {
      id: "1",
      name: "Lena Mayer",
      email: "lena@gmail.com",
      github: "lena"
    },
    {
        id: "2",
        name: "Mara Pacemaker",
        email: "mara@gmail.com",
        github: "mara"
      },
      {
        id: "3",
        name: "Phlipp Forest",
        email: "philip@gmail.com",
        github: "philip"
      },
  ];


const initialState: UserState[] = (() => {
    const persistedState = localStorage.getItem("__redux_state__")
    if( persistedState ){
        return JSON.parse(persistedState).users
    }
    return DefaultUsers
})()


  
export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addNewUser: (state, action: PayloadAction<User>) => {
            const id = crypto.randomUUID()
            state.push({...action.payload, id})
        },
        deleteUserById: (state, action: PayloadAction<UserId>) => {
            const id = action.payload
            return state.filter( user => user.id !== id )
        },
        rollBackUser: (state, action: PayloadAction<UserState>) => {
            const isUserAlreadyFined = state.some( user => user.id === action.payload.id)
            if(!isUserAlreadyFined)  state.push(action.payload)
        },
    }

})

export default usersSlice.reducer
export const { addNewUser, deleteUserById, rollBackUser } = usersSlice.actions