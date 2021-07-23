const { Country, Activity } = require('../db')
const axios = require('axios').default
const { Op } = require('sequelize')

async function getAllCountries(req, res) {
    var { name } = req.query;
    if (name !== undefined) {
        let search = await Country.findAll({
            where: {
                name: { [Op.iLike]: `%${name}%` }
            },
            include: [Activity]
        })
        if (search.length !== 0) return res.status(200).json(await search)
        return res.sendStatus(404).json({ error: "Pais no encontrado" })
    } else {
        try {
            const Countries = await axios.get('https://restcountries.eu/rest/v2/all')
            Countries.data.map(async c => {
                await Country.findOrCreate({
                    where: {
                        name: c.name,
                        id: c.alpha3Code,
                        image: c.flag,
                        continent: c.region,
                        capital: c.capital,
                        subregion: c.subregion,
                        area: c.area,
                        population: c.population
                    }
                });
            });
            let result =await Country.findAll({ include: Activity })
            return res.status(200).json(await result)
        } catch (error) {
            console.log(error)
        }
    }

}

async function getById(req, res) {
    try {
        let { id } = req.params
        const oneCountry = await Country.findOne({
            where: {
                id: id
            },
            include: [Activity]
        })
        return res.status(201).json(oneCountry)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getAllCountries,
    getById,

}