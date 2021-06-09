const { Router } = require('express')
const { getAllCountries, getById, getByName} = require('../Controllers/Country')

const router = Router()


router.get('/', getAllCountries);
router.get('/:id',getById);

// router.get('/search',getByName);
module.exports = router