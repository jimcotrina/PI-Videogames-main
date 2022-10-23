const { Router } = require('express');

const router = Router();

router.get('', async (req, res) => {
	res.status(404).send(`<h1> PAGE NOT FOUND!!</h1>`);
});

module.exports = router;
