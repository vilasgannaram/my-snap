import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import { getUserCollections } from '../../../api';

const UserCollections = () => {
  const { username } = useParams();

  const [collections, setCollections] = useState([]);
  const [totoalCollections, setTotoalCollections] = useState(null);
  const [tempCollections, setTempCollections] = useState([]);

  const [pageNumber, setpageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [loadMore, setLoadMore] = useState(false);

  let perPage = 10;

  useEffect(() => {
    const user_collections_identifier = setTimeout(async () => {
      if (window.innerWidth >= 1024) perPage = 15;
      const result = await getUserCollections(username, pageNumber, perPage);
      console.log(result);
    }, 1000);

    return () => {
      user_collections_identifier;
    };
  }, [username, loadMore]);

  return <div>UserCollections</div>;
};

export default UserCollections;
