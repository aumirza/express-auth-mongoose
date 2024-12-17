import { Schema, model, QueryWithHelpers } from 'mongoose'
import { IUser, IUserMethods, IUserModel, IUserQueryHelpers } from '../types/modelTypes/userModel'
import { UserMethods, UserStatics } from '../helpers/userMethods'
import { HydratedDocument } from 'mongoose'

export const userSchema = new Schema<IUser, IUserModel, IUserMethods, IUserQueryHelpers>(
    {
        name: {
            type: String,
            required: [true, 'Please enter your name'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Please enter your email'],
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, 'Please enter your password'],
            minlength: [6, 'Password must be at least 6 characters'],
        },
        confirmPassword: {
            type: String,
            required: [true, 'Please confirm your password'],
            validate: {
                validator: function (this: IUser, el: string) {
                    return el === this.password
                },
                message: 'Passwords are not the same',
            },
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        isActive: {
            type: Boolean,
            default: false,
        },
        activationToken: {
            type: String,
        },

        resetPasswordToken: {
            type: String,
        },
        refreshTokens: [
            {
                token: { type: String, required: true },
                expires: { type: Date, required: true },
            },
        ],
        googleProvidor: {
            type: {
                id: String,
                token: String,
            },
            select: false,
        },
        facebookProvidor: {
            type: {
                id: String,
                token: String,
            },
            select: false,
        },
    },
    {
        timestamps: true,
    },
)

userSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        delete ret.password
        delete ret.confirmPassword
        delete ret.activationToken
        delete ret.resetPasswordToken
        delete ret.refreshTokens
        delete ret.googleProvidor
        delete ret.facebookProvidor
        return ret
    },
})

userSchema.pre('save', function (this: IUser, next) {
    if (this.isNew) {
        this.activationToken = this.generateActivationToken()
    }
    next()
})
userSchema.pre('save', async function (this: IUser, next) {
    if (!this.isModified('password')) {
        return next()
    }
    this.password = await this.hashPassword(this.password)
    this.confirmPassword = undefined
    next()
})

userSchema.methods = UserMethods
userSchema.statics = UserStatics

userSchema.query.byEmail = function (
    this: QueryWithHelpers<HydratedDocument<IUser>[], HydratedDocument<IUser>, IUserQueryHelpers>,
    email: string,
) {
    return this.findOne({ email })
}

// userSchema.virtual('id').get(function () {
//     return this._id.toHexString()
// })

const User = model<IUser, IUserModel, IUserQueryHelpers>('User', userSchema)

export default User
