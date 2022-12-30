import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import './searchPhotos.scss';

import { getSearchPhotos } from '../../../utlis';
import { PhotosLayout } from '../../../components';

const SearchPhotos = () => {
	const { photo } = useParams();
	const [page, setPage] = useState(1);
	const [photos, setPhotos] = useState([]);
	const [tempPhotos, setTempPhotos] = useState([]);
	const [loadMore, setLoadMore] = useState(false);
	const [initial, setInitial] = useState(true);

	useEffect(() => {
		const search_photos_identifier = setTimeout(async () => {
			if (initial || loadMore) {
				const result = await getSearchPhotos(photo, page);
				setPhotos((prevPhotos) => [...prevPhotos, ...result.response.results]);
				setTempPhotos([...result.response.results]);
				setPage((prevPage) => prevPage + 1);
				setInitial(false);
				setLoadMore(false);
			}
		}, 500);

		return () => {
			clearTimeout(search_photos_identifier);
		};
	}, [loadMore]);

	return (
		<div className='search-photos-container'>
			<div className='search-photos-text-container'>
				<p className='search-photos-results-text'>
					search results: <span>{photo}</span>
				</p>
			</div>

			<InfiniteScroll
				dataLength={photos.length}
				next={() => setLoadMore(true)}
				hasMore={true}
			>
				<PhotosLayout photos={tempPhotos} />
			</InfiniteScroll>
		</div>
	);
};

export default SearchPhotos;
