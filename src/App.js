import React from "react";
import "./App.css";
import Header from "./Header";
import { Switch, Route } from "react-router-dom";
import TournamentsList from "./TournamentsList";
import Tournament from "./Tournament";
import PlayerStats from "./PlayerStats";
import PlayerList from "./PlayerList";
import Record from "./Record";
import Ranking from "./Ranking";
import Match from "./Match";
import MatchForm from "./MatchForm";
import ContactUS from "./ContactUS";
import Home from "./Home";
import Footer from "./Footer";

function App() {
  // const [active, setActive] = useState(true);

  // function usePageViews() {
  //   let location = useLocation();
  //   React.useEffect(() => {
  //     console.log("path:", location.pathname);
  //     setActive(true);
  //   }, [location]);
  // }

  // usePageViews();

  return (
    <div className="app">
      {/* Header */}
      {/* Home */}
      {/* Tournaments */}
      {/* Records */}
      {/* Player's stats */}
      {/* Ranking */}
      {/* Contact */}
      <Header />
      <Switch>
        <Route path="/tournaments/:tournamentId/:matchId/admin">
          <MatchForm />
        </Route>
        <Route path="/tournaments/:tournamentId/:matchId">
          <Match />
        </Route>
        <Route path="/tournaments/:tournamentId">
          <Tournament />
        </Route>
        <Route path="/tournaments">

          <TournamentsList />
        </Route>
        <Route path="/records">

          <Record />
        </Route>
        <Route path="/playerstats/:playerId">
          <PlayerStats />
        </Route>
        <Route path="/playerstats">

          <PlayerList />
        </Route>
        <Route path="/ranking">

          <Ranking />
        </Route>
        <Route path="/contact">
          <ContactUS />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
