const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const {PORT} = require("./config")
const authRoutes = require("./routes/auth")
const nutritionRoutes = require("./routes/nutrition")
const activityRoutes = require("./routes/activity")
const security = require("./middleware/security")
const { NotFoundError } = require("./utils/errors")


const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan("tiny"))
app.use(security.extractUserFromJwt)

app.use("/auth", authRoutes)
app.use("/nutrition", nutritionRoutes)
app.use("/activity", activityRoutes)

app.use((req, res, next) => {
    res.status(201).json({ping: "pong"})
    })

app.use((req, res, next) =>{
    return next(new NotFoundError())
})

app.use((err, req, res, next)=>{
    const status = err.status || 500
    const message = err.message

    return res.status(status).json({
       error: { message, status } 
    })
    
})

module.exports = app