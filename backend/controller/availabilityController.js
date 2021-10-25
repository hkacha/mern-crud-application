const Availability = require("../model/availabilityModel");

exports.create = (req, res) => {
    if(!req.body){
        res.status(400).send({ message: "Content can not be empty."})
    }

    const record = new Availability({
        carer_id: req.body.carer_id,
        day_type: req.body.day_type,
        day_of_week: req.body.day_of_week,
        every: req.body.every,
        start_time: req.body.start_time,
        end_time: req.body.end_time
    });

    Availability.create(record, (err, data) => {
        if(err){
            res.status(500).send({
                message: err.message || "Some error occurred while create the record."
            })
        } else {
            res.send(data);
        }
    });
};

exports.findCarerByCId = (req, res) => {
    const objId = req.params.id;

    Availability.findByCarerId(objId, (err, data) => {
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `Record not found with ${objId} id.`
                })
            } else {
                res.status(500).send({
                    message: `Records are not available for ${objId} id.`
                })
            }
        } else {
            res.send(data)
        }
    });
};

exports.update = (req, res) => {
    const objId = req.params.id;
    if(!req.body){
        res.status(400).send({ message: "Content can not be empty."})
    }

    Availability.updateById(objId, new Availability(req.body), (err, data) => {
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `Record not found with ${objId} id.`
                });
            } else {
                res.status(500).send({
                    message: `Error updating with ${objId} id.`
                });
            }
        } else {
            res.send(data);
        }
    });
};

exports.delete = (req, res) => {
    const objId = req.params.id;
    Availability.remove(objId, (err, data) => {
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `Record not found with ${objId} id.`
                })
            } else {
                res.status(500).send({
                    message: `Could not delete with ${objId} id.`
                })
            }
        } else {
            res.send({
                message: `Record delete successfully.`
            })
        }
    });
};