import { useForm } from "react-hook-form"
import { LoginSchema } from "../../validators/UserSchema"
import { Button, FormControl, FormErrorMessage, FormLabel, Input, useToast,Textarea } from "@chakra-ui/react"
import { yupResolver } from '@hookform/resolvers/yup'
import noteApi from "../../api/noteApi"
import { useRouter } from "next/router"
import { NoteInformation } from "../../interfaces/NoteInformation"
import { NoteSchema } from "../../validators/NoteSchema"
import { useContext, useEffect } from "react"
import { NoteContext } from "../tables/TableNotes"


interface OperationNote {
    id:number
}

export default function NoteForm({id}:OperationNote) {
    const toast = useToast()
    const { change, changeData } = useContext(NoteContext)

    const { reset, register, handleSubmit, formState: { errors, isSubmitting, isDirty, isValid }, } = useForm<NoteInformation>({
        mode: 'onChange',
        resolver: yupResolver(NoteSchema)
    })

    

    const onSubmit = async(noteInformation: NoteInformation) => {
        try {
            if(id == 0){
                const response = await noteApi.post('api/tasks/',noteInformation,{
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                }});
            }
            if(id > 0){
                const response = await noteApi.put('api/tasks/'+id,noteInformation,{
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                    }});    
            }
            changeData()
            toast({
                title: 'Note.',
                description: "Created successful",
                status: 'success',
                duration: 5000,
                isClosable: true,
            })
        } catch (error) {
            console.log(error)
            toast({
                title: 'Please Review your title information must be unique.',
                description: "Something in your information is wrong ",
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
            
        }
    }
    return (
        <div>
        <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl  isInvalid={!!errors.title} mt={4} isRequired>
                    <FormLabel>title</FormLabel>
                    <Input type="text" placeholder='title' {...register('title')} />
                    <FormErrorMessage>{errors.title && errors.title.message}</FormErrorMessage>
                </FormControl>


                <FormControl isInvalid={!!errors.description} mt={4} isRequired>
                    <FormLabel>description</FormLabel>
                    <Textarea  {...register('description')} placeholder='description' />
                    <FormErrorMessage>{errors.description && errors.description.message}</FormErrorMessage>
                </FormControl>

                <Button type='submit' colorScheme="red" mt='2rem' isLoading={isSubmitting} disabled={!isDirty || !isValid}> Save Note </Button>

        </form>
        </div>
    )
}
