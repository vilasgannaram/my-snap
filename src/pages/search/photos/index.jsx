import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

import { getSearchPhotos } from '../../../api';
import { PhotosLayout, Spinner } from '../../../components';
import './searchPhotos.scss';

const SearchPhotos = () => {
	const { photo } = useParams();

	const [initial, setInitial] = useState(true);
	const [isLoading, setIsLoading] = useState(true);
	const [pageNumber, setPageNumber] = useState(1);
	const [totalPages, setTotalPages] = useState(null);
	const [totalPhotos, setTotalPhotos] = useState(null);

	const [photos, setPhotos] = useState([]);
	const [tempPhotos, setTempPhotos] = useState([]);
	const [loadMorePhotos, setLoadMorePhotos] = useState(false);
	const [clearPhotos, setClearPhotos] = useState(false);
	const [error, setError] = useState({ hasError: false, message: null });

	let perPage = 10;

	useEffect(() => {
		setInitial(true);
		setPageNumber(1);
		setPhotos([]);
		setTempPhotos([]);
		setClearPhotos(true);
	}, [photo]);

	useEffect(() => {
		const search_photos_identifier = setTimeout(async () => {
			if (initial || loadMorePhotos) {
				if (window.innerWidth >= 1024) perPage = 15;
				const result = await getSearchPhotos(photo, pageNumber, perPage);

				if (result.type === 'error') {
					setError({ hasError: true, message: result.message });
				} else {
					if (initial) {
						setInitial(false);
						setTotalPhotos(result.total);
						setTotalPages(result.total_pages);
					}
					setPhotos((prevPhotos) => [...prevPhotos, ...result.results]);
					setTempPhotos(result.results);
					setPageNumber((prevPageNumber) => prevPageNumber + 1);
					setIsLoading(false);
					setLoadMorePhotos(false);
				}
			}
		}, 1000);

		return () => {
			clearTimeout(search_photos_identifier);
		};
	}, [loadMorePhotos, initial]);

	const loadMorePhotosHandler = () => {
		if (!initial && !photos.length) return;
		if (totalPages === pageNumber || totalPhotos === photos.length) return;
		setIsLoading(true);
		setLoadMorePhotos(true);
	};

	return (
		<div className='search-photos-container'>
			<div className='search-photos-text-container'>
				{!initial && !photos.length && !error.hasError && (
					<p>No photos found 🤷</p>
				)}

				{!photos.length && error.hasError && <p>{error.message}</p>}
			</div>

			{photos.length > 0 && (
				<InfiniteScroll
					dataLength={photos.length}
					next={loadMorePhotosHandler}
					hasMore={true}
				>
					<PhotosLayout
						photos={tempPhotos}
						clearPhotos={clearPhotos}
						setClearPhotos={setClearPhotos}
					/>
				</InfiniteScroll>
			)}

			<div className='search-photos-footer'>
				{isLoading && <Spinner />}

				{photos.length > 0 && totalPhotos === photos.length && (
					<p className='search-photos-all-caught-up'>You're all caught up 🤞</p>
				)}
			</div>
		</div>
	);
};

export default SearchPhotos;
