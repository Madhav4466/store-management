const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const usersSchema = new mongoose.Schema({
    firstName: {type: String, required: true, maxlength: 25},
    lastName: {type: String, required: true, maxlength: 25},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    mobile: {type: Number, required: true},
    dob:{type: Date},
    gender: {type: String}
});

usersSchema.statics.authenticate = async function(email, password) {
    const user = await this.findOne({email});
    const isValidUser = await bcrypt.compare(password, user.password);
    return isValidUser ? user : false;
}

usersSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

const Users = mongoose.model('User', usersSchema);
module.exports = Users;