import React from "react";
import "./ContactUS.css";
import ContactUsForm from './ContactUsForm';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import CallOutlinedIcon from '@material-ui/icons/CallOutlined';

function ContactUS() {
  return (
    <div className="contactUs">
      <h1 className="contactUs__heading">Contact Us</h1>
      <div className="contactUs__main">
        <div className="contactUs__details">
          <h2>Contact Details</h2>
          <p><LocationOnOutlinedIcon /> Holambi Khurd, Delhi, India</p>
          <p><EmailOutlinedIcon /><a href="mailto:Starcricketleague001@gmail.com">Starcricketleague001@gmail.com</a></p>
          <p><CallOutlinedIcon />+91 9015499660</p>
        </div>
        <div className="contactUs__form">
            <ContactUsForm />
        </div>
      </div>
    </div>
  );
}

export default ContactUS;
