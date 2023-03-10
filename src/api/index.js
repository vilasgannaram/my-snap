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

// photo
export const getPhoto = async (photo) => {
	const result = await unsplash.photos.get({ photoId: photo });
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

// user
export const getUser = async (userName) => {
	const result = await unsplash.users.get({ username: userName });
	return result.response;
};

export const getUserPhotos = async (userName, pageNumber, perPage) => {
	const result = await unsplash.users.getPhotos({
		username: userName,
		page: pageNumber,
		perPage: perPage,
		orderBy: 'latest',
	});

	return result.response;
};

export const getUserLikes = async (userName, pageNumber, perPage) => {
	const result = await unsplash.users.getLikes({
		username: userName,
		page: pageNumber,
		perPage: perPage,
	});

	return result.response;
};

export const getUserCollections = async (userName, pageNumber, perPage) => {
	const result = await unsplash.users.getCollections({
		username: userName,
		page: pageNumber,
		perPage: perPage,
	});

	return result.response;
};
