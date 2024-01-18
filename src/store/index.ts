import { Middleware, configureStore } from '@reduxjs/toolkit';
import usersReducer, { rollBackUser } from "./slices/usersSlice"
import { toast } from "sonner";
import { UserId, UserState } from '../types.d';

const persistanceLocalStorageMiddleware: Middleware = (store) => (next) => (action) => {
   next(action) 
   localStorage.setItem("__redux_state__", JSON.stringify(store.getState()))
}  

const syncWithDatabaseMiddleware: Middleware = store => next => (action) => {
   const { type , payload } = action as {type: string, payload: UserId}
   const prevState = store.getState()

   next(action)
   if( type === 'users/deleteUserById'){
      const userIdToRemove = payload
      const userToRemove = prevState.users.find((user: UserState) => user.id === payload)

      fetch(`https://jsonplaceholder.typicode.com/users/${userIdToRemove}`, {
         method: 'DELETE'
      })
         .then( res => {
            if(res.ok){
               toast.success(`Usuario ${payload} eliminado correctamente`)
               return
            }
            throw new Error('Error al eliminar el usuario')
         })
         .catch( error => {
            toast.error(`Error deleting user ${userIdToRemove}`)
            if( userToRemove ) store.dispatch(rollBackUser(userToRemove))
            console.log(error) 
         })
   }
}

// Variante 2
// const listenerMiddleware = createListenerMiddleware()

// listenerMiddleware.startListening({
//    actionCreator: deleteUserById,
//    effect: (action, listenerApi) => {
//     localStorage.setItem("__redux_state__", JSON.stringify(listenerApi.getState()))
//    } 
// })

// export const store = configureStore({
//     reducer: {
//      users: usersReducer,
//     }, 
//     middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(listenerMiddleware.middleware),
//  })



export const store = configureStore({
   reducer: {
    users: usersReducer,
   }, 
   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(persistanceLocalStorageMiddleware, syncWithDatabaseMiddleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch