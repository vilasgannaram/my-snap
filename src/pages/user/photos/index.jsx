import React, { useState, useEffect } from 'react';

import InfiniteScroll from 'react-infinite-scroll-component';
import { useParams } from 'react-router-dom';
import { getUserPhotos } from '../../../api';
import { PhotosLayout } from '../../../components';

const UserPhotos = () => {
	const { username } = useParams();

	const [photos, setPhotos] = useState([]);
	const [totalPhotos, setTotalPhotos] = useState(null);
	const [tempPhotos, setTempPhotos] = useState([]);
	const [pageNumber, setPageNumber] = useState(1);
	const [loadMore, setLoadMore] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	let perPage = 10;

	useEffect(() => {
		const user_photos_identifier = setTimeout(async () => {
			if (pageNumber === 1 || loadMore) {
				if (window.innerWidth >= 1024) perPage = 15;
				const result = await getUserPhotos(username, pageNumber, perPage);

				if (pageNumber === 1) {
					setTotalPhotos(result.total);
				}
				setPhotos((prevPhotos) => [...prevPhotos, ...result.results]);
				setPageNumber((prevPage) => prevPage + 1);
				setTempPhotos(result.results);
				setIsLoading(false);
				setLoadMore(false);
			}
		}, 1000);

		return () => {
			clearTimeout(user_photos_identifier);
		};
	}, [username, loadMore]);

	const loadMoreHandler = () => {
		if (photos.length === totalPhotos) return;
		setLoadMore(true);
	};

	return (
		<div>
			<InfiniteScroll
				dataLength={photos.length}
				hasMore={true}
				next={loadMoreHandler}
			>
				<PhotosLayout photos={tempPhotos} />
			</InfiniteScroll>

			<div className='user-footer'>
				{photos.length === totalPhotos && totalPhotos !== 0 && (
					<p>You all caught up 🤞</p>
				)}

				{photos.length === 0 && <p>No Photos Found 😑</p>}
			</div>
		</div>
	);
};

export default UserPhotos;
