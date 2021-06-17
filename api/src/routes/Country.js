const { Router } = require('express')
const { getAllCountries, getById} = require('../Controllers/Country')

const router = Router()


router.get('/', getAllCountries);
router.get('/:id',getById);

module.exports = router