
import * as yup from 'yup'

export const UserSchema = yup.object().shape({
    email: yup.string().email().required(),
    username: yup.string().min(8).required(),
    password: yup.string().min(8).required()
})

export const LoginSchema = yup.object().shape({
    username: yup.string().min(8).required(),
    password: yup.string().min(8).required()
})