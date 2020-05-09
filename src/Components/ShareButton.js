import React from "react";

function share(score) {
  const emoji = getEmoji(score);
  navigator.share({
    url: "https://moodify.benmiz.com",
    text: "According to Moodify, my mood is " + emoji + ". What's yours?",
    title: "Moodify",
  });
}

function getEmoji(score) {
  if (score < 0.2) return "😥";
  else if (score < 0.4) return "😟";
  else if (score < 0.6) return "😐";
  else if (score < 0.8) return "🙂";
  else return "😃";
}

export default ({ score }) => {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    return <div onClick={() => share(score)}>Share your result</div>;
  } else {
    return null;
  }
};
