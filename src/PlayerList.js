import React, { useState, useEffect } from "react";
import "./PlayerList.css";
import PlayerLink from "./PlayerLink";
import TextField from "@material-ui/core/TextField";
import db from "./firebase";

function PlayerList() {
  const [players, setPlayers] = useState([{}]);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (input) {
      let lowerCaseInput = input.toLowerCase();
      let firstLetter = lowerCaseInput.charAt(0);
      let capitalFirstLetter = lowerCaseInput.charAt(0).toUpperCase();
      let capitalizeInput = lowerCaseInput.replace(
        firstLetter,
        capitalFirstLetter
      );

      db.collection("PlayersProfile")
        .where("Personal__Info.playerName", ">=", capitalizeInput)
        .where("Personal__Info.playerName", "<", capitalizeInput + "z")
        .onSnapshot((snapshot) => {
          setPlayers(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              personal: doc.data().Personal__Info,
              ranking: doc.data().Ranking__Info,
            }))
          );
        });
    } else {
      db.collection("PlayersProfile").onSnapshot((snapshot) => {
        setPlayers(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            personal: doc.data().Personal__Info,
            ranking: doc.data().Ranking__Info,
          }))
        );
      });
    }
  }, [input]);

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
  
  players.sort(compare);

  return (
    <div className="playerList">
      <h2 className="playerList__heading">Search player</h2>
      <TextField
        label="Player Name"
        variant="outlined"
        className="playerList__search"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div className="playerList__container">
        {players.map(
          ({
            id = "",
            personal: { playerName, picURL } = {},
            ranking: { battingRank } = {},
          }) => {
            return (
              <PlayerLink
                key={id}
                id={id}
                playerName={playerName}
                picURL={picURL}
                rank={battingRank}
              />
            );
          }
        )}
      </div>
    </div>
  );
}

export default PlayerList;
