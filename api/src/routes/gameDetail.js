const { Router } = require('express');
const getDetailGame = require('../controllers/getDetailGame');
const getInfoDB = require('../controllers/getGames');

const router = Router();

router.get('/:id', async (req, res) => {
	try {
		const { id } = req.params;

		if (id) {
			const dbGames = await getInfoDB();
			const idGameDB = dbGames.find((game) => game.id === id);
			if (idGameDB) return res.status(200).send(idGameDB);

			const gameApi = await getDetailGame(id);
			return res.status(200).send(gameApi);
		}
	} catch (error) {
		res.status(404).send('Game not found!!');
	}
});

module.exports = router;
