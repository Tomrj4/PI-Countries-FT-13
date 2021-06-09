const { Actividad, Country } = require('../db')
const {countries} = require('sequelize')
//add

async function addActivity(req, res, next) {
    const act = req.body;
    if (!act) return res.Status(500)
    try {
        const createActivity = await Actividad.create(act);
        // return res.send(createActivity)
        return res.status(200)(createActivity)
    } catch (error) {
        next(error)
    }
}


module.exports = {
    addActivity
}