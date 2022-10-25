import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	getAllGames,
	getGenres,
	orderByName,
	orderByRating,
	filterGenres,
	filterCreated,
} from '../redux/actions';
import './css/Filters.css';

export default function Filters({ setCurrentPage, setOrden }) {
	const dispatch = useDispatch();
	const allGenres = useSelector((state) => state.genres);

	useEffect(() => {
		dispatch(getGenres());
	}, [dispatch]);

	const handleClick = (e) => {
		e.preventDefault();
		dispatch(getAllGames());
	};

	const handleSort = (e) => {
		e.preventDefault();
		e.target.value === 'all'
			? dispatch(orderByName) && setOrden(`ABC ${e.target.value}`)
			: dispatch(orderByName(e.target.value));
		setOrden(`ABC ${e.target.value}`);
		setCurrentPage(1);
	};

	const handleRating = (e) => {
		e.preventDefault();
		e.target.value === 'all'
			? dispatch(getAllGames) && setOrden(`Rating ${e.target.value}`)
			: dispatch(orderByRating(e.target.value));
		setOrden(`Rating ${e.target.value}`);
		setCurrentPage(1);
	};

	const handleGenres = (e) => {
		e.preventDefault();
		dispatch(filterGenres(e.target.value));
		setOrden(e.target.value);
		setCurrentPage(1);
	};

	const handleFilterCreated = (e) => {
		e.preventDefault();
		dispatch(filterCreated(e.target.value));
		setCurrentPage(1);
	};

	return (
		<div className='filters'>
			<button
				onClick={(e) => {
					handleClick(e);
				}}
			>
				RELOAD ALL VIDEOGAMES
			</button>
			<select onChange={(e) => handleFilterCreated(e)}>
				<option value='' disabled selected hidden>
					Storage
				</option>
				<option value='lb'>Library</option>
				<option value='db'>Created in DB</option>
			</select>
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
				<option value='' disabled selected hidden>
					Genres
				</option>
				{allGenres?.map((e) => {
					return (
						<option key={e.id} value={e.name}>
							{e.name}
						</option>
					);
				})}
			</select>
		</div>
	);
}
