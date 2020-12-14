import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import db from "./firebase";
import "./Match.css";

function Match() {
  const { tournamentId } = useParams();
  const { matchId } = useParams();
  const [tournamentCode, setTournamentCode ] = useState("");
  const [matchDetails, setMatchDetails] = useState({
    matchCode: "",
    match: "",
    winner: "",
    margin: "",
    manOfTheMatch: "",
    ground: "",
    teamA: {
      teamName: "",
      batting: {
        totalRuns: "",
        overs: "",
        wicketsFall: "",
        extras: "",
        extrasType: "",
        runRate: "",
        players: [
          {
            playerName: "",
            runs: "",
            balls: "",
            fours: "",
            sixes: "",
            strikeRate: "",
            outReason: "",
          },
        ],
      },
      bowling: {
        players: [
          {
            playerName: "",
            overs: "",
            maidens: "",
            runs: "",
            wickets: "",
            economy: "",
          },
        ],
      },
    },
    teamB: {
      teamName: "",
      batting: {
        totalRuns: "",
        overs: "",
        wicketsFall: "",
        extras: "",
        extrasType: "",
        runRate: "",
        players: [
          {
            playerName: "",
            runs: "",
            balls: "",
            fours: "",
            sixes: "",
            strikeRate: "",
            outReason: "",
          },
        ],
      },
      bowling: {
        players: [
          {
            playerName: "",
            overs: "",
            maidens: "",
            runs: "",
            wickets: "",
            economy: "",
          },
        ],
      },
    },
  });

  useEffect(() => {
    if (matchId) {
      db.collection("Tournaments")
        .doc(tournamentId)
        .collection("Matches")
        .doc(matchId)
        .onSnapshot((snapshot) => setMatchDetails(snapshot.data()));

        db.collection("Tournaments")
        .doc(tournamentId)
        .onSnapshot((snapshot) => setTournamentCode(snapshot.data().seriesCode));
    }
  }, [tournamentId, matchId]);

  const {
    matchCode,
    match,
    winner,
    margin,
    // manOfTheMatch,
    // ground,
    teamA,
    teamB,
  } = matchDetails;

  return (
    <div className="match">
      <h3 className="tournament__code">{tournamentCode}</h3>
      <span className="match__header">
        <h1>{match}</h1>
        <h4>{matchCode}</h4>
      </span>
      <p className="match__winner">
        {winner} won {margin}.
      </p>

      {/* teamA Details */}
      <table className="match__batting">
        <caption>
          {teamA ? (
            <span>
              <h4>{teamA.teamName}</h4>
              <h4>
                {teamA.batting.totalRuns}-{teamA.batting.wicketsFall}(
                {teamA.batting.overs})
              </h4>
            </span>
          ) : null}
        </caption>
        <thead>
          <tr>
            <th className="table__dataLeft">Batsman</th>
            <th>R</th>
            <th>B</th>
            <th>4's</th>
            <th>6's</th>
            <th>SR</th>
          </tr>
        </thead>
        {teamA ? (
          <tbody>
            {teamA.batting.players.map((batsman, index) => (
              <tr key={index}>
                <td className="table__dataLeft">
                  <h4>{batsman.playerName}</h4>
                  <small>{batsman.outReason}</small>
                </td>
                <td>{batsman.runs}</td>
                <td>{batsman.balls}</td>
                <td>{batsman.fours}</td>
                <td>{batsman.sixes}</td>
                <td>{batsman.strikeRate}</td>
              </tr>
            ))}
          </tbody>
        ) : null}
      </table>
      {teamA ? (
        <div className="match__battingFooter">
          <span>
            <h4>Extras</h4>
            <h4>
              ({teamA.batting.extras}) {teamB.batting.extrasType}
            </h4>
          </span>
          <span>
            <h4>Total</h4>
            <h4>
              {teamA.batting.totalRuns}-{teamA.batting.wicketsFall}(
              {teamA.batting.overs}) {teamA.batting.runRate}
            </h4>
          </span>
        </div>
      ) : null}

      <table className="match__batting match__bowling">
        <thead>
          <tr>
            <th className="table__dataLeft">Bowler</th>
            <th>O</th>
            <th>M</th>
            <th>R</th>
            <th>W</th>
            <th>ER</th>
          </tr>
        </thead>
        {teamA ? (
          <tbody>
            {teamA.bowling.players.map((bowler, index) => (
              <tr key={index}>
                <td className="table__dataLeft">
                  <h4>{bowler.playerName}</h4>
                </td>
                <td>{bowler.overs}</td>
                <td>{bowler.maidens}</td>
                <td>{bowler.runs}</td>
                <td>{bowler.wickets}</td>
                <td>{bowler.economy}</td>
              </tr>
            ))}
          </tbody>
        ) : null}
      </table>

      {/* teamB Details */}
      <table className="match__batting">
        <caption>
          {teamB ? (
            <span>
              <h4>{teamB.teamName}</h4>
              <h4>
                {teamB.batting.totalRuns}-{teamB.batting.wicketsFall}(
                {teamB.batting.overs})
              </h4>
            </span>
          ) : null}
        </caption>
        <thead>
          <tr>
            <th className="table__dataLeft">Batsman</th>
            <th>R</th>
            <th>B</th>
            <th>4's</th>
            <th>6's</th>
            <th>SR</th>
          </tr>
        </thead>
        {teamB ? (
          <tbody>
            {teamB.batting.players.map((batsman, index) => (
              <tr key={index}>
                <td className="table__dataLeft">
                  <h4>{batsman.playerName}</h4>
                  <small>{batsman.outReason}</small>
                </td>
                <td>{batsman.runs}</td>
                <td>{batsman.balls}</td>
                <td>{batsman.fours}</td>
                <td>{batsman.sixes}</td>
                <td>{batsman.strikeRate}</td>
              </tr>
            ))}
          </tbody>
        ) : null}
      </table>
      {teamB ? (
        <div className="match__battingFooter">
          <span>
            <h4>Extras</h4>
            <h4>
              ({teamB.batting.extras}) {teamB.batting.extrasType}
            </h4>
          </span>
          <span>
            <h4>Total</h4>
            <h4>
              {teamB.batting.totalRuns}-{teamB.batting.wicketsFall}(
              {teamB.batting.overs}) {teamB.batting.runRate}
            </h4>
          </span>
        </div>
      ) : null}

      <table className="match__batting match__bowling">
        <thead>
          <tr>
            <th className="table__dataLeft">Bowler</th>
            <th>O</th>
            <th>M</th>
            <th>R</th>
            <th>W</th>
            <th>ER</th>
          </tr>
        </thead>
        {teamB ? (
          <tbody>
            {teamB.bowling.players.map((bowler, index) => (
              <tr key={index}>
                <td className="table__dataLeft">
                  <h4>{bowler.playerName}</h4>
                </td>
                <td>{bowler.overs}</td>
                <td>{bowler.maidens}</td>
                <td>{bowler.runs}</td>
                <td>{bowler.wickets}</td>
                <td>{bowler.economy}</td>
              </tr>
            ))}
          </tbody>
        ) : null}
      </table>
    </div>
  );
}

export default Match;
