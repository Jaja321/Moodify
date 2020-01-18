import React from 'react';

class Home extends React.Component {
    render() {
        return (
            <div className="wrapper">
                <h1 className="mainTitle">Moodify</h1>
                <button className="loginButton" onClick={() => this.login()}>
                Connect with Spotify
                </button>
            </div>
        );
    }

    login() {
        const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
        let redirectUri;
        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
            redirectUri = 'http://localhost:3000/mood';
        } else {
            redirectUri = 'https://moodify.benmiz.com/mood';
        }
        const scope = 'user-read-recently-played';
        const authUri = 'https://accounts.spotify.com/authorize?client_id=' + CLIENT_ID + '&response_type=token&redirect_uri=' + redirectUri + '&scope=' + scope;
        window.location.replace(authUri);
    }
}

export default Home;
