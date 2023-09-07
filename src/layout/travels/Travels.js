import React, { useEffect, useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './css/travels.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTravels } from '../../redux/actions';
import { getTravels } from '../../redux/selectors';

const Travels = () => {
	// const [result, setResult] = useState([]);
	// const [search, setSearch] = useState('');
	const dispatch = useDispatch();
	const travels = useSelector(getTravels);

	// //busqueda
	// const searcher = e => {
	// 	setSearch(e.target.value);
	// };

	// //filtrado
	// let travels = [];
	// if (!search) {
	// 	travels = result;
	// } else {
	// 	travels = result.filter(dato =>
	// 		dato.topic.toLowerCase().includes(search.toLocaleLowerCase())
	// 	);
	// }

	useEffect(() => {
		// setResult(travel);
		dispatch(fetchTravels());
	}, [dispatch/* , travel */]);

	return (
		<>
			<section className="travels-first-container">
				<div className="container travels-container">
					<div className="row">
						<input
							type="text"
							// value={search}
							// onChange={searcher}
							placeholder="Search"
							className="form-Control"
						></input>
						{travels ? (
							travels.map(travel => (
								<div
									key={travel._id}
									className="col-md-3 col-sm-6 travels-columns"
								>
									<div className="product-grid">
										{travel.photo ? (
											<div className="product-image">
												<img
													src={`${process.env.REACT_APP_API_BASE_URL}/uploads/${travel.photo}`}
													alt={travel.topic}
												/>
											</div>
										) : null}
										<div className="product-content">
											<h3 className="title">
												<Link to={`/travel/${travel._id}`}>{travel.topic}</Link>
											</h3>
											<p className="text-travels-ads">
												Remarks: {travel.remarks}
											</p>
											<div className="price">
												<span>Price: {travel.price}€</span>
												{/* travel.discount && <span> {travel.originalPrice}€</span> */}
											</div>
											{travel.forSale ? (
												<p className="text-travels-ads">Sale</p>
											) : (
												<p className="text-travels-ads">Search</p>
											)}
											<p className="text-travels-ads">
												Origin: {travel.origin}
											</p>
											<p className="text-travels-ads">
												Destination: {travel.destination}
											</p>
											<div className="product-button-group">
												<a
													className="product-like-icon"
													href="#"
												>
													<i className="fas fa-heart"></i>
												</a>
												<Link
													to={`/travel/${travel._id}`}
													className="add-to-cart"
												>
													<i className="fa fa-shopping-bag"></i>VIAJAR AQUÍ
												</Link>
												<a
													className="product-compare-icon"
													href="#"
												>
													<i className="fas fa-random"></i>
												</a>
											</div>
										</div>
									</div>
								</div>
							))
						) : (
							<p>No travel data available.</p>
						)}
					</div>
				</div>
			</section>
		</>
	);
};

export default Travels;
