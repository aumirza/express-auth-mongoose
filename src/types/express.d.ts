import { IUser } from './modelTypes/userModel'

export {}

declare global {
    namespace Express {
        interface User extends IUser {}
    }
}
