const User = require('./../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authController = require('./authController')
const { decode } = authController
const nodemailer = require("nodemailer");

// get user

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.send(users)
    } catch (error) {
        console.log(error.message)
    }
}

// create new user

exports.createUser = async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body
        // check if user is in the database
        const match = await User.exists({ email: email })
        // if already exists, send back "Email already exists"
        if (match) {
            res.send('Email already exists')
        } else {
        // else add them to the database
        
        // encrypting the password
        const hash = await bcrypt.hash(password, 10)
        // creating a new user
        const newUser = await User.create({
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: hash
        })

        // create "payLoad"
        const payload = { 
            email: email
        }

        // sign the token (create)
        const token = jwt.sign(payload, process.env.JWT_SECRET)
        // send the welcome email
        let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
              user: testAccount.user, // generated ethereal user
              pass: testAccount.pass, // generated ethereal password
            },
          });

        // send email with defined transport object
        let info = await transporter.sendMail({
            from: '"Welcome Team"<welcome@reminder.com>', //sender address
            to: `${email}`, // list of receivers
            subject: "Welcome to Reminders!", //subject line 
            text: "This is your welcome email", //plain text body
            html: "<b>Welcome to Reminders, Enjoy!</b>" // html body

            

        })
        // send the token back to the client (browser)
        res.status(200).send({
            success: true,
            message: 'New User Created',
            data: {
                token: token
            }
        })
    }
    } catch (error) {
        console.log(error.message)
    }
}

// Login user

exports.userLogin = async (req, res) => {
    try {
        const { email, password } = req.body 
        // check if use exists in the database
        const doesExist = await User.exists({ email: email })
        if (doesExist){
            //grab them from the database
    
        const user = await User.find({ email: email})
        //... fetch user from a db etc.
        const match = await bcrypt.compare( password, user[0].password )
        // if the passwords match, send back "Logged In", else send back "Credentials do not match"
        if(match) {
            // create "payLoad"
        const payload = { 
            email: email
        }

        // sign the token (create)
        const token = jwt.sign(payload, process.env.JWT_SECRET);

        // send the token back to the client (browser)
        res.status(200).send({
            success: true,
            login: true,
            data: {
                token: token
            }
        })
         } else {
            res.send('Credentials do not match')
         } 
    } else {
        res.send('Please create an account')
    }
    } catch (error) {
        console.log(error.message)
    }
}

//update user

exports.updateUser = async (req, res) => {
    try {
        // the email from the token
        const email = await decode(req.headers)
        const { firstname, lastname } = req.body
        const user = await User.updateOne(
            { email: email }, 
            { firstname: firstname, lastname: lastname })
        res.status(200).send({
            success: true,
            message: 'User has been updated'
        })
    } catch (error) {
        console.log(error.message)
    }
}
// delete user (DELETE)
exports.deleteUser = async (req, res) => {
    try {
        const { email } = req.body
        const user = await User.deleteOne({email: email})
        res.status(200).send({
            success: true
        })
    } catch (error) {
        console.log(error.message)
    }
}

// Get One User

exports.oneUser = async (req, res) => {
    try {
        // the email from the token
        const email = await decode(req.headers)
        // find the user based on the email inside of the token
        const user = await User.find({ email: email });
        // send the user back to the client
        res.status(200).send({
            succes: true,
            user
        })
    } catch (error) {
        console.log(error.message)
    }
}
