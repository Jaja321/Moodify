import React from "react";

export default ({ valence, size }) => {
  const style = {
    fontSize: size + "px",
  };
  if (valence < 0.2)
    return (
      <i className="material-icons" style={style}>
        sentiment_very_dissatisfied
      </i>
    );
  else if (valence < 0.4)
    return (
      <i className="material-icons" style={style}>
        sentiment_dissatisfied
      </i>
    );
  else if (valence < 0.6)
    return (
      <i className="material-icons" style={style}>
        sentiment_satisfied
      </i>
    );
  else if (valence < 0.8)
    return (
      <i className="material-icons-outlined" style={style}>
        sentiment_satisfied
      </i>
    );
  else
    return (
      <i className="material-icons" style={style}>
        sentiment_very_satisfied
      </i>
    );
};