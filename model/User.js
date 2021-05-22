const mongoose = require('mongoose');
const brcypt = require('bcryptjs')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    fullname: {
        type: String,
        default: "User Default"
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
    },
    profilePic: {
        type: String,
        required: true,
        default: "/images/defaultPic.png"
    },
    activity: {
        type: Array,
        default: []
    }
}, { timestamps: true })

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await brcypt.compare(enteredPassword, this.password);
}

userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) {
        next();
    }
    const salt = await brcypt.genSalt(10);
    this.password = await brcypt.hash(this.password, salt);
})

const User = mongoose.model('User', userSchema);
module.exports = User;