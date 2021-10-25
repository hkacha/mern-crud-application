module.exports = app => {
    const availabilities = require("../controller/availabilityController");

    app.post("/availabilities/create", availabilities.create);

    app.get("/availabilities/carer/:id", availabilities.findCarerByCId);

    app.put("/availabilities/update/:id", availabilities.update);

    app.delete("/availabilities/delete/:id", availabilities.delete);
}