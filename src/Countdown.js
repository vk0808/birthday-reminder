import React from "react";

const Countdown = ({ name, countdownData }) => {
  if (!countdownData.isItBday) {
    return (
      <div>
        <div className="countdown-wrapper">
          <div className="countdown-box">
            {countdownData.days}
            <span className="legend">Days</span>
          </div>
          <div className="countdown-box">
            {countdownData.hours}
            <span className="legend">Hrs</span>
          </div>
          <div className="countdown-box">
            {countdownData.minutes}
            <span className="legend">Mins</span>
          </div>
          <div className="countdown-box">
            {countdownData.seconds}
            <span className="legend">Sec</span>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <p className="wish">
        Today is {name}'s birthday. <strong>Wish {name}</strong>
      </p>
    );
  }
};

export default Countdown;
