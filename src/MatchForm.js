import React from "react";
import { useParams } from "react-router-dom";
import db from "./firebase";
import { Formik, useField, Form, FieldArray } from "formik";
import * as Yup from "yup";
import "./MatchForm.css";

const Inputfield = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="inputField">
      <label htmlFor={props.id || props.name}>{label}</label>
      <div>
        <input
          {...field}
          {...props}
          className={meta.touched && meta.error ? "errorInput" : null}
        />
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </div>
    </div>
  );
};

function MatchForm() {
  const { tournamentId } = useParams();
  const { matchId } = useParams();

  return (
    <Formik
      initialValues={{
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
      }}
      validationSchema={Yup.object({
        matchCode: Yup.string()
          .max(15, "Must be 15 characters or less")
          .required("Required"),
        match: Yup.string()
          .max(50, "Must be 50 characters or less")
          .required("Required"),
        winner: Yup.string()
          .max(25, "Must be 25 characters or less")
          .required("Required"),
        manOfTheMatch: Yup.string()
          .max(15, "Must be 15 characters or less")
          .required("Required"),
        margin: Yup.string()
          .max(30, "Must be 30 characters or less")
          .required("Required"),
        ground: Yup.string()
          .max(20, "Must be 20 characters or less")
          .required("Required"),

        teamA: Yup.object({
          teamName: Yup.string()
            .max(20, "Must be 20 characters or less")
            .required("Required"),
          batting: Yup.object({
            totalRuns: Yup.number()
              .min(0, "Must be 0 or more")
              .required("Required"),
            overs: Yup.number()
              .min(1, "Must be 1 or more")
              .required("Required"),
            wicketsFall: Yup.number()
              .min(0, "Must be 0 or more")
              .max(10, "Must be 10 or less")
              .required("Required"),
            extras: Yup.number()
              .min(0, "Must be 0 or more")
              .required("Required"),
            extrasType: Yup.string()
              .max(50, "Must be 50 characters or less")
              .required("Required"),
            runRate: Yup.number()
              .min(0, "Must be 0 or more")
              .required("Required"),
            players: Yup.array(
              Yup.object({
                playerName: Yup.string()
                  .max(15, "Must be 15 characters or less")
                  .required("Required"),
                runs: Yup.number()
                  .min(0, "Must be 0 or more")
                  .required("Required"),
                balls: Yup.number()
                  .min(0, "Must be 0 or more")
                  .required("Required"),
                fours: Yup.number()
                  .min(0, "Must be 0 or more")
                  .required("Required"),
                sixes: Yup.number()
                  .min(0, "Must be 0 or more")
                  .required("Required"),
                strikeRate: Yup.number()
                  .min(0, "Must be 0 or more")
                  .required("Required"),
                outReason: Yup.string()
                  .max(25, "Must be 25 characters or less")
                  .required("Required"),
              })
            ),
          }),

          bowling: Yup.object({
            players: Yup.array(
              Yup.object({
                playerName: Yup.string()
                  .max(15, "Must be 15 characters or less")
                  .required("Required"),
                overs: Yup.number()
                  .min(0.1, "Must be 0.1 or more")
                  .required("Required"),
                maidens: Yup.number()
                  .min(0, "Must be 0 or more")
                  .required("Required"),
                runs: Yup.number()
                  .min(0, "Must be 0 or more")
                  .required("Required"),
                wickets: Yup.number()
                  .min(0, "Must be 0 or more")
                  .required("Required"),
                economy: Yup.number()
                  .min(0, "Must be 0 or more")
                  .required("Required"),
              })
            ),
          }),
        }),

        teamB: Yup.object({
          teamName: Yup.string()
            .max(20, "Must be 20 characters or less")
            .required("Required"),
          batting: Yup.object({
            totalRuns: Yup.number()
              .min(0, "Must be 0 or more")
              .required("Required"),
            overs: Yup.number()
              .min(1, "Must be 1 or more")
              .required("Required"),
            wicketsFall: Yup.number()
              .min(0, "Must be 0 or more")
              .required("Required"),
            extras: Yup.number()
              .min(0, "Must be 0 or more")
              .required("Required"),
            extrasType: Yup.string()
              .max(50, "Must be 50 characters or less")
              .required("Required"),
            runRate: Yup.number()
              .min(0, "Must be 0 or more")
              .required("Required"),
            players: Yup.array(
              Yup.object({
                playerName: Yup.string()
                  .max(15, "Must be 15 characters or less")
                  .required("Required"),
                runs: Yup.number()
                  .min(0, "Must be 0 or more")
                  .required("Required"),
                balls: Yup.number()
                  .min(0, "Must be 0 or more")
                  .required("Required"),
                fours: Yup.number()
                  .min(0, "Must be 0 or more")
                  .required("Required"),
                sixes: Yup.number()
                  .min(0, "Must be 0 or more")
                  .required("Required"),
                strikeRate: Yup.number()
                  .min(0, "Must be 0 or more")
                  .required("Required"),
                outReason: Yup.string()
                  .max(25, "Must be 25 characters or less")
                  .required("Required"),
              })
            ),
          }),

          bowling: Yup.object({
            players: Yup.array(
              Yup.object({
                playerName: Yup.string()
                  .max(15, "Must be 15 characters or less")
                  .required("Required"),
                overs: Yup.number()
                  .min(0.1, "Must be 0.1 or more")
                  .required("Required"),
                maidens: Yup.number()
                  .min(0, "Must be 0 or more")
                  .required("Required"),
                runs: Yup.number()
                  .min(0, "Must be 0 or more")
                  .required("Required"),
                wickets: Yup.number()
                  .min(0, "Must be 0 or more")
                  .required("Required"),
                economy: Yup.number()
                  .min(0, "Must be 0 or more")
                  .required("Required"),
              })
            ),
          }),
        }),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          db.collection("Tournaments")
            .doc(tournamentId)
            .collection("Matches")
            .doc(matchId)
            .update(values)
            // .then((res) => res.json())
            .then(() => alert("Match Successfully Updated."))
            .catch((err) =>
              console.log("Can't Update due to following Error :" + err)
            );

          setSubmitting(false);
          // <Link></Link>
        }, 400);
      }}
      render={({ values }) => (
        <Form className="matchForm">
          <div className="matchDetails__container">
            <label># Match Details </label>
            <div className="matchDetails__innerContainer">
              <Inputfield
                label="Match Code : "
                name="matchCode"
                type="text"
                placeholder="e.g. Match 1"
              />
              <Inputfield
                label="Match Between: "
                name="match"
                type="text"
                placeholder="e.g. Lions vs Smasher"
              />
              <Inputfield
                label="Winner : "
                name="winner"
                type="text"
                placeholder="e.g. Cricket Lions"
              />
              <Inputfield
                label="Margin : "
                name="margin"
                type="text"
                placeholder="e.g. by 10 runs"
              />
              <Inputfield
                label="Man of the Match : "
                name="manOfTheMatch"
                type="text"
                placeholder="player Name"
              />
              <Inputfield
                label="Ground Name : "
                name="ground"
                type="text"
                placeholder="e.g. RCG"
              />
            </div>
          </div>

          <div className="teamDetails__container">
            <label># Team A </label>
            <div className="teamDetails__innerContainer">
              <Inputfield
                label="Team Name : "
                name="teamA.teamName"
                type="text"
                placeholder="Team Name"
              />
              <label># Batting </label>
              <div className="battingDetails__container">
                <Inputfield
                  label="Total Runs : "
                  name="teamA.batting.totalRuns"
                  type="number"
                  step="0.01"
                  min="0"
                />
                <Inputfield
                  label="Overs : "
                  name="teamA.batting.overs"
                  step="0.01"
                  type="number"
                  min="0"
                />
                <Inputfield
                  label="Wickets Fall : "
                  name="teamA.batting.wicketsFall"
                  step="0.01"
                  type="number"
                  min="0"
                />
                <Inputfield
                  label="Extras : "
                  name="teamA.batting.extras"
                  step="0.01"
                  type="number"
                  min="0"
                />
                <Inputfield
                  label="Extras Type : "
                  name="teamA.batting.extrasType"
                  type="text"
                  placeholder="e.g. (0 WD, 2 NB)"
                />
                <Inputfield
                  label="Run Rate : "
                  name="teamA.batting.runRate"
                  step="0.01"
                  type="number"
                  min="0"
                />
                <div className="playersDetail__container">
                  <label># Players </label>
                  <FieldArray
                    name="teamA.batting.players"
                    render={(teamABattingPlayersArray) => (
                      <div className="playersDetails__innerContainer">
                        {values.teamA.batting.players &&
                        values.teamA.batting.players.length > 0 ? (
                          values.teamA.batting.players.map((player, index) => (
                            <div key={index}>
                              <h4>{index + 1}</h4>
                              <Inputfield
                                label="Player Name : "
                                name={`teamA.batting.players.${index}.playerName`}
                                type="text"
                                placeholder="player name"
                              />
                              <Inputfield
                                label="Runs : "
                                name={`teamA.batting.players.${index}.runs`}
                                step="0.01"
                                type="number"
                                min="0"
                              />
                              <Inputfield
                                label="Balls : "
                                name={`teamA.batting.players.${index}.balls`}
                                step="0.01"
                                type="number"
                                min="0"
                              />
                              <Inputfield
                                label="4's : "
                                name={`teamA.batting.players.${index}.fours`}
                                step="0.01"
                                type="number"
                                min="0"
                              />
                              <Inputfield
                                label="6's : "
                                name={`teamA.batting.players.${index}.sixes`}
                                step="0.01"
                                type="number"
                                min="0"
                              />
                              <Inputfield
                                label="Strike Rate : "
                                name={`teamA.batting.players.${index}.strikeRate`}
                                step="0.01"
                                type="number"
                                min="0"
                              />
                              <Inputfield
                                label="Out Reason : "
                                name={`teamA.batting.players.${index}.outReason`}
                                type="text"
                                placeholder="e.g b Vipin"
                              />
                              <button
                                type="button"
                                onClick={() =>
                                  teamABattingPlayersArray.remove(index)
                                } // remove a player from the list
                              >
                                -
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  teamABattingPlayersArray.insert(index + 1, "")
                                } // insert an empty string at a position
                              >
                                +
                              </button>
                            </div>
                          ))
                        ) : (
                          <button
                            type="button"
                            onClick={() => teamABattingPlayersArray.push("")}
                          >
                            Add a player
                          </button>
                        )}
                      </div>
                    )}
                  />
                </div>
              </div>
            </div>
            <label># Bowling </label>
            <div className="bowlingDetails__container">
              <div className="playersDetail__container">
                <label># Players </label>
                <FieldArray
                  name="teamA.bowling.players"
                  render={(teamABowlingPlayersArray) => (
                    <div className="playersDetails__innerContainer">
                      {values.teamA.bowling.players &&
                      values.teamA.bowling.players.length > 0 ? (
                        values.teamA.bowling.players.map((player, index) => (
                          <div key={index}>
                            <h4>{index + 1}</h4>
                            <Inputfield
                              label="Player Name : "
                              name={`teamA.bowling.players.${index}.playerName`}
                              type="text"
                              placeholder="player name"
                            />
                            <Inputfield
                              label="Overs : "
                              name={`teamA.bowling.players.${index}.overs`}
                              step="0.01"
                              type="number"
                              min="0"
                            />
                            <Inputfield
                              label="Maidens : "
                              name={`teamA.bowling.players.${index}.maidens`}
                              step="0.01"
                              type="number"
                              min="0"
                            />
                            <Inputfield
                              label="Runs : "
                              name={`teamA.bowling.players.${index}.runs`}
                              step="0.01"
                              type="number"
                              min="0"
                            />
                            <Inputfield
                              label="Wickets : "
                              name={`teamA.bowling.players.${index}.wickets`}
                              step="0.01"
                              type="number"
                              min="0"
                            />
                            <Inputfield
                              label="Economy : "
                              name={`teamA.bowling.players.${index}.economy`}
                              step="0.01"
                              type="number"
                              min="0"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                teamABowlingPlayersArray.remove(index)
                              } // remove a player from the list
                            >
                              -
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                teamABowlingPlayersArray.insert(index + 1, "")
                              } // insert an empty string at a position
                            >
                              +
                            </button>
                          </div>
                        ))
                      ) : (
                        <button
                          type="button"
                          onClick={() => teamABowlingPlayersArray.push("")}
                        >
                          Add a player
                        </button>
                      )}
                    </div>
                  )}
                />
              </div>
            </div>
          </div>

          <div className="teamDetails__container">
            <label># Team B </label>
            <div className="teamDetails__innerContainer">
              <Inputfield
                label="Team Name : "
                name="teamB.teamName"
                type="text"
                placeholder="Team Name"
              />
              <label># Batting </label>
              <div className="battingDetails__container">
                <Inputfield
                  label="Total Runs : "
                  name="teamB.batting.totalRuns"
                  step="0.01"
                  type="number"
                  min="0"
                />
                <Inputfield
                  label="Overs : "
                  name="teamB.batting.overs"
                  step="0.01"
                  type="number"
                  min="0"
                />
                <Inputfield
                  label="Wickets Fall : "
                  name="teamB.batting.wicketsFall"
                  step="0.01"
                  type="number"
                  min="0"
                />
                <Inputfield
                  label="Extras : "
                  name="teamB.batting.extras"
                  step="0.01"
                  type="number"
                  min="0"
                />
                <Inputfield
                  label="Extras Type : "
                  name="teamB.batting.extrasType"
                  type="text"
                  placeholder="e.g. (0 WD, 2 NB)"
                />
                <Inputfield
                  label="Run Rate : "
                  name="teamB.batting.runRate"
                  step="0.01"
                  type="number"
                  min="0"
                />
                <div className="playersDetail__container">
                  <label># Players </label>
                  <FieldArray
                    name="teamB.batting.players"
                    render={(teamBBattingPlayersArray) => (
                      <div className="playersDetails__innerContainer">
                        {values.teamB.batting.players &&
                        values.teamB.batting.players.length > 0 ? (
                          values.teamB.batting.players.map((player, index) => (
                            <div key={index}>
                              <h4>{index + 1}</h4>
                              <Inputfield
                                label="Player Name : "
                                name={`teamB.batting.players.${index}.playerName`}
                                type="text"
                                placeholder="player name"
                              />
                              <Inputfield
                                label="Runs : "
                                name={`teamB.batting.players.${index}.runs`}
                                step="0.01"
                                type="number"
                                min="0"
                              />
                              <Inputfield
                                label="Balls : "
                                name={`teamB.batting.players.${index}.balls`}
                                step="0.01"
                                type="number"
                                min="0"
                              />
                              <Inputfield
                                label="4's : "
                                name={`teamB.batting.players.${index}.fours`}
                                step="0.01"
                                type="number"
                                min="0"
                              />
                              <Inputfield
                                label="6's : "
                                name={`teamB.batting.players.${index}.sixes`}
                                step="0.01"
                                type="number"
                                min="0"
                              />
                              <Inputfield
                                label="Strike Rate : "
                                name={`teamB.batting.players.${index}.strikeRate`}
                                step="0.01"
                                type="number"
                                min="0"
                              />
                              <Inputfield
                                label="Out Reason : "
                                name={`teamB.batting.players.${index}.outReason`}
                                type="text"
                                placeholder="e.g b Vipin"
                              />
                              <button
                                type="button"
                                onClick={() =>
                                  teamBBattingPlayersArray.remove(index)
                                } // remove a player from the list
                              >
                                -
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  teamBBattingPlayersArray.insert(index + 1, "")
                                } // insert an empty string at a position
                              >
                                +
                              </button>
                            </div>
                          ))
                        ) : (
                          <button
                            type="button"
                            onClick={() => teamBBattingPlayersArray.push("")}
                          >
                            Add a player
                          </button>
                        )}
                      </div>
                    )}
                  />
                </div>
              </div>
            </div>
            <label># Bowling </label>
            <div className="bowlingDetails__container">
              <div className="playersDetail__container">
                <label># Players </label>
                <FieldArray
                  name="teamB.bowling.players"
                  render={(teamBBowlingPlayersArray) => (
                    <div className="playersDetails__innerContainer">
                      {values.teamB.bowling.players &&
                      values.teamB.bowling.players.length > 0 ? (
                        values.teamB.bowling.players.map((player, index) => (
                          <div key={index}>
                            <h4>{index + 1}</h4>
                            <Inputfield
                              label="Player Name : "
                              name={`teamB.bowling.players.${index}.playerName`}
                              type="text"
                              placeholder="player name"
                            />
                            <Inputfield
                              label="Overs : "
                              name={`teamB.bowling.players.${index}.overs`}
                              step="0.01"
                              type="number"
                              min="0"
                            />
                            <Inputfield
                              label="Runs : "
                              name={`teamB.bowling.players.${index}.runs`}
                              step="0.01"
                              type="number"
                              min="0"
                            />
                            <Inputfield
                              label="Maidens : "
                              name={`teamB.bowling.players.${index}.maidens`}
                              step="0.01"
                              type="number"
                              min="0"
                            />
                            <Inputfield
                              label="Wickets : "
                              name={`teamB.bowling.players.${index}.wickets`}
                              step="0.01"
                              type="number"
                              min="0"
                            />
                            <Inputfield
                              label="Economy : "
                              name={`teamB.bowling.players.${index}.economy`}
                              step="0.01"
                              type="number"
                              min="0"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                teamBBowlingPlayersArray.remove(index)
                              } // remove a player from the list
                            >
                              -
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                teamBBowlingPlayersArray.insert(index + 1, "")
                              } // insert an empty string at a position
                            >
                              +
                            </button>
                          </div>
                        ))
                      ) : (
                        <button
                          type="button"
                          onClick={() => teamBBowlingPlayersArray.push("")}
                        >
                          Add a player
                        </button>
                      )}
                    </div>
                  )}
                />
              </div>
            </div>
          </div>
          <button type="submit" className="submit__button">
            Submit
          </button>
        </Form>
      )}
    />
  );
}

export default MatchForm;
