require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const reminderRouter = require('./routes/reminderRoute')
const userRouter = require('./routes/userRoute')
const cors = require('cors')

const app = express()


//middle-ware will run before it gets to the actual route
app.use(express.json())
app.use(cors())

//routes
app.use('/reminders', reminderRouter)
app.use('/users', userRouter)

// connect to MongoDB
const mongo = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_CREDENTIALS, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
        })
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

