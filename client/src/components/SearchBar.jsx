import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { getNameGames, getAllGames } from '../redux/actions';

export default function SeachBar({ setCurrentPage }) {
	const history = useHistory();
	const dispatch = useDispatch();
	const [name, setName] = useState('');

	useEffect(() => {
		dispatch(getAllGames);
	}, []);

	function handleInputChangue(e) {
		e.preventDefault();
		setName(e.target.value);
	}

	function handleSubmit(e) {
		e.preventDefault();
		dispatch(getNameGames(name));
	}

	/* const handleInputChangue = (e) => {
		e.preventDefault();
		setName(e.target.value);
		dispatch(getNameGames(e.target.value));
		setCurrentPage(1);
		history.push('/home');
	}; */

	/* 	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(getNameGames(name));
		setName('');
		setCurrentPage(1);
	}; */

	return (
		<div>
			<input
				type='text'
				placeholder='Search...'
				onChange={(e) => handleInputChangue(e)}
			/>
			<button type='submit' onClick={(e) => handleSubmit(e)}>
				SEARCH
			</button>
		</div>
	);
}
