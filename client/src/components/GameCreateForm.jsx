import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { postGame, getGenres } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import './css/Form.css';

export default function GameCreateForm() {
	const dispatch = useDispatch();
	const history = useHistory();
	const genres = useSelector((store) => store.genres);
	const [errors, setErrors] = useState({});

	const [input, setInput] = useState({
		name: '',
		description: '',
		rating: 0,
		image: '',
		genres: [],
	});

	const validate = (input) => {
		const errors = {};
		if (!input.name.length) errors.name = 'THE NAME IS MISSING!!';
		if (!input.rating.length) errors.rating = 'THE NAME IS MISSING!!';
		if (!input.description.length) errors.description = 'THE NAME IS MISSING!!';
		return errors;
	};

	const handleChangue = (e) => {
		setInput({
			...input,
			[e.target.name]: e.target.value,
		});
		setErrors(
			validate({
				...input,
				[e.target.name]: e.target.value,
			})
		);
		console.log(input);
	};

	function handlePlatforms(e) {
		setInput({
			...input,
			platforms: [e.target.value],
		});
	}

	const handleSelect = (e) => {
		setInput({
			...input,
			genres: [...input.genres, e.target.value],
		});
		if (input.genres) {
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		dispatch(postGame(input));
		console.log({ ...input });
		alert('SUCCESSFULLY CREATED GAME!!');
		setInput({
			name: '',
			image: '',
			description: '',
			rating: 0,
			genres: [],
		});
		history.push('/home');
	};

	useEffect(() => {
		dispatch(getGenres());
	}, []);

	return (
		<div>
			<Link to='/home'>
				<button>BACK</button>
			</Link>
			<h1>CREATE GAME</h1>
			<div className='div-container'>
				<form onSubmit={(e) => handleSubmit(e)}>
					<div className='input-div'>
						<label className='title-form'>TITLE:</label>
						<input
							className='input-form'
							placeholder='game name'
							type='text'
							value={input.name}
							name='name'
							onChange={(e) => handleChangue(e)}
						/>
						{errors.name && <p className='error'>{errors.name}</p>}
					</div>
					<div className='input-div'>
						<label className='title-form'>RATING:</label>
						<h4>{input.rating}</h4>
						<input
							className='input-form'
							type='range'
							min='0'
							max='100'
							name='rating'
							onChange={(e) => handleChangue(e)}
							value={input.rating}
						/>
						{errors.rating && <p className='error'>{errors.rating}</p>}
					</div>
					<div className='input-div'>
						<label className='title-form'>DESCRIPTION:</label>
						<textarea
							className='input-form'
							placeholder='description'
							type='text'
							value={input.description}
							name='description'
							onChange={(e) => handleChangue(e)}
						/>
						{errors.description && <p className='error'>{errors.description}</p>}
					</div>
					<div className='input-div'>
						<label className='title-form'>PLATFORMS:</label>
						<textarea
							className='input-form'
							placeholder='platforms'
							type='text'
							value={input.platforms}
							name='platforms'
							onChange={(e) => handlePlatforms(e)}
						/>
						{errors.steps && <p className='error'>{errors.steps}</p>}
					</div>
					<div className='input-div'>
						<div>
							<label className='title-form'>Genres:</label>
							<select onChange={(e) => handleSelect(e)}>
								{genres.map((d) => (
									<option value={d.name}>{d.name}</option>
								))}
							</select>
						</div>
						<div>
							<ul>
								<li>{input.genres.map((el) => el + ' ,')}</li>
							</ul>
						</div>
					</div>
					{<button type='submit'>CREATE</button>}
				</form>
			</div>
		</div>
	);
}
