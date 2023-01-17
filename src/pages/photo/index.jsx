import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPhoto } from '../../api';

import { Spinner } from '../../components';
import './index.scss';

const Photo = () => {
	const { photo } = useParams();

	const [photoDetails, setPhotoDetails] = useState({});
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const photo_identifier = setTimeout(async () => {
			const result = await getPhoto(photo);
			setPhotoDetails(result);
			setIsLoading(false);
		}, 500);

		return () => {
			clearTimeout(photo_identifier);
		};
	}, [photo]);

	if (isLoading) {
		return (
			<div className='loading-container'>
				<Spinner />
			</div>
		);
	}

	return (
		<section className='photo-container'>
			<figure>
				<img
					src={photoDetails?.urls?.raw}
					alt={photoDetails?.user?.first_name}
				/>
			</figure>
			<figcaption>
				{/* user */}
				<Link to={`/${photoDetails?.user?.username}`} className='user-details'>
					<img
						src={photoDetails?.user?.profile_image?.medium}
						alt={photoDetails?.user?.first_name}
					/>
					<div className='user-name'>
						<h2>
							{photoDetails?.user?.first_name} {photoDetails?.user?.last_name}
						</h2>
					</div>
				</Link>

				{/* stats */}
				<div className='stats'>
					<p>Views: {photoDetails?.views ? photoDetails?.views : '-'}</p>
					<p>
						Downloads: {photoDetails?.downloads ? photoDetails?.downloads : '-'}
					</p>
				</div>
			</figcaption>
		</section>
	);
};

export default Photo;
