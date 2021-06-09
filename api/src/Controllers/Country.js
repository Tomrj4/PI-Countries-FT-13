const { Country, Actividad } = require('../db')
const axios = require('axios').default
const { Op } = require('sequelize')

async function getAllCountries(req, res) {
    var { name } = req.query;
    console.log(name)
    if (name !== undefined) {
           let search = await Country.findAll({
                    where: { name: { [Op.iLike]: `%${name}%` } }
                    ,
                    include: [Actividad]
                })
            return res.status(200).json(await search)
        } else {

            const Paises= await axios.get('https://restcountries.eu/rest/v2/all')
           
            for(let i= 0; i< Paises.data.length; i++) {
              await Country.findOrCreate({
                    where: {
                        name: Paises.data[i].name,
                        id: Paises.data[i].alpha3Code,
                        image: Paises.data[i].flag,
                        continente: Paises.data[i].region,
                        capital: Paises.data[i].capital,
                        subregion: Paises.data[i].subregion,
                        area: Paises.data[i].area,
                        poblacion: Paises.data[i].population
                    }
                })
            }
            Country.findAll().then(c => res.json(c)) //REPASAR ESTA LINEA
            
        }
       
}

async function getById(req, res) {
    let { id } = req.params
    const oneCountry = await Country.findOne({
        where: {
            id: id
        },
        include: [Actividad]
    })
 
    return res.status(201).json(oneCountry)
}

module.exports = {
    getAllCountries,
    getById,

}