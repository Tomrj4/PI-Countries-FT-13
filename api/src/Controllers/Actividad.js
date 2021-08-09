const { Activity, Country } = require('../db')



async function getActivity(req, res) {
    try {
        await Activity.findAll()
        return res.json(await Activity.findAll())
    } catch (error) {
        console.log(error)
    }
}


async function addActivity(req, res) {
    const { Countries, name, difficulty, duration, season } = req.body;
    try {
        if (!req.body) return res.status(500)
        const createActivity = await Activity.findOrCreate({
            where: {
                name: name,
                difficulty: difficulty,
                duration: duration,
                season: season,
            }
        });
        console.log(createActivity)
        Countries.forEach(async (cName) => {
            let country = await Country.findAll({
                where: { name: cName.label }
            })
            await createActivity[0].addCountry(country)
        });

        return res.json("Activity Created succesfully")
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    addActivity,
    getActivity
}