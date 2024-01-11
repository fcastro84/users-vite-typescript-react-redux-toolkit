import { addNewUser, deleteUserById } from "../store/slices/usersSlice"
import { User, UserId } from "../types.d"
import { useAppDispatch } from "./store"

const useUsersActions = () => {
    const dispatch = useAppDispatch()

    const removeUserById = ( id: UserId) => {
        dispatch(deleteUserById(id))
    }

    const addUser = ( user: User) => {
        dispatch(addNewUser(user))
    }

    return {
        removeUserById,
        addUser
    }
}

export default useUsersActions
