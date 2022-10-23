import {
	GET_ALL_GAMES,
	GET_NAME_GAMES,
	GET_DETAILS,
	PAGE_DETAIL,
	GET_GENRES,
	POST_GAME,
	ORDER_BY_NAME,
	ORDER_BY_RATING,
	FILTER_GENRES,
	ERROR,
} from './actions';

const initialState = {
	games: [],
	allGames: [],
	error: {},
	genres: [],
	detail: [],
};

export default function rootReducer(state = initialState, action) {
	switch (action.type) {
		case GET_ALL_GAMES:
			return {
				...state,
				games: action.payload,
				allGames: action.payload,
			};
		case ERROR:
			return {
				...state,
				error: action.payload,
			};
		case GET_NAME_GAMES:
			return {
				...state,
				games: action.payload,
			};
		case GET_GENRES:
			return {
				...state,
				genres: action.payload,
			};
		case GET_DETAILS:
			return {
				...state,
				detail: action.payload,
			};
		case POST_GAME:
			return {
				...state,
			};
		case FILTER_GENRES:
			const filterGames = state.allGames;
			const filterGenres = filterGames.filter((e) => {
				return e.genres?.includes(action.payload);
			});
			return {
				...state,
				games: action.payload === 'All genres' ? filterGames : filterGenres,
			};
		case ORDER_BY_NAME:
			let sortedArr =
				action.payload === 'A-Z'
					? state.games.sort(function (a, b) {
							if (a.name > b.name) {
								return 1;
							}
							if (b.name > a.name) {
								return -1;
							}
							return 0;
					  })
					: state.games.sort(function (a, b) {
							if (a.name > b.name) {
								return -1;
							}
							if (b.name > a.name) {
								return 1;
							}
							return 0;
					  });
			return {
				...state,
				games: sortedArr,
			};
		case PAGE_DETAIL:
			return {
				...state,
				detail: action.payload,
			};

		default:
			return { ...state };
	}
}
