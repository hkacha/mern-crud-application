const sql = require('./db');

const tableName = process.env.CARER_AVAILABILITIES;

const Availability = function(data) {
    this.carer_id = data.carer_id;
    this.day_type = data.day_type;
    this.day_of_week = data.day_of_week;
    this.every = data.every;
    this.start_time = data.start_time;
    this.end_time = data.end_time;
};

Availability.create = (newRecord, result) => {
    sql.query(`INSERT INTO ${tableName} SET ? `, newRecord, (err, res) => {
        if(err){
            result(err, null);
            return;
        }

        result(null, {id: res.insertId, ...newRecord });
    });
};

Availability.findByCarerId = (carerId, result) => {
    sql.query(`SELECT * FROM ${tableName} WHERE carer_id = ${carerId}`, (err, res) => {
        if(err){
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, res);
            return;
        }

        result({ kind: 'not_null'}, null)
    });
};

Availability.updateById = (id, record, result) => {
    sql.query("UPDATE carer_availabilities SET carer_id = ?, day_type = ?, day_of_week = ?, every = ?, start_time = ?, end_time = ? WHERE id = ?", [record.carer_id, record.day_type, record.day_of_week, record.every, record.start_time, record.end_time, id],
        (err, res) => {

            if(err){
                result(err, null);
                return;
            }
            
            if(res.affectedRows === 0){
                result({kind: 'not_found'}, null)
                return;
            }

            result(null, {id: id, ...record})
        }
    )
}

Availability.remove = (id, result) => {
    sql.query(`DELETE FROM ${tableName} WHERE id = ${id}`, (err, res) => {
        if(err){
            result(err, null);
            return;
        }

        if(res.affectedRows === 0){
            result({kind: 'not_found'}, null)
            return;
        }

        result(null, res)
    })
}

module.exports = Availability;