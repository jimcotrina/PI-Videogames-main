import React from 'react';
import { Link } from 'react-router-dom';
import './css/LandingPage.css';

export default function LandingPage() {
	return (
		<div class='landing-page'>
			<Link to='/home'>
				<div class='title-text'>
					<h1 className='animated-shadow'>Henry Videogames</h1>
				</div>
			</Link>
		</div>
	);
}
