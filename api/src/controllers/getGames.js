require('dotenv').config();
const axios = require('axios');
const { Videogame, Genre } = require('../db');
const { API_KEY } = process.env;

const getApiInfo = async () => {
	try {
		const apiGames = [];
		for (let i = 1; i <= 5; i++) {
			let api = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`);
			api.data.results.map((e) => {
				apiGames.push({
					id: e.id,
					name: e.name,
					image: e.background_image,
					rating: e.rating,
					genres: e.genres.map((e) => e.name),
					createdInDb: false,
				});
			});
		}
		return apiGames;
	} catch (error) {
		console.log({ error: error.message });
	}
};

const getInfoDB = async () => {
	try {
		const dbData = await Videogame.findAll({
			include: {
				model: Genre,
				attribute: ['name'],
				through: {
					attributes: [],
				},
			},
		});
		const dBGames = dbData.map((g) => {
			let gameDB = {
				id: g.id,
				name: g.name[0].toUpperCase() + g.name.substring(1),
				image: g.image,
				rating: g.rating,
				genres: g.genres.map((genre) => genre.name),
				createdInDb: g.createdInDb,
			};
			return gameDB;
		});
		return dBGames;
	} catch (error) {
		console.log({ error: error.message });
	}
};

const getAllGames = async () => {
	try {
		const apiInfo = await getApiInfo();
		const dbInfo = await getInfoDB();
		const infoTotal = [...apiInfo, ...dbInfo];
		return infoTotal;
	} catch (error) {
		console.log({ error: error.message });
	}
};

module.exports = getAllGames;
