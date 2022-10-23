import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllGames } from '../redux/actions';
import { Link } from 'react-router-dom';
import Card from './Card';
import NavBar from './NavBar';
import Filters from './Filters';
import Paginate from './Paginate';
import Loader from './Loader';
import './css/Home.css';

export default function Home() {
	const dispatch = useDispatch();
	const allGames = useSelector((state) => state.games);

	const [currentPage, setCurrentPage] = useState(1);
	const [gamesPerPage, setGamesPerPage] = useState(15);
	const indexOfLastGame = currentPage * gamesPerPage; //15
	const indexOfFirtsGame = indexOfLastGame - gamesPerPage; //0
	const currentGames = allGames.slice(indexOfFirtsGame, indexOfLastGame);

	const pages = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	useEffect(() => {
		dispatch(getAllGames());
	}, [dispatch]);

	return (
		<div className='all'>
			<div className='header-bar'>
				<NavBar />
				<Filters />
				<Paginate
					gamesPerPage={gamesPerPage}
					allGames={allGames.length}
					pages={pages}
				/>{' '}
			</div>
			<div className='grid container-card'>
				{currentGames.length ? (
					currentGames?.map((el) => {
						return (
							<div>
								<Link to={'/detail/' + el.id}>
									<Card
										key={el.id}
										name={el.name}
										image={el.image}
										rating={el.rating}
										genres={el.genres}
									/>
								</Link>
							</div>
						);
					})
				) : (
					<div className='loader-home'>
						<Loader />
					</div>
				)}
			</div>
			<footer>
				<div className='copyright'>
					&copy; 2022 Diseño y desarrollo por{' '}
					<a href='https://github.com/jimcotrina' target='_blank'>
						Jimmy Cotrina C.
					</a>
				</div>
			</footer>
		</div>
	);
}
