const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const {BadRequestError, NotFoundError} = require('./utils/errors')
const app = express()

//APP USES - Cross Origin Sharing
app.use(cors())
//APP USE - Parse incoming request bodies
app.use(express.json())
//APP USE - Log request info
app.use(morgan('tiny'))


//APP GET REQUESTS
app.get('/', async(req,res) => {
    res.status(200).json({"ping":"pong"})
})




//ERROR HANDLING APP USES
app.use((req,res,next) => {
    return next(new NotFoundError())
})

// app.use((error, req, res, next) => {
//     const status = error.status || 500
//     const message = error.message
//     return res.status((status)).json({
//         error: {message, status}
//     })
// })

module.exports = app