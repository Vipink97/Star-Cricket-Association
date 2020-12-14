import React, { useEffect, useState } from "react";
import "./Tournament.css";
import { useParams, Link } from "react-router-dom";
import db from "./firebase";

function Tournament() {
  const [matches, setMatches] = useState([]);
  const [isTournamentValid, setIsTournamentValid] = useState(true);
  const [pointsTable, setPointsTable] = useState([]);
  const [teamsSquad, setTeamsSquad] = useState([]);
  const [tournamentDetails, setTournamentDetails] = useState({
    MOS: {},
    details: {},
  });
  const { tournamentId } = useParams();

  useEffect(() => {
    if (tournamentId) {
      db.collection("Tournaments")
        .doc(tournamentId)
        .get()
        .then((snapshot) =>
          setTournamentDetails({
            MOS: snapshot.data().MOS,
            details: snapshot.data(),
          })
        )
        .catch((err) => {
          setIsTournamentValid(false);
          console.log(err);
        });

      db.collection("Tournaments")
        .doc(tournamentId)
        .collection("PointsTable")
        .orderBy("rank", "asc")
        .onSnapshot((snapshot) =>
          setPointsTable(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );

      db.collection("Tournaments")
        .doc(tournamentId)
        .collection("TeamsSquad")
        .onSnapshot((snapshot) =>
          setTeamsSquad(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );

      db.collection("Tournaments")
        .doc(tournamentId)
        .collection("Matches")
        .orderBy("time", "asc")
        .onSnapshot((snapshot) =>
          setMatches(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    }
  }, [tournamentId]);

  console.log(teamsSquad);

  return (
    <div className="tournament">
      {isTournamentValid ? (
        <span>
          <h1>{tournamentDetails.details.seriesName}</h1>
          {/* {matches } */}
          <table className="tournament__matches">
            <caption>Matches</caption>
            <thead>
              <tr>
                <th>Match Code</th>
                <th>Ground</th>
                <th>Matches</th>
                <th>Winner</th>
                <th>Margin</th>
                <th>M.O.M</th>
              </tr>
            </thead>
            <tbody>
              {matches.map((match, index) => {
                return (
                  <tr
                    key={match.id}
                    className={
                      index % 2 ? "match__evenColor" : "match__oddColor"
                    }
                  >
                    <td>
                      <Link to={`/tournaments/${tournamentId}/${match.id}`}>
                        {match.data.matchCode}
                      </Link>
                    </td>
                    <td>{match.data.ground}</td>
                    <td>
                      <Link to={`/tournaments/${tournamentId}/${match.id}`}>
                        {match.data.match}
                      </Link>
                    </td>
                    <td>{match.data.winner}</td>
                    <td>{match.data.margin}</td>
                    <td>{match.data.manOfTheMatch}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {tournamentDetails ? (
            <div className="tournament__result">
              <p>
                Result : {tournamentDetails.details.winner}{" "}
                {tournamentDetails.details.margin}
              </p>
              <p>
                Man of the Tournament : {tournamentDetails.MOS.playerName} (
                {tournamentDetails.MOS.runs} Runs and{" "}
                {tournamentDetails.MOS.wickets} wickets)
              </p>
            </div>
          ) : null}

          {pointsTable.length !== 0 ? (
            <table className="tournament__pointTable">
              <caption>Points Table</caption>
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Team</th>
                  <th>Matches</th>
                  <th>Won</th>
                  <th>Lose</th>
                  <th>Draw</th>
                  <th>NRR</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                {pointsTable.map((team) => (
                  <tr key={team.id}>
                    <td>{team.data.rank}</td>
                    <td>{team.data.teamName}</td>
                    <td>{team.data.matches}</td>
                    <td>{team.data.won}</td>
                    <td>{team.data.lose}</td>
                    <td>{team.data.draw}</td>
                    <td>{team.data.NRR}</td>
                    <td>{team.data.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : null}

          {teamsSquad.length !== 0 ? (
            <div className="teamSquad__container">
              <h3 className="teamSquad__heading">Teams Squad</h3>
              <div className="team__squad">
                {teamsSquad.map(
                  ({ data: { teamName, players = [] } = {} }, index) => (
                    <table
                      className="tournament__pointTable squad__table"
                      key={index}
                    >
                      <thead>
                        <tr>
                          <th>{teamName}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {players.map((playerName, indexKey) => (
                          <tr key={indexKey}>
                            <td>{playerName}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )
                )}
              </div>
            </div>
          ) : null}

          <div className="tournaments__Awards">
            <h3>Awards</h3>
            <ul>
              <li>Orange Cap - {tournamentDetails.details.orangeCap} Runs</li>
              <li>
                Purple Cap - {tournamentDetails.details.purpleCap} Wickets
              </li>
              <li>
                Best Fielder - {tournamentDetails.details.bestFielder} Dismissal
              </li>
              <li>
                Maximum Six - {tournamentDetails.details.maximumSix} Sixes
              </li>
              <li>
                Maximum Four - {tournamentDetails.details.maximumFour} Fours
              </li>
            </ul>
          </div>
        </span>
      ) : (
        <p className="noData">No Details To Show</p>
      )}
    </div>
  );
}

export default Tournament;
