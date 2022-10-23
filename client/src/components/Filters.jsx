import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllGames, orderByName, orderByRating, filterGenres } from '../redux/actions';
import './css/Filters.css';

export default function Filters() {
	const dispatch = useDispatch();
	const [currentPage, setCurrentPage] = useState(1);
	const [orden, setOrden] = useState('');

	function handleClick(e) {
		e.preventDefault();
		dispatch(getAllGames());
	}
	function handleSort(e) {
		e.preventDefault();
		dispatch(orderByName(e.target.value));
		setCurrentPage(1);
		setOrden(`${e.target.value}`);
	}

	function handleRating(e) {
		e.preventDefault();
		dispatch(orderByRating(e.target.value));
		setCurrentPage(1);
		setOrden(e.target.value);
	}

	function handleGenres(e) {
		e.preventDefault();
		dispatch(filterGenres(e.target.value));
		setOrden(e.target.value);
		setCurrentPage(1);
	}
	return (
		<div className='filters'>
			<button
				onClick={(e) => {
					handleClick(e);
				}}
			>
				RELOAD ALL VIDEOGAMES
			</button>
			<select onChange={(e) => handleSort(e)}>
				<option value='' disabled selected hidden>
					Sort by name
				</option>
				<option value='A-Z'>A to Z</option>
				<option value='Z-A'>Z to A</option>
			</select>
			<select onChange={(e) => handleRating(e)}>
				<option value='' disabled selected hidden>
					Rating
				</option>
				<option value='L-H'>Low</option>
				<option value='H-L'>High</option>
			</select>
			<select onChange={(e) => handleGenres(e)}>
				<option value='All genres'>All Genres</option>
				<option value='Action'>Action</option>
				<option value='Adventure'>Adventure</option>
			</select>
		</div>
	);
}
