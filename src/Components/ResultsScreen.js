import React from 'react';
import Track from './Track';
import Emoticon from './Emoticon';
import ShareButton from './ShareButton';
const qs = require('query-string');

const recentlyPlayedUri = 'https://api.spotify.com/v1/me/player/recently-played';
const audioFeaturesUri = 'https://api.spotify.com/v1/audio-features';

class ResultsScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {name: '', avgValence: '', loading: true};
        if(!this.props.location.hash){
            window.location.replace("/");
        }
        this.accessToken = qs.parse(this.props.location.hash, { ignoreQueryPrefix: true }).access_token;
        this.headers = {'Authorization': 'Bearer ' + this.accessToken};
        this.props.history.push('/mood');
        this.tracksData = [];
        this.valenceData = [];
    }

    componentDidMount(){
        fetch(recentlyPlayedUri, {headers: this.headers})
        .then(response => response.json())
        .then(data => {
            this.tracksData = data.items.slice(0,5);
            return fetch(audioFeaturesUri + '?ids=' + this.getTracksIdList(data), {headers: this.headers});
        })
        .then(response => response.json())
        .then(data => {
            this.valenceData = data.audio_features.map(track => track.valence);
            this.setState({avgValence: this.getAverageValence(data), loading: false});
        });
    }

    render(){
        if(this.state.loading){
            return (
                <div className="wrapper">
                    <h1>Analyzing...</h1>
                </div> 
            );
        }else{
            let trackElements = [];
            for(let i=0; i<this.tracksData.length; i++){
                const trackData = this.tracksData[i].track;
                trackElements.push(<Track key={'track' + (i+1)} idx={i+1} artist={trackData.artists[0].name} trackName={trackData.name} valence={this.valenceData[i]}/>)
            }
            return (    
                <div className="wrapper">
                    <h2><span>Based on what you've listned to recently, your mood is</span></h2>
                    <div className='resultEmoticon'><Emoticon valence={this.state.avgValence} size={100}/></div>
                    <div id="tracks">
                        <div style={{fontSize: 28}}>Recently played tracks</div>
                        {trackElements}
                    </div>
                    <div className="footer">
                        <ShareButton score={this.state.avgValence}/>
                    </div>
                </div>
            );
        }
    }

    getTracksIdList(data) {
        let ids = [];
        for(let i=0; i<5; i++){
            ids.push(data.items[i].track.id);
        }
        return ids.join(',');
    }

    getAverageValence(data){
        const tracks = data.audio_features;
        return 0.5*tracks[0].valence + 0.25*tracks[1].valence + 0.15*tracks[2].valence + 0.1*tracks[3].valence;
    }
}

export default ResultsScreen;