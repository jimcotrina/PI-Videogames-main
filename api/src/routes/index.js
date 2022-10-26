const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
const games = require('./games');
const gameDetail = require('./gameDetail');
const genres = require('./genres');
const error = require('./error');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/videogames', games);
router.use('/videogame', gameDetail);
router.use('/genres', genres);
router.use('*', error);

module.exports = router;
