import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getNameGames } from '../redux/actions';

export default function SeachBar() {
	const dispatch = useDispatch();
	const [name, setName] = useState('');

	function handleInputChangue(e) {
		e.preventDefault();
		setName(e.target.value);
	}

	function handleSubmit(e) {
		e.preventDefault();
		dispatch(getNameGames(name));
	}

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
