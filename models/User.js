const Mongoose = require("mongoose")
const bcrypt = require('bcrypt')
const userMethods = require('../helpers/userMethods')

const schemaOptions = {
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: (doc, ret) => {
            delete ret.password
            return ret
        }
    }
}

const UserSchema = Mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, },
    confirmPassword: { type: String, required: true, equalTo: 'password' },
    isActive: { type: Boolean, default: true },
    refreshTokens: [String],
    activationToken: { type: String, default: null },
    resetToken: { type: String, default: null },
}, schemaOptions)

UserSchema.methods = userMethods

UserSchema.pre('create', function (next) {
    this.generateActivationToken()
    next()
})

UserSchema.pre('save', async function (next) {

    if (!this.isModified('password')) {
        return next()
    }

    this.password = await bcrypt.hash(this.password, 10)
    this.confirmPassword = undefined
    next()
})

const User = Mongoose.model('User', UserSchema)


module.exports = User