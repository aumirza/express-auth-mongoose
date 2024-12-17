import { Response } from 'express'
import { Error } from 'mongoose'

//handle field formatting, empty fields, and mismatched passwords
export const handleValidationError = (err: Error.ValidationError, res: Response) => {
    const errors = Object.values(err.errors).map((el) => el.message)
    const fields = Object.values(err.errors).map((el) => el.path)

    const formattedErrors = errors.map((el, i) => {
        return { [fields[i]]: el }
    })

    return res.status(400).send({ message: err.name, fields: formattedErrors })
}
