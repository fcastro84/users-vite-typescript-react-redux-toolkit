
import { Dialog, DialogPanel, Button, Title, Flex, Divider, TextInput, Badge } from "@tremor/react"
import { FormEvent, useState } from "react"
import useUsersActions from "../hooks/useUsersAction"
import { UserState } from "../types"
import { toast } from "sonner"

export interface EditUserProp {
    isOpen: boolean
    changeOpen: ( val :boolean ) => void
    user: UserState
}

const EditUser = ({isOpen, changeOpen, user}: EditUserProp) => {

    const [result, setResult] = useState<'ok' | 'ko' | null>(null)
    const { editUser } = useUsersActions()

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        setResult(null)

        const form = new FormData(event.currentTarget)
        const name = form.get('name')  as string
        const email = form.get('email')  as string
        const github = form.get('github') as string

        if( !name || !email || !github){
            return setResult('ko')
        }

        const newUser: UserState = {
            id: user.id,
            name,
            email,
            github
        }

        editUser(user.id, newUser)
        setResult('ok')
        toast.success(`El usuario ${user.id} ha sido actualizado correctamente`)
        changeOpen(false)
    }

  return (
    <Dialog open={isOpen} onClose={(val: boolean) => changeOpen(val)} static={true}>
        <DialogPanel className="flex flex-col space-y-6">
          <Title className="text-xl font-bold">Edit User</Title>
          <Divider></Divider>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <TextInput placeholder="Enter your name" name="name" defaultValue={user.name}  />
                <TextInput placeholder="Enter your email" name="email" defaultValue={user.email} />
                <TextInput placeholder="Enter your github" name="github" defaultValue={user.github}  />
                <Divider></Divider>
                <Flex justifyContent="end" className="space-x-2 border-t pt-4 mt-2">
                    <span className="mr-3">
                        { result === 'ko' && <Badge color='red' >Error en los campos</Badge> }
                    </span> 
                    <Button>
                        Update User
                    </Button>
                    <Button type="button" className="bg-red-600" color="red"  onClick={() => changeOpen(false)}>
                        Cancel
                    </Button>
                </Flex>
            </form>
        </DialogPanel>
      </Dialog>
  )
}

export default EditUser
