import axios from 'axios';

export const GET_ALL_GAMES = 'GET_ALL_GAMES';
export const GET_NAME_GAMES = 'GET_NAME_GAMES';
export const GET_DETAILS = 'GET_DETAILS';
export const PAGE_DETAIL = 'PAGE_DETAIL';
export const GET_GENRES = 'GET_GENRES';
export const POST_GAME = 'POST_GAME';
export const ORDER_BY_NAME = 'ORDER_BY_NAME';
export const ORDER_BY_RATING = 'ORDER_BY_RATING';
export const FILTER_GENRES = 'FILTER_GENRES';
export const ERROR = 'ERROR';

export const getAllGames = () => {
	return async function (dispatch) {
		try {
			const response = await axios.get('http://localhost:3001/videogames', {});
			const games = response.data;
			dispatch({
				type: GET_ALL_GAMES,
				payload: games,
			});
		} catch (error) {
			dispatch({
				type: ERROR,
				payload: error,
			});
		}
	};
};

export const getNameGames = (name) => {
	return async function (dispatch) {
		try {
			const response = await axios.get('http://localhost:3001/videogames?name=' + name);
			const games = response.data;
			dispatch({
				type: GET_NAME_GAMES,
				payload: games,
			});
		} catch (error) {
			dispatch({
				type: ERROR,
				payload: error,
			});
		}
	};
};

export const getDetails = (id) => {
	return async function (dispatch) {
		try {
			const response = await axios.get('http://localhost:3001/videogame/' + id);
			const game = response.data;
			dispatch({
				type: GET_DETAILS,
				payload: game,
			});
		} catch (error) {
			dispatch({
				type: ERROR,
				payload: error,
			});
		}
	};
};

export const pageDetail = (data = {}) => {
	return {
		type: PAGE_DETAIL,
		payload: data,
	};
};

export const getGenres = () => {
	return async function (dispatch) {
		try {
			const response = await axios.get('http://localhost:3001/genres', {});
			const genres = response.data;
			dispatch({
				type: GET_GENRES,
				payload: genres,
			});
		} catch (error) {
			dispatch({
				type: ERROR,
				payload: error,
			});
		}
	};
};

export const postGame = (payload) => {
	return async function (dispatch) {
		try {
			const response = await axios.post('http://localhost:3001/videogames', payload);
			console.log({ response });
			dispatch({
				type: POST_GAME,
			});
		} catch (error) {
			dispatch({
				type: ERROR,
				payload: error,
			});
		}
	};
};

export const orderByName = (payload) => {
	return {
		type: ORDER_BY_NAME,
		payload,
	};
};

export const orderByRating = (payload) => {
	return {
		type: ORDER_BY_RATING,
		payload,
	};
};

export const filterGenres = (payload) => {
	return {
		type: FILTER_GENRES,
		payload,
	};
};
