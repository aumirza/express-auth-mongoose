import {
    Document,
    HydratedDocument,
    Model,
    QueryWithHelpers,
    SchemaTimestampsConfig,
} from 'mongoose'
import { Profile } from 'passport-google-oauth20'
import { Request } from 'express'

declare interface IUserSchema {
    name: string
    email: string
    password: string
    confirmPassword: string | undefined
    isAdmin: boolean
    isActive: boolean
    activationToken: string
    resetPasswordToken: string
    refreshTokens: {
        token: string
        expires: Date
    }[]
    googleProvidor: {
        id: string
        token: string
    }
    facebookProvidor: {
        id: string
        token: string
    }
}

declare interface IUserMethods {
    hashPassword: (password: string) => Promise<string>
    checkPassword: (password: string) => Promise<Boolean>
    verifyRefreshToken: (refreshToken: string) => Promise<Boolean>
    generateActivationToken: () => string
    generateResetPasswordToken: () => string
    generateAccessToken: () => string
    generateRefreshToken: () => string
    toAuthJSON: () => Promise<{
        _id: string
        name: string
        email: string
        accessToken: string
        refreshToken: string
    }>
}

declare interface IUserStatics {
    [name: string]: (this: IUserModel, ...args: any[]) => unknown
    upsertSocialUser: (
        req: Request,
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        cb: CallableFunction,
    ) => Promise<IUserDocument>
    serialize: (req: Request, user: IUser, done: CallableFunction) => string
    deserialize: (id: string, done: CallableFunction) => Promise<IUserDocument>
}

declare interface IUserQueryHelpers {
    byEmail(
        email: string,
    ): QueryWithHelpers<
        HydratedDocument<IUserDocument> | null,
        HydratedDocument<IUserDocument>,
        IUserQueryHelpers
    >
}
declare interface IUserDocument
    extends IUserSchema,
        IUserMethods,
        Document,
        SchemaTimestampsConfig {}

declare interface IUser extends IUserDocument, IUserMethods {}
declare interface IUserModel extends Model<IUser, IUserQueryHelpers> {}
