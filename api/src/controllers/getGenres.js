const axios = require('axios');
require('dotenv').config();
const { Genre } = require('../db');
const { API_KEY } = process.env;

const getGenres = async () => {
	try {
		const genres = await Genre.findAll();
		if (!genres.length) {
			const genresData = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
			await Genre.bulkCreate(genresData.data.results);
		}
	} catch (error) {
		console.log({ error: error.message });
	}
};

module.exports = getGenres;
