import React, { useState, useRef, useEffect } from "react";
import "./Header.css";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

function Header() {
  const [active, setActive] = useState(false);
  const wrapperRef = useRef(null);
  // const linkRef = useRef(null);

  const dropdown = () => {
    const currentState = active;
    setActive(!currentState);
  };

  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setActive(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  // function useInsideAlerter(ref) {
  //   useEffect(() => {
  //     function handleClickInside(event) {
  //       if (ref.current && ref.current.contains(event.target)) {
  //         // alert("okkk")
  //         console.log(activeLink)
  //         setActive(activeLink);
  //         console.log("active",active)
  //       }
  //     }
  //     document.addEventListener("mousedown", handleClickInside);
  //     return () => {
  //       document.removeEventListener("mousedown", handleClickInside);
  //     };
  //   }, [ref]);
  // }

  useOutsideAlerter(wrapperRef);
  // useInsideAlerter(linkRef);

  return (
    <div className="header" >
      <div className="header__nav">
        <h1>Star Cricket Association</h1>
        <div className="header__menubtn" ref={wrapperRef}>
          <Button onClick={dropdown}>
            <MenuIcon />
          </Button>
          <div className={active ? "show__navbar" : "hide__navbar"}>
            <Link to="/">Home</Link>
            <Link to="/tournaments" >Tournaments</Link>
            <Link to="/records" >Records</Link>
            <Link to="/playerstats" >Player's Stats</Link>
            <Link to="/ranking">Ranking</Link>
            <Link to="/contact">Contact Us</Link>
          </div>
        </div>

        <Link to="/">Home</Link>
        <Link to="/tournaments">Tournaments</Link>
        <Link to="/records">Records</Link>
        <Link to="/playerstats">Player's Stats</Link>
        <Link to="/ranking">Ranking</Link>
        <Link to="/contact">Contact Us</Link>
      </div>
    </div>
  );
}

export default Header;
