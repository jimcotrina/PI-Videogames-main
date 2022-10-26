import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postGame, getGenres } from '../redux/actions';
import './css/GameCreateForm.css';
import Title from './Title';
import Footer from './Footer';

export default function GameCreateForm() {
	const dispatch = useDispatch();
	const history = useHistory();
	const genres = useSelector((state) => state.genres);
	const [errors, setErrors] = useState({});

	const [input, setInput] = useState({
		name: '',
		description: '',
		image: '',
		released: '',
		rating: 0,
		platforms: [],
		genres: [],
	});

	useEffect(() => {
		dispatch(getGenres());
	}, []);

	const validate = (input) => {
		const errors = {};
		if (!input.name.length) errors.name = 'Name is required!!';
		if (!input.description.length) errors.description = 'Description is required!!';
		if (!input.rating.length) errors.rating = 'rating is required!!';
		if (!input.genres[0]) {
			errors.genres = 'Minimun one Genre is required ';
		}
		return errors;
	};

	const handleChangue = (e) => {
		setInput({
			...input,
			[e.target.name]: e.target.value,
		});
		/* 	setErrors(
			validate({
				...input,
				[e.target.name]: e.target.value,
			})
		); */
		console.log(input);
	};

	/* 	const handlePlatforms = (e) => {
		setInput({
			...input,
			platforms: [e.target.value],
		});
	}; */

	const handleSelectGenres = (e) => {
		if (!input.genres.includes(e.target.value)) {
			setInput({
				...input,
				genres: [...input.genres, e.target.value],
			});
			setErrors(
				validate({
					...input,
					genres: [...input.genres, e.target.value],
				})
			);
		} else {
			setInput({
				...input,
			});
		}
	};

	const handleDeleteGenres = (e) => {
		setInput({
			...input,
			genres: input.genres.filter((param) => param !== e),
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const newGame = {
			name: input.name,
			description: input.description,
			image: input.image,
			released: input.released,
			rating: input.rating,
			platforms: input.platforms.join(', '),
			genres: input.genres.join(', '),
		};
		dispatch(postGame(newGame));
		setInput({
			name: '',
			description: '',
			image: '',
			released: '',
			rating: 0,
			platforms: [],
			genres: [],
		});
		alert('SUCCESSFULLY CREATED VIDEOGAME!!');
		history.push('/home');
	};

	return (
		<div>
			<Title />
			<div className='div-container-Form'>
				<form onSubmit={(e) => handleSubmit(e)}>
					<h1>Videogame Form</h1>
					<div className='div-form'>
						<label>Videogame Name: </label>
						<input
							type='text'
							placeholder='videogame'
							value={input.name}
							name='name'
							onChange={(e) => handleChangue(e)}
						/>
						{errors.name && <p className='error'>{errors.name}</p>}
					</div>
					<div className='div-form'>
						<label>Description: </label>
						<textarea
							type='text'
							placeholder='description'
							value={input.description}
							name='description'
							onChange={(e) => handleChangue(e)}
						/>
						{errors.description && <p className='error'>{errors.description}</p>}
					</div>
					<div className='div-form'>
						<label>Image: </label>
						<input
							type='url'
							placeholder='https://example.com'
							value={input.image}
							name='image'
							onChange={(e) => handleChangue(e)}
						/>
						{errors.image && <p className='error'>{errors.image}</p>}
					</div>
					<div className='div-form'>
						<label>Released: </label>
						<input
							placeholder='released'
							type='date'
							min='1970-01-01'
							max='2026-12-30'
							value={input.released}
							name='released'
							onChange={(e) => handleChangue(e)}
						/>
						{errors.released && <p className='error'>{errors.released}</p>}
					</div>
					<div className='div-form'>
						<label>Rating: </label>
						<input
							type='number'
							step='0.1'
							min='0'
							max='5'
							name='rating'
							value={input.rating}
							onChange={(e) => handleChangue(e)}
						/>
						{errors.rating && <p className='error'>{errors.rating}</p>}
					</div>
					<div className='select-platforms'>
						<label>Platforms: </label>
						<input
							type='text'
							placeholder='platforms'
							value={input.platforms}
							name='platforms'
							onChange={(e) => handleChangue(e)}
						/>
						{errors.platforms && <p className='error'>{errors.platforms}</p>}
					</div>
					<div className='select-genres'>
						<label>Genres: </label>
						<select onChange={(e) => handleSelectGenres(e)}>
							<option value='all' disabled selected hidden>
								All
							</option>
							{genres?.map((e) => {
								return (
									<option key={e.id} value={e.name}>
										{e.name}
									</option>
								);
							})}
						</select>
						{errors.genres && <span>{errors.genres}</span>}
						<div>
							{input.genres?.map((e) => {
								return (
									<>
										<div>{e}</div>
										<button onClick={() => handleDeleteGenres(e)}>X</button>
									</>
								);
							})}{' '}
						</div>
					</div>
					{Object.keys(errors).length ? (
						<div>
							<input type='submit' disabled name='Send' />
						</div>
					) : (
						<div>
							<input type='submit' name='Send' />
						</div>
					)}
				</form>
			</div>
			<Footer />
		</div>
	);
}
