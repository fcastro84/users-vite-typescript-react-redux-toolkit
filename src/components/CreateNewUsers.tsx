import { Card, Text, TextInput, Button, Badge } from "@tremor/react";
import { FormEvent, useState } from "react";
import useUsersActions from "../hooks/useUsersAction";

const CreateNewUsers = () => {
    const { addUser } = useUsersActions()
    const [result, setResult] = useState<'ok' | 'ko' | null>(null)

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const form  = event.target as HTMLFormElement
        const formData = new FormData(form)

        const name = formData.get('name') as string
        const email = formData.get('email') as string
        const github = formData.get('github') as string
        if( !name || !email || !github){
            return setResult('ko')
        }

        addUser( { name, email, github} )
        setResult('ok')

        form.reset()

    }
  return (
    <Card className="max-w-sm mx-auto mt-4" decoration="top" decorationColor="indigo">
        <Text>Create New User</Text>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 mt-3">
            <TextInput placeholder="Enter your name" name="name" />
            <TextInput placeholder="Enter your email" name="email" />
            <TextInput placeholder="Enter your github" name="github" />
            <div>
               <Button type="submit" variant="primary">Crear User</Button> 
                <span className="ml-3">
                    { result === 'ok' && <Badge color='green' >Guardado correctamente</Badge> }
                    { result === 'ko' && <Badge color='red' >Error en los campos</Badge> }
                </span> 
            </div>
            
        </form>
        
        
  </Card>
  )
}

export default CreateNewUsers
