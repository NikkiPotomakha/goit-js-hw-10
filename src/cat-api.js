const url = 'https://api.thecatapi.com/v1';
const api_key =
  'live_iEb2DMF9jwTwCMOYze0UL5CgiOPDsho9toSWH0URmumXt3FBjbXrhY4ZmI3ki8dK';

export function fetchBreeds() {
  return fetch(`${url}/breeds?api_key=${api_key}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
export function fetchCatByBreed(breedId) {
  return fetch(`${url}/images/search?api_key=${api_key}&breed_ids=${breedId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .catch(() => {
      setErrorState(true);
      setLoadingState(false);
    });
}
