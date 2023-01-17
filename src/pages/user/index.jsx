import React, { useState, useEffect } from 'react';

import { Link, useLocation, useParams, Outlet } from 'react-router-dom';

import { getUser } from '../../api';
import { Spinner } from '../../components';

import check from '../../assets/images/check.png';
import locationPoint from '../../assets/images/location.png';
import portfolio from '../../assets/images/portfolio.png';
import instagram from '../../assets/images/instagram.png';
import twitter from '../../assets/images/twitter.png';
import image from '../../assets/images/image.png';
import imageFill from '../../assets/images/image-fill.png';
import heart from '../../assets/images/heart.png';
import heartFill from '../../assets/images/heart-fill.png';
// import collection from '../../assets/images/collection.png';
// import collectionFill from '../../assets/images/collection-fill.png';

import './index.scss';

const User = () => {
	const { username } = useParams();
	const location = useLocation();

	const [user, setUser] = useState({});
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(true);
		const user_identifier = setTimeout(async () => {
			const result = await getUser(username);
			setUser(result);
			setIsLoading(false);
		}, 500);

		return () => {
			clearTimeout(user_identifier);
		};
	}, [username]);

	if (isLoading) {
		return (
			<div className='user-loading'>
				<Spinner />
			</div>
		);
	}

	return (
		<section className='user-container'>
			<div className='user-details'>
				<div className='image-wrapper'>
					<img src={user?.profile_image?.large} alt={user?.first_name} />
				</div>

				<div className='text-wrapper'>
					<h2 className='user-name'>
						{user?.first_name} {user?.last_name}
					</h2>
					<p className='user-bio'>{user?.bio}</p>

					<div className='user-links-wrapper'>
						{user?.for_hire && (
							<div className='user-link'>
								<img src={check} alt='checked' />
								<p>Available for hire</p>
							</div>
						)}

						{user?.location && (
							<div className='user-link location'>
								<img src={locationPoint} alt='location' />
								<p>{user.location}</p>
							</div>
						)}

						<div className='social-links'>
							{user?.social?.portfolio_url && (
								<a
									href={user.social.portfolio_url}
									target='_blank'
									className='social-link'
								>
									<img src={portfolio} alt='portfolio' />
									<p>{user.social.portfolio_url}</p>
								</a>
							)}

							{user?.social?.instagram_username && (
								<a
									href={`https://www.instagram.com/${user.social.instagram_username}`}
									target='_blank'
									className='social-link'
								>
									<img src={instagram} alt='instagram' />
									<p>{user.social.instagram_username}</p>
								</a>
							)}

							{user?.social?.twitter_username && (
								<a
									href={`https://twitter.com/${user.social.twitter_username}`}
									target='_blank'
									className='social-link'
								>
									<img src={twitter} alt='twitter' />
									<p>{user.social.twitter_username}</p>
								</a>
							)}
						</div>
					</div>
				</div>
			</div>

			{/* user photos, likes, and collections */}
			<div className='user-tabs'>
				<Link
					to=''
					className={`user-tab ${
						location.pathname === `/${username}` ? 'active' : ''
					}`}
				>
					<img
						src={location.pathname === `/${username}` ? imageFill : image}
						alt='image'
					/>
					<p>
						Photos <span className='count'>{user.total_photos}</span>
					</p>
				</Link>

				<Link
					to='likes'
					className={`user-tab ${
						location.pathname === `/${username}/likes` ? 'active' : ''
					}`}
				>
					<img
						src={location.pathname === `/${username}/likes` ? heartFill : heart}
						alt='heart'
					/>

					<p>
						Likes <span className='count'>{user.total_likes}</span>
					</p>
				</Link>

				{/* collections  */}

				{/* <Link
					to='collections'
					className={`user-tab ${
						location.pathname === `/${username}/collections` ? 'active' : ''
					}`}
				>
					<img
						src={
							location.pathname === `/${username}/collections`
								? collectionFill
								: collection
						}
						alt='collection'
					/>
					<p>
						Collections <span className='count'>{user.total_collections}</span>
					</p>
				</Link> */}
			</div>

			<div className='user-tab-output'>
				<Outlet />
			</div>
		</section>
	);
};

export default User;
