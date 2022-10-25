import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetails, pageDetail } from '../redux/actions';
import Loader from './Loader';
import './css/Detail.css';
import Footer from './Footer';
import Title from './Title';

export default function Detail(props) {
	const dispatch = useDispatch();
	const myGame = useSelector((store) => store.detail);

	useEffect(() => {
		dispatch(getDetails(props.match.params.id));
		return () => {
			dispatch(pageDetail());
		};
	}, [dispatch]);

	return (
		<div className='contenedor-detail'>
			<Title />
			{Object.keys(myGame).length ? (
				<div className='div-container'>
					<div className='img-detail'>
						<img src={myGame.image ? myGame.image : myGame.img} alt='' />
					</div>
					<div className='div-details'>
						<p>Platforms: {myGame.platforms.join(' - ')}</p>
						<p>Genres: {myGame.genres.join(' - ')}</p>
						<p>Rating: {myGame.rating}</p>
						<p>Released: {myGame.released}</p>
					</div>
					<h1 className='name-detail'>{myGame.name}</h1>
					<p className='p-detail'>{myGame.description}</p>
				</div>
			) : (
				<div className='div-loading-parent'>
					<Loader />
				</div>
			)}
			<Footer />
		</div>
	);
}
