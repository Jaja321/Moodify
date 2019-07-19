import React from 'react';
import Emoticon from './Emoticon';

class Track extends React.Component {
    constructor(props){
        super(props);
        this.state = {hover: false};
    }

    render(){
        return (    
            <div class="track" onMouseEnter={() => this.setState({hover: true})} onMouseLeave={() => this.setState({hover: false})}>
                {this.state.hover ? <Emoticon valence={this.props.valence} size={50}/> : <div class="trackIndex">{this.props.idx}</div>}
                <div class="trackDetails">
                    <div class="artist">{this.props.artist}</div>
                    <div class="trackName">{this.formatTrackName(this.props.trackName)}</div>
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