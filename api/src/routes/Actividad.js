const {Router} = require('express')
const {addActivity} = require ('../Controllers/Actividad')
const router = Router()

router.post('/', addActivity)

module.exports = router