import { addNewUser, deleteUserById, updateUser } from "../store/slices/usersSlice"
import { User, UserId, UserState } from "../types.d"
import { useAppDispatch } from "./store"

const useUsersActions = () => {
    const dispatch = useAppDispatch()

    const removeUserById = ( id: UserId) => {
        dispatch(deleteUserById(id))
    }

    const addUser = ( user: User) => {
        dispatch(addNewUser(user))
    }

    const editUser = ( id: UserId, user: UserState) => {
        dispatch(updateUser({id, user}))
    }

    return {
        removeUserById,
        addUser,
        editUser
    }
}

export default useUsersActions
