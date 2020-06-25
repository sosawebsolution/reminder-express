const express = require('express')
const mongoose = require('mongoose')

const app = express()


//middle-ware will run before it gets to the actual route
app.use(express.json())

app.get('/', (req,res) => {
    //do what you want to happen when a get request is sent to this url

    //retrieve all reminders from the database
    res.send('Get Route')
})

app.post('/', (req,res) => {
    //create a reminder based on the information sent
    res.send(req.body.isDone)
})

// connect to MongoDB
const mongo = async () => {
    try {
        const connect = await mongoose.connect('mongodb+srv://Adrian:Jaxcode@jaxcode-5jni2.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})
        console.log('MongoDB Connected!')
    } catch (error) {
        console.log(error.message)
    }
}

//in order to use backend language, need to have a local server
app.listen(5000, () => {
    mongo()
    console.log(`Listening on port 5000...`)
})

//creating a Model for MongoDB = equivalent to creating a table in MySQL ---- creating a model/Schema
const mongoose = require('mongoose')

//collection and naming of columns
const reminderSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    isDone: Boolean
})

module.exports = mongoose.model('Reminder', reminderSchema)