import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Blurhash } from 'react-blurhash';
import './index.scss';

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
		<li className='image-container'>
			<div className='links-wrapper'>
				<Link to={`/${image.user.username}`} className='user-link'>
					<img
						loading='lazy'
						className='user-image'
						src={image.user.profile_image.medium}
						alt=''
					/>

					<h2 className='user-name'>
						{image.user.first_name && image.user.first_name}{' '}
						{image.user.last_name && image.user.last_name}
					</h2>
				</Link>
				<Link to={`/photos/${image?.id}`} className='image-link' />
			</div>

			<Link to={`/photos/${image?.id}`}>
				<figure ref={ref} className='optimized-image-wrapper'>
					<LazyLoadImage
						width={width}
						height={height}
						src={image.urls.full}
						alt={image.alt_description}
						threshold={10}
						afterLoad={() => setLoaded(true)}
					/>

					{/* blur hash placeholder */}
					{!loaded && image.blur_hash.length > 6 && (
						<div className='blurhash-image-placeholder'>
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
			</Link>
		</li>
	);
};

export default OptimizedPhoto;
