const axios = require('axios').default
const { Activity, Country } = require('../db')



async function getActivity(req,res) {
    await Activity.findAll()
return res.json(await Activity.findAll())
}


async function addActivity(req, res) {
    const { Countries, name, difficulty, duration, season } = req.body;
    if (!req.body) return res.Status(500)
    
        const createActivity = await Activity.findOrCreate({
            where: {
                name: name,
                difficulty: difficulty,
                duration: duration,
                season: season,
            }
        });

        Countries.forEach(async (cName) => {
            if(Country.findOrCreate({where: {name: cName}})){

                let country = await Country.findOne({
                    where: { name: cName}
                })
                await createActivity[0].addCountry(country)
            }
        });
        
        return res.json("Activity Created succesfully")
   
}


module.exports = {
    addActivity,
    getActivity
}