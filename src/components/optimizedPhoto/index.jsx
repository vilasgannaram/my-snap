import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Blurhash } from 'react-blurhash';
import './optimizedPhoto.scss';

const OptimizedPhoto = ({ image }) => {
	const [showUser, setShowUser] = useState(false);
	const [loaded, setLoaded] = useState(false);
	const [width, setWidth] = useState(0);
	const [height, setHeight] = useState(0);

	const ref = useRef(null);

	useEffect(() => {
		setWidth(ref.current.offsetWidth);

		setHeight(() => {
			const aspectRatio = image.height / image.width;
			return aspectRatio * ref.current.offsetWidth;
		});
	}, []);

	return (
		<li className='optimized-image-container'>
			<Link
				to={`/${image.user.username}`}
				className='optimized-image-mobile-text-container'
			>
				<figure className='optimized-image-user-image'>
					<img
						loading='lazy'
						className='image'
						src={image.user.profile_image.medium}
						alt=''
					/>
				</figure>

				<h2 className='optimized-image-user-name'>
					{image.user.first_name && image.user.first_name}{' '}
					{image.user.last_name && image.user.last_name}
				</h2>
			</Link>

			<figure ref={ref} className='optimized-image'>
				<LazyLoadImage
					className='optimized-lazy-load-image'
					width={width}
					height={height}
					src={image.urls.full}
					alt={image.alt_description}
					threshold={10}
					afterLoad={() => setLoaded(true)}
				/>

				{/* blur hash placeholder */}
				{!loaded && (
					<div className='optimized-blurhah-image-placeholder'>
						<Blurhash
							hash={image.blur_hash}
							width={width}
							height={height}
							resolutionX={32}
							resolutionY={32}
							punch={1}
						/>
					</div>
				)}
			</figure>
		</li>
	);
};

export default OptimizedPhoto;
