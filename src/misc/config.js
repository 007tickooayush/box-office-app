const API_BASE_URL = 'https://api.tvmaze.com';

export async function apiGet(queryString) {
//   ** get the JSON response using async await function from the API **
    const response = await fetch(
    `${API_BASE_URL}/search/shows?q=${queryString}`
  ).then(r => r.json());

  return response;
}
