import React, { useState, useEffect } from 'react';

import InfiniteScroll from 'react-infinite-scroll-component';
import { PhotosLayout, Spinner } from '../../../components';
import { getPhotosList } from '../../../api';
import './photos.scss';

const Photos = () => {
  const [photos, setPhotos] = useState([]);
  const [tempPhotos, setTempPhotos] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPhotos, setTotalPhotos] = useState(null);
  const [loadMore, setLoadMore] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  let perPage = 10;

  useEffect(() => {
    const photos_list_identifier = setTimeout(async () => {
      if (loadMore || pageNumber === 1) {
        if (window.innerWidth >= 1024) perPage = 15;
        const result = await getPhotosList(pageNumber, perPage);

        if (pageNumber === 1) {
          setTotalPhotos(result.total);
        }

        setPhotos((prevPhotos) => [...prevPhotos, ...result.results]);
        setTempPhotos(result.results);
        setPageNumber((prevPageNum) => prevPageNum + 1);
        setIsLoading(false);
        setLoadMore(false);
      }
    }, 500);

    return () => {
      clearTimeout(photos_list_identifier);
    };
  }, [loadMore]);

  const loadMorePhotosHandler = () => {
    if (photos.length === totalPhotos) return;
    setLoadMore(true);
  };

  return (
    <div className='home-photos-container'>
      {photos.length > 0 && (
        <InfiniteScroll
          dataLength={photos.length}
          next={loadMorePhotosHandler}
          hasMore={true}
        >
          <PhotosLayout photos={tempPhotos} />
        </InfiniteScroll>
      )}

      {isLoading && (
        <div className='loading-spinner'>
          <Spinner />
          {!isLoading && photos.length === totalPhotos && (
            <p>You're caught all up 🙌</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Photos;
