import React, { useState, useEffect } from "react";
import "./PlayerStats.css";
import db from "./firebase";
import { useParams } from "react-router-dom";

function PlayerStats() {
  const [playerInfo, setPlayerInfo] = useState([]);
  const [rankingInfo, setRankingInfo] = useState([]);
  const [battingInfo, setBattingInfo] = useState([]);
  const [bowlingInfo, setBowlingInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { playerId } = useParams();

  // useEffect for playerInfo
  useEffect(() => {
    if (playerId) {
      db.collection("PlayersProfile")
        .doc(playerId)
        .onSnapshot((snapshot) => {
          setPlayerInfo(snapshot.data().Personal__Info);
          setRankingInfo(snapshot.data().Ranking__Info);
          setBattingInfo(snapshot.data().Batting__Info);
          setBowlingInfo(snapshot.data().Bowling__Info);
        });
    }
    setIsLoading(false);
  }, [playerId]);


  return (
    <div className="playerstats">
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <div className="player__personalInfoContainer">
            <div className="player__profilePic">
              <div>
                <img src={playerInfo.picURL} alt="profilePic"></img>
              </div>
            </div>
            <div className="player__personnelInfo">
              <h1>{playerInfo.playerName}</h1>
              <div>
                <div>
                  <h4>DOB</h4>
                  <h4>Role</h4>
                  <h4>Batting Style </h4>
                  <h4>Bowling Style </h4>
                </div>
                <div>
                  <h4> : </h4>
                  <h4> : </h4>
                  <h4> : </h4>
                  <h4> : </h4>
                </div>
                <div>
                  <h4>{playerInfo.DOB}</h4>
                  <h4>{playerInfo.Role}</h4>
                  <h4>{playerInfo.battingStyle}</h4>
                  <h4>{playerInfo.bowlingStyle}</h4>
                </div>
              </div>
            </div>
          </div>

          <div className="player__ranking">
            <h2>SCA Ranking</h2>
            <div className="playerRanking__container">
              <div>
                <h3>Batting Ranking</h3>
                <h3>Bowling Ranking</h3>
              </div>
              <div>
                <h2>{rankingInfo.battingRank}</h2>
                <h2>{rankingInfo.bowlingRank}</h2>
              </div>
            </div>
          </div>

          <div className="player__battingPerformance">
            <h2>Batting Performance</h2>
            <div>
              <div>
                <div>
                  <h4>Matches </h4>
                  <h4>Innings </h4>
                  <h4>Runs</h4>
                  <h4>Balls</h4>
                  <h4>Fours</h4>
                  <h4>Sixes</h4>
                  <h4>Not-Out </h4>
                </div>
                <div>
                  <h4>:</h4>
                  <h4>:</h4>
                  <h4>:</h4>
                  <h4>:</h4>
                  <h4>:</h4>
                  <h4>:</h4>
                  <h4>:</h4>
                </div>
                <div>
                  <h4>{battingInfo.matches}</h4>
                  <h4>{battingInfo.innings}</h4>
                  <h4>{battingInfo.runs}</h4>
                  <h4>{battingInfo.balls}</h4>
                  <h4>{battingInfo.fours}</h4>
                  <h4>{battingInfo.sixes}</h4>
                  <h4>{battingInfo.notout}</h4>
                </div>
              </div>
              <div>
                <div>
                  <h4>Strike rate </h4>
                  <h4>Average</h4>
                  <h4>Ducks </h4>
                  <h4>20's </h4>
                  <h4>50's </h4>
                  <h4>Highest Score </h4>
                </div>
                <div>
                  <h4>:</h4>
                  <h4>:</h4>
                  <h4>:</h4>
                  <h4>:</h4>
                  <h4>:</h4>
                  <h4>:</h4>
                </div>
                <div>
                  <h4>{battingInfo.strikerate}</h4>
                  <h4>{battingInfo.average}</h4>
                  <h4>{battingInfo.ducks}</h4>
                  <h4>{battingInfo.twenty}</h4>
                  <h4>{battingInfo.fifty}</h4>
                  <h4>{battingInfo.highestscore}</h4>
                </div>
              </div>
            </div>
          </div>

          <div className="player__bowlingPerformance">
            <h2>Bowling Performance</h2>
            <div>
              <div>
                <div>
                  <h4>Matches </h4>
                  <h4>Innings </h4>
                  <h4>Overs</h4>
                  <h4>Maidens</h4>
                  <h4>Runs</h4>
                  <h4>Wickets</h4>
                </div>
                <div>
                  <h4>:</h4>
                  <h4>:</h4>
                  <h4>:</h4>
                  <h4>:</h4>
                  <h4>:</h4>
                  <h4>:</h4>
                </div>
                <div>
                  <h4>{battingInfo.matches}</h4>
                  <h4>{bowlingInfo.innings}</h4>
                  <h4>{bowlingInfo.overs}</h4>
                  <h4>{bowlingInfo.maidens}</h4>
                  <h4>{bowlingInfo.runs}</h4>
                  <h4>{bowlingInfo.wickets}</h4>
                </div>
              </div>
              <div>
                <div>
                  <h4>BBI </h4>
                  <h4>3W Haul </h4>
                  <h4>Economy</h4>
                  <h4>Catches </h4>
                  <h4>Run Out </h4>
                  <h4>Stumping </h4>
                </div>
                <div>
                  <h4>:</h4>
                  <h4>:</h4>
                  <h4>:</h4>
                  <h4>:</h4>
                  <h4>:</h4>
                  <h4>:</h4>
                </div>
                <div>
                  <h4>{bowlingInfo.BBI}</h4>
                  <h4>{bowlingInfo.threewicket}</h4>
                  <h4>{bowlingInfo.economy}</h4>
                  <h4>{bowlingInfo.catches}</h4>
                  <h4>{bowlingInfo.runout}</h4>
                  <h4>{bowlingInfo.stumping}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PlayerStats;
