import React from 'react';
import './css/Card.css';

export default function Card({ image, name, rating, genres }) {
	return (
		<div className='card'>
			<img className='imageCard' src={image} alt='img not found' />
			<div className='card-details'>
				<h3>{name}</h3>
				<h4>Rating: {rating}</h4>
				<h4>Genres: {genres.join(' - ')}</h4>
			</div>
		</div>
	);
}
