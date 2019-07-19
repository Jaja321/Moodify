import React from 'react';

function Emoticon(props){
    const style = {
        fontSize: props.size + "px"
    }
    if(props.valence < 0.2)
        return <i class="material-icons" style={style}>sentiment_very_dissatisfied</i>;
    else if(props.valence < 0.4)
        return <i class="material-icons" style={style}>sentiment_dissatisfied</i>;
    else if(props.valence < 0.6)
        return <i class="material-icons" style={style}>sentiment_satisfied</i>;
    else if(props.valence < 0.8)
        return <i class="material-icons-outlined" style={style}>sentiment_satisfied</i>;
    else
        return <i class="material-icons" style={style}>sentiment_very_satisfied</i>;
}

export default Emoticon;