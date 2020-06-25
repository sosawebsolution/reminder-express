const jwt = require('jsonwebtoken')

module.exports = {
decode: async (headers) => {
    try {
        //grab the authorization 
        const {authorization} = headers

        const token = authorization.split(' ')[1]
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        return decoded.email
    } catch (err) {
        console.log(err.message)
    }
 }
}