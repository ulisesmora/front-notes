import { useForm } from "react-hook-form"
import { LoginInformation } from "../../interfaces/UserInformation"
import { LoginSchema } from "../../validators/UserSchema"
import { Button, FormControl, FormErrorMessage, FormLabel, Input, useToast } from "@chakra-ui/react"
import { yupResolver } from '@hookform/resolvers/yup'
import noteApi from "../../api/noteApi"
import { useRouter } from "next/router"

export default function LoginForm() {
    const router = useRouter();
    const toast = useToast()

    const { reset, register, handleSubmit, formState: { errors, isSubmitting, isDirty, isValid }, } = useForm<LoginInformation>({
        mode: 'onChange',
        resolver: yupResolver(LoginSchema)
    })

    const onSubmit = async(userInformation: LoginInformation) => {
        
        try {
            const response = await noteApi.post('api/token/',userInformation);
            console.log(response.data,'data');
            localStorage.setItem('token',response.data.access);
            router.push('/notes');
            toast({
                title: 'Welcome.',
                description: "Start to make your own notes",
                status: 'success',
                duration: 5000,
                isClosable: true,
            })
        } catch (error) {
            console.log(error)
            toast({
                title: 'Please Review your information.',
                description: "Something in your information is wrong ",
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
            
        }
    }
    return (
        <div>
        <head>

        </head>
        <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl  isInvalid={!!errors.username} mt={4} isRequired>
                    <FormLabel>username</FormLabel>
                    <Input type="text" placeholder='username' {...register('username')} />
                    <FormErrorMessage>{errors.username && errors.username.message}</FormErrorMessage>
                </FormControl>


                <FormControl isInvalid={!!errors.password} mt={4} isRequired>
                    <FormLabel>password</FormLabel>
                    <Input type="password" {...register('password')} placeholder='password' />
                    <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
                </FormControl>

                <Button type='submit' colorScheme="red" mt='2rem' isLoading={isSubmitting} disabled={!isDirty || !isValid}> Login </Button>

        </form>
        </div>
    )
}
