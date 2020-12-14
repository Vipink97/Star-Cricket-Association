import React, { useEffect, useState } from "react";
import "./Home.css";
import db from "./firebase";
import homeSliderImage from './homeSliderImage.jpeg';

function Home() {
  const [images, setImages] = useState([{}]);
  const [counter, setCounter] = useState(0);
  const [image, setImage] = useState({image:homeSliderImage});
  const [upcomingMatches, setUpcomingMatches] = useState([{}]);

  useEffect(() => {
    db.collection("HomeSliderImages").onSnapshot((snapshot) => {
      setImages(snapshot.docs.map((doc) => doc.data().images));
    });
    db.collection("UpcomingMatches")
      .orderBy("time", "asc")
      .onSnapshot((snapshot) => {
        setUpcomingMatches(snapshot.docs.map((doc) => doc.data()));
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setImage(images[0][counter]);
      if (counter >= images[0].length - 1) {
        setCounter(0);
      } else {
        setCounter(counter + 1);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [counter, images]);

  return (
    <div className="home">
      {image ? (
        <>
          <img src={image.image} alt="Slider Image1" className="mySlides" />
          {image.caption ? (
            <div className="mySlides__caption">{image.caption}</div>
          ) : null}
        </>
      ) : null}

      <h2 className="homeHeading__upcoming">Complete/Upcoming Matches</h2>
      <div className="homeMatches__container">
        {upcomingMatches
          ? upcomingMatches.map((match) => (
              <div className="homeMatch__container">
                <h4 className="matchCard__heading">
                  {match.teamA} V {match.teamB}
                </h4>
                <h4 className="matchCard__seriesName">{match.seriesName}</h4>
                <h4 className="matchCard__matchCode">{match.matchCode}</h4>
                <span className="homeTeamInfo__container">
                  <img
                    src={match.teamALogo}
                    className="team__logo"
                    alt="logo"
                  />
                  <h5 className="matchCard__teamName">{match.teamA}</h5>
                  {match.teamAScore ? (
                    <h5 className="matchCard__teamScore">{match.teamAScore}</h5>
                  ) : null}
                </span>
                <span className="homeTeamInfo__container">
                  <img
                    src={match.teamBLogo}
                    className="team__logo"
                    alt="logo"
                  />
                  <h5 className="matchCard__teamName">{match.teamB}</h5>
                  {match.teamAScore ? (
                    <h5 className="matchCard__teamScore">{match.teamBScore}</h5>
                  ) : null}
                </span>
                {match.result ? (
                  <h5 className="match__result">{match.result}</h5>
                ) : null}
              </div>
            ))
          : null}
      </div>
    </div>
  );
}

export default Home;
