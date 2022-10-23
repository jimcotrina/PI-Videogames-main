require('dotenv').config();
const axios = require('axios');
const { API_KEY } = process.env;

const getDetailGame = async (idGame) => {
	let gamesApi = await axios.get(
		`https://api.rawg.io/api/games/${idGame}?key=${API_KEY}`
	);

	const {
		id,
		name,
		background_image: image,
		rating,
		released,
		description_raw: description,
		platforms,
		genres,
	} = gamesApi.data;

	const game = {
		id,
		name,
		image,
		rating,
		released,
		description,
		platforms: platforms ? platforms.map((e) => e.platform.name) : null,
		genres: genres.map((e) => e.name),
		createdInDb: false,
	};

	return game;
};

module.exports = getDetailGame;
