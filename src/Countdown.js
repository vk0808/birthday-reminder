import React from "react";

const Countdown = ({ name, day, month, countdownData }) => {
  const presentDate = new Date();
  if (
    presentDate.getDate() === parseInt(day) &&
    presentDate.getMonth() === parseInt(month) - 1
  ) {
    return (
      <div className="wish">
        <p>
          It's time to celebrate <span className="name">{name}</span>' birthday.
        </p>
        <p>
          <strong>
            Wish <span className="name">{name}</span>
          </strong>
        </p>
      </div>
    );
  } else {
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
  }
};

export default Countdown;
