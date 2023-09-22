import Axios from "axios";

const config = {};
const DEFAULT_PATH = "/index/";
const IMDB_API_KEY = 'k_jq5wzwf8';

export const CORE_EP = {
	GET_MOST_POPULAR_MOVIES: `/API/MostPopularMovies/${IMDB_API_KEY}`,
	MOVIE_DETAIL: `/API/YouTubeTrailer/${IMDB_API_KEY}/{id}`,
};
export const CORE_URL = {
	POPULAR_MOVIES: '/',
	MOVIE_DETAIL: '/{id}/',
};

export const api = Axios.create({
	baseURL: 'https://imdb-api.com/en/',
	timeout: 1100000,
	headers: { "Content-Type": "application/json" },
});

export const extractMsg = (err) => {
	let msg = "Sorry something went wrong";
	const data = err.response?.data ? err.response.data : [];
	if (err.code === "ECONNREFUSED") {
		// console.log('============ ECONNREFUSED ============');
		msg = "Unable to connect because of broken communication link";
	} else if (err.code === "ERR_NETWORK") {
		// console.log('============ ERR_NETWORK ============');
		msg = err.message;
	} else if (err.code === "ERR_BAD_REQUEST") {
		msg = err.message;
		if (err.response.request.status === 401) {
			msg = "Authentication Required!!!";
		} else if (Object.keys(data).includes("message")) {
			msg = data.message;
		} else if (Object.keys(data).includes("detail")) {
			msg = data.detail;
		} else if (Object.keys(data).includes("non_field_errors")) {
			msg = data.non_field_errors;
		}
	} else if (err.code === "ERR_BAD_RESPONSE") {
		// console.log('============ ERR_BAD_RESPONSE ============');
		msg =
			err.response.request.status === 500
				? "Sorry!!! Something went terribly wrong"
				: err.response.request.statusText;
	} else if (Object.keys(data).includes("detail")) {
		// console.log('============ detail ============');
		msg = data["detail"] || "Error Occurred";
	} else if (Object.keys(data).includes("message")) {
		// console.log('============ message ============');
		msg = data["message"] || "Error Occurred...";
	} else if (Object.keys(data).includes("non_field_errors")) {
		// console.log('============ non_field_errors ============');
		msg = data["non_field_errors"][0] || "Error Occurred.....";
	}
	return msg;
};

export const fetcher = async (
	url,
	method = "get",
	session,
	params = null,
	data = null,
	success = null,
	fail = () => {},
	upload = false
) => {
	// console.log(' ========= fetcher() ========= ');
	if (!url.startsWith("http")) {
		url = url.startsWith("/api/") ? url.replace("/api/", "/") : url;
		// url = url.startsWith("/") ? `${API_BASE}${url}` : `${API_BASE}/${url}`;
	}
	console.log(`Http: '${method}'\nRequest: ${url}\nPayload: `, data);

	if (url.includes("/undefined") || typeof session === "undefined") {
		return Promise.resolve(null);
	}

	// console.log('Token:    ', session && session.access);
	if (session)
		api.defaults.headers.common[
			"Authorization"
		] = `Token ${session?.tocken?.access}`;
	// console.log('Hearders:   ', api.defaults.headers);
	// console.log(' +++++ ', upload);
	if (upload) {
		api.defaults.headers["Content-Type"] = "multipart/form-data";
		api.defaults.headers.common["Content-Type"] = "multipart/form-data";
	} else {
		api.defaults.headers["Content-Type"] = "application/json";
		api.defaults.headers.common["Content-Type"] = "application/json";
	}

	// console.log('********** Header +++++++');
	// console.log(api.defaults.headers);

	if (success === null) {
		success = (r) => console.log("****** Success http call, response: ", r);
	}

	let failure = (err) => console.log(extractMsg(err));
	if (fail !== null) {
		failure = (err) => {
			console.log(extractMsg(err));
			fail(err);
		};
	}

	if (method === "get") {
		return api.get(url, { params }).then(success).catch(failure);
	} else if (method === "post") {
		return api.post(url, data).then(success).catch(failure);
	} else if (method === "put") {
		return api.put(url, data).then(success).catch(failure);
	} else if (method === "patch") {
		return api.patch(url, data).then(success).catch(failure);
	} else if (method === "delete") {
		return api.delete(url).then(success).catch(failure);
	}
};

export default config;
