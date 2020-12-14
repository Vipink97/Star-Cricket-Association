import React from "react";
import "./ContactUsForm.css";
import { Formik, useField, Form } from "formik";
import * as Yup from "yup";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";
import emailjs from 'emailjs-com';
import{ init } from 'emailjs-com';
init("user_MUsqcc1WuL5oFnQsuhbDM");

const Inputfield = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="contact__inputField">
      <label htmlFor={props.id || props.name}>{label}</label>
      <div className="contact__input">
        <input
          {...field}
          {...props}
          className={meta.touched && meta.error ? "errorInput" : null}
        />
        {meta.touched && meta.error ? (
          <div className="contact__error">{meta.error}</div>
        ) : null}
      </div>
    </div>
  );
};

const TextAreaField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="contact__inputField">
      <label htmlFor={props.id || props.name}>{label}</label>
      <div className="contact__input">
        <textarea
          {...field}
          {...props}
          className={meta.touched && meta.error ? "errorInput" : null}
        />
        {meta.touched && meta.error ? (
          <div className="contact__error">{meta.error}</div>
        ) : null}
      </div>
    </div>
  );
};

function sendFeedback(templateId, variables) {
 emailjs
    .send("service_3yu0o6f", templateId, variables)
    .then((res) => {
      alert("Email successfully sent!");

    })
    .catch((err) =>
      console.log(
        "Oh well, you failed. Here some thoughts on the error that occured:",
        err
      )
    );
}

function ContactUsForm() {
  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        subject: "",
        message: "",
      }}
      validationSchema={Yup.object({
        name: Yup.string()
          .max(15, "Must be 15 characters or less")
          .required("Required"),
        email: Yup.string()
          .email()
          .max(100, "Must be 100 characters or less")
          .required("Required"),
        subject: Yup.string()
          .max(50, "Must be 50 characters or less")
          .required("Required"),
        message: Yup.string()
          .max(1000, "Must be 1000 characters or less")
          .required("Required"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          sendFeedback("template_2a9xa1d", {
            message: values.message,
            from_name: values.name,
            from_email: values.email,
            from_subject: values.subject,
          });
          values.message = "";
          values.name = "";
          values.subject = "";
          values.email = "";
          setSubmitting(false);
        }, 0);
      }}
      render={({ values }) => (
        <Form className="contactUs__Form">
          <Inputfield
            label="Name"
            name="name"
            type="text"
            placeholder="Enter your name"
          />
          <Inputfield
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email"
          />
          <Inputfield
            label="Subject"
            name="subject"
            type="text"
            placeholder="Enter subject"
          />
          <TextAreaField
            label="Message"
            name="message"
            type="textarea"
            placeholder="Enter your message"
            rows="7"
          />
          <button type="submit" className="sendButton">
            <SendOutlinedIcon className="sendIcon" />
            SEND
          </button>
        </Form>
      )}
    />
  );
}

export default ContactUsForm;
