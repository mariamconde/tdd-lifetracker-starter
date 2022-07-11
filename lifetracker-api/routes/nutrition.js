const express = require("express")
const router = express.Router()
const Nutrition = require("../models/nutrition")
const security = require("../middleware/security")
// const permissions = require("../middleware/permissions")

router.get("/", security.requireAuthenticatedUser, async (req, res, next) => {
    // get all nutrition for specific user
    try{
        const {email} = res.locals.user
        console.log(email)
        const nutritions = await Nutrition.listNutritionForUser(email)
        return res.status(200).json({nutritions})
    }catch(err){
        next(err)
    }
})


router.post("/create", security.requireAuthenticatedUser, async (req, res, next) => {
    console.log(req.body)
    try{
        const {email} = res.locals.user
        const nutrition = await Nutrition.createNutrition(req.body, email)
        return res.status(201).json({nutrition})
    }catch(err){
        next(err)
    }
})

module.exports = router