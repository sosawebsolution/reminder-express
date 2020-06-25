const Reminder = require('./../models/reminderModel')
const jwt = require('jsonwebtoken')
const authController = require('./authController')
const { decode } = authController

//get reminders (Read)
exports.getReminders = async (req,res) => {
    try {
        const email = await decode(req.headers)
        const reminders = await Reminder.find({ isDone: false, email: email })
        res.status(200).send({
            success: true,
            data: reminders
        })

    } catch (error) {
        console.log(error.message)
    }
}

//create reminders (Create)

exports.createReminder = async (req,res) => {
    try {
        const email = await decode(req.headers)
        const {title} = req.body
        const newReminder = await Reminder.create({
            title: title,
            isDone: false,
            email: email
        })
        res.status(200).send({
            success: true,
            message: 'new reminder created'
        })
    } catch (error) {
        console.log(error.message)
    }

}
//update reminders (Update)

exports.updateReminder = async (req, res) => {
    try {
        const reminder = await Reminder.updateOne({_id: req.body.id }, { isDone: req.body.isDone })
        res.send('update successful')
    } catch (error) {
        console.log(error.message)
    }
}
// delete reminders (DELETE)
exports.deleteReminder = async (req, res) => {
    try {
        const reminder = await Reminder.deleteOne({_id: req.body.id })
        res.send('delete successful')
    } catch (error) {
        console.log(error.message)
    }
}

// get completed reminders

exports.getCompletedReminders = async (req,res) => {
    try {
        const email = await decode(req.headers)
        const data = await Reminder.find({isDone: true, email: email})
        
        res.status(200).send({
            success: true,
            data
        })
    } catch (err) {
        console.log(err)
    }
}