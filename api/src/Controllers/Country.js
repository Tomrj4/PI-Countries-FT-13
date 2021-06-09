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

    try {
        
        const Paises= await axios.get('https://restcountries.eu/rest/v2/all')
               
                // for(let i= 0; i< Paises.data.length; i++) {
                    Paises.data.forEach(async c => {
                        
                        await Country.findOrCreate({
                             where: {
                                 name: c.name,
                                 id: c.alpha3Code,
                                 image: c.flag,
                                 continente: c.region,
                                 capital: c.capital,
                                 subregion: c.subregion,
                                 area: c.area,
                                 poblacion: c.population
                             }
                         })
                    });
                
                    
                    
                // }
                return res.json(await Country.findAll({include: Actividad}))
                
                //Country.findAll().then(c => res.json(c)) //REPASAR ESTA LINEA
                
    } catch (error) {
        console.log(error)
    }        
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