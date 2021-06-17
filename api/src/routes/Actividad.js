const {Router} = require('express')
const {addActivity, getActivity} = require ('../Controllers/Actividad')
const router = Router()

router.post('/', addActivity)
router.get('/',getActivity)
module.exports = router