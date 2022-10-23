const { Router } = require('express');
const getAllGames = require('../controllers/getGames');
const { Videogame, Genre } = require('../db');

const router = Router();

router.get('/', async (req, res) => {
	try {
		const { name } = req.query;
		let gamesTotal = await getAllGames();
		//query name
		if (name) {
			let gameName = gamesTotal.filter((e) =>
				e.name.toLowerCase().includes(name.toLowerCase())
			);
			gameName.length
				? res.status(200).send(gameName)
				: res.status(404).send('Game not found!!');
		} else {
			res.status(200).send(gamesTotal);
		}
	} catch (error) {
		res.status(400).send({ error: error.message });
	}
});

router.post('/', async (req, res) => {
	try {
		let { name, image, released, rating, platforms, description, createdInDb, genres } =
			req.body;
		let gameCreated = await Videogame.create({
			name,
			image,
			released,
			rating,
			platforms,
			description,
			createdInDb,
		});
		let genresDb = await Genre.findAll({
			where: { name: genres },
		});
		gameCreated.addGenre(genresDb);
		res.status(201).send('game created successfully');
	} catch (error) {
		res.status(400).send({ error: error.message });
	}
});

module.exports = router;


