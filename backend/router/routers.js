const express = require("express");
const router = express.Router();

// connect DB and schema
require('../db/connection')
const Availability = require('../models/carerAvailabilitySchema');

router.get('/', (req, res) => {
    res.send("This is home page");
})

router.get('/availabilities/:carer', async (req, res) => {
    let getcarer = { carer: req.params.carer }
    let aa = await Availability.find(getcarer)
    res.json(aa)
})

router.post('/create', async (req, res) => {
    const { carer, dayType, daysOfWeek, every, startTime, endTime } = req.body;

    if(!carer || !dayType || !daysOfWeek || !every || !startTime || !endTime){
        return res.status(422).json("Please! Fill all the field.")
    }

    try {
        const availability = new Availability(req.body)
        await availability.save();
        res.status(201).json({message:"Availability created successfully."});
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;