import { Toaster } from 'sonner'
import './App.css'
import CreateNewUsers from './components/CreateNewUsers'
import ListOfUsers from './components/ListOfUsers'

function App() {
  

  return (
    <>
      <ListOfUsers />
      <CreateNewUsers />
      <Toaster richColors closeButton />
    </>
  )
}

export default App
