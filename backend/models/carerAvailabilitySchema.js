const mongoose = require("mongoose");

const carerAvailabilitySchema = new mongoose.Schema({
    carer: {
        type: Number,
        required: true
    },
    dayType: {
        type: String,
        required: true
    },
    daysOfWeek: {
        type: String,
        required: true
    },
    every: {
        type: String,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    }
})

// Once we have foreignKey of carer model then we'll use this schema.

// carer: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'carer'
// }

const Availability = mongoose.model("AVAILABILITY", carerAvailabilitySchema);

module.exports = Availability;