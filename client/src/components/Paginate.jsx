import React from 'react';
import './css/Paginate.css';

export default function Paginate({ gamesPerPage, allGames, pages }) {
	const pageNumbers = [];

	for (let i = 0; i <= Math.ceil(allGames / gamesPerPage) - 1; i++) {
		pageNumbers.push(i + 1);
	}

	return (
		<nav className='pages'>
			<ul className='paginate'>
				{pageNumbers &&
					pageNumbers.map((number) => (
						<li className='number' key={number}>
							<a onClick={() => pages(number)}>{number}</a>
						</li>
					))}
			</ul>
		</nav>
	);
}
