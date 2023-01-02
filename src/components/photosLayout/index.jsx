import React, { useState, useEffect } from 'react';

import OptimizedPhoto from '../optimizedPhoto';
import './photosLayout.scss';

const PhotosLayout = ({ photos, clearPhotos, setClearPhotos }) => {
	const [columnFirst, setColumnFirst] = useState([]);
	const [columnSecond, setColumnSecond] = useState([]);
	const [columnThird, setColumnThird] = useState([]);

	useEffect(() => {
		if (clearPhotos) {
			setColumnFirst([]);
			setColumnSecond([]);
			setColumnThird([]);
			setClearPhotos(false);
		}
	}, [clearPhotos]);

	useEffect(() => {
		const availableWidth = window.innerWidth;

		if (availableWidth < 768) {
			setColumnFirst((prevColumnFirstPhotos) => [
				...prevColumnFirstPhotos,
				...photos,
			]);
		} else if (availableWidth >= 768 && availableWidth < 1024) {
			const twoIndex = photos.length / 2;

			setColumnFirst((prevColumnFirstPhotos) => [
				...prevColumnFirstPhotos,
				...photos.slice(0, twoIndex),
			]);
			setColumnSecond((prevSecondColumnPhotos) => [
				...prevSecondColumnPhotos,
				...photos.slice(twoIndex),
			]);
		} else if (availableWidth >= 1024) {
			const threeIndex = Math.floor(photos.length / 3);

			setColumnFirst((prevColumnFirstPhotos) => [
				...prevColumnFirstPhotos,
				...photos.slice(0, threeIndex),
			]);

			setColumnSecond((prevSecondColumnPhotos) => [
				...prevSecondColumnPhotos,
				...photos.slice(threeIndex, -threeIndex),
			]);

			setColumnThird((prevColumnThirdPhotos) => [
				...prevColumnThirdPhotos,
				...photos.slice(-threeIndex),
			]);
		}
	}, [photos]);

	return (
		<ul className='photos-layout-container'>
			<div className='photos-layout-list-column'>
				{columnFirst.map((photo) => (
					<OptimizedPhoto key={photo.id} image={photo} />
				))}
			</div>

			<div className='photos-layout-list-column'>
				{columnSecond.map((photo) => (
					<OptimizedPhoto key={photo.id} image={photo} />
				))}
			</div>

			<div className='photos-layout-list-column'>
				{columnThird.map((photo) => (
					<OptimizedPhoto key={photo.id} image={photo} />
				))}
			</div>
		</ul>
	);
};

export default PhotosLayout;