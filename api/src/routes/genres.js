const { Router } = require('express');
const { Genre } = require('../db');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/', async (req, res) => {
	try {
		const allGenres = await Genre.findAll(); //getGenres DB
		res.status(200).json(allGenres);
	} catch (error) {
		res.status(400).send({ error: error.message });
	}
});

module.exports = router;
