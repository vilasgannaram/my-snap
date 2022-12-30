import React, { useState, useEffect, useRef } from 'react';

import OptimizedPhoto from '../optimizedPhoto';
import './photosLayout.scss';

const PhotosLayout = ({ photos }) => {
	const [column, setColumn] = useState([]);
	const [columnSecond, setColumnSecond] = useState([]);
	const [columnThird, setColumnThird] = useState([]);

	const ref = useRef(null);

	useEffect(() => {
		const availableWidth = ref.current.offsetWidth;

		if (availableWidth <= 768) {
			setColumn((prevColumnPhotos) => [...prevColumnPhotos, ...photos]);
		} else if (availableWidth > 768 && availableWidth <= 1024) {
			setColumnSecond((prevSecondColumnPhotos) => [
				...prevSecondColumnPhotos,
				...photos.splice(-Math.floor(photos.length / 2)),
			]);

			setColumn((prevColumnPhotos) => [...prevColumnPhotos, ...photos]);
		} else if (availableWidth > 1024) {
			const threeIndex = Math.floor(photos.length / 3);

			setColumnThird((prevColumnThirdPhotos) => [
				...prevColumnThirdPhotos,
				...photos.splice(-threeIndex),
			]);

			setColumnSecond((prevSecondColumnPhotos) => [
				...prevSecondColumnPhotos,
				...photos.splice(-threeIndex),
			]);

			setColumn((prevColumnPhotos) => [...prevColumnPhotos, ...photos]);
		}
	}, [ref, photos, setColumn, setColumnSecond]);

	return (
		<ul ref={ref} className='photos-layout-container'>
			<div className='photos-layout-list-column'>
				{column.map((photo) => (
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
