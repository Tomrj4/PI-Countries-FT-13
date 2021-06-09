const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const CountryRoute = require('./Country')
const ActividadRoute = require('./Actividad')
const router = Router();



// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/countries', CountryRoute);
router.use('/activity', ActividadRoute)
module.exports = router;
