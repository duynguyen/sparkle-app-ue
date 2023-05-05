export const fetchData = async (path) => {
	const url = `${getAuthorHost()}/${path.split(":/")[1]}.model.json`;
	const data = await fetch(url, {credentials: "include"});
	const json = await data.json();
	return json;
};
export const getAuthorHost = () => {
	const url = new URL(window.location.href);
	const searchParams = new URLSearchParams(url.search);
	if (searchParams.has("authorHost")) {
		return searchParams.get("authorHost");
	} else {
		return process.env.NEXT_PUBLIC_DEFAULT_AUTHOR_HOST;
	}
}

export const getPublishHost = () => {
	const url = new URL(window.location.href);
	const searchParams = new URLSearchParams(url.search);
	if (searchParams.has("publishHost")) {
		return searchParams.get("publishHost");
	} else {
		return process.env.NEXT_PUBLIC_DEFAULT_PUBLISH_HOST;
	}
}
