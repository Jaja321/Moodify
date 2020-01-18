import React from 'react';
import Emoticon from './Emoticon';

class Track extends React.Component {
    constructor(props){
        super(props);
        this.state = {hover: false};
    }

    render(){
        return (    
            <div className="track" onMouseEnter={() => this.setState({hover: true})} onMouseLeave={() => this.setState({hover: false})}>
                {this.state.hover ? <Emoticon valence={this.props.valence} size={50}/> : <div className="trackIndex">{this.props.idx}</div>}
                <div className="trackDetails">
                    <div className="artist">{this.props.artist}</div>
                    <div className="trackName">{this.formatTrackName(this.props.trackName)}</div>
                </div>
            </div>
        );
    }

    formatTrackName(trackName){
        const maxLength = 35;
        if(trackName.length > maxLength){
            return trackName.substring(0, maxLength - 3) + "...";
        }else{
            return trackName;
        }
    }
    
}

export default Track;