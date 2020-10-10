export const getRedirectUri = () => {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000/app';
  } else {
    return 'https://moodify.benmiz.com/app';
  }
};

export const login = () => {
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
  const scope = 'user-read-recently-played,user-top-read,playlist-modify-public';
  const authUri = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${getRedirectUri()}&scope=${scope}`;
  window.location.replace(authUri);
};