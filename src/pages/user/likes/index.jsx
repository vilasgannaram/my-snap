import React, { useState, useEffect } from 'react';

import InfiniteScroll from 'react-infinite-scroll-component';
import { useParams } from 'react-router-dom';

import { getUserLikes } from '../../../api';
import { PhotosLayout } from '../../../components';

const UserLikes = () => {
  const { username } = useParams();

  const [photos, setPhotos] = useState([]);
  const [tempPhotos, setTempPhotos] = useState([]);
  const [totalPhotos, setTotalPhotos] = useState(null);

  const [pageNumber, setPageNumber] = useState(1);
  const [loadMore, setLoadMore] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  let perPage = 10;

  useEffect(() => {
    const user_likes_identifier = setTimeout(async () => {
      if (pageNumber === 1 || loadMore) {
        if (window.innerWidth >= 1024) perPage = 15;
        const result = await getUserLikes(username, pageNumber, perPage);
        if (pageNumber === 1) setTotalPhotos(result.total);
        setPhotos((prevPhotos) => [...prevPhotos, ...result.results]);
        setPageNumber((prevPage) => prevPage + 1);
        setTempPhotos(result.results);
        setIsLoading(false);
        setLoadMore(false);
      }
    }, 1000);

    return () => {
      clearTimeout(user_likes_identifier);
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

      {photos.length === totalPhotos && <p>You all caught up 🤞</p>}
    </div>
  );
};

export default UserLikes;
