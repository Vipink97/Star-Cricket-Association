import React, { useState, useEffect } from "react";
import "./Ranking.css";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import db from "./firebase";

function Ranking() {
  const [battingRanking, setBattingRanking] = useState([]);
  const [bowlingRanking, setBowlingRanking] = useState([]);
  const [teamRanking, setTeamRanking] = useState([]);

  useEffect(() => {
    db.collection("SCARanking").onSnapshot((snapshot) => {
      setBattingRanking(snapshot.docs[0].data().BattingRanking.players);
    });

    db.collection("SCARanking").onSnapshot((snapshot) => {
      setBowlingRanking(snapshot.docs[0].data().BowlingRanking.players);
    });

    db.collection("SCARanking").onSnapshot((snapshot) => {
      setTeamRanking(snapshot.docs[0].data().TeamRanking.teams);
    });
  }, []);

  battingRanking.sort(function (a, b) {
    return b.rating - a.rating;
  });
  bowlingRanking.sort(function (a, b) {
    return b.rating - a.rating;
  });
  teamRanking.sort(function (a, b) {
    return b.rating - a.rating;
  });

  return (
    <div className="ranking">
      <div className="ranking__heading">
        <h1>&#9734;SCA Ranking&#9734;</h1>
      </div>
      <div className="ranking__container">
        <div className="batting__rank inner__container">
          <h2>Batting Rankings </h2>
          <InfoOutlinedIcon
            fontSize="small"
            className="info__icon battingRanking"
          />
          <span className="battingRank__container">
            <p>
              1 Inning : 1 point
              <br />
              1 Run : 1 point
              <br />
              1 Four : 2 points
              <br />
              1 Six : 3 points
              <br />
              1 Not-out : 5 points
              <br />
              1 (20's) : 5 points
              <br />
              1 (50's) : 10 points
              <br />1 Duck : -4 points
            </p>
          </span>
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Player Name</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {battingRanking.map((player, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{player.playerName}</td>
                  <td>{player.rating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bowling__rank inner__container">
          <h2>Bowling Rankings</h2>
          <InfoOutlinedIcon
            fontSize="small"
            className="info__icon bowlingRanking"
          />
          <span className="bowlingRank__container">
            <p>
              1 Inning : 1 point
              <br />
              1 Maiden : 5 points
              <br />
              1 Wicket : 10 points
              <br />
              3W Haul : 10 points
            </p>
          </span>
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Player Name</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {bowlingRanking.map((player, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{player.playerName}</td>
                  <td>{player.rating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="team__rank inner__container">
          <h2>Team Rankings</h2>
          <InfoOutlinedIcon
            fontSize="small"
            className="info__icon teamRanking"
          />
          <span className="teamRank__container">
            <p>
              Match Won : 3 points
              <br />
              Match Lose : -2 points
              <br />
              Match Tied : 1 point
              <br />
              Tournament Won : 10 points
              <br />
              Series Won : 5 points
              <br />
              Whitewash : 7 points
            </p>
          </span>
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Team Name</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {teamRanking.map((team, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{team.teamName}</td>
                  <td>{team.rating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Ranking;
