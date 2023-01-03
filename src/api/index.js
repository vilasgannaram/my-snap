import { createApi } from 'unsplash-js';

const unsplash = createApi({
	accessKey: import.meta.env.VITE_REACT_APP_UNSPALSH_API_ACCESS_KEY,
});

// homepage
export const getPhotosList = async (pageNumber = 1, perPage = 10) => {
	const result = await unsplash.photos.list({
		page: pageNumber,
		perPage: perPage,
	});

	return result.response;
};

// search
export const getSearchPhotos = async (
	searchWord,
	pageNumber = 1,
	perPage = 10
) => {
	const result = await unsplash.search.getPhotos({
		query: searchWord,
		page: pageNumber,
		perPage: perPage,
	});

	if (result.errors) return { type: 'error', message: result.errors[0] };
	return result.response;
};
