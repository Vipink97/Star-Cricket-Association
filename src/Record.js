import React, { useState, useEffect } from "react";
import "./Record.css";
import db from "./firebase";

function Record() {
  const [battingInfo, setBattingInfo] = useState([]);
  const [bowlingInfo, setBowlingInfo] = useState([]);
  const [awardsInfo, setAwardsInfo] = useState([]);
  const [captainRecord, setCaptainRecord] = useState([]);
  const [seriesAwards, setSeriesAwards] = useState([]);
  const [groundRecord, setGroundRecord] = useState([]);
  const [teamTrophies, setTeamTrophies] = useState([]);
  const [teamRecord, setTeamRecord] = useState([]);

  useEffect(() => {
    // getting battingInfo from database
    db.collection("PlayersProfile").onSnapshot((snapshot) =>
      setBattingInfo(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data().Batting__Info,
          personal: doc.data().Personal__Info,
        }))
      )
    );

    // getting bowlingInfo from database
    db.collection("PlayersProfile").onSnapshot((snapshot) =>
      setBowlingInfo(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data().Bowling__Info,
          personal: doc.data().Personal__Info,
          batting: doc.data().Batting__Info,
        }))
      )
    );

    // getting awardsInfo from database
    db.collection("PlayersProfile").onSnapshot((snapshot) =>
      setAwardsInfo(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data().Awards__Info,
          personal: doc.data().Personal__Info,
          batting: doc.data().Batting__Info,
        }))
      )
    );

    // getting captainsRecord from database
    db.collection("CaptainsRecord")
      .orderBy("winPercentage", "desc")
      .onSnapshot((snapshot) =>
        setCaptainRecord(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );

    // getting teamRecord from database
    db.collection("TeamsRecord")
      .orderBy("won", "desc")
      .onSnapshot((snapshot) =>
        setTeamRecord(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );

    // getting seriesAwards from database
    db.collection("Tournaments")
      .orderBy("seriesCode", "asc")
      .onSnapshot((snapshot) =>
        setSeriesAwards(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
            MOS: doc.data().MOS,
          }))
        )
      );

    // getting groundsRecord from database
    db.collection("Grounds")
      .orderBy("groundName", "asc")
      .onSnapshot((snapshot) =>
        setGroundRecord(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );

    //getting teamTrophies from database
    db.collection("TeamTrophyCabinet").onSnapshot((snapshot) =>
      setTeamTrophies(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
  }, []);

  function compare(a, b) {
    const { personal: { playerName: playerName1 } = {} } = a;
    const { personal: { playerName: playerName2 } = {} } = b;
    const playerNameA = playerName1.toUpperCase();
    const playerNameB = playerName2.toUpperCase();

    let comparison = 0;
    if (playerNameA > playerNameB) {
      comparison = 1;
    } else if (playerNameA < playerNameB) {
      comparison = -1;
    }
    return comparison;
  }

  battingInfo.sort(compare);
  bowlingInfo.sort(compare);
  awardsInfo.sort(function (a, b) {
    return b.data.MOM - a.data.MOM;
  });

  return (
    <div className="record">
      <div className="record__heading">
        <h1>&#9734;SCA Records&#9734;</h1>
      </div>
      <div className="record__container">
        <h1>Individual Batting Career</h1>
        <div className="recordTable__container">
          <table className="record__table">
            <thead>
              <tr className="table__heading">
                <th>S.No.</th>
                <th>Player Name</th>
                <th>Matches</th>
                <th>Innings</th>
                <th>Runs</th>
                <th>Balls</th>
                <th>Fours</th>
                <th>Sixes</th>
                <th>Not-out</th>
                <th>Strike Rate</th>
                <th>Average</th>
                <th>Ducks</th>
                <th>20's</th>
                <th>50's</th>
                <th>HS</th>
              </tr>
            </thead>
            <tbody>
              {battingInfo.map(
                ({ personal: { playerName } = {}, data = {} }, index) => (
                  <tr key={index} className={index%2 ? "tableRow__even":"tableRow__odd"}>
                    <td>{index + 1}</td>
                    <td>{playerName}</td>
                    <td>{data.matches}</td>
                    <td>{data.innings}</td>
                    <td>{data.runs}</td>
                    <td>{data.balls}</td>
                    <td>{data.fours}</td>
                    <td>{data.sixes}</td>
                    <td>{data.notout}</td>
                    <td>{data.strikerate}</td>
                    <td>{data.average}</td>
                    <td>{data.ducks}</td>
                    <td>{data.twenty}</td>
                    <td>{data.fifty}</td>
                    <td>{data.highestscore}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="record__container">
        <h1>Individual Bowling Career</h1>
        <div className="recordTable__container">
          <table className="record__table">
            <thead>
              <tr className="table__heading">
                <th>S.No.</th>
                <th>Player Name</th>
                <th>Matches</th>
                <th>Innings</th>
                <th>Overs</th>
                <th>Maidens</th>
                <th>Runs</th>
                <th>Wickets</th>
                <th>BBI</th>
                <th>3W Haul</th>
                <th>Economy</th>
                <th>Catches</th>
                <th>Run out</th>
                <th>Stumping</th>
              </tr>
            </thead>
            <tbody>
              {bowlingInfo.map(
                (
                  {
                    personal: { playerName } = {},
                    batting: { matches } = {},
                    data = {},
                  },
                  index
                ) => (
                  <tr key={index} className={index%2 ? "tableRow__even":"tableRow__odd"}>
                    <td>{index + 1}</td>
                    <td>{playerName}</td>
                    <td>{matches}</td>
                    <td>{data.innings}</td>
                    <td>{data.overs}</td>
                    <td>{data.maidens}</td>
                    <td>{data.runs}</td>
                    <td>{data.wickets}</td>
                    <td>{data.BBI}</td>
                    <td>{data.threewicket}</td>
                    <td>{data.economy}</td>
                    <td>{data.catches}</td>
                    <td>{data.runout}</td>
                    <td>{data.stumping}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="record__container">
        <h1>Captain Records</h1>
        <table>
          <thead>
            <tr className="table__heading">
              <th>S.No.</th>
              <th>Captain Name</th>
              <th>Matches</th>
              <th>Won</th>
              <th>Lose</th>
              <th>Tied</th>
              <th>Win %</th>
            </tr>
          </thead>
          <tbody>
            {captainRecord.map((captain, index) => (
              <tr key={captain.data.id} className={index%2 ? "tableRow__even":"tableRow__odd"}>
                <td>{index + 1}</td>
                <td>{captain.data.captainName}</td>
                <td>{captain.data.matches}</td>
                <td>{captain.data.wins}</td>
                <td>{captain.data.loses}</td>
                <td>{captain.data.tied}</td>
                <td>{captain.data.winPercentage} %</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="record__container">
        <h1>Individuals Award</h1>
        <table>
          <thead>
            <tr className="table__heading">
              <th>S.No.</th>
              <th>Player Name</th>
              <th>Matches</th>
              <th>M.O.M</th>
              <th>M.O.S</th>
            </tr>
          </thead>
          <tbody>
            {awardsInfo.map(
              (
                {
                  personal: { playerName } = {},
                  batting: { matches } = {},
                  data = {},
                },
                index
              ) => (
                <tr key={index} className={index%2 ? "tableRow__even":"tableRow__odd"}>
                  <td>{index + 1}</td>
                  <td>{playerName}</td>
                  <td>{matches}</td>
                  <td>{data.MOM}</td>
                  <td>{data.MOS}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      <div className="record__container">
        <h1>Team Record</h1>
        <div className="recordTable__container">
          <table className="record__table">
            <thead>
              <tr className="table__heading">
                <th>S.No.</th>
                <th>Team Name</th>
                <th>Matches</th>
                <th>Won</th>
                <th>Tournament Won</th>
                <th>Series Won</th>
                <th>Lose</th>
                <th>Tie</th>
                <th>Whitewash</th>
              </tr>
            </thead>
            <tbody>
              {teamRecord.map((team, index) => (
                <tr key={team.data.id} className={index%2 ? "tableRow__even":"tableRow__odd"}>
                  <td>{index + 1}</td>
                  <td>{team.data.teamName}</td>
                  <td>{team.data.matches}</td>
                  <td>{team.data.won}</td>
                  <td>{team.data.tournamentsWon}</td>
                  <td>{team.data.seriesWon}</td>
                  <td>{team.data.lose}</td>
                  <td>{team.data.tie}</td>
                  <td>{team.data.whitewash}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="record__container">
        <h1>Series Award</h1>
        <table>
          <thead>
            <tr className="table__heading">
              <th>Series Code</th>
              <th>Orange Cap</th>
              <th>Purple Cap</th>
              <th>Best Fielder</th>
              <th>Max. Fours</th>
              <th>Max. Sixes</th>
              <th>Man of Series</th>
            </tr>
          </thead>
          <tbody>
            {seriesAwards.map((series, index) => (
              <tr key={series.data.id} className={index%2 ? "tableRow__even":"tableRow__odd"}>
                <th>{series.data.seriesCode}</th>
                <td>{series.data.orangeCap} Runs</td>
                <td>{series.data.purpleCap} Wickets</td>
                <td>{series.data.bestFielder} Dismissal</td>
                <td>{series.data.maximumFour}</td>
                <td>{series.data.maximumSix}</td>
                <td>{series.MOS.playerName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="record__container">
        <h1>Grounds</h1>
        <table>
          <thead>
            <tr className="table__heading">
              <th>S.No.</th>
              <th>Ground Name</th>
              <th>Matches</th>
            </tr>
          </thead>
          <tbody>
            {groundRecord.map((ground, index) => (
              <tr key={ground.data.id} className={index%2 ? "tableRow__even":"tableRow__odd"}>
                <td>{index + 1}</td>
                <td>{ground.data.groundName}</td>
                <td>{ground.data.matches}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="record__container">
        <h1>Team Trophy Cabinet</h1>
        {teamTrophies.map((team,index) => (
          <div className="team__trophies" key={index}>
            <h2 className="teamTrophy__teamName">{team.data.teamName}</h2>
            <div className="trophies__container">
              {team.data.trophies.map((trophy,indx) => (
                <div className="trophy__Info" key={indx}>
                  <img src={trophy.imageURL} alt="trophy img"></img>
                  <p>{trophy.trophyName}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Record;
