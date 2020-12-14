import React from "react";
import "./PlayerLink.css";
import { Link } from "react-router-dom";

function PlayerLink({ id, playerName, picURL, rank }) {
  return (
    <Link to={`/playerstats/${id}`}>
      <div className="player__Link">
        <img className="player__pic" src={picURL} alt="Player Pic"></img>
        <div className="playerInfo">
          <div className="player__Name">
            <h2>{playerName}</h2>
            <small>{}</small>
          </div>
          <div className="player__Rank">
            <h4>SCA Rank</h4>
            {/* <strong> */}
              <h3>{rank}</h3>
            {/* </strong> */}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PlayerLink;
