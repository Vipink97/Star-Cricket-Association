import React from "react";
import "./Footer.css";
import logo from "./logo.png";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import YouTubeIcon from "@material-ui/icons/YouTube";

function Footer() {
  return (
    <div className="footer">
      <div className="SCA__container">
        <img src={logo} className="SCA__logo" alt="SCA Logo" />
        <div>
          <h1 className="SCA__heading">SCA</h1>
          <p>Star Cricket Association</p>
        </div>
      </div>
      <div className="followUs">
        <h3>Follow #SCA</h3>
        <a
          href="https://www.facebook.com/Star-Cricket-Association-136414374736503"
          target="_blank"
          rel="noreferrer"
          className="facebook__link"
        >
          <FacebookIcon  fontSize="large" />
        </a>
        <a
          href="https://instagram.com/starcricketassociation?igshid=1byoeerg6v9qx"
          target="_blank"
          rel="noreferrer"
          className="instagram__link"
        >
          <InstagramIcon fontSize="large" />
        </a>
        <a
          href="https://www.youtube.com/channel/UC314NP5K5R_B-4vq8m0Y28w"
          target="_blank"
          rel="noreferrer"
          className="youtube__link"
        >
          <YouTubeIcon  fontSize="large" />
        </a>
      </div>
      <p>&#169; Copyright SCA 2020. All Rights Reserved.</p>
      <p>Design and Developed by Vipin.</p>
    </div>
  );
}

export default Footer;
