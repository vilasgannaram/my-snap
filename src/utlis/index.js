import { createApi } from 'unsplash-js';

const unsplash = createApi({
	accessKey: import.meta.env.VITE_REACT_APP_UNSPALSH_API_ACCESS_KEY,
});

export const getSearchPhotos = async (searchWord, page = 1) => {
	const result = await unsplash.search.getPhotos({
		query: searchWord,
		page: page,
		perPage: 10,
	});

	return result;
};
