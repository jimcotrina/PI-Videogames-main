import React from 'react';
import { Link } from 'react-router-dom';
import SeachBar from './SearchBar';
import './css/NavBar.css';

export default function NavBar() {
	return (
		<div className='header'>
			<div className='title-home'>
				<h1>HENRY VIDEOGAMES</h1>
			</div>
			<div className='createGame'>
				<Link to='/videogame'>
					<a>CREATE VIDEOGAME</a>
				</Link>
			</div>
			<SeachBar />
		</div>
	);
}
