import React from 'react';
import { Link } from 'react-router-dom';
import './css/Title.css';

export default function Title() {
	return (
		<div className='title-global'>
			<Link to={'/home'}>
				<h1>HENRY VIDEOGAMES</h1>
			</Link>
		</div>
	);
}
