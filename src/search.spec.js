export const search = (query, type) => {
  // eslint-disable-next-line no-undef
  fetch(`https://api.spotify.com/v1/search?q=${query}&type=${type}`).then(
    data => data.json()
  );
};
export const searchAlbums = () => {};

export const searchArtists = (query) => {
  search(query, 'artist');
};
export const searchTracks = () => {};
export const searchPlaylists = () => {};
