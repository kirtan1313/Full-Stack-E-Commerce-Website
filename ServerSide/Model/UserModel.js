const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')


const UserSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Please Enter Your Name'],
        maxLength: [40, 'No More Than 40 Charchter'],
        minLength: [4, 'Name Should More Than 4 Charchter']
    },
    email: {
        type: String,
        required: [true, 'Please Enter Your Email'],
        unique: true,
        validate: [validator.isEmail, "Please Enter Your Valid Email"]
    },
    password: {
        type: String,
        required: [true, 'Please Enter Your Password'],
        minLength: [8, 'Password Should More Greater Than 8 Charchter'],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: 'user'
    },

    resetPasswordToken: String,
    resetPasswordExpaire: Date

})

// User bcrypt Password
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})


// JWT Token 
UserSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
}


// Comparre Password
UserSchema.methods.comparePassword = async function (enterPassword) {
    return await bcrypt.compare(enterPassword, this.password)
}


// Reset Password Token
UserSchema.methods.getResetPasswordToken = async function () {

    // Genrate Token 
    const resetToken = crypto.randomBytes(20).toString('hex')

    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')
    this.resetPasswordExpaire = Date.now() + 15 * 60 * 1000

    return resetToken
}


module.exports = mongoose.model('User', UserSchema)