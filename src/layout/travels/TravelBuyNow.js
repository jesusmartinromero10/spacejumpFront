import React, { useEffect, useState } from 'react';
import './css/travelDescription.css';
import CreditCard from '../utils/CreditCard';
import Layout from '../Layout';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getIsLogged, getTravelById, getUi, getUserId } from '../../redux/selectors';
import { getTravel } from '../../api/serviceTravels';
import Loading from '../utils/spinner/Loading';

const TravelBuyNow = () => {
    const { id } = useParams();
    const travelById = useSelector(getTravelById(id));
    const [travel, setTravel] = useState(null);
    const isLogged = useSelector(getIsLogged);
    const userId = useSelector(getUserId);
    const { isLoading, error } = useSelector(getUi);
    const navigate = useNavigate();

    useEffect(() => {
		if (!travelById) {
			getTravel(id)
				.then(response => {
					setTravel(response);
				})
				.catch(error => {
					console.error('Error fetching travel details:', error);
				});
		} else {
			setTravel(travelById);
		}
	}, [id, travelById]);

    if (!travel) {
		return <p>Loading...</p>;
	}


    
	const handleReturn = () => {
		return navigate('/travels');
	};

    if (isLoading) {
		return <Loading />;
	}
    

	return (
        <Layout>
            <section className="travel-description-page">
                <div id="container-travel-description">
                    <h1>{travel.topic}</h1>
                    {travel.active && isLogged ? (
								<>
									{userId === travel.userId ? (
                                        <div>
                                            <p>Viaje de mi compañía</p>
    
                                            <button onClick={handleReturn}>Volver</button>
                                        </div>
									) : (
                                        
                                        <><CreditCard travelId={travel._id} price={travel.price}/></>
                                    )}
								</>
							) : (
								<>
									{travel.userBuyer === userId ? (
										<p>Ya has comprado un pasaje para este viaje</p>
									) : (
										<p>Viaje completo</p>
									)}
                                    <button onClick={handleReturn}>Volver</button>
								</>
							)}
                    
                </div>
            </section>
        </Layout>
       );

    }


export default TravelBuyNow;
