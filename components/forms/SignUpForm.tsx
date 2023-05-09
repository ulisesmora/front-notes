import { useForm } from "react-hook-form"
import { UserInformation } from "../../interfaces/UserInformation"
import { UserSchema } from "../../validators/UserSchema"
import { Button, FormControl, FormErrorMessage, FormLabel, Input, useToast } from "@chakra-ui/react"
import { yupResolver } from '@hookform/resolvers/yup'
import noteApi from "../../api/noteApi"

export default function SignUpForm() {

    const toast = useToast()

    const { reset, register, handleSubmit, formState: { errors, isSubmitting, isDirty, isValid }, } = useForm<UserInformation>({
        mode: 'onChange',
        resolver: yupResolver(UserSchema)
    })

    const onSubmit = async(userInformation: UserInformation) => {
        try {
            const response = await noteApi.post('apiuser/user/',userInformation);
            toast({
                title: 'Account created.',
                description: "We've created your account for you. now Login",
                status: 'success',
                duration: 5000,
                isClosable: true,
            })
            console.log(response.data,'data');
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
                <FormControl isInvalid={!!errors.username} mt={4} isRequired>
                    <FormLabel>username</FormLabel>
                    <Input type="text" placeholder='username' {...register('username')} />
                    <FormErrorMessage>{errors.username && errors.username.message}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.email} mt={4} isRequired>
                    <FormLabel>email</FormLabel>
                    <Input type="email" {...register('email')} placeholder='email' />
                    <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.password} mt={4} isRequired>
                    <FormLabel>password</FormLabel>
                    <Input type="password" {...register('password')} placeholder='password' />
                    <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
                </FormControl>

                <Button type='submit' colorScheme="red" mt='2rem' isLoading={isSubmitting} disabled={!isDirty || !isValid}> Register </Button>

        </form>
        </div>
    )
}