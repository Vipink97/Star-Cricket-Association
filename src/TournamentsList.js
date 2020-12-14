import React, { useState, useEffect } from "react";
import "./TournamentsList.css";
import db from "./firebase";
import { Link } from "react-router-dom";

function TournamentsList() {
  const [tournaments, setTournament] = useState([]);

  useEffect(() => {
    db.collection("Tournaments")
      .orderBy("time", "asc")
      .onSnapshot((snapshot) =>
        setTournament(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);

  return (
    <div className="tournaments">
      <h1 className="tournaments__heading">Tournaments</h1>
      <table>
        <thead>
          <tr className="tournaments__tableHeading">
            <th className="mobile__view">S.No.</th>
            <th>Series Code</th>
            <th>Series Name</th>
            <th>Total Matches</th>
            <th>Winner</th>
            <th className="mobile__view">Margin</th>
          </tr>
        </thead>
        <tbody>
          {tournaments.map((tournament, index) => (
            <tr key={tournament.id} className={ index%2 ? "evenColor" : "oddColor" }>
              <td className="mobile__view">{index + 1}</td>
              <td className=" tournament__link">
                <Link to={`/tournaments/${tournament.id}`}>
                  {tournament.data.seriesCode}
                </Link>
              </td>
              <td className="table__dataLeft tournament__link">
                <Link to={`/tournaments/${tournament.id}`}>
                  {tournament.data.seriesName}
                </Link>
              </td>

              <td>{tournament.data.totalMatches}</td>
              <td className="table__dataLeft">{tournament.data.winner}</td>
              <td className="table__dataLeft mobile__view">
                {tournament.data.margin}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TournamentsList;
