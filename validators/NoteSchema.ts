
import * as yup from 'yup'

export const NoteSchema = yup.object().shape({
    title: yup.string().min(2).required(),
    description: yup.string().min(2).required(),
})
