import { createApi } from 'unsplash-js';

const unsplash = createApi({
	accessKey: import.meta.env.VITE_REACT_APP_UNSPALSH_API_ACCESS_KEY,
});

export const getSearchPhotos = async (searchWord, page = 1, perPage = 10) => {
	const result = await unsplash.search.getPhotos({
		query: searchWord,
		page: page,
		perPage: perPage,
	});

	if (result.errors) return { type: 'error', message: result.errors[0] };
	return result.response;
};
