const mongoose = require('mongoose')

//collection and naming of columns
const reminderSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    isDone: Boolean,
    email: String
})

module.exports = mongoose.model('Reminder', reminderSchema)