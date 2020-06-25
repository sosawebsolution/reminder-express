const express = require('express')
const reminderController = require('./../controllers/reminderController')

const router = express.Router()

const { getReminders, createReminder, updateReminder, deleteReminder, getCompletedReminders } = reminderController

//router.get('/', getReminders)

//router.post('/', createReminder)

//router.patch('/', updateReminder)

//router.delete('/', deleteReminder)

router.route('/').get(getReminders).post(createReminder).patch(updateReminder).delete(deleteReminder);
router.route('/completedreminders').get(getCompletedReminders);



module.exports = router