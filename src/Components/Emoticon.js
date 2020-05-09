import React from "react";

const valenceToType = {
  0.2: "sentiment_very_dissatisfied",
  0.4: "sentiment_dissatisfied",
  0.6: "sentiment_satisfied",
  0.8: ["sentiment_satisfied", true],
  1: "sentiment_very_satisfied",
};

const getType = (valence) => {
  const thresholds = Object.keys(valenceToType).sort();
  for (let i = 0; i < thresholds.length; i++) {
    if (valence < thresholds[i]) {
      const type = valenceToType[thresholds[i]];
      return Array.isArray(type) ? type : [type, false];
    }
  }
};

const Icon = ({ size, type, outlined }) => {
  const style = {
    fontSize: size + "px",
  };
  return (
    <i className={outlined ? "material-icons-outlined" : "material-icons"} style={style}>
      {type}
    </i>
  );
};

export default ({ valence, size }) => {
  const [type, outline] = getType(valence);
  return <Icon type={type} size={size} outline={outline} />;
};
