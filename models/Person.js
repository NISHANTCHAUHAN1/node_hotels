const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

// Define the Person schema

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    work: {
        type: String,
        enum: ['chef', 'waiter', 'manager'],
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String
    },
    salary: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
});

personSchema.pre('save', async function(next) {
    const person = this;

    // hash the password only if it has been modified (or is new)

    if(!person.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(person.password, salt);

        person.password = hashedPassword;
        next()
    } catch (error) {
        console.log(error);
        next();
    }
})

personSchema.methods.comparePassword = async function(candiadtePassword) {
    try {
        const isMatch = await bcrypt.compare(candiadtePassword, this.password)
        return isMatch;
    } catch (error) {
        throw(error)
    }
}

const Person = mongoose.model('Person', personSchema);
module.exports = Person;